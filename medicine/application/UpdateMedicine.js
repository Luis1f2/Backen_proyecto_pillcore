class UpdateMedicine {
    constructor(medicineRepository) {
      this.medicineRepository = medicineRepository;
    }
  
    async execute(id_medicamento_rfid, updateData) {
      const medicine = await this.medicineRepository.findByRFID(id_medicamento_rfid);
      if (!medicine) {
        throw new Error('Medicine not found');
      }
  
      const updatedMedicine = {
        ...medicine,
        ...updateData,
      };
  
      return await this.medicineRepository.update(id_medicamento_rfid, updatedMedicine);
    }
  }
  
  module.exports = UpdateMedicine;
  