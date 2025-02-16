const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");

// Route to match doctor with the disease query
router.get("/match", doctorController.matchDoctorByQuery);

module.exports = router;
