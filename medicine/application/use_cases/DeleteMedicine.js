class DeleteMedicine {
    constructor(medicineRepository) {
      this.medicineRepository = medicineRepository;
    }
  
    async execute(id_medicamento_rfid) {
      const medicine = await this.medicineRepository.findByRFID(id_medicamento_rfid);
      if (!medicine) {
        throw new Error('Medicine not found');
      }
  
      return await this.medicineRepository.delete(id_medicamento_rfid);
    }
  }
  
  module.exports = DeleteMedicine;
  