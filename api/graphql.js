import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} from 'graphql';

const dbName = 'RESUMES';

class ResumeSchema {

  constructor() {
    const db = global.db;

    db.createTable(dbName).catch(() => {
      throw `Exception in creating DB: ${dbName}`;
    });

    this.createScema();
  }

  createScema() {
    const db = global.db;

    const ResumeType = new GraphQLObjectType({  
      name: 'resume',
      fields: () => ({
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        userid: {
          type: new GraphQLNonNull(GraphQLFloat)
        },
        resumeid: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        cvdata: {
          type: GraphQLString
        },
        template: {
          type: GraphQLString
        },
        share: {
          type: GraphQLString
        }
      })
    });

    const MutationAdd = {
      type: new GraphQLList(ResumeType),
      description: 'Add a Resume',
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLID)
        },
        userid: {
          name: 'User ID',
          type: new GraphQLNonNull(GraphQLFloat)
        },
        resumeid: {
          name: 'Resume id',
          type: new GraphQLNonNull(GraphQLInt)
        },
        cvdata: {
          name: 'Resume data',
          type: new GraphQLNonNull(GraphQLString)
        },
        template: {
          name: 'Resume template',
          type: new GraphQLNonNull(GraphQLString)
        },
        share: {
          name: 'Resume share',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, {id, userid, resumeid, cvdata, template, share}) => {
        return new Promise((resolve, reject) => {
          db.insert(dbName, {id, userid, resumeid, cvdata, template, share})
            .then(() => db.selectAll(dbName))
            .then(() => resolve())
            .catch(err => reject(err));
        });
      }
    };

    const MutationDelete = {
      type: new GraphQLList(ResumeType),
      description: 'Delete a Resume',
      args: {
        id: {
          name: 'Id',
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (root, {id}) => {
        return new Promise((resolve, reject) => {
          db.delete(dbName, {id})
            .then(() => db.selectAll(dbName))
            .then(() => resolve())
            .catch(err => reject(err));
        });
      }
    };

    const MutationUpdate = {
      type: new GraphQLList(ResumeType),
      description: 'Update a Resume',
      args: {
        id: {
          name: 'Resume Id',
          type: new GraphQLNonNull(GraphQLID)
        },
        cvdata: {
          name: 'Resume data',
          type: GraphQLString
        },
        template: {
          name: 'Resume template',
          type: GraphQLString
        },
        share: {
          name: 'Resume share',
          type: GraphQLString
        }
      },
      resolve: (root, {id, cvdata, template, share}) => {
        return new Promise((resolve, reject) => {
          const dataToUpdate = {};
          if(cvdata) dataToUpdate.cvdata = cvdata;
          if(template) dataToUpdate.template = template;
          if(share) dataToUpdate.share = share;
          db.update(dbName, {id}, {$set:dataToUpdate})
            .then(() => db.find(dbName, {id}))
            .then(resumes => resolve(resumes))
            .catch(err => reject(err));
        });
      }
    };

    this.queryType = new GraphQLObjectType({  
      name: 'Query',
      fields: () => {
        return {
          resumes: {
            type: new GraphQLList(ResumeType),
            description: 'Get a Resume',
            args: {
              userid: {
                name: 'User ID',
                type: GraphQLFloat
              },
              id: {
                name: 'Resume ID',
                type: GraphQLID
              }
            },
            resolve: (root, {id, userid}) => {
              return new Promise((resolve, reject) => {
                const idToFind = id ? {id} : {userid};
                db.find(dbName, idToFind)
                  .then(resumes => resolve(resumes))
                  .catch(err => reject(err));
              });
            }
          }
        };
      }
    });

    this.MutationType = new GraphQLObjectType({
      name: 'Mutation',
      fields: {
        add: MutationAdd,
        delete: MutationDelete,
        update: MutationUpdate
      }
    });
  }

  getSchema() {
    return new GraphQLSchema({  
      query: this.queryType,
      mutation: this.MutationType
    });
  }
}

export default ResumeSchema;
