const nodemailer = require('nodemailer');
var destinatario = 'lorenagarcia0494@gmail.com';

/*const rand=Math.floor((Math.random() * 100) + 54*10);
console.log (rand);*/
//const sendEmail = function(req, res){
function getRandomInt(min, max) {
  result = Math.floor(Math.random() * (max - min)) + min;
  return result;
}
//console.log(getRandomInt(100, 1000));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'correop726@gmail.com',
    pass: 'Password.1234'
  }
});

const mailOptions = {
  from: 'correop726@gmail.com',
  to: destinatario,
  subject: 'Invoices due',
  text: 'Hola, su código de verificación es:' + getRandomInt(100, 1000)
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
//};

//module.exports = sendMail;
