import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} from 'graphql';

const dbName = 'TODOS';
const db = global.db;

const TodoType = new GraphQLObjectType({  
  name: 'todo',
  fields: function () {
    return {
      id: {
        type: GraphQLID
      },
      title: {
        type: GraphQLString
      },
      completed: {
        type: GraphQLBoolean
      }
    };
  }
});

const MutationAdd = {
  type: new GraphQLList(TodoType),
  description: 'Add a Todo',
  args: {
    title: {
      name: 'Todo title',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, {title}) => {
    return new Promise((resolve, reject) => {
      db.insert(dbName, {title})
      .then(() => db.selectAll(dbName))
      .then(todos => resolve(todos))
      .catch(err => reject(err));
    });
  }
};

const MutationDelete = {
  type: new GraphQLList(TodoType),
  description: 'Delete a Todo',
  args: {
    id: {
      name: 'Todo Id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, {id}) => {
    return new Promise((resolve, reject) => {
      db.delete(dbName, {id})
      .then(() => db.selectAll(dbName))
      .then(todos => resolve(todos))
      .catch(err => reject(err));
    });
  }
};

const MutationUpdate = {
  type: new GraphQLList(TodoType),
  description: 'Update a Todo',
  args: {
    id: {
      name: 'Todo Id',
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      name: 'Todo title',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, {id, title}) => {
    return new Promise((resolve, reject) => {
      db.delete(dbName, {id, title})
      .then(() => db.selectAll(dbName))
      .then(todos => resolve(todos))
      .catch(err => reject(err));
    });
  }
};

const queryType = new GraphQLObjectType({  
  name: 'Query',
  fields: () => {
    return {
      todos: {
        type: new GraphQLList(TodoType),
        resolve: () => {
          return new Promise((resolve, reject) => {
            db.selectAll(dbName)
            .then(todos => resolve(todos))
            .catch(err => reject(err));
          });
        }
      }
    };
  }
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    add: MutationAdd,
    delete: MutationDelete,
    update: MutationUpdate
  }
});

export default new GraphQLSchema({  
  query: queryType,
  mutation: MutationType
});
