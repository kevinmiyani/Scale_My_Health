const appointmentController = require("../controllers/appointmentController");
const express = require('express');

const router = express.Router();

router.get('/', appointmentController.getAllAppointments);
router.get('/doctor/:id', appointmentController.getAllAppointmentsByDoctor);
router.get('/patient/:id', appointmentController.getAllAppointmentsByPatient);
router.get('/:id', appointmentController.getAppointmentById);

router.post('/create', appointmentController.createAppointment);
router.post('/time-slot', appointmentController.getAppointmentTimeSlotForPatient);
router.post('/doctor-patient', appointmentController.getAllAppointmentByPatientAndDoctor);
router.post('/doctor/:id', appointmentController.getAllAppointmentsBaseOnDateByDoctor);
router.post('/patient/:id', appointmentController.getAllAppointmentsBaseOnStatusByPatient);

router.patch('/complete/:id', appointmentController.completeAppointment);
router.patch('/reschedule/:id', appointmentController.rescheduleAppointment);

module.exports = router;