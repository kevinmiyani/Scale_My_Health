const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    mobileNo: {
        type: String,
        require: true,
        unique: true,
    },
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    aadharNumber: {
        type: String,
        require: true,
    },
    birthDate: {
        type: String,
        require: true,
    },
    fcmToken: {
        type: String,
    },
    lastLogin: {
        device: { type: String, },
        os: { type: String, }
    },
    role: {
        type: String,
        require: true,
    },
}, { timestamps: true, })

module.exports = mongoose.model('Patient', patientSchema)