const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const http = require("http"); // Import HTTP module
const WebSocket = require("ws"); // Import WebSocket package
const app = express();
const doctorRoutes = require("./routes/doctorRoutes");
const { vectorizeSpecialties } = require("./services/doctorService");

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
    origin: "http://localhost:5173/",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(bodyParser.json());

// Setting up the server with WebSocket
const server = http.createServer(app); // Create HTTP server using Express
const wss = new WebSocket.Server({ server }); // Create WebSocket server

// WebSocket connection handler
wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  // Send a message to the client when a new connection is established
  ws.send(JSON.stringify({ message: "Connected to WebSocket server" }));

  // Handle incoming messages from the client
  ws.on("message", (message) => {
    console.log("Received message from client:", message);
    // Optionally, send a response back to the client
    ws.send(JSON.stringify({ message: "Received your message" }));
  });

  // Handle connection closure
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
