const bcrypt = require('bcrypt');

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found'); // Podrías usar códigos HTTP para un mejor manejo
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.contraseña);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Retorna solo los datos que necesitas, no toda la entidad
    return {
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
    };
  }
}

module.exports = LoginUser;
