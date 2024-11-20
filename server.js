const fs = require('fs');
const https = require('https');
const cors = require('cors')
const express = require('express');
const { Server } = require('socket.io');

const corsOptions = {
  origin: ['http://localhost:8083', 'https://mi-frontend.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

const authRoutes = require('./user/infrastructure/routes/authRoutes');
const patientRoutes = require('./patient/infrastructure/routes/patientRoutes');
const medicineRoutes = require('./medicine/infrastructure/routes/medicineRoutes');
const notificationRoutes = require('./notifications/infrastructure/routes/notificationRoutes');
const alertRoutes = require('./alert/infrastructure/routes/alertRoutes');


const app = express();
app.use(cors(corsOptions));
app.use(express.json());


const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem'),
};


const server = https.createServer(options, app);


const io = new Server(server);


app.use('/auth', authRoutes);
app.use('/patients', patientRoutes);
app.use('/medicines', medicineRoutes);
app.use('/notifications', notificationRoutes);
app.use('/alerts', alertRoutes);


io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');


  socket.emit('serverMessage', 'Bienvenido, ¿qué es lo que quieres hacer?');

  
  socket.on('clientMessage', (message) => {
    console.log('Mensaje del cliente:', message);
  });

  
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado');
  });
});


const PORT = process.env.PORT || 8083;
server.listen(PORT, () => {
  console.log(`Servidor HTTPS activo en https://localhost:${PORT}`);
});
