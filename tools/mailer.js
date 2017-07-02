import Mailgun from 'mailgun-js';

class Mailer {
  constructor() {
    try {
      this.transporter = new Mailgun({
        apiKey: process.env.MAILGUN_API_KEY || 'key-16162dd2f99e7806cbacb9f39cd98932',
        domain: process.env.MAILGUN_DOMAIN || 'app15de01f268714be18715eb7d6050e2e8.mailgun.org'
      });
    } catch(e) {
      console.log(e);
    }
  }
  sendFeedback(obj) {
    const mailData = {
      from: obj.email,
      to: 'cvmakerindia@gmail.com',
      subject: `Feedback form from ${obj.fullname}`,
      text: obj.message
    };
    return new Promise((resolve, reject) => {
      this.transporter.messages().send(mailData, function (err, body) {
        if (err) {
          reject(`Mailer error: ${err}`);
        }
        else {
          resolve(`Mailer success: ${body}`);
        }
      });
    });
  }
}

export default Mailer;

