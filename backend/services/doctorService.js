const Doctor = require("../models/doctor"); // Importing the Doctor model
const natural = require("natural"); // Importing the Natural library for TF-IDF

const tfidf = new natural.TfIdf();

// Function to vectorize the specialties
const vectorizeSpecialties = async () => {
  const doctors = await Doctor.find();
  doctors.forEach((doctor) => {
    if (doctor.specialty_1) {
      tfidf.addDocument(doctor.specialty_1);
    }
  });
  return doctors;
};

const matchDoctorWithQuery = async (query) => {
  const queryVector = new natural.TfIdf();
  queryVector.addDocument(query);
  const doctors = await Doctor.find({});
  let bestMatch = { doctor: null, similarity: -1 };
  doctors.forEach((doctor, index) => {
    if (doctor.specialty_1) {
      const similarity = tfidf.tfidfs(
        doctor.specialty_1.toLocaleLowerCase(),
        (i, measure) => {
          console.log("document:", i, ":", measure);
          if (measure > bestMatch.similarity) {
            bestMatch = { doctor, similarity: measure };
          }
        }
      );
    }
    if (doctor.specialty_2) {
      const similarity = tfidf.tfidfs(
        doctor.specialty_2.toLocaleLowerCase(),
        (i, measure) => {
          console.log("document:", i, ":", measure);

          if (measure > bestMatch.similarity) {
            bestMatch = { doctor, similarity: measure };
          }
        }
      );
      console.log("similarity:", similarity);
    }
  });

  return bestMatch.doctor;
};

module.exports = { vectorizeSpecialties, matchDoctorWithQuery };
