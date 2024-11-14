const bcrypt = require('bcrypt');

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.contraseña);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return user;
  }
}

module.exports = LoginUser;
