const Doctor = require("../models/doctor");
const natural = require("natural");

const tfidf = new natural.TfIdf();

const vectorizeSpecialties = async () => {
  const doctors = await Doctor.find();
  console.log(doctors.length, "doctors found");
  tfidf.documents = [];
  doctors.forEach((doctor) => {
    if (doctor.specialty_1) {
      tfidf.addDocument({
        specialty: doctor.specialty_1.toLowerCase(),
        doctor,
      });
    }
    if (doctor.specialty_2) {
      tfidf.addDocument({
        specialty: doctor.specialty_2.toLowerCase(),
        doctor,
      });
    }
  });

  return doctors;
};

const matchDoctorWithQuery = async (query) => {
  if (!query) return null;

  let bestMatch = { doctor: null, similarity: -1 };

  const queryLower = query.toLowerCase();

  tfidf.tfidfs(queryLower, (i, measure) => {
    if (measure > bestMatch.similarity) {
      bestMatch = { doctor: tfidf.documents[i].doctor, similarity: measure };
    }
  });

  return bestMatch.doctor;
};

module.exports = { vectorizeSpecialties, matchDoctorWithQuery };
