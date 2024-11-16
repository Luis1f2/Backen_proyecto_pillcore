const bcrypt = require('bcrypt');
const User = require('../../domain/entities/User');

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(data) {
    const { nombre, edad, correo, contraseña } = data;

    
    const existingUser = await this.userRepository.findByEmail(correo);
    if (existingUser) {
      throw new Error('Email already in use');
    }

  
    const hashedPassword = await bcrypt.hash(contraseña, 10);

  
    const user = new User(null, nombre, edad, correo, hashedPassword);

    return await this.userRepository.save(user);
  }
}

module.exports = RegisterUser;
