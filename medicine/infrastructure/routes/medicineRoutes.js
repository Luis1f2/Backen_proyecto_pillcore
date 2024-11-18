const express = require('express');
const router = express.Router();
const medicineController = require('../controller/medicineController');

// Crear un medicamento
router.post('/add', medicineController.addMedicine);

// Obtener todos los medicamentos
router.get('/get-all', medicineController.getAllMedicines);

// Obtener un medicamento por ID o RFID
router.get('/get/:id', medicineController.getMedicineByIdOrRFID);

// Obtener un medicamento por RFID
router.get('/get-rfid/:id_medicamento_rfid', medicineController.getMedicineByRFID);

// Actualizar un medicamento
router.put('/update/:id', medicineController.updateMedicine);

// Eliminar un medicamento por ID
router.delete('/delete/:id', medicineController.deleteMedicine);

// Eliminar un medicamento por RFID
router.delete('/delete-rfid/:id_medicamento_rfid', medicineController.deleteMedicineByRFID);

module.exports = router;
