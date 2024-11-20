const nodemailer = require('nodemailer');

class SendEmergencyAlert {
    constructor(alertRepository, userRepository) {
        this.alertRepository = alertRepository;
        this.userRepository = userRepository;
    }

    async execute(userId, message) {
        // Obtener detalles del usuario (correo electrónico del familiar o contacto)
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const recipientEmail = user.direccion_Email; // Correo del usuario registrado
        if (!recipientEmail) {
            throw new Error('El usuario no tiene un correo registrado');
        }

        // Enviar el correo electrónico
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Cambiar según el proveedor (ejemplo: SMTP)
            auth: {
                user: 'tuemail@gmail.com', // Configura tu correo y contraseña
                pass: 'tupassword'
            }
        });

        const mailOptions = {
            from: 'tuemail@gmail.com',
            to: recipientEmail,
            subject: '¡Alerta de Emergencia!',
            text: message || 'El botón de emergencia ha sido presionado. Verifica el estado del paciente.'
        };

        await transporter.sendMail(mailOptions);

        // Registrar la alerta en la base de datos (opcional)
        if (this.alertRepository) {
            await this.alertRepository.save({
                id_usuario: userId,
                mensaje_alerta: message || 'Botón de emergencia presionado'
            });
        }

        return { success: true, message: 'Alerta enviada exitosamente' };
    }
}

module.exports = SendEmergencyAlert;