const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    vehicleId: {
        type: String
    },
    price: {
        type: Number
    },
    departure: {
        type: String
    },
    destination: {
        type: String
    },
    leavingTime:{
        type:String
    },
    arrivalTime:{
        type:String
    },
    tripdate:{
        type:Date
        
    },
    
    
    

    createdAt: {
        type: Date,
        default: Date.now(),
    }

})

const Trip = mongoose.model('trip', tripSchema);

module.exports = Trip;