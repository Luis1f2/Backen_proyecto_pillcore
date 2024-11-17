const RegisterUser = require('../../application/use_cases/RegisterUser');
const LoginUser = require('../../application/use_cases/LoginUser');
const UpdateUser = require('../../application/use_cases/UpdateUser');
const DeleteUser = require('../../application/use_cases/DeleteUser');
const GetAllUsers = require('../../application/use_cases/GetAllUsers');
const UserRepository = require('../../domain/repositories/UserRepository');

const userRepository = new UserRepository();

exports.register = async (req, res) => {
  const registerUser = new RegisterUser(userRepository);
  try {
    const user = await registerUser.execute(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

exports.login = async (req, res) => {
  const loginUser = new LoginUser(userRepository);
  try {
    const user = await loginUser.execute(req.body.direccion_Email, req.body.contraseña);
    res.status(200).json({ message: 'Login successful', user });
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

