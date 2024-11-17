const bcrypt = require('bcrypt');
const User = require('../../domain/entities/User');

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(data) {
    const { nombre, edad, direccion_Email, contraseña, telefono } = data;

    if (!nombre || !direccion_Email || !contraseña) {
      throw new Error('Missing required fields: nombre, direccion_Email, or contraseña');
    }

    const existingUser = await this.userRepository.findByEmail(direccion_Email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const user = new User(
      null, // ID lo asigna la base de datos
      nombre,
      edad || null,
      direccion_Email,
      hashedPassword,
      telefono || null
    );

    return await this.userRepository.save(user);
  }
}

module.exports = RegisterUser;
