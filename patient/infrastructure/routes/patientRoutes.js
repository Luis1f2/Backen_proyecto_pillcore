const express = require('express');
const router = express.Router();
const patientController = require('../controller/patientController');

router.post('/add', patientController.addPatient);
router.put('/update/:id', patientController.updatePatient);
router.delete('/delete/:id', patientController.deletePatient);
router.get('/get', patientController.getPatient);

module.exports = router;
