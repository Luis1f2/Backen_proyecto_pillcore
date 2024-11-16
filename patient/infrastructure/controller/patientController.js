const AddPatient = require('../../application/use_cases/AddPatient');
const UpdatePatient = require('../../application/use_cases/UpdatePatient');
const DeletePatient = require('../../application/use_cases/DeletePatient');
const GetPatientByIdOrName = require('../../application/use_cases/GetPatientByIdOrName');
const PatientRepository = require('../../domain/repositories/PatientRepository');

const patientRepository = new PatientRepository();

exports.addPatient = async (req, res) => {
  const addPatient = new AddPatient(patientRepository);
  try {
    const patient = await addPatient.execute(req.body);
    res.status(201).json({ message: 'Patient added successfully', patient });
  } catch (err) {
    res.status(400).json({ message: 'Error adding patient', error: err.message });
  }
};

exports.updatePatient = async (req, res) => {
  const updatePatient = new UpdatePatient(patientRepository);
  try {
    const updatedPatient = await updatePatient.execute(req.params.id, req.body);
    res.status(200).json({ message: 'Patient updated successfully', updatedPatient });
  } catch (err) {
    res.status(404).json({ message: 'Error updating patient', error: err.message });
  }
};

exports.deletePatient = async (req, res) => {
  const deletePatient = new DeletePatient(patientRepository);
  try {
    await deletePatient.execute(req.params.id);
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(404).json({ message: 'Error deleting patient', error: err.message });
  }
};

exports.getPatient = async (req, res) => {
  const getPatientByIdOrName = new GetPatientByIdOrName(patientRepository);
  try {
    const patient = await getPatientByIdOrName.execute(req.query);
    res.status(200).json({ patient });
  } catch (err) {
    res.status(400).json({ message: 'Error fetching patient', error: err.message });
  }
};
