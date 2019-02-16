const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'moisesgarcia83@gmail.com',
    pass: process.env.MAIL_PASSWORD
  }
});

module.exports = transporter;
