// routes/bookings.js

const express = require('express');
const Booking = require('../models/BookingModel');

// Route to book seats
// const handleBooking = async (req, res) => {
//   let { userId, seats, vehicleId,vehiclename,vehiclereg,price,tripdate,leavesAt,from,to } = req.body;

//   // Log the received data for debugging
//   console.log('Received booking request:', { userId, seats, vehicleId });

//   // Convert seats to an array if it's a string
//   if (typeof seats === 'string') {
//     seats = seats.split(',').map(seat => seat.trim());
//   }

//   // Validate input
//   if (!Array.isArray(seats) || seats.length === 0) {
//     return res.status(400).json({ message: 'Seats should be a non-empty array' });
//   }

//   if (!vehicleId) {
//     return res.status(400).json({ message: 'Vehicle ID is required' });
//   }

//   try {
//     // Fetch existing bookings for the same vehicle
//     const existingBookings = await Booking.find({ vehicleId });

//     // Flatten all booked seats into a single array
//     const bookedSeats = existingBookings.reduce((acc, booking) => acc.concat(booking.seats), []);

//     // Log booked seats for debugging
//     console.log('Booked seats:', bookedSeats);

//     // Check if any of the requested seats are already booked
//     const isSeatAlreadyBooked = seats.some(seat => bookedSeats.includes(seat));
//     if (isSeatAlreadyBooked) {
//         console.log("you already booked one of these seats")
//       return res.status(400).json({ message: 'One or more seats are already booked' });
//     }

//     // Check if the same user is trying to book the same seats again
//     const userBookings = existingBookings.filter(booking => booking.userId === userId);
//     const userBookedSeats = userBookings.reduce((acc, booking) => acc.concat(booking.seats), []);
//     const isSeatAlreadyBookedByUser = seats.some(seat => userBookedSeats.includes(seat));
//     if (isSeatAlreadyBookedByUser) {
//       return res.status(400).json({ message: 'You have already booked one or more of these seats' });
//     }

//     // Create a new booking
//     const newBooking = new Booking({ userId, seats, vehicleId,vehiclename,vehiclereg,price,leavesAt,from,to,tripdate });
//     await newBooking.save();

//     res.status(201).json({ message: 'Seats booked successfully', booking: newBooking });
//   } catch (error) {
//     console.error('Server error:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// Route to get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Route to get all booked seats for a specific vehicle
const getAllBookedSeats = async (req, res) => {
  const { vehicleId } = req.params;

  if (!vehicleId) {
    return res.status(400).json({ message: 'Vehicle ID is required' });
  }

  try {
    const bookings = await Booking.find({ vehicleId });

    // Flatten all booked seats into a single array
    const bookedSeats = bookings.reduce((acc, booking) => acc.concat(booking.seats), []);

    res.status(200).json(bookedSeats);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  // handleBooking,
  getBookings,
  getAllBookedSeats
};
