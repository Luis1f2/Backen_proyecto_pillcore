const Patient = require('../../domain/entities/Patient');

class AddPatient {
  constructor(patientRepository) {
    this.patientRepository = patientRepository;
  }

  async execute(patientData) {
    const { nombre, edad, direccion, telefono } = patientData;

    if (!nombre || !edad) {
      throw new Error('Missing required fields: nombre and edad');
    }

    const patient = new Patient(null, nombre, edad, direccion, telefono);
    return await this.patientRepository.save(patient);
  }
}

module.exports = AddPatient;
