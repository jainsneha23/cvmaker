import sendgrid, {mail as helper} from 'sendgrid';

class Mailer {
  constructor() {
    this.sg = sendgrid(process.env.SENDGRID_API_KEY);
  }

  sendEmail(mail) {
    return new Promise((resolve, reject) => {
      var request = this.sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
      });
      this.sg.API(request, function(error) {
        if (error) reject(`Error in sending email: ${error}`);
        else resolve('Success sending email');
      });
    });
  }

  sendFeedback(obj) {
    const from_email = new helper.Email('support@cvmaker.co.in');
    const to_email = new helper.Email('cvmakerindia@gmail.com');
    const subject = `Feedback form from ${obj.email} ${obj.fullname}`;
    const content = new helper.Content('text/plain', obj.message);
    const mail = new helper.Mail(from_email, subject, to_email, content);
    return this.sendEmail(mail);
  }
}


export default Mailer;

