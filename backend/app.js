const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
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

app.use(cors());
app.use(bodyParser.json());

app.use("/api/doctors", doctorRoutes);

vectorizeSpecialties().then(() => {
  console.log("TF-IDF model initialized with doctor specialties.");
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
