const db = require('../../infrastructure/database');

class MedicineRepository {
  async save(medicine) {
    const query = `INSERT INTO Medicamento (id_medicamento_rfid, nombre, descripcion) VALUES (?, ?, ?)`;
    const values = [medicine.id_medicamento_rfid, medicine.nombre, medicine.descripcion];
    const [result] = await db.execute(query, values);
    medicine.id = result.insertId;
    return medicine;
  }

  async findByRFID(id_medicamento_rfid) {
    const query = `SELECT * FROM Medicamento WHERE id_medicamento_rfid = ?`;
    const [rows] = await db.execute(query, [id_medicamento_rfid]);
    return rows.length > 0 ? rows[0] : null;
  }

  async findAll() {
    const query = `SELECT * FROM Medicamento`;
    const [rows] = await db.execute(query);
    return rows;
  }

  async delete(id_medicamento_rfid) {
    const query = `DELETE FROM Medicamento WHERE id_medicamento_rfid = ?`;
    await db.execute(query, [id_medicamento_rfid]);
    return true;
  }
}

module.exports = MedicineRepository;
