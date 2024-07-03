const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
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
  },

  resetPasswordToken: String,
  resetPasswordTime: Date,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
