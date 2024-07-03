const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  plate: {
    type: String,
  },

  seats: {
    type:String,
  },
  status: {
    type: String,
    default: "available", // Correctly setting the default value
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  resetPasswordToken: String,
  resetPasswordTime: Date,
});

const Vehicle = mongoose.model("vehicle", vehicleSchema);

module.exports = Vehicle;
