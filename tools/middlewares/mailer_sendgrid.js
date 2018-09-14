import sgMail from '@sendgrid/mail';

class Mailer {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  sendFeedback(obj) {
    const msg = {
      to: 'support@cvmaker.co.in',
      from: obj.email,
      subject: `Feedback form from ${obj.fullname}<${obj.email}>`,
      text: obj.message
    };
    return sgMail.send(msg);
  }

  emailResume(obj, attachment) {
    const msg = {
      to: obj.email,
      from: 'support@cvmaker.co.in',
      subject: `Resume from Instant CV Maker sent by ${obj.fullname}<${obj.email}>`,
      text: obj.message,
      attachments: [{
        ...attachment,
        type: 'application/pdf',
        disposition: 'attachment'
      }]
    };
    return sgMail.send(msg);
  }
}


export default Mailer;

