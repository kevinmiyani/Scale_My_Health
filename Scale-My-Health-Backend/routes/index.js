const express = require('express');
const patientRouter = require('./patient');
const doctorRouter = require('./doctor');
const appointmentRouter = require('./appointment');
const prescriptionRouter = require('./prescription');
const caseRouter = require('./case');

const router = express.Router();

router.use('/patient', patientRouter);
router.use('/doctor', doctorRouter);
router.use('/appointment', appointmentRouter);
router.use('/prescription', prescriptionRouter);
router.use('/case', caseRouter);

module.exports = router;