
const fs = require('fs');
const https = require('https');
const express = require('express');
const authRoutes = require('./user/infrastructure/routes/authRoutes'); // Importa las rutas de autenticación

const app = express();
app.use(express.json());

const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem')
};
app.use('/auth', authRoutes);

https.createServer(options, app).listen(8083, () => {
  console.log('Servidor HTTPS activo en https://localhost:8083');
});
