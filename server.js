const fs = require('fs');
const https = require('https');
const express = require('express');
const { Server } = require('socket.io'); 
const authRoutes = require('./user/infrastructure/routes/authRoutes'); 

const app = express();
app.use(express.json());

const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem'),
};

const server = https.createServer(options, app);

const io = new Server(server);

app.use('/auth', authRoutes);

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');

  socket.emit('serverMessage', 'Bienvenido, que es lo que quieres hacer');


  socket.on('clientMessage', (message) => {
    console.log('Mensaje del cliente:', message);
  });
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado');
  });
});


server.listen(8083, () => {
  console.log('Servidor HTTPS activo en https://localhost:8083');
});
