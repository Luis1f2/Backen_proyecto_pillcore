const db = require('../../infrastructure/database');

class MedicineRepository {
  async save(medicine) {
    const query = `INSERT INTO Medicamento (id_medicamento_rfid, nombre, descripcion, dosis, frecuencias, notas_adicionales)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
      medicine.id_medicamento_rfid,
      medicine.nombre,
      medicine.descripcion,
      medicine.dosis,
      medicine.frecuencias,
      medicine.notas_adicionales,
    ];
    const [result] = await db.execute(query, values);
    medicine.id = result.insertId;
    return medicine;
  }

  async update(id_medicamento_rfid, medicine) {
    const query = `UPDATE Medicamento SET nombre = ?, descripcion = ?, dosis = ?, frecuencias = ?, notas_adicionales = ?
                   WHERE id_medicamento_rfid = ?`;
    const values = [
      medicine.nombre,
      medicine.descripcion,
      medicine.dosis,
      medicine.frecuencias,
      medicine.notas_adicionales,
      id_medicamento_rfid,
    ];
    await db.execute(query, values);
    return medicine;
  }

  async findByRFID(id_medicamento_rfid) {
    const query = `SELECT * FROM Medicamento WHERE id_medicamento_rfid = ?`;
    const [rows] = await db.execute(query, [id_medicamento_rfid]);
    return rows.length > 0 ? rows[0] : null;
  }
}

module.exports = MedicineRepository;
