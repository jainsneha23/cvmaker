import bodyParser from 'body-parser';
import path from 'path';
import Mailer from '../middlewares/mailer';
import Messager from '../middlewares/messager';
import {generateComponentAsPDF} from '../middlewares/generate-pdf';
import * as Templates from '../../web/templates';

const AppRoutes = (app, express) => {
  
  const router = express.Router();
  const mailService = new Mailer();
  const messager = new Messager();

  router.post('/download', bodyParser.json() , function(req, res){
    let Comp = Templates[`Template${req.body.templateId}`];
    const filename = `Template${req.body.templateId}-${new Date().getTime()}`;
    const filePath = path.join(__dirname,`../generated_files/${filename}.pdf`);
    generateComponentAsPDF({html: app.locals.getComponentAsHTML(Comp, req.body.cvdata, req.body.templateColor), filename, filePath}).then((response) => {
      res.send(response);
    }).catch((error) => res.status(500).send(error));
  });

  router.get('/template/:id', bodyParser.json() , function(req, res){
    try{
      const json = require('../mock/snehajain.json');
      let Comp = Templates[`Template${req.params.id}`];
      const html = app.locals.getComponentAsHTML(Comp, json);
      res.send(html);
    } catch (error) {
      res.status(500).send(error);
    }
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
