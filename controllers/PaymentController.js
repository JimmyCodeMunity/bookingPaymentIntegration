const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const path = require('path');
const Booking = require("../models/BookingModel");
require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'PRODUCTION') {
    require("dotenv").config({
        path: "./.env"
    });
}

const port = process.env.PORT;
const tokenUrl = process.env.tokenUrl;
const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;

const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");


const getToken = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      };
  
      const response = await axios.get(tokenUrl, requestOptions);
      console.log("Token obtained:", response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
    }
  };
  
  const requestPayment = async (req, res) => {
    try {
      const token = await getToken();
      const {
        MerchantCode,
        NetworkCode,
        PhoneNumber,
        TransactionDesc,
        AccountReference,
        Currency,
        Amount,
        CallBackURL,
      } = req.body;
  
      console.log("Request body:", req.body);
      const response = await axios.post(
        "https://sandbox.sasapay.app/api/v1/payments/request-payment/",
        {
          MerchantCode,
          NetworkCode,
          PhoneNumber,
          TransactionDesc,
          AccountReference,
          Currency,
          Amount,
          CallBackURL,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      res.json(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.response.data);
    }
  };
  
  const handleBooking = async (bookingData) => {
    let { userId, seats, vehicleId, vehiclename, vehiclereg, price, tripdate, leavesAt, from, to } = bookingData;
  
    if (typeof seats === 'string') {
      seats = seats.split(',').map(seat => seat.trim());
    }
  
    if (!Array.isArray(seats) || seats.length === 0) {
      throw new Error('Seats should be a non-empty array');
    }
  
    if (!vehicleId) {
      throw new Error('Vehicle ID is required');
    }
  
    const existingBookings = await Booking.find({ vehicleId });
    const bookedSeats = existingBookings.reduce((acc, booking) => acc.concat(booking.seats), []);
  
    const isSeatAlreadyBooked = seats.some(seat => bookedSeats.includes(seat));
    if (isSeatAlreadyBooked) {
      throw new Error('One or more seats are already booked');
    }
  
    const userBookings = existingBookings.filter(booking => booking.userId === userId);
    const userBookedSeats = userBookings.reduce((acc, booking) => acc.concat(booking.seats), []);
    const isSeatAlreadyBookedByUser = seats.some(seat => userBookedSeats.includes(seat));
    if (isSeatAlreadyBookedByUser) {
      throw new Error('You have already booked one or more of these seats');
    }
  
    const newBooking = new Booking({ userId, seats, vehicleId, vehiclename, vehiclereg, price, leavesAt, from, to, tripdate });
    await newBooking.save();
    return newBooking;
  };
  
  const handleCallback = async (req, res) => {
    const callbackData = req.body;
    console.log("C2B Callback Data:", callbackData);
  
    if (callbackData.ResultCode === 0) {
      console.log("A successful transaction");
      try {
        const booking = await handleBooking(callbackData.bookingData);
        res.status(201).json({ message: 'Seats booked successfully', booking });
      } catch (error) {
        console.error('Booking error:', error);
        res.status(400).json({ message: error.message });
      }
    } else {
      console.log("A failed transaction");
      res.status(400).json({ message: 'Transaction failed', description: callbackData.ResultDesc });
    }
  };
  
  app.post("/request-payment", requestPayment);
  app.post("/c2b-callback-results", handleCallback);
  
  module.exports = {
    requestPayment,
    handleCallback
  };
