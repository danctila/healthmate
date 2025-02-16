const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const doctorRoutes = require("./routes/doctorRoutes");

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

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
