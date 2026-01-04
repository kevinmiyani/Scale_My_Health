const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        require: true,
    },
    patient: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            require: true,
        },
        fullName: {
            type: String,
            require: true,
        },
        gender: {
            type: String,
            require: true,
        },
        birthDate: {
            type: String,
            require: true,
        },
        height: {
            type: Number,
            require: true,
        },
        weight: {
            type: Number,
            require: true,
        },
    },
    lastAppointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
    },
    disease: {
        type: String,
        require: true,
    },
    symptoms: {
        type: String,
    },
}, { timestamps: true, })

module.exports = mongoose.model('Case', caseSchema)