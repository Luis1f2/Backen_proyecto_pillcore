const db = require('../../infrastructure/database');

class UserRepository {
  async save(user) {
    const query = `INSERT INTO Usuario (nombre, año_nacimiento, direccion_Email, contraseña, numero_telefono) VALUES (?, ?, ?, ?, ?)`;
    const values = [
      user.nombre,
      user.año_nacimiento,
      user.direccion_Email,
      user.contraseña,
      user.telefono
    ];
    const [result] = await db.execute(query, values);
    user.id = result.insertId;
    return user;
  }

  async findByEmail(email) {
    if (!email) {
      throw new Error('Email is required');
    }
  
    const query = `SELECT * FROM Usuario WHERE direccion_Email = ?`;
    const [rows] = await db.execute(query, [email]);
    return rows.length > 0 ? rows[0] : null;
  }
  

  async findById(id) {
    if (!id) {
      throw new Error('ID is required');
    }
  
    const query = `SELECT * FROM Usuario WHERE id_usuario = ?`;
    const [rows] = await db.execute(query, [id]);
    return rows.length > 0 ? rows[0] : null; 
  }
  
  async update(id, data) {
    const query = `
      UPDATE Usuario
      SET nombre = ?, año_nacimiento = ?, direccion_Email = ?, contraseña = ?, numero_telefono = ?
      WHERE id_usuario = ?`;
  
    const values = [
      data.nombre || null,
      data.año_nacimiento || null,
      data.direccion_Email || null,
      data.contraseña || null,
      data.numero_telefono || null,
      id
    ];
  
    await db.execute(query, values);
    return await this.findById(id); 
  }

  async findAll() {
    const query = `SELECT * FROM Usuario`;
    const [rows] = await db.execute(query);
    return rows;
  }


  async delete(id) {
    const query = `DELETE FROM Usuario WHERE id_usuario = ?`;
    await db.execute(query, [id]);
  }
  
}

module.exports = UserRepository;
