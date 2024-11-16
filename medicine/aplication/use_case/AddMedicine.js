const Medicine = require('../../domain/entities/Medicine');

class AddMedicine {
  constructor(medicineRepository) {
    this.medicineRepository = medicineRepository;
  }

  async execute(medicineData) {
    const { id_medicamento_rfid, nombre, descripcion, dosis, frecuencias, notas_adicionales } = medicineData;

    if (!id_medicamento_rfid || !nombre) {
      throw new Error('Missing required fields: id_medicamento_rfid and nombre');
    }

    const medicine = new Medicine(null, id_medicamento_rfid, nombre, descripcion, dosis, frecuencias, notas_adicionales);
    return await this.medicineRepository.save(medicine);
  }
}

module.exports = AddMedicine;
