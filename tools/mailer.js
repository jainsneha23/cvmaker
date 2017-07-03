import Nodemailer from 'nodemailer';

class Mailer {
  constructor() {
    try {
      this.transporter = Nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      });
    } catch(e) {
      console.log(e);
    }
  }
  sendFeedback(obj) {
    const mailData = {
      from: 'cvmakerindia@gmail.com',
      to: 'cvmakerindia@gmail.com',
      subject: `Feedback form from ${obj.email} ${obj.fullname}`,
      text: obj.message
    };
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailData, (error, info) => {
        if (error) {
          reject(`Mailer error: ${error}`);
        } else resolve(`Mailer success: ${info}`);
      });
    });
  }
}

export default Mailer;

