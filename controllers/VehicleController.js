const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Vehicle = require("../models/VehicleModel");

const createVehicle = async (req, res) => {
  try {
    const { name, plate, seats, status} = req.body;
    

    const existingVehicle = await Vehicle.findOne({ plate });

    if (existingVehicle) {
      res.status(400).json({ message: "Vehicle already exists" });
    } else {
      
      const vehicle = await Vehicle.create({
        name,
        plate,
        seats,
        status
      });
      res.status(200).json({ message: "User created Successfully", vehicle });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating new user" });
  }
};

const findAllVehicles = async (req, res) => {
  try {
    const vehicle = await Vehicle.find({});
    res.status(200).json(vehicle);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error finding all users" });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const { _id } = req.params;
    const vehicle = await Vehicle.find({ _id });
    if (!vehicle) {
      res
        .status(404)
        .json({ message: "you have not added any user with that email" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "data not located" });
  }
};



module.exports = {
  createVehicle,
  getVehicleById,
  findAllVehicles
};
