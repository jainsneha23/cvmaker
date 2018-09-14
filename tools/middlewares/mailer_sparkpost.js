import SparkPost from 'sparkpost';

class Mailer {
  constructor() {
    this.client = new SparkPost(); // uses process.env.SPARKPOST_API_KEY
  }

  sendEmail(mail) {
    this.client.transmissions.send(mail, (err, data) => {
      if(err) {
        console.error('Error in sending email', err);
      } else {
        console.log('WOOHOO, Transmission accepted by SparkPost!', data);
      }
    });
  }

  sendFeedback(obj) {
    var mail = {
      content: {
        from: 'anything@sparkpostbox.com',
        reply_to: obj.email,
        subject: `Feedback form from ${obj.email} ${obj.fullname}`,
        text: obj.message,
      },
      recipients: [
        {
          address: {
            email: 'cvmakerindia@gmail.com',
            name: 'Instant CV Maker'
          }
        }
      ]
    };
    this.sendEmail(mail);
  }

  emailResume(obj, attachment) {
    var mail = {
      content: {
        from: 'support@cvmaker.co.in',
        reply_to: 'cvmakerindia@gmail.com',
        subject: `Resume from Instant CV Maker sent by ${obj.fullname}<${obj.email}>`,
        html: obj.message,
        attachments: [attachment]
      },
      recipients: [
        {
          address: {
            email: 'cvmakerindia@gmail.com',
            name: 'Instant CV Maker'
          }
        }
      ]
    };
    return this.sendEmail(mail);
  }
}

export default Mailer;
