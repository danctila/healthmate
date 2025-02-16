const doctorService = require("../services/doctorService");

let wssInstance = null; // Store WebSocket instance

const setWSS = (wss) => {
  wssInstance = wss;
};

const matchDoctorByQuery = async (req, res) => {
  const { symptoms } = req?.body;
  console.log("Query received is ", symptoms);

  try {
    if (!symptoms) {
      return res.status(400).json({ message: "Query is required" });
    }

    const bestMatch = await doctorService.matchDoctorWithQuery(symptoms);
    if (!bestMatch) {
      return res
        .status(404)
        .json({ message: "No doctor found matching the query" });
    }

    console.log("Best match is ", bestMatch);

    // Send the response back to the API caller
    res.status(200).json({ symptoms, bestMatch });

    // Send the same data to all WebSocket clients
    if (wssInstance) {
      wssInstance.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({ symptoms, bestMatch }));
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { matchDoctorByQuery, setWSS };
