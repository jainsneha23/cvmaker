import bodyParser from 'body-parser';
import Mailer from '../middlewares/mailer';
import Messager from '../middlewares/messager';
import {generateComponentAsPDF} from '../middlewares/generate-pdf';
import * as Designs from '../../web/designs';

const AppRoutes = (app, express) => {
  
  const router = express.Router();
  const mailService = new Mailer();
  const messager = new Messager();

  router.post('/download', bodyParser.json() , function(req, res){
    let Comp = Designs[`Design${req.body.designId}`];
    const filename = `Design${req.body.designId}-${new Date().getTime()}`;
    generateComponentAsPDF({html: app.locals.getComponentAsHTML(Comp, req.body.cvdata, req.body.designColor), filename}).then((response) => {
      res.send(response);
    }).catch((error) => res.status(500).send(error));
  });

  router.get('/design/:id', bodyParser.json() , function(req, res){
    try{
      const json = require('../mock/snehajain.json');
      let Comp = Designs[`Design${req.params.id}`];
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
    app.locals.renderIndex(res, {user: req.user});
  });

  return router;
};

export default AppRoutes;
