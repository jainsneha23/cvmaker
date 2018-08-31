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
      fields: function () {
        return {
          id: {
            type: GraphQLID
          },
          userid: {
            type: GraphQLFloat
          },
          resumeid: {
            type: GraphQLInt
          },
          cvdata: {
            type: GraphQLString
          },
          template: {
            type: GraphQLString
          }
        };
      }
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
        }
      },
      resolve: (root, {id, userid, resumeid, cvdata, template}) => {
        return new Promise((resolve, reject) => {
          db.insert(dbName, {id, userid, resumeid, cvdata, template})
            .then(() => db.selectAll(dbName))
            .then(resumes => resolve(resumes))
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
            .then(resumes => resolve(resumes))
            .catch(err => reject(err));
        });
      }
    };

    const MutationUpdate = {
      type: new GraphQLList(ResumeType),
      description: 'Update a Resume',
      args: {
        id: {
          name: 'Id',
          type: new GraphQLNonNull(GraphQLID)
        },
        cvdata: {
          name: 'Resume data',
          type: GraphQLString
        },
        template: {
          name: 'Resume template',
          type: GraphQLString
        }
      },
      resolve: (root, {id, cvdata, template}) => {
        return new Promise((resolve, reject) => {
          const dataToUpdate = {};
          if(cvdata) dataToUpdate.cvdata = cvdata;
          if(template) dataToUpdate.template = template;
          db.update(dbName, {id}, {$set:dataToUpdate})
            .then(() => db.selectAll(dbName))
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
                type: new GraphQLNonNull(GraphQLFloat)
              }
            },
            resolve: (root, {userid}) => {
              return new Promise((resolve, reject) => {
                db.find(dbName, {userid})
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
