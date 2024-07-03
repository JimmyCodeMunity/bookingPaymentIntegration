const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    
    password: {
        type: String
    },
    
    

    createdAt: {
        type: Date,
        default: Date.now(),
    },

    resetPasswordToken: String,
    resetPasswordTime: Date,

})

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;