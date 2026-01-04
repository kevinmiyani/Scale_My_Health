const Doctor = require('../models/doctor');
const { manageHolidayScheduleAppointment } = require('./appointmentController');

exports.createDoctor = async (req, res) => {
    const {
        username,
        password,
        firstName,
        lastName,
        speciality,
        image,
        intro,
        fcmToken,
        lastLogin,
        designation,
        longDesignation,
        mobileNo,
        email,
    } = req.body;

    try {
        const data = new Doctor({
            username,
            password,
            firstName,
            lastName,
            speciality,
            image,
            intro,
            fcmToken,
            lastLogin,
            designation,
            longDesignation,
            mobileNo,
            email,
            role: 'doctor',
        });
        const savedDoctor = await data.save();
        res.status(200).json({ data: savedDoctor, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the Doctor', status: false, message: 'Failed', });
    }
}

const updateFCMToken = async (id, data) => {
    const {
        fcmToken,
        lastLogin
    } = data;

    await Doctor.updateMany({ fcmToken: fcmToken }, { fcmToken: '' });
    return await Doctor.findOneAndUpdate({ _id: id }, { fcmToken, lastLogin }, { new: true });
}

exports.updateFCMToken = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        fcmToken,
        lastLogin
    } = req.body;

    try {
        const doctor = await updateFCMToken(id, { fcmToken, lastLogin });
        res.status(200).json({ data: doctor, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating fcm to doctor', status: false, message: 'Failed', });
    }
}

exports.updateDoctorDetails = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const doctor = await Doctor.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.status(200).json({ data: doctor, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating fcm to doctor', status: false, message: 'Failed', });
    }
}

exports.getAllDoctors = async (req, res) => {
    try {
        const Doctors = await Doctor.find().sort({ createdAt: -1 });

        res.status(200).json({ data: Doctors, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Doctors', status: false, message: 'Failed', });
    }
}

exports.getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findById(id);
        res.status(200).json({ data: doctor, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the doctor', status: false, message: 'Failed', });
    }
}

exports.doctorSearch = async (req, res) => {
    try {
        const { search } = req.body;

        const doctors = await Doctor.find({
            $or: [
                { speciality: { $regex: search, $options: 'i' } },
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                {
                    $expr: {
                        $regexMatch: {
                            input: { $concat: ["dr ", "$firstName", " ", "$lastName"] },
                            regex: search,
                            options: "i"
                        }
                    }
                }
            ]
        });

        res.status(200).json({ data: doctors, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while searching the doctor', status: false, message: 'Failed', });
    }
}

exports.doctorLogin = async (req, res) => {
    try {
        const { username, password, fcmToken, lastLogin } = req.body;
        const data = await Doctor.findOne({ username, password }, { _id: 1 });
        if (!data) return res.status(200).json({ data: null, message: 'Success', status: true }); // Doctor not found

        const doctor = await updateFCMToken(data?._id, { fcmToken, lastLogin });
        res.status(200).json({ data: doctor, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while doctor login', status: false, message: 'Failed', });
    }
}

exports.addNewTimeLine = async (req, res) => {
    try {
        const { id } = req.params;
        const { from, to } = req.body;

        const doctor = await Doctor.findOneAndUpdate({ _id: id }, {
            $addToSet: {
                timeLines: { from, to }
            }
        }, { new: true });

        res.status(200).json({ data: doctor, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while add new timeLine', status: false, message: 'Failed', });
    }
}

exports.editTimeLine = async (req, res) => {
    try {
        const { id } = req.params;
        const { from, to, _id } = req.body;

        const doctor = await Doctor.findOneAndUpdate({ _id: id, 'timeLines._id': _id },
            {
                $set: {
                    'timeLines.$.from': from,
                    'timeLines.$.to': to
                }
            }, { new: true });

        res.status(200).json({ data: doctor, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while edit timeLine', status: false, message: 'Failed', });
    }
}

exports.removeTimeLine = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id } = req.body;

        const doctor = await Doctor.findOneAndUpdate({ _id: id, }, {
            $pull: { timeLines: { _id } }
        }, { new: true });

        res.status(200).json({ data: doctor, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while remove timeLine', status: false, message: 'Failed', });
    }
}

exports.addNewQualification = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, details } = req.body;

        const doctor = await Doctor.findOneAndUpdate({ _id: id }, {
            $addToSet: {
                qualifications: { type, details }
            }
        }, { new: true });

        res.status(200).json({ data: doctor, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while add new qualification', status: false, message: 'Failed', });
    }
}

exports.editQualification = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, details, _id } = req.body;

        const doctor = await Doctor.findOneAndUpdate({ _id: id, 'qualifications._id': _id },
            {
                $set: {
                    'qualifications.$.type': type,
                    'qualifications.$.details': details
                }
            }, { new: true });

        res.status(200).json({ data: doctor, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while edit qualification', status: false, message: 'Failed', });
    }
}

exports.removeQualification = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id } = req.body;

        const doctor = await Doctor.findOneAndUpdate({ _id: id, }, {
            $pull: { qualifications: { _id } }
        }, { new: true });

        res.status(200).json({ data: doctor, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while remove qualification', status: false, message: 'Failed', });
    }
}

exports.addNewSpeciality = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, details } = req.body;

        const doctor = await Doctor.findOneAndUpdate({ _id: id }, {
            $addToSet: {
                specialities: { type, details }
            }
        }, { new: true });

        res.status(200).json({ data: doctor, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while add new speciality', status: false, message: 'Failed', });
    }
}

exports.editSpeciality = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, details, _id } = req.body;

        const doctor = await Doctor.findOneAndUpdate({ _id: id, 'specialities._id': _id },
            {
                $set: {
                    'specialities.$.type': type,
                    'specialities.$.details': details
                }
            }, { new: true });

        res.status(200).json({ data: doctor, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while edit speciality', status: false, message: 'Failed', });
    }
}

exports.removeSpeciality = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id } = req.body;

        const doctor = await Doctor.findOneAndUpdate({ _id: id, }, {
            $pull: { specialities: { _id } }
        }, { new: true });

        res.status(200).json({ data: doctor, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while remove speciality', status: false, message: 'Failed', });
    }
}

exports.manageHolidays = async (req, res) => {
    try {
        const { id } = req.params;
        const { holidays } = req.body;

        const doctor = await Doctor.findOneAndUpdate({ _id: id }, { $set: { holidays: holidays, } }, { new: true });

        await manageHolidayScheduleAppointment({ id: id, holidays: holidays, req: req });

        res.status(200).json({ data: doctor, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while manage holidays', status: false, message: 'Failed', });
    }
}
