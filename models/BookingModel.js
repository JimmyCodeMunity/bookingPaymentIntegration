// models/Booking.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Booking schema
const BookingSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  seats: {
    type: [String],
    required: true,
  },

  vehicleId: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  vehiclename: {
    type: String,
  },
  vehiclereg: {
    type: String,
  },

  leavesAt: {
    type: String,
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  tripdate: {
    type: String,
  },
  transactionId: {
    type: String,
    default: null,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
});
const Booking = mongoose.model("bookings", BookingSchema);

module.exports = Booking;
