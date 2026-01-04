const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');
const mongoose = require('mongoose');
const moment = require('moment');
const { sendPushNotification } = require('../notification/notification');

exports.createAppointment = async (req, res) => {
    const {
        doctor,
        patient,
        time,
        date,
        appointmentType,
        consultationCharge,
    } = req.body;

    try {
        const data = new Appointment({
            doctor,
            patient,
            time,
            date,
            appointmentType,
            consultationCharge,
        });
        const savedAppointment = await data.save();

        res.status(200).json({ data: savedAppointment, message: 'Success', status: true });

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the appointment', status: false, message: 'Failed', });
    }
}

exports.rescheduleAppointment = async (req, res) => {
    const {
        id,
    } = req.params;

    const {
        time,
        date,
        appointmentType,
    } = req.body;

    try {
        const data = await Appointment.findOneAndUpdate({ _id: id, rescheduleAllowed: true }, { time: time, date: date, status: "upcoming", appointmentType: appointmentType, mustReschedule: false }, { new: true })
        res.status(200).json({ data: data, message: 'Success', status: true });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while reschedule the appointment', status: false, message: 'Failed', });
    }
}

exports.manageHolidayScheduleAppointment = async ({ id, holidays, req }) => {
    try {
        const dates = holidays?.length > 0 ? holidays?.map((date) => { if (date?.date) return date?.date }) : [];

        const condition = {
            doctor: id,
            status: 'upcoming',
            mustReschedule: false,
            date: { $in: dates }
        }

        const reverseCondition = {
            doctor: id,
            status: 'upcoming',
            mustReschedule: true,
            date: { $nin: dates }
        }

        const appointments = await Appointment.find(condition).populate('doctor', ['firstName', 'lastName']);

        await Appointment.updateMany(reverseCondition, { $set: { mustReschedule: false } });

        if (appointments?.length > 0) {
            await Appointment.updateMany(condition, { $set: { mustReschedule: true } });
            appointments.map(async (appointment) => {
                const patient = appointment?.patient;
                const date = appointment?.date;
                const formattedDate = moment(date).format('MMMM D, YYYY');
                const doctorName = (appointment?.doctor?.firstName?.trim() || appointment?.doctor?.lastName?.trim()) ? 'Dr. ' + appointment?.doctor?.firstName.trim() + ' ' + appointment?.doctor?.lastName.trim() : 'Scale My Health';
                const title = `${doctorName} Unavailable on ${formattedDate}`;
                const body = `Your appointment with ${doctorName} on ${formattedDate}, at ${appointment?.time} cannot proceed as scheduled due to the doctor's unavailability. Please reschedule at your convenience.`
                await sendPushNotification(patient, {}, title, body);
            })
        }

        req.io.emit('doctor-holidays-update', {});
    } catch (error) {
        console.log(error);
    }
}

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.status(200).json({ data: appointments, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the appointments', status: false, message: 'Failed', });
    }
}

exports.getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id).populate('patient').populate('doctor', ['_id', 'firstName', 'lastName', 'speciality', 'designation', 'image']);
        res.status(200).json({ data: appointment, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the appointment', status: false, message: 'Failed', });
    }
}

exports.getAllAppointmentsByDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const appointments = await Appointment.find({ doctor: id }).sort({ createdAt: -1 }).populate('patient').populate('doctor', ['_id', 'firstName', 'lastName', 'speciality', 'designation', 'image']);
        res.status(200).json({ data: appointments, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the appointments', status: false, message: 'Failed', });
    }
}

exports.getAllAppointmentsBaseOnDateByDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { date } = req.body;
        const appointments = await Appointment.find({ doctor: id, date }).sort({ time: -1 }).populate('patient').populate('doctor', ['_id', 'firstName', 'lastName', 'speciality', 'designation', 'image']);
        res.status(200).json({ data: appointments, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the appointments', status: false, message: 'Failed', });
    }
}

exports.getAllAppointmentsByPatient = async (req, res) => {
    try {
        const { id } = req.params;
        const appointments = await Appointment.find({ patient: id }).sort({ date: -1, time: -1 }).populate('doctor', ['_id', 'firstName', 'lastName', 'speciality', 'designation', 'image']);
        res.status(200).json({ data: appointments, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the appointments', status: false, message: 'Failed', });
    }
}

exports.getAllAppointmentsBaseOnStatusByPatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const appointments = await Appointment.find({ patient: id, status: status ?? 'upcoming', }).sort({ date: -1, time: -1 }).populate('doctor', ['_id', 'firstName', 'lastName', 'speciality', 'designation', 'image']);
        res.status(200).json({ data: appointments, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the appointments', status: false, message: 'Failed', });
    }
}

exports.completeAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.updateOne({ _id: id, status: 'upcoming', }, { $set: { status: 'completed', rescheduleAllowed: false } }).then(async () => {
            return await Appointment.findById(id).populate('doctor', ['_id', 'firstName', 'lastName', 'speciality', 'designation', 'image']);
        });
        res.status(200).json({ data: appointment, message: 'Success', status: true })
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the appointments', status: false, message: 'Failed', });
    }
}

