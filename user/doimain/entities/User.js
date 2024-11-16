class User {
  constructor(id, nombre, edad, correo, contraseña) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.correo = correo;
    this.contraseña = contraseña;
  }

  isValidPassword(password) {
    return password.length >= 8; 
  }
}

module.exports = User;
