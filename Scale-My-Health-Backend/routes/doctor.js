const doctorController = require("../controllers/doctorController");
const express = require('express');

const router = express.Router();

router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);

router.post('/register', doctorController.createDoctor);
router.post('/login', doctorController.doctorLogin);
router.post('/timeline/:id', doctorController.addNewTimeLine);
router.post('/qualifications/:id', doctorController.addNewQualification);
router.post('/specialities/:id', doctorController.addNewSpeciality);
router.post('/holidays/:id', doctorController.manageHolidays);
router.post('/search', doctorController.doctorSearch);

router.patch('/fcm-update/:id', doctorController.updateFCMToken);
router.patch('/update/:id', doctorController.updateDoctorDetails);
router.patch('/timeline/:id', doctorController.editTimeLine);
router.patch('/qualifications/:id', doctorController.editQualification);
router.patch('/specialities/:id', doctorController.editSpeciality);

router.delete('/timeline/:id', doctorController.removeTimeLine);
router.delete('/qualifications/:id', doctorController.removeQualification);
router.delete('/specialities/:id', doctorController.removeSpeciality);

module.exports = router;