class PatientServices {
    constructor(patientRepository) {
      this.patientRepository = patientRepository;
    }
  
    async registerPatient(patientData) {
      if (!patientData.nombre || !patientData.edad) {
        throw new Error('Nombre y edad son obligatorios');
      }
  
      return await this.patientRepository.save(patientData);
    }
  
    async updatePatient(patientId, updateData) {
      const patient = await this.patientRepository.findById(patientId);
      if (!patient) {
        throw new Error('Paciente no encontrado');
      }
  
      return await this.patientRepository.update(patientId, updateData);
    }
  
    async deletePatient(patientId) {
      const patient = await this.patientRepository.findById(patientId);
      if (!patient) {
        throw new Error('Paciente no encontrado');
      }
  
      return await this.patientRepository.delete(patientId);
    }
  
    async getPatient(query) {
      if (query.id) {
        return await this.patientRepository.findById(query.id);
      }
  
      if (query.nombre) {
        return await this.patientRepository.findByName(query.nombre);
      }
  
      throw new Error('Consulta inválida: proporcione id o nombre');
    }
  }
  
  module.exports = PatientServices;
  