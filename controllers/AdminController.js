const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/AdminModel");
const User = require("../models/UserModel");
const Vehicle = require("../models/VehicleModel");
const Destination = require("../models/DestinationModel");
const Trip = require("../models/TripModel");
const Driver = require("../models/DriverModel");

const createAdmin = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = await Admin.create({
        fullname,
        email,
        password: hashedPassword,
      });
      res.status(200).json({ message: "Admin created Successfully", admin });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating new admin" });
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error finding all users" });
  }
};

const findAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.status(200).json(vehicles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error finding all vehicles" });
  }
};

const getAllUsersByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.find({ email });
    if (!user) {
      res
        .status(404)
        .json({ message: "you have not added any user with that email" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "data not located" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: 7,
    });
    res.status(200).json({ admin: admin, token: token });
    // console.log({admin,token})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to login" });
  }
};

//create destination point
const createDestination = async (req, res) => {
  try {
    const { location } = req.body;
    const existingLocation = await Destination.findOne({ location });

    //check if exist
    if (existingLocation) {
      res.status(400).json({ message: "Destination already exists" });
      return;
    } else {
      const destination = await Destination.create({ location });
      res
        .status(200)
        .json({ message: "Destination created Successfully", destination });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating new destination" });
  }
};



//get all destination
const findAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find({});
    res.status(200).json(destinations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error finding all destinations" });
  }
};
//get all trips
const findAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find({});
    res.status(200).json(trips);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error finding all trips" });
  }
};


//get vehicle by id
const getVehicleById = async (req, res) => {
  try {
    // Get the ID from the request parameters
    const { id } = req.params;

    // Find the user by ID
    const vehicle = await Vehicle.findById(id);

    // If the user is not found, return a 404 response
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found with the provided ID' });
    }

    // If the user is found, return the user data
    res.status(200).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


//get vehicle by id
const getDestinationById = async (req, res) => {
  try {
    // Get the ID from the request parameters
    const { id } = req.params;

    // Find the user by ID
    const destination = await Destination.findById(id);

    // If the user is not found, return a 404 response
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found with the provided ID' });
    }

    // If the user is found, return the user data
    res.status(200).json(destination);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error while getting this destination' });
  }
};


//get driver by id
const getDriverById = async (req, res) => {
  try {
    // Get the ID from the request parameters
    const { id } = req.params;

    // Find the user by ID
    const driver = await Driver.findById(id);

    // If the user is not found, return a 404 response
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found with the provided ID' });
    }

    // If the user is found, return the user data
    res.status(200).json(driver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error while getting this destination' });
  }
};


//get admin data
const getAdminDataByEmail = async (req, res) => {
  try {
      const {email} = req.params;
      const admin = await Admin.find({email});
      if(!admin){
          res.status(404).json({message:'you have not added any admin with that email'});
      }
      res.status(200).json(admin);

  } catch (error) {
      console.log(error)
      res.status(500).json({ error: "data not located" })

  }
}


//create Driver
const createDriver = async (req, res) => {
  try {
    const { username, email,phone, password,service,vehicleId } = req.body;

    const existingDriver = await Driver.findOne({ email });

    if (existingDriver) {
      res.status(400).json({ message: "Driver already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const driver = await Driver.create({
        username,
        email,
        service,
        phone,
        vehicleId,
        password:hashedPassword,
      });
      res.status(200).json({ message: "Driver created Successfully", driver });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating new driver" });
  }
};

//get all drivers
const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({});
    res.status(200).json(drivers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error finding all drivers" });
  }
};

