const cron = require('node-cron');
const Doctor = require('../models/doctor');

const manageDoctorHolidays = async () => {
    try {
        const now = new Date();
        const today = now.toISOString().split('T')[0];

        const doctors = await Doctor.find();

        for (const doctor of doctors) {
            const updatedHolidays = doctor.holidays.filter(holiday => {
                if (holiday.date) {
                    return holiday.date >= today;
                }
            });

            if (updatedHolidays.length !== doctor.holidays.length) {
                await Doctor.updateOne({ _id: doctor._id }, { holidays: updatedHolidays });
            }
        }

        console.log('-------------------- Doctor Holidays Managed --------------------');
    } catch (error) {
        console.error('Error Doctor Holidays Manage:', error);
    }
};

// Schedule the cron job to run every 24 hours at midnight
cron.schedule('0 0 * * *', manageDoctorHolidays);

module.exports = manageDoctorHolidays;
