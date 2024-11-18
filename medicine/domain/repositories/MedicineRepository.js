const db = require('../../infrastructure/database');

class MedicineRepository {
  async save(medicine) {
    const query = `
      INSERT INTO Medicamento 
      (id_paciente, id_medicamento_rfid, nombre_medicamento, horario_medicamento, fecha_inicio, fecha_final, dosis, frecuencias, notas_adicionales)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      medicine.id_paciente,
      medicine.id_medicamento_rfid,
      medicine.nombre_medicamento,
      medicine.horario_medicamento,
      medicine.fecha_inicio,
      medicine.fecha_final,
      medicine.dosis,
      medicine.frecuencias,
      medicine.notas_adicionales,
    ];
    const [result] = await db.execute(query, values);
    return result.insertId;
  }

  async findAll() {
    const query = `SELECT * FROM Medicamento`;
    const [rows] = await db.execute(query);
    return rows;
  }

  async findByIdOrRFID(id) {
    const query = `
      SELECT * FROM Medicamento
      WHERE id_medicamento = ? OR id_medicamento_rfid = ?
    `;
    const [rows] = await db.execute(query, [id, id]);
    return rows[0];
  }

  async update(id, medicine) {
    const query = `
      UPDATE Medicamento
      SET id_paciente = ?, id_medicamento_rfid = ?, nombre_medicamento = ?, horario_medicamento = ?, fecha_inicio = ?, fecha_final = ?, dosis = ?, frecuencias = ?, notas_adicionales = ?
      WHERE id_medicamento = ?
    `;
    const values = [
      medicine.id_paciente,
      medicine.id_medicamento_rfid,
      medicine.nombre_medicamento,
      medicine.horario_medicamento,
      medicine.fecha_inicio,
      medicine.fecha_final,
      medicine.dosis,
      medicine.frecuencias,
      medicine.notas_adicionales,
      id,
    ];
    const [result] = await db.execute(query, values);
    return result.affectedRows > 0;
  }

  async delete(id) {
    const query = `DELETE FROM Medicamento WHERE id_medicamento = ?`;
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = MedicineRepository;
