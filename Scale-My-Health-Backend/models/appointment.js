const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        require: true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        require: true,
    },
    time: {
        type: String,
        require: true,
    },
    date: {
        type: String,
        require: true,
    },
    appointmentType: {
        type: String,
        require: true,
    },
    consultationCharge: {
        type: Number,
    },
    status: {
        type: String,
        default: 'upcoming',
        enum: ['upcoming', 'completed', 'missed']
    },
    rescheduleAllowed: {
        type: Boolean,
        default: true,
    },
    mustReschedule: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, })

module.exports = mongoose.model('Appointment', appointmentSchema)