const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  service: {
    type: String,
  },
  password: {
    type: String,
  },
  vehicleId:{
    type:String,
    default:null
  },
//   seats: [
//     {
//       seatNumber: String,
//       isBooked: Boolean,
//       bookingDate: Date, // Optional: Store the date of booking if needed
//     },
//   ],

  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

const Driver = mongoose.model("drivers", driverSchema);

module.exports = Driver;
