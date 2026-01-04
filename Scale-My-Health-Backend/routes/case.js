const caseController = require("../controllers/caseController");
const express = require('express');

const router = express.Router();

router.get('/', caseController.getAllCases);
router.get('/doctor/:id', caseController.getAllCasesByDoctor);
router.get('/patient/:id', caseController.getAllCasesByPatient);
router.get('/:id', caseController.getCaseById);

router.post('/create', caseController.createCase);
router.post('/doctor-patient', caseController.getAllCasesByPatientAndDoctor);

module.exports = router;