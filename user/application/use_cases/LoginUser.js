const bcrypt = require('bcrypt');

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(direccion_Email, password) {
    const user = await this.userRepository.findByEmail(direccion_Email);
    if (!user) {
      throw new Error('User not found');
    }

    // Validar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.contraseña);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

   
    return {
      id: user.id_usuario, 
      nombre: user.nombre,
      direccion_Email: user.direccion_Email
    };
  }
}

module.exports = LoginUser;
