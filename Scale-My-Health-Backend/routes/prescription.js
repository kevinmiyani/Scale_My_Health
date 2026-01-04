const prescriptionController = require("../controllers/prescriptionController");
const express = require('express');

const router = express.Router();

router.get('/', prescriptionController.getAllPrescriptions);
router.get('/case/:id', prescriptionController.getAllPrescriptionsByCase);
router.get('/doctor/:id', prescriptionController.getAllPrescriptionsByDoctor);
router.get('/patient/:id', prescriptionController.getAlPrescriptionsByPatient);
router.get('/:id', prescriptionController.getPrescriptionById);

router.post('/add', prescriptionController.createPrescription);
router.post('/doctor-patient', prescriptionController.getAlPrescriptionsByPatientAndDoctor);

module.exports = router;