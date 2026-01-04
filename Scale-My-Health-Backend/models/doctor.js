const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    mobileNo: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    speciality: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    intro: {
        type: String,
        require: true,
    },
    qualifications: [
        {
            type: { type: String },
            details: { type: String },
        }
    ],
    designation: {
        type: String,
        require: true,
    },
    longDesignation: {
        type: String,
        require: true,
    },
    consultationCharge: {
        type: Number,
    },
    specialities: [
        {
            type: { type: String },
            details: { type: String },
        }
    ],
    timeLines: [
        {
            from: { type: String, },
            to: { type: String, },
        }
    ],
    fcmToken: {
        type: String,
    },
    lastLogin: {
        device: { type: String, },
        os: { type: String, }
    },
    averageConsultationTime: {
        type: Number,
        default: 30,
    },
    holidays: [
        {
            date: { type: String },
            time: {
                from: { type: String, },
                to: { type: String, },
            }
        }
    ],
    role: {
        type: String,
        require: true,
    },
}, { timestamps: true, })

module.exports = mongoose.model('Doctor', doctorSchema)