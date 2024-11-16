const db = require('../../infrastructure/database');

class PatientRepository {
  async save(patient) {
    const query = `INSERT INTO Paciente (nombre, edad, direccion, telefono) VALUES (?, ?, ?, ?)`;
    const values = [patient.nombre, patient.edad, patient.direccion, patient.telefono];
    const [result] = await db.execute(query, values);
    patient.id = result.insertId;
    return patient;
  }

  async findById(patientId) {
    const query = `SELECT * FROM Paciente WHERE id = ?`;
    const [rows] = await db.execute(query, [patientId]);
    return rows.length > 0 ? rows[0] : null;
  }

  async findByName(nombre) {
    const query = `SELECT * FROM Paciente WHERE nombre LIKE ?`;
    const [rows] = await db.execute(query, [`%${nombre}%`]);
    return rows;
  }

  async update(patientId, patient) {
    const query = `UPDATE Paciente SET nombre = ?, edad = ?, direccion = ?, telefono = ? WHERE id = ?`;
    const values = [patient.nombre, patient.edad, patient.direccion, patient.telefono, patientId];
    await db.execute(query, values);
    return patient;
  }

  async delete(patientId) {
    const query = `DELETE FROM Paciente WHERE id = ?`;
    await db.execute(query, [patientId]);
    return true;
  }
}

module.exports = PatientRepository;
