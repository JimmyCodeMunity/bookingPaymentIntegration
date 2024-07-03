const express = require('express');



const router = express.Router();
router.use(express.json());

//allow url encoding
router.use(express.urlencoded({extended:false}))

//create user router
router.post('/createvehicle',createUser);



///user login
router.post('/login',Login);

module.exports = router;