import bodyParser from 'body-parser';
import path from 'path';
import Mailer from '../middlewares/mailer_sendgrid';
import Messager from '../middlewares/messager';
import {generatePDF} from '../middlewares/generate-pdf';
import * as Templates from '../../web/templates';

const AppRoutes = (app, express) => {
  
  const router = express.Router();
  const mailService = new Mailer();
  const messager = new Messager();

  router.post('/download', bodyParser.json() , function(req, res){
    let Comp = Templates[`Template${req.body.templateId}`];
    const filename = `Resume-${req.body.templateId}-${new Date().getTime()}`;
    const filePath = path.join(__dirname,`../generated_files/${filename}.pdf`);
    generatePDF({html: app.locals.getComponentAsHTML(Comp, req.body.cvdata, req.body.templateColor), filename, filePath})
      .then((response)=> res.send(response))
      .catch((error) => {
        console.error('Error downloading resume', error);
        res.status(500).send('Error downloading resume. Please try again after some time');
      });
  });

  router.post('/email', bodyParser.json() , function(req, res){
    let Comp = Templates[`Template${req.body.templateId}`];
    const filename = `Resume-${req.body.templateId}-${new Date().getTime()}`;
    const filePath = path.join(__dirname,`../generated_files/${filename}.pdf`);
    generatePDF({html: app.locals.getComponentAsHTML(Comp, req.body.cvdata, req.body.templateColor), filename, filePath})
      .then(response => mailService.emailResume(req.body.email, response))
      .then(() => res.send({ok: true, statusText: 'Email sent successfully'}))
      .catch((error) => {
        console.error('Error emailing resume', error);
        res.status(500).send({ok: false, statusText: 'Error sending resume. Please try again after sometime'});
      });
  });

  router.get('/template/:id', bodyParser.json() , function(req, res){
    const json = require('../../mock/snehajain.json');
    let Comp = Templates[`Template${req.params.id}`];
    const html = app.locals.getComponentAsHTML(Comp, json);
    res.send(html);
  });

  router.post('/feedback', bodyParser.json() , function(req, res){
    messager.sendFeedback(req.body);
    mailService.sendFeedback(req.body);
    res.sendStatus(204);
  });

  router.get('*', (req, res) => {
    if (req.user) req.user.isLoggedIn = true;
    app.locals.renderIndex(res, {user: req.user});
  });

  return router;
};

export default AppRoutes;
