import { graphql } from 'graphql';

import ResumeSchema from '../../api/graphql';

const graphqlQuery = (query) => {

  return new Promise((resolve, reject) => {
    graphql(getSchema(), query).then((result) => {
      if (result.errors) reject(result.errors);
      if (result.data.resumes && result.data.resumes.length === 1)
        resolve(result.data.resumes[0]);
      if (result.data.resumes && result.data.resumes.length > 1)
        resolve(result.data.resumes);
      resolve();
    }).catch(e => reject(e));
  });
};

const getSchema = () => {
  const resumeSchema = new ResumeSchema().getSchema();
  return resumeSchema;
};

export {getSchema, graphqlQuery};
