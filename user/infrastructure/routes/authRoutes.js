
const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.get('/users', authController.getAllUsers);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/update/:id', authController.update);
router.delete('/delete/:id', authController.delete);


module.exports = router;
