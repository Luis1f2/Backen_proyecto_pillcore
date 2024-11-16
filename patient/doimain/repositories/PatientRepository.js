const db = require('../../infrastructure/database');

class PatientRepository {
  async save(patient) {
    const query = `INSERT INTO Paciente (nombre, edad, direccion, telefono, enfermedades_pers, alergias, grupo_sanguineo, peso, diagnostico_reciente)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      patient.nombre,
      patient.edad,
      patient.direccion,
      patient.telefono,
      patient.enfermedades_pers,
      patient.alergias,
      patient.grupo_sanguineo,
      patient.peso,
      patient.diagnostico_reciente,
    ];
    const [result] = await db.execute(query, values);
    patient.id = result.insertId;
    return patient;
  }

  async update(patientId, patient) {
    const query = `UPDATE Paciente SET nombre = ?, edad = ?, direccion = ?, telefono = ?, enfermedades_pers = ?, alergias = ?, grupo_sanguineo = ?, peso = ?, diagnostico_reciente = ?
                   WHERE id = ?`;
    const values = [
      patient.nombre,
      patient.edad,
      patient.direccion,
      patient.telefono,
      patient.enfermedades_pers,
      patient.alergias,
      patient.grupo_sanguineo,
      patient.peso,
      patient.diagnostico_reciente,
      patientId,
    ];
    await db.execute(query, values);
    return patient;
  }

  async findById(patientId) {
    const query = `SELECT * FROM Paciente WHERE id = ?`;
    const [rows] = await db.execute(query, [patientId]);
    return rows.length > 0 ? rows[0] : null;
  }
}

module.exports = PatientRepository;
