class UpdatePatient {
    constructor(patientRepository) {
      this.patientRepository = patientRepository;
    }
  
    async execute(patientId, updateData) {
      const patient = await this.patientRepository.findById(patientId);
      if (!patient) {
        throw new Error('Patient not found');
      }
  
      const updatedPatient = {
        ...patient,
        ...updateData,
      };
  
      return await this.patientRepository.update(patientId, updatedPatient);
    }
  }
  
  module.exports = UpdatePatient;
  