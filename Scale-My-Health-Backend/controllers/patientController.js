const Patient = require('../models/patient');
const Case = require('../models/case');
const mongoose = require('mongoose');
const twilio = require('twilio');
require("dotenv").config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const otpStorage = {};

exports.createPatient = async (req, res) => {
    const {
        mobileNo,
        firstName,
        lastName,
        gender,
        aadharNumber,
        birthDate,
        fcmToken,
        lastLogin,
    } = req.body;

    try {
        const data = new Patient({
            mobileNo,
            firstName,
            lastName,
            gender,
            aadharNumber,
            birthDate,
            fcmToken,
            lastLogin,
            role: 'patient',
        });
        const savedPatient = await data.save();
        res.status(200).json({ data: savedPatient, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the patient', status: false, message: 'Failed', });
    }
}

const updateFCMToken = async (id, data) => {
    const {
        fcmToken,
        lastLogin
    } = data;

    await Patient.updateMany({ fcmToken: fcmToken }, { fcmToken: '' });
    return await Patient.updateOne({ _id: id }, { fcmToken, lastLogin }).then(async () => {
        return await Patient.findOne({ _id: id })
    });
}

exports.updateFCMToken = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        fcmToken,
        lastLogin,
    } = req.body;

    try {
        const patient = await updateFCMToken(id, { fcmToken, lastLogin });
        res.status(200).json({ data: patient, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating fcm to patient', status: false, message: 'Failed', });
    }
}

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find().sort({ createdAt: -1 });
        res.status(200).json({ data: patients, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the patients', status: false, message: 'Failed', });
    }
}

exports.getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);
        res.status(200).json({ data: patient, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the patient', status: false, message: 'Failed', });
    }
}

exports.patientLogin = async (req, res) => {
    try {
        const { mobileNo, otp, fcmToken, lastLogin } = req.body;

        const storedData = otpStorage[mobileNo];

        if (!storedData) return res.status(200).json({ data: null, message: 'OTP has expired. Please request a new OTP.', status: false })

        const { otp: storedOtp, expiresAt } = storedData;

        if (Date.now() > expiresAt) {
            delete otpStorage[mobileNo];
            return res.status(200).json({ data: null, message: 'OTP has expired. Please request a new OTP.', status: false })
        }

        if (storedOtp !== parseInt(otp, 10)) return res.status(200).json({ data: null, message: 'Invalid OTP. Please try again.', status: false })

        delete otpStorage[mobileNo];

        const data = await Patient.findOne({ mobileNo }, { _id: 1 });
        if (!data) return res.status(200).json({ data: null, message: 'Success', status: true }); // Patient not found

        const patient = await updateFCMToken(data?._id, { fcmToken, lastLogin });
        res.status(200).json({ data: patient, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the patient', status: false, message: 'Failed', });
    }
}

exports.sendPatientOTP = async (req, res) => {
    try {
        const { mobileNo, hash } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000);

        otpStorage[mobileNo] = { otp, expiresAt: Date.now() + 5.5 * 60 * 1000 };

        await client.messages.create({
            body: `Your verification code for Scale My Health is: ${otp} \nOTP valid until 5 minutes\n#${hash}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: mobileNo
        }).then(() => {
            res.status(200).json({ data: { mobileNo }, message: 'OTP sent successfully', status: true })
        }).catch((err) => {
            res.status(200).json({ data: { mobileNo }, message: err?.message ?? 'Something went wrong, Try again.', status: false });
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the patient', status: false, message: 'Failed' });
    }
}

exports.getAllPatientByDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctorId = new mongoose.Types.ObjectId(id);
        const patients = await Case.aggregate([
            { $match: { doctor: doctorId } },
            {
                $lookup: {
                    from: 'patients',
                    localField: 'patient._id',
                    foreignField: '_id',
                    as: 'patientData'
                }
            },
            { $unwind: '$patientData' },
            {
                $group: {
                    _id: '$patient.fullName',
                    gender: { $first: '$patient.gender' },
                    birthDate: { $first: '$patient.birthDate' },
                    patient: { $first: '$patientData' }
                }
            },
            {
                $set: { 'patient.fullName': '$_id', 'patient.birthDate': '$birthDate', 'patient.gender': '$gender' }
            },
            {
                $replaceRoot: { newRoot: '$patient' }
            },
            {
                $sort: { fullName: 1, }
            },
        ]);
        res.status(200).json({ data: patients, message: 'Success', status: true })
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: 'An error occurred while fetching the appointments', status: false, message: 'Failed', });
    }
}