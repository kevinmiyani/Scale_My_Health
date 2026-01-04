const patientController = require("../controllers/patientController");
const express = require('express');

const router = express.Router();

router.get('/', patientController.getAllPatients);
router.get('/for-doctor/:id', patientController.getAllPatientByDoctor);
router.get('/:id', patientController.getPatientById);

router.post('/register', patientController.createPatient);
router.post('/send-otp', patientController.sendPatientOTP);
router.post('/login', patientController.patientLogin);

router.patch('/fcm-update/:id', patientController.updateFCMToken);

module.exports = router;