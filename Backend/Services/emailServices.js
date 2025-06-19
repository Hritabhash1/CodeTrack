const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

const sendReminderEmail = async (to, name) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Time to Practice on Codeforces!',
    text: `Hi ${name},\n\nWe noticed you haven't submitted anything on Codeforces in the past week. Get back to solving problems and keep up the grind!\n\nBest Regards,\nCodeTrack`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendReminderEmail };
