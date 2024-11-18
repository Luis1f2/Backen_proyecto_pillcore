const AddPatient = require('../../application/use_cases/AddPatient');
const DeletePatient = require('../../application/use_cases/DeletePatient');
const GetPatientByIdOrName = require('../../application/use_cases/GetPatientByIdOrName');
const UpdatePatient = require('../../application/use_cases/UpdatePatient');
const GetAllPatients = require('../../application/use_cases/GetAllPatients'); // Estaba faltando
const PatientRepository = require('../../domain/repositories/PatientRepository');

const patientRepository = new PatientRepository();

// Crear un paciente
exports.addPatient = async (req, res) => {
  try {
    const addPatient = new AddPatient(patientRepository);
    const id_paciente = await addPatient.execute(req.body); // Aquí pasa los datos al caso de uso
    res.status(201).json({ message: 'Paciente creado exitosamente', id_paciente });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el paciente', error: err.message });
  }
};

// Obtener todos los pacientes
exports.getAllPatients = async (req, res) => {
  try {
    const getAllPatients = new GetAllPatients(patientRepository);
    const patients = await getAllPatients.execute();

    if (!patients || patients.length === 0) {
      return res.status(404).json({ message: 'No hay pacientes registrados' });
    }

    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los pacientes', error: err.message });
  }
};

// Eliminar un paciente
exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'El ID del paciente es obligatorio' });
    }

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

// Obtener un paciente por ID o nombre
exports.getPatientByIdOrName = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Se requiere un ID o nombre para buscar el paciente' });
    }

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

// Actualizar un paciente
exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'El ID del paciente es obligatorio para actualizar' });
    }

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
