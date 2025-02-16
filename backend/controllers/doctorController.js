const doctorService = require("../services/doctorService");

const matchDoctorByQuery = async (req, res) => {
  const { query } = req.body;

  try {
    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const bestMatch = await doctorService.matchDoctorWithQuery(query);
    if (!bestMatch) {
      return res
        .status(404)
        .json({ message: "No doctor found matching the query" });
    }

    res.status(200).json(bestMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { matchDoctorByQuery };