exports.disableReschedule = async (id) => {
    try {
        await Appointment.updateOne({ _id: id, rescheduleAllowed: true }, { $set: { rescheduleAllowed: false } });
    } catch (error) {
        console.log(error);
    }
}

exports.getAllAppointmentByPatientAndDoctor = async (req, res) => {
    try {
        const { doctor, patient } = req.body;

        const dId = new mongoose.Types.ObjectId(doctor);
        const pId = new mongoose.Types.ObjectId(patient);

        const appointments = await Appointment.find({ patient: pId, doctor: dId }).sort({ date: -1, time: -1 }).populate('doctor', ['_id', 'firstName', 'lastName', 'speciality', 'designation', 'image']);
        res.status(200).json({ data: appointments, message: "Success", status: true });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the appointments", status: false, message: "Failed" });
    }
};

exports.getAppointmentTimeSlotForPatient = async (req, res) => {
    try {
        const { currentTime, date, doctor } = req.body;

        const doctorData = await Doctor.findById(doctor, { timeLines: 1, averageConsultationTime: 1, holidays: 1, });


        const holidays = doctorData?.holidays;

        const findInHoliday = holidays.find((day) => day.date === date);

        // Doctor's Holidays
        if (findInHoliday && !findInHoliday?.time?.from) return res.status(200).json({ data: [], message: "Success", status: true });

        const appointments = await Appointment.find({ doctor: doctor, date: date, status: 'upcoming' }, { time: 1, _id: 0 });

        const bookedAppointments = appointments.map((appointment) => appointmentTimeSeparator(appointment.time));

        // Check For Doctor's Half Days
        const times = findInHoliday?.time?.from ? [findInHoliday?.time] : doctorData?.timeLines;

        const timeSlots = generateTimeLineSlots(times, doctorData?.averageConsultationTime, currentTime);

        const availableTimeSlots = timeSlots.map((time) => {
            if (bookedAppointments.some(appointment => timeBetween(appointment, time?.time?.from, time?.time?.to))) return { time: `${time?.time?.from} - ${time?.time?.to}`, isBooked: true }
            return { time: `${time?.time?.from} - ${time?.time?.to}`, isBooked: false };
        });

        res.status(200).json({ data: availableTimeSlots, message: "Success", status: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching the appointments", status: false, message: "Failed" });
    }
};

// Helper Functions for timeslot
const generateTimeLineSlots = (timelines = [], averageConsultationTime, currentTime) => {
    if (typeof averageConsultationTime != 'number') return [];

    const newTimeLine = timelines.map((time) => {
        const from = moment(time.from, ['hh:mm A']).format('HH:mm')
        const to = moment(time.to, ['hh:mm A']).format('HH:mm');
        return { from, to }
    })

    let slots = new Set();

    newTimeLine.forEach((time) => {
        generateTimeSlots(time, averageConsultationTime, currentTime).forEach(slot => {
            slots.add(JSON.stringify(slot));
        });
    });

    let uniqueSlots = Array.from(slots).map(slot => JSON.parse(slot));

    uniqueSlots.sort((a, b) => a.from - b.from);

    const formattedSlot = uniqueSlots.map((slot) => {
        return {
            time: {
                from: moment(new Date(slot?.from), ['HH:mm']).format('hh:mm A'),
                to: moment(new Date(slot?.to), ['HH:mm']).format('hh:mm A'),
            },
            isBooked: false,
        }
    })

    return formattedSlot;
}

const generateTimeSlots = (workingHours, duration, after) => {
    let slots = [];
    let currentTime = new Date(`1970-01-01T${workingHours.from}:00`);
    let endTimeObj = new Date(`1970-01-01T${workingHours.to}:00`);
    const afterTime = after == null ? null : new Date(`1970-01-01T${moment(after, 'hh:mm A').format('HH:mm')}:00`);
    let nextTime = new Date(currentTime.getTime() + duration * 60 * 1000);

    while (nextTime <= endTimeObj) {
        if (afterTime == null || moment(currentTime).isAfter(moment(afterTime))) slots.push({ from: currentTime, to: nextTime });
        currentTime = nextTime;
        nextTime = new Date(currentTime.getTime() + duration * 60 * 1000);
    }

    return slots;
}

const appointmentTimeSeparator = (time) => {
    const appointmentTimes = time?.split(' - ');
    return {
        from: new Date(moment(appointmentTimes[0], 'hh:mm A')),
        to: new Date(moment(appointmentTimes[1], 'hh:mm A')),
    }
}

const timeBetween = (appointmentTime, from, to) => moment(new Date(moment(from, 'hh:mm A'))).isSameOrAfter(moment(appointmentTime?.from)) && moment(new Date(moment(to, 'hh:mm A'))).isSameOrBefore(moment(appointmentTime?.to))