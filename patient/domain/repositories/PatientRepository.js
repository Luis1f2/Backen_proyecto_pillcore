const db = require('../../infrastructure/database');

class PatientRepository {
 
  async save(patient) {
    const query = `INSERT INTO Paciente (nombre_completo, genero, edad, direccion, telefono, condicion, enfermedades_pers, alergias, grupo_sanguineo, peso, diagnostico_reciente)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      patient.nombre_completo,
      patient.genero,
      patient.edad,
      patient.direccion,
      patient.telefono,
      patient.condicion,
      patient.enfermedades_pers,
      patient.alergias,
      patient.grupo_sanguineo,
      patient.peso,
      patient.diagnostico_reciente,
    ];
    const [result] = await db.execute(query, values);
    patient.id_paciente = result.insertId;
    return patient;
  }

  
  async update(patientId, patient) {
    const query = `UPDATE Paciente SET nombre_completo = ?, genero = ?, edad = ?, direccion = ?, telefono = ?, condicion = ?, enfermedades_pers = ?, alergias = ?, grupo_sanguineo = ?, peso = ?, diagnostico_reciente = ?
                   WHERE id_paciente = ?`;
    const values = [
      patient.nombre_completo,
      patient.genero,
      patient.edad,
      patient.direccion,
      patient.telefono,
      patient.condicion,
      patient.enfermedades_pers,
      patient.alergias,
      patient.grupo_sanguineo,
      patient.peso,
      patient.diagnostico_reciente,
      patientId,
    ];
    const [result] = await db.execute(query, values);
    return result.affectedRows > 0;
  }

  
  async findById(patientId) {
    const query = `SELECT * FROM Paciente WHERE id_paciente = ?`;
    const [rows] = await db.execute(query, [patientId]);
    return rows.length > 0 ? rows[0] : null;
  }


  async delete(patientId) {
    const query = `DELETE FROM Paciente WHERE id_paciente = ?`;
    const [result] = await db.execute(query, [patientId]);
    return result.affectedRows > 0;
  }


  async findAll() {
    const query = `SELECT * FROM Paciente`;
    const [rows] = await db.execute(query);
    return rows;
  }

 
  async findByName(patientName) {
    const query = `SELECT * FROM Paciente WHERE nombre_completo LIKE ?`;
    const [rows] = await db.execute(query, [`%${patientName}%`]);
    return rows;
  }
}

module.exports = PatientRepository;
