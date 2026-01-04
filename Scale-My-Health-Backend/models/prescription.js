const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    dosage: {
        type: String,
    },
    frequency: {
        type: String,
    },
    duration: {
        type: String,
    },
    time: {
        type: String,
    },
}, { timestamps: false, })

const prescriptionSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true,
    },
    caseId: {
        type: String,
        require: true,
    },
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
    prescribeFor: {
        type: String,
        require: true,
    },
    medicine: [medicineSchema],
    dietaryInstructions: [{ type: String }],
    labPrescriptions: [{ title: { type: String }, content: { type: String }, }]
}, { timestamps: true, })

module.exports = mongoose.model('Prescription', prescriptionSchema)