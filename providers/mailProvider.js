module.exports = function sendMail(to,subject,html){
    const nodemailer = require('nodemailer');

    const smtpTransport = nodemailer.createTransport({
        host: process.env.SMTP_SERVER,
        port: parseInt(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USERACCOUNT,
            pass: process.env.SMTP_PASSWORD
        }
    })

    const message = {
        from: 'petvidaanimal-no-replay@gmail.com',
        to,
        subject,
        html
    }

    smtpTransport.sendMail(message, (err, res) =>{
        if(err){
            console.log(`Erro ao enviar email: ${err}`);
        } else {
            console.log('Email enviado com sucesso!')
        }
        smtpTransport.close();
    })
}