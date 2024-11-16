const db = require('../../infrastructure/database');

class UserRepository {
  async save(user) {
    const query = `INSERT INTO Usuario (nombre, edad, correo, contraseña) VALUES (?, ?, ?, ?)`;
    const values = [user.nombre, user.edad, user.correo, user.contraseña];
    const [result] = await db.execute(query, values);
    user.id = result.insertId;
    return user;
  }

  async findByEmail(email) {
    const query = `SELECT * FROM Usuario WHERE correo = ?`;
    const [rows] = await db.execute(query, [email]);
    return rows.length > 0 ? rows[0] : null;
  }

  async findById(userId) {
    const query = `SELECT * FROM Usuario WHERE id = ?`;
    const [rows] = await db.execute(query, [userId]);
    return rows.length > 0 ? rows[0] : null;
  }

  async update(userId, user) {
    const query = `UPDATE Usuario SET nombre = ?, edad = ?, correo = ?, contraseña = ? WHERE id = ?`;
    const values = [user.nombre, user.edad, user.correo, user.contraseña, userId];
    await db.execute(query, values);
    return user;
  }

  async delete(userId) {
    const query = `DELETE FROM Usuario WHERE id = ?`;
    await db.execute(query, [userId]);
    return true;
  }
}

module.exports = UserRepository;
