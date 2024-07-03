const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Trip = require("../models/TripModel");

//create trip
const createTrip = async (req, res) => {
  try {
    const {
      departure,
      destination,
      vehicleId,
      leavingTime,
      arrivalTime,
      price,
      tripdate
    } = req.body;
    const existingTrip = await Trip.findOne({ vehicleId });

    //check if exist
    if (existingTrip) {
      res.status(400).json({ message: "Trip already exists" });
      return;
    } else {
      const trip = await Trip.create({
        departure,
        destination,
        vehicleId,
        leavingTime,
        arrivalTime,
        price,
        tripdate
      });
      res
        .status(200)
        .json({ message: "Destination created Successfully", trip });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating new trip" });
  }
};

const findAllTrips = async (req, res) => {
  try {
    const trip = await Trip.find({});
    res.status(200).json(trip);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error finding all users" });
  }
};

// const getTripById = async (req, res) => {
//   try {
//     const { _id } = req.params;
//     const trip = await Trip.find({ _id });
//     if (!trip) {
//       res
//         .status(404)
//         .json({ message: "you have not added any user with that email" });
//     }
//     res.status(200).json(trip);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "data not located" });
//   }
// };
const getTripById = async (req, res) => {
  try {
    // Get the ID from the request parameters
    const { id } = req.params;

    // Find the user by ID
    const trip = await Trip.findById(id);

    // If the user is not found, return a 404 response
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found with the provided ID' });
    }

    // If the user is found, return the user data
    res.status(200).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



module.exports = {
  createTrip,
  getTripById,
  findAllTrips
};
