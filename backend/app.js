const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const http = require("http");
const WebSocket = require("ws");
const app = express();

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
    origin: "http://localhost:5173", // Allow the frontend's local server
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(bodyParser.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({
  server,
  perMessageDeflate: true,
  verifyClient: (info, done) => {
    const allowedOrigins = ["http://localhost:5173"]; // Frontend origin
    const origin = info.origin;

    if (allowedOrigins.includes(origin)) {
      done(true);
    } else {
      done(false, 403, "Forbidden"); // Reject if the origin is not allowed
    }
  },
});

// WebSocket connection handler
wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  ws.send(JSON.stringify({ message: "Connected to WebSocket server" }));

  ws.on("message", (message) => {
    console.log("Received message from client:", message);
    // Optionally, send a response back to the client
    ws.send(JSON.stringify({ message: "Received your message" }));
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
