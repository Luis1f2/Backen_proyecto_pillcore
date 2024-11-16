class UpdateUser {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async execute(userId, data) {
      const { nombre, edad, correo, contraseña } = data;
  
      
      const existingUser = await this.userRepository.findById(userId);
      if (!existingUser) {
        throw new Error('User not found');
      }
  
      
      let hashedPassword = existingUser.contraseña;
      if (contraseña) {
        hashedPassword = await bcrypt.hash(contraseña, 10);
      }
  
      const updatedUser = {
        id: userId,
        nombre: nombre || existingUser.nombre,
        edad: edad || existingUser.edad,
        correo: correo || existingUser.correo,
        contraseña: hashedPassword,
      };
  
      return await this.userRepository.update(userId, updatedUser);
    }
  }
  
  module.exports = UpdateUser;
  