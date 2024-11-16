const express = require('express');
const router = express.Router();
const medicineController = require('../controller/medicineController');

router.post('/add', medicineController.addMedicine);
router.delete('/delete/:id_medicamento_rfid', medicineController.deleteMedicine);
router.get('/get/:id_medicamento_rfid', medicineController.getMedicineByRFID);
router.get('/get-all', medicineController.getAllMedicines);

module.exports = router;
