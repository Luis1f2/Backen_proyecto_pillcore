const AddPatient = require('../../application/use_cases/AddPatient');
const DeletePatient = require('../../application/use_cases/DeletePatient');
const GetPatientByIdOrName = require('../../application/use_cases/GetPatientByIdOrName');
const UpdatePatient = require('../../application/use_cases/UpdatePatient');
const PatientRepository = require('../../domain/repositories/PatientRepository');
const patientRepository = new PatientRepository();

exports.addPatient = async (req, res) => {
  try {
    const addPatient = new AddPatient(patientRepository);
    const id_paciente = await addPatient.execute(req.body);
    res.status(201).json({ message: 'Paciente creado exitosamente', id_paciente });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el paciente', error: err.message });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const getAllPatients = new GetAllPatients(patientRepository);
    const patients = await getAllPatients.execute();

    if (patients.length === 0) {
      return res.status(404).json({ message: 'No hay pacientes registrados' });
    }

    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los pacientes', error: err.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePatient = new DeletePatient(patientRepository);
    const deleted = await deletePatient.execute(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    res.status(200).json({ message: 'Paciente eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el paciente', error: err.message });
  }
};

exports.getPatientByIdOrName = async (req, res) => {
  try {
    const { id } = req.params;
    const getPatientByIdOrName = new GetPatientByIdOrName(patientRepository);
    const result = await getPatientByIdOrName.execute(id);

    if (!result) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el paciente', error: err.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePatient = new UpdatePatient(patientRepository);
    const updated = await updatePatient.execute(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    res.status(200).json({ message: 'Paciente actualizado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el paciente', error: err.message });
  }
};
