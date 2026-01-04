const Case = require('../models/case');
const mongoose = require('mongoose');

exports.createCase = async (req, res) => {
    const {
        doctor,
        patient,
        lastAppointment,
        disease,
        symptoms,
    } = req.body;

    const _id = generateId();

    try {
        const data = new Case({
            _id,
            doctor,
            patient,
            lastAppointment,
            disease,
            symptoms,
        });
        const savedCase = await data.save().then(async () => {
            return await Case.findOne({ _id: _id }).populate('lastAppointment').populate('doctor', ['_id', 'firstName', 'lastName', 'speciality', 'designation', 'image']);
        });
        res.status(200).json({ data: savedCase, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the cases', status: false, message: 'Failed', });
    }
}

const generateId = () => {
    const randomNumber = Math.floor(1000000 + Math.random() * 900000);
    return `${randomNumber}`;
}

exports.getAllCases = async (req, res) => {
    try {
        const cases = await Case.find().sort({ updatedAt: -1 });
        res.status(200).json({ data: cases, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the cases', status: false, message: 'Failed', });
    }
}

exports.getCaseById = async (req, res) => {
    try {
        const { id } = req.params;
        const cases = await Case.findById(id).populate('lastAppointment').populate('doctor', ['_id', 'firstName', 'lastName', 'speciality', 'designation', 'image']);
        res.status(200).json({ data: cases, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the cases', status: false, message: 'Failed', });
    }
}

exports.getAllCasesByDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const cases = await Case.find({ doctor: id }).sort({ updatedAt: -1 }).populate('lastAppointment').populate('doctor', ['_id', 'firstName', 'lastName', 'speciality', 'designation', 'image']);
        res.status(200).json({ data: cases, message: 'Success', status: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while fetching the cases', status: false, message: 'Failed', });
    }
}

exports.getAllCasesByPatient = async (req, res) => {
    try {
        const { id } = req.params;
        const cases = await Case.find({ 'patient._id': id }).sort({ updatedAt: -1 }).populate('lastAppointment').populate('doctor', ['_id', 'firstName', 'lastName', 'speciality', 'designation', 'image']);
        res.status(200).json({ data: cases, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the cases', status: false, message: 'Failed', });
    }
}

exports.getAllCasesByPatientAndDoctor = async (req, res) => {
    try {
        const { doctor, patient, patientName } = req.body;
        const dId = new mongoose.Types.ObjectId(doctor);
        const pId = new mongoose.Types.ObjectId(patient);
        const condition = patientName ? { 'patient._id': pId, 'patient.fullName': patientName, doctor: dId } : { 'patient._id': pId, doctor: dId };
        const cases = await Case.find(condition).sort({ updatedAt: -1 }).populate('lastAppointment').populate('doctor', ['_id', 'firstName', 'lastName', 'speciality', 'designation', 'image']);
        res.status(200).json({ data: cases, message: "Success", status: true });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the cases", status: false, message: "Failed" });
    }
};