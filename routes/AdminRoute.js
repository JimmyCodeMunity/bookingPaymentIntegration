const express = require('express');
const { createAdmin, Login, findAllVehicles, findAllUsers, createDestination, findAllDestinations, findAllTrips, getVehicleById, getAdminDataByEmail, createDriver, getAllDrivers, deleteUserById, deleteDriverById, deleteVehicleById, deleteTripById, updateUserById, updateTripById, updateVehicleById, updateDriverById, deleteDestinationById, updateDestinationById, getDestinationById, getDriverById } = require('../controllers/AdminController');
const { createVehicle } = require('../controllers/VehicleController');
const { getTripById,createTrip } = require('../controllers/TripController');


const router = express.Router();
router.use(express.json());

//allow url encoding
router.use(express.urlencoded({extended:false}))

//create user router
router.post('/createadmin',createAdmin);

//create a new destination
router.post('/createdestination',createDestination);

//find all new destinations
router.get('/alldestinations',findAllDestinations);



//create a new vehicle
router.post('/createvehicle',createVehicle);

//create trip
router.post('/createtrip',createTrip);


//create driver
router.post('/createdriver',createDriver);

//get all trips
router.get('/alltrips',findAllTrips);


//get all the vehicles
router.get('/getvehicles',findAllVehicles);

//get vehicle by id
router.get('/getvehicle/:id',getVehicleById);

//get destination data by id
router.get('/getdestination/:id',getDestinationById);

//get driver by id
router.get('/getdriver/:id',getDriverById);

//find all the users
router.get('/allusers',findAllUsers);

//get all drivers
router.get('/alldrivers',getAllDrivers);


//get admin data by email
router.get('/admin/:email',getAdminDataByEmail);


//find trip by id
router.get('/tripdata/:id',getTripById);

//find user  by email
// router.get('/user/:email',getAllUsersByEmail);

///user login
router.post('/login',Login);


//deletions

router.delete('/deleteuser/:id',deleteUserById);
router.delete('/deletedriver/:id',deleteDriverById);
router.delete('/deletevehicle/:id',deleteVehicleById);
router.delete('/deletetrip/:id',deleteTripById);
router.delete('/deletedestination/:id',deleteDestinationById);



//update

router.put('/updateuser/:id',updateUserById);
router.put('/updatetrip/:id',updateTripById);
router.put('/updatevehicle/:id',updateVehicleById);
router.put('/updatedriver/:id',updateDriverById);
router.put('/updatedestination/:id',updateDestinationById);

module.exports = router;