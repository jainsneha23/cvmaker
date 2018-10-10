import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';

import {getSchema, graphqlQuery} from '../middlewares/graphql-query';

const ApiRouter = (app, express) => {
  
  const router = express.Router();
  const resumeSchema = getSchema();

  router.use('/graphql', graphqlHTTP({
    schema: resumeSchema,
    pretty: true,
    graphiql: true
  }));

  router.post('/resume', bodyParser.text(), (req, res) => {
    graphqlQuery(req.body).then( function(result) {
      res.send({result: JSON.stringify(result) || {}});
    }).catch(e => {
      res.status(502).send({errors: e});
    });
  });

  return router;
};

export default ApiRouter;
