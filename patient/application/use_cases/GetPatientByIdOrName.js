class GetPatientByIdOrName {
    constructor(patientRepository) {
      this.patientRepository = patientRepository;
    }
  
    async execute(query) {
      if (query.id) {
        return await this.patientRepository.findById(query.id);
      }
  
      if (query.nombre) {
        return await this.patientRepository.findByName(query.nombre);
      }
  
      throw new Error('Invalid query: must provide id or nombre');
    }
  }
  
  module.exports = GetPatientByIdOrName;
  