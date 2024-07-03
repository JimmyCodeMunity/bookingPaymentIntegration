const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')




//app routes
const userRoute = require('./routes/UserRoute');
const adminRoute = require('./routes/AdminRoute');
const paymentRoute = require('./routes/PaymentRoute');


const app = express();
require('dotenv').config();
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use(express.json());

if (process.env.NODE_ENV !== 'PRODUCTION') {
    require("dotenv").config({
        path: "./.env"
    })
}

const port = process.env.PORT;
const dbconnection = process.env.DB_CONNECTION

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`)
})

app.get('/', (req, res) => {
    res.send('Server Running Now!!We good to go.')
})





mongoose.connect(dbconnection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DB Connected Successfully');
    })
    .catch((error) => {
        console.log('Error connecting to the database');
        console.log(error);
    })


//set up main app routes
//user access routes
app.use('/api/v1/user',userRoute);
app.use('/api/v1/payment',paymentRoute);
app.use('/api/v1/admin',adminRoute);

