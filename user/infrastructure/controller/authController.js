const bcrypt = require('bcrypt');
const RegisterUser = require('../../application/use_cases/RegisterUser');
const LoginUser = require('../../application/use_cases/LoginUser');
const UpdateUser = require('../../application/use_cases/UpdateUser');
const DeleteUser = require('../../application/use_cases/DeleteUser');
const GetAllUsers = require('../../application/use_cases/GetAllUsers');
const UserRepository = require('../../domain/repositories/UserRepository');

const userRepository = new UserRepository();

exports.register = async (req, res) => {
  try {
    const { nombre, año_nacimiento, direccion_Email, contraseña, telefono } = req.body;

    if (!nombre || !direccion_Email || !contraseña) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    // Validaciones adicionales
    if (contraseña.length < 8) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const user = await userRepository.save({
      nombre,
      año_nacimiento: parseInt(año_nacimiento),
      direccion_Email,
      contraseña: hashedPassword,
      telefono,
    });

    const { contraseña: _, ...userWithoutPassword } = user;

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: userWithoutPassword });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  const loginUser = new LoginUser(userRepository);
  try {
    const { direccion_Email, contraseña } = req.body; // Usar direccion_Email y contraseña
    const { user, token } = await loginUser.execute(direccion_Email, contraseña); // Pasar direccion_Email al caso de uso
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (err) {
    res.status(401).json({ message: 'Invalid email or password', error: err.message });
  }
};


exports.update = async (req, res) => {
  const { id } = req.params;
  const updateUser = new UpdateUser(userRepository);

  try {
    const updatedUser = await updateUser.execute(id, req.body);
    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (err) {
    res.status(404).json({ message: 'Error updating user', error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  const getAllUsers = new GetAllUsers(userRepository);
  try {
    const result = await getAllUsers.execute();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const deleteUser = new DeleteUser(userRepository);

  try {
    const result = await deleteUser.execute(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: 'Error deleting user', error: err.message });
  }
};

