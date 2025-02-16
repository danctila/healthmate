const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const http = require("http");
const WebSocket = require("ws");
const app = express();
const doctorRoutes = require("./routes/doctorRoutes");
const { vectorizeSpecialties } = require("./services/doctorService");
const { matchDoctorByQuery } = require("./controllers/doctorController"); // Import the controller

mongoose
  .connect(
    "mongodb+srv://kotharijenish2001:r6iY07vwb0H5tVkH@healthmate-db.x01qp.mongodb.net/healthmate-db",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(bodyParser.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket connection handler
wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  // Send initial message to the client
  ws.send(JSON.stringify({ message: "Connected to WebSocket server" }));

  // Listen for incoming WebSocket messages (e.g., symptoms data)
  ws.on("message", async (message) => {
    try {
      const { symptoms } = JSON.parse(message); // Parse the incoming message to get the symptoms
      console.log("Symptoms received: ", symptoms);

      if (!symptoms) {
        ws.send(
          JSON.stringify({
            message: "No symptoms provided in the WebSocket message.",
          })
        );
        return;
      }

      // Call matchDoctorByQuery function
      const bestMatch = await matchDoctorByQuery({ body: { symptoms } });

      // Send the best match response back to the client
      if (bestMatch) {
        ws.send(
          JSON.stringify({ message: "Doctor match found", data: bestMatch })
        );
      } else {
        ws.send(JSON.stringify({ message: "No doctor found for the query" }));
      }
    } catch (error) {
      console.error("Error processing message:", error);
      ws.send(JSON.stringify({ message: "Error processing the request" }));
    }
  });

  // Handle WebSocket closure
  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

// Set up routes
app.use("/api/doctors", doctorRoutes);

// Initialize TF-IDF model with doctor specialties
vectorizeSpecialties().then(() => {
  console.log("TF-IDF model initialized with doctor specialties.");
});

// Start the server on the specified port
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