//delete user
const deleteUserById = async (req, res) => {
  try {
      const {id} = req.params;
      const user = await User.findByIdAndDelete(id, req.body);
      if(!user){
          res.status(404).json({message: 'User not found'})
      }
      else{
          console.log("User deleted successfully")
          res.status(200).json(user)
      }
      
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
      
  }
}
const deleteDriverById = async (req, res) => {
  try {
      const {id} = req.params;
      const driver = await Driver.findByIdAndDelete(id, req.body);
      if(!driver){
          res.status(404).json({message: 'Product not found'})
      }
      else{
          console.log("User deleted successfully")
          res.status(200).json(driver)
      }
      
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
      
  }
}
const deleteVehicleById = async (req, res) => {
  try {
      const {id} = req.params;
      const vehicle = await Vehicle.findByIdAndDelete(id, req.body);
      if(!vehicle){
          res.status(404).json({message: 'Vehicle not found'})
      }
      else{
          console.log("Vehicle deleted successfully")
          res.status(200).json(vehicle)
      }
      
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
      
  }
}
const deleteTripById = async (req, res) => {
  try {
      const {id} = req.params;
      const trip = await Trip.findByIdAndDelete(id, req.body);
      if(!trip){
          res.status(404).json({message: 'Trip not found'})
      }
      else{
          console.log("Trip deleted successfully")
          res.status(200).json(trip)
      }
      
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
      
  }
}

//DELETE DESTINATION
const deleteDestinationById = async (req, res) => {
  try {
      const {id} = req.params;
      const destination = await Destination.findByIdAndDelete(id, req.body);
      if(!destination){
          res.status(404).json({message: 'Destination not found'})
      }
      else{
          console.log("Destination deleted successfully")
          res.status(200).json(destination)
      }
      
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
      
  }
}




//update operations
//update user by id
const updateUserById = async(req,res)=>{
  try {
      const {id} = req.params;
      const user = await User.findByIdAndUpdate(id,req.body);
      if(!user){
          return res.status(404).json({message: 'Product not found'})
      }
      else{
          const updatedUser = await User.findById(id);
          
          res.status(200).json(updatedUser);
          console.log("user updated successfully")
      }
      
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
      
  }
}
//update trip by id
const updateTripById = async(req,res)=>{
  try {
      const {id} = req.params;
      const trip = await Trip.findByIdAndUpdate(id,req.body);
      if(!trip){
          return res.status(404).json({message: 'Product not found'})
      }
      else{
          const updatedTrip = await Trip.findById(id);
          
          res.status(200).json(updatedTrip);
          console.log("user updated successfully")
      }
      
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
      
  }
}
//updateVehicle
const updateVehicleById = async(req,res)=>{
  try {
      const {id} = req.params;
      const vehicle = await Vehicle.findByIdAndUpdate(id,req.body);
      if(!vehicle){
          return res.status(404).json({message: 'Product not found'})
      }
      else{
          const updatedVehicle = await Vehicle.findById(id);
          
          res.status(200).json(updatedVehicle);
          console.log("user updated successfully")
      }
      
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
      
  }
}
//update driver
const updateDriverById = async(req,res)=>{
  try {
      const {id} = req.params;
      const driver = await Driver.findByIdAndUpdate(id,req.body);
      if(!driver){
          return res.status(404).json({message: 'Driver not found'})
      }
      else{
          const updatedDriver = await Vehicle.findById(id);
          
          res.status(200).json(updatedDriver);
          console.log("driver updated successfully")
      }
      
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
      
  }
}

//update destination
const updateDestinationById = async(req,res)=>{
  try {
      const {id} = req.params;
      const destination = await Destination.findByIdAndUpdate(id,req.body);
      if(!destination){
          return res.status(404).json({message: 'Destination not found'})
      }
      else{
          const updatedDestination = await Destination.findById(id);
          
          res.status(200).json(updatedDestination);
          // console.log("destination updated successfully")
      }
      
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
      
  }
}


module.exports = {
  createAdmin,
  findAllUsers,
  getAllUsersByEmail,
  Login,
  findAllVehicles,
  createDestination,
  findAllDestinations,
  findAllTrips,
  getVehicleById,
  getAdminDataByEmail,
  createDriver,
  getAllDrivers,
  deleteUserById,
  deleteDriverById,
  deleteVehicleById,
  deleteTripById,
  updateUserById,
  updateTripById,
  updateVehicleById,
  updateDriverById,
  updateDestinationById,
  deleteDestinationById,
  getDestinationById,
  getDriverById
};
