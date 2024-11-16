const AddMedicine = require('../../application/use_cases/AddMedicine');
const DeleteMedicine = require('../../application/use_cases/DeleteMedicine');
const GetMedicineByRFID = require('../../application/use_cases/GetMedicineByRFID');
const GetAllMedicines = require('../../application/use_cases/GetAllMedicines');
const MedicineRepository = require('../../domain/repositories/MedicineRepository');

const medicineRepository = new MedicineRepository();

exports.addMedicine = async (req, res) => {
  const addMedicine = new AddMedicine(medicineRepository);
  try {
    const medicine = await addMedicine.execute(req.body);
    res.status(201).json({ message: 'Medicine added successfully', medicine });
  } catch (err) {
    res.status(400).json({ message: 'Error adding medicine', error: err.message });
  }
};

exports.deleteMedicine = async (req, res) => {
  const deleteMedicine = new DeleteMedicine(medicineRepository);
  try {
    await deleteMedicine.execute(req.params.id_medicamento_rfid);
    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (err) {
    res.status(404).json({ message: 'Error deleting medicine', error: err.message });
  }
};

exports.getMedicineByRFID = async (req, res) => {
  const getMedicineByRFID = new GetMedicineByRFID(medicineRepository);
  try {
    const medicine = await getMedicineByRFID.execute(req.params.id_medicamento_rfid);
    res.status(200).json({ medicine });
  } catch (err) {
    res.status(404).json({ message: 'Error fetching medicine', error: err.message });
  }
};

exports.getAllMedicines = async (req, res) => {
  const getAllMedicines = new GetAllMedicines(medicineRepository);
  try {
    const medicines = await getAllMedicines.execute();
    res.status(200).json({ medicines });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching medicines', error: err.message });
  }
};
