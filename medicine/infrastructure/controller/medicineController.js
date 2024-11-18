const AddMedicine = require('../../application/use_cases/AddMedicine');
const GetAllMedicines = require('../../application/use_cases/GetAllMedicines');
const GetMedicineByRFID = require('../../application/use_cases/GetMedicineByRFID');
const UpdateMedicine = require('../../application/use_cases/UpdateMedicine');
const DeleteMedicine = require('../../application/use_cases/DeleteMedicine');
const MedicineRepository = require('../../domain/repositories/MedicineRepository');

const medicineRepository = new MedicineRepository();

// Crear un medicamento
exports.addMedicine = async (req, res) => {
  try {
    const addMedicine = new AddMedicine(medicineRepository);
    const id_medicamento = await addMedicine.execute(req.body);
    res.status(201).json({ message: 'Medicamento creado exitosamente', id_medicamento });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el medicamento', error: err.message });
  }
};

// Obtener todos los medicamentos
exports.getAllMedicines = async (req, res) => {
  try {
    const getAllMedicines = new GetAllMedicines(medicineRepository);
    const medicines = await getAllMedicines.execute();
    res.status(200).json(medicines);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los medicamentos', error: err.message });
  }
};

// Obtener un medicamento por ID o RFID
exports.getMedicineByIdOrRFID = async (req, res) => {
  try {
    const { id } = req.params;
    const getMedicineByRFID = new GetMedicineByRFID(medicineRepository);
    const medicine = await getMedicineByRFID.execute(id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicamento no encontrado' });
    }

    res.status(200).json(medicine);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el medicamento', error: err.message });
  }
};

// Obtener un medicamento por RFID únicamente
exports.getMedicineByRFID = async (req, res) => {
  try {
    const { id_medicamento_rfid } = req.params;
    const getMedicineByRFID = new GetMedicineByRFID(medicineRepository);
    const medicine = await getMedicineByRFID.execute(id_medicamento_rfid);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicamento no encontrado' });
    }

    res.status(200).json(medicine);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el medicamento por RFID', error: err.message });
  }
};

// Actualizar un medicamento
exports.updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const updateMedicine = new UpdateMedicine(medicineRepository);
    const updated = await updateMedicine.execute(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: 'Medicamento no encontrado' });
    }

    res.status(200).json({ message: 'Medicamento actualizado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el medicamento', error: err.message });
  }
};

// Eliminar un medicamento por ID
exports.deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMedicine = new DeleteMedicine(medicineRepository);
    const deleted = await deleteMedicine.execute(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Medicamento no encontrado' });
    }

    res.status(200).json({ message: 'Medicamento eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el medicamento', error: err.message });
  }
};

// Eliminar un medicamento por RFID
exports.deleteMedicineByRFID = async (req, res) => {
  try {
    const { id_medicamento_rfid } = req.params;
    const deleteMedicine = new DeleteMedicine(medicineRepository);
    const deleted = await deleteMedicine.execute(id_medicamento_rfid);

    if (!deleted) {
      return res.status(404).json({ message: 'Medicamento no encontrado' });
    }

    res.status(200).json({ message: 'Medicamento eliminado exitosamente por RFID' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el medicamento por RFID', error: err.message });
  }
};
