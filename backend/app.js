const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const http = require("http");
const WebSocket = require("ws");
const { setWSS } = require("./controllers/doctorController"); // Import WebSocket setter

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
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(bodyParser.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

setWSS(wss);

wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  ws.send(JSON.stringify({ message: "Connected to WebSocket server" }));

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
