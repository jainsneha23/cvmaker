import express from 'express';
import { graphql } from 'graphql';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';

import ResumeSchema from '../../api/graphql';

const ApiRouter = () => {

  const router = express.Router();
  const resumeSchema = new ResumeSchema().getSchema();

  router.use('/graphql', graphqlHTTP(() => ({
    resumeSchema,
    pretty: true
  })));

  router.post('/resume', bodyParser.text(), (req, res) => {
    graphql(resumeSchema, req.body).then( function(result) {
      res.send(JSON.stringify(result,null,' '));
    }).catch(e => res.send(e));
  });

  return router;
};

export default ApiRouter;
