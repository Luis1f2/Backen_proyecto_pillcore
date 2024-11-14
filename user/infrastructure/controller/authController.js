
const RegisterUser = require('../../application/use_cases/RegisterUser');
const LoginUser = require('../../application/use_cases/LoginUser');
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
    const user = await loginUser.execute(req.body.correo, req.body.contraseña);
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(401).json({ message: 'Invalid email or password', error: err.message });
  }
};
