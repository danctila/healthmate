const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  middle_name: { type: String },
  suffix: { type: String },
  prefix: { type: String },
  school: { type: String },
  state: { type: String },
  city: { type: String },
  zip_code: { type: String },
  specialty_1: { type: String, required: true },
  specialty_2: { type: String },
  contact_numbers: { type: String },
  ind_pac_id: { type: String },
  ind_enrl_id: { type: String },
  facility_name: { type: String },
});

const Doctor = mongoose.model("Doctor", doctorSchema, "hcp_data");
module.exports = Doctor;
