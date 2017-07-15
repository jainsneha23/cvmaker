import { graphql } from 'graphql';
import graphqlHTTP from 'express-graphql';

import Schema from '../../api/graphql';

const ApiRouter = (app, express) => {
  
  const router = express.Router();

  router.use('/graphql', graphqlHTTP(() => ({
    Schema,
    pretty: true
  })));

  let i = 0;

  router.get('/resume', (req, res) => {
    let query = ['query { todos { id, title, completed } }',
      'mutation { add (title: "Clean garage") { id, title } }',
      'query { todos { id, title, completed } }',
      'mutation { update (id: "1", title: "Clean inbox") { id, title } }',
      'query { todos { id, title, completed } }',
      'mutation { delete (id: "2") { id, title } }',
      'query { todos { id, title, completed } }'];
    graphql(Schema, query[i]).then( function(result) {
      res.send(JSON.stringify(result,null,' '));
      i++;
    });
  });

  return router;
};

export default ApiRouter;
