const Prescription = require('../models/prescription');
const Case = require('../models/case');
const Doctor = require('../models/doctor');
const { sendPushNotification } = require('../notification/notification');

exports.createPrescription = async (req, res) => {
    const {
        caseId,
        doctor,
        patient,
        medicine,
        dietaryInstructions,
        labPrescriptions,
    } = req.body;

    const _id = generateId();

    try {
        const caseData = await Case.findById(caseId, { 'patient.fullName': 1, _id: 0, });

        const data = new Prescription({
            _id,
            caseId,
            doctor,
            patient,
            prescribeFor: caseData?.patient?.fullName ?? 'Unknown',
            medicine,
            dietaryInstructions,
            labPrescriptions,
        });

        const savedPrescription = await data.save();

        await newPrescriptionAlert({
            patient: patient,
            doctor: doctor,
            caseData: caseData
        });

        res.status(200).json({ data: savedPrescription, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the Prescription', status: false, message: 'Failed', });
    }
}

const newPrescriptionAlert = async ({ doctor, caseData, patient }) => {
    const doctorInfo = await Doctor.findById(doctor);

    const firstName = doctorInfo?.firstName;
    const lastName = doctorInfo?.lastName;
    const doctorName = (firstName?.trim() || lastName?.trim()) ? 'Dr. ' + firstName.trim() + ' ' + lastName.trim() : 'Scale My Health';
    const patientName = caseData?.patient?.fullName ? ` ${caseData?.patient?.fullName}` : '';

    const notificationTitle = `💊 New Prescription from ${doctorName}`;
    const notificationBody = `Hi${patientName}, ${doctorName} has issued a new prescription for you. Tap to view it now.`;

    await sendPushNotification(patient, {}, notificationTitle, notificationBody);

}

const generateId = () => {
    const prefix = "SMH";
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `${prefix}-${randomNumber}`;
}

exports.getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find().sort({ createdAt: -1 });
        res.status(200).json({ data: prescriptions, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Prescriptions', status: false, message: 'Failed', });
    }
}

exports.getPrescriptionById = async (req, res) => {
    try {
        const { id } = req.params;
        const prescription = await Prescription.findById(id);
        res.status(200).json({ data: prescription, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the doctor', status: false, message: 'Failed', });
    }
}

exports.getAllPrescriptionsByCase = async (req, res) => {
    try {
        const { id } = req.params;
        const prescriptions = await Prescription.find({ caseId: id }).sort({ createdAt: -1 }).populate('patient').populate('doctor', ['_id', 'firstName', 'lastName', 'speciality', 'designation', 'image']);
        res.status(200).json({ data: prescriptions, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the prescriptions', status: false, message: 'Failed', });
    }
}

exports.getAllPrescriptionsByDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const prescriptions = await Prescription.find({ doctor: id }).sort({ createdAt: -1 }).populate('patient').populate('doctor', ['_id', 'firstName', 'lastName', 'speciality', 'designation', 'image']);
        res.status(200).json({ data: prescriptions, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the prescriptions', status: false, message: 'Failed', });
    }
}

exports.getAlPrescriptionsByPatient = async (req, res) => {
    try {
        const { id } = req.params;
        const prescriptions = await Prescription.find({ patient: id }).sort({ createdAt: -1 }).populate('doctor', ['_id', 'firstName', 'lastName', 'speciality', 'designation', 'image']);
        res.status(200).json({ data: prescriptions, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the prescriptions', status: false, message: 'Failed', });
    }
}

exports.getAlPrescriptionsByPatientAndDoctor = async (req, res) => {
    try {
        const { doctor, patient, patientName } = req.body;
        const prescriptions = await Prescription.find({ patient, doctor, prescribeFor: patientName, }).sort({ createdAt: -1 }).populate('patient').populate('doctor', ['_id', 'firstName', 'lastName', 'speciality', 'designation', 'image']);
        res.status(200).json({ data: prescriptions, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the prescriptions', status: false, message: 'Failed', });
    }
}