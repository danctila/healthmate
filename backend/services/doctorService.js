const { OpenAI } = require("openai");
const Doctor = require("../models/doctor");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getBatchEmbeddings = async (texts) => {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: texts,
  });
  return response.data.map((item) => item.embedding);
};

const vectorizeSpecialties = async () => {
  const doctors = await Doctor.find();
  const specialties = [];
  if (doctors.embeddings) return;
  for (let doctor of doctors) {
    if (doctor.specialty_1) specialties.push(doctor.specialty_1.toLowerCase());
    if (doctor.specialty_2) specialties.push(doctor.specialty_2.toLowerCase());
  }

  const batchSize = 50;
  const allEmbeddings = [];

  for (let i = 0; i < specialties.length; i += batchSize) {
    const batch = specialties.slice(i, i + batchSize);
    const embeddings = await getBatchEmbeddings(batch);
    allEmbeddings.push(...embeddings);
  }

  let embeddingIndex = 0;

  for (let doctor of doctors) {
    const embeddingsForDoctor = [];
    if (doctor.specialty_1) {
      embeddingsForDoctor.push({
        specialty: doctor.specialty_1,
        embedding: allEmbeddings[embeddingIndex++],
      });
    }
    if (doctor.specialty_2) {
      embeddingsForDoctor.push({
        specialty: doctor.specialty_2,
        embedding: allEmbeddings[embeddingIndex++],
      });
    }
    await Doctor.updateOne(
      { _id: doctor._id },
      { $set: { embeddings: embeddingsForDoctor } }
    );
  }
};

const cosineSimilarity = (vec1, vec2) => {
  const dotProduct = vec1.reduce((sum, v, i) => sum + v * vec2[i], 0);
  const magnitude1 = Math.sqrt(vec1.reduce((sum, v) => sum + v * v, 0));
  const magnitude2 = Math.sqrt(vec2.reduce((sum, v) => sum + v * v, 0));
  return dotProduct / (magnitude1 * magnitude2);
};

const matchDoctorWithQuery = async (query) => {
  if (!query) return null;

  // Get the embedding for the query
  const queryEmbedding = await getBatchEmbeddings([query.toLowerCase()]);

  // Retrieve doctors' embeddings from MongoDB
  const doctorEmbeddings = await Doctor.find().select(
    "first_name last_name specialty_1 specialty_2 embeddings city state"
  );

  const similarityScores = [];

  // Iterate through doctors and their embeddings
  for (let doctor of doctorEmbeddings) {
    // Loop through each specialty and its corresponding embedding
    doctor.embeddings.forEach(({ specialty, embedding }) => {
      const similarity = cosineSimilarity(queryEmbedding[0], embedding);
      similarityScores.push({
        doctor: {
          first_name: doctor.first_name,
          last_name: doctor.last_name,
          specialty,
          city: doctor.city,
          state: doctor.state,
        },
        specialty,
        similarity,
      });
    });
  }

  // Sort similarity scores in descending order
  similarityScores.sort((a, b) => b.similarity - a.similarity);

  // Return top 5 doctors (or fewer if not enough matches)
  const topDoctors = similarityScores.slice(0, 5).map((item) => item.doctor);
  return topDoctors;
};

module.exports = { vectorizeSpecialties, matchDoctorWithQuery };
