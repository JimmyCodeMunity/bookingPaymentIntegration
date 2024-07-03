const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    location: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }

})

const Destination = mongoose.model('destinations', destinationSchema);

module.exports = Destination;