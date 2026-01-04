const cron = require('node-cron');
const Appointment = require('../models/appointment');

const completeAppointments = async () => {
    try {
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        const currentTime = now.getHours() * 60 + now.getMinutes();

        await Appointment.updateMany({ date: { $lt: today }, status: 'upcoming' }, { $set: { status: 'missed' } });

        const appointments = await Appointment.find({ date: today, status: 'upcoming' });

        appointments.map(async (appointment) => {
            const [startTime, endTime] = appointment.time.split(' - ').map(t => {
                let [hour, minute] = t.replace(' AM', '').replace(' PM', '').split(':').map(Number);
                if (t.includes('PM') && hour !== 12) hour += 12;
                if (t.includes('AM') && hour === 12) hour = 0;
                return hour * 60 + minute;
            });
            if (currentTime >= endTime) await Appointment.updateOne({ _id: appointment._id }, { status: 'missed' });
        })

        console.log('-------------------- Auto Missed Appointments --------------------');
    } catch (error) {
        console.error('Error Auto Complete Appointments:', error);
    }
};

// Schedule the cron job to run every 15 minutes
cron.schedule('*/15 * * * *', completeAppointments);

module.exports = completeAppointments;
