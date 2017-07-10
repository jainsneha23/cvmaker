import { MongoClient } from 'mongodb';
import deasync from 'deasync';

import config from './config';

class Database {
  constructor() {
    let connecting = true;
    const self = this;
    MongoClient.connect(config.dbUrl, (err, db) => {
      if (err) throw `DB connection failed: ${err}`;
      else {
        connecting = false;
        self.db = db;
      }
    });
    while(connecting) {
      deasync.sleep(100);
    }
  }

  createTable(name) {
    return new Promise((resolve, reject) => {
      this.db.createCollection(name, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  selectAll(name) {
    return new Promise((resolve, reject) => {
      this.db.collection(name).find({}).toArray((err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  find(name, obj) {
    return new Promise((resolve, reject) => {
      this.db.collection(name).find(obj).toArray((err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  insert(name, obj) {
    const method = obj instanceof Array ? 'insertMany' : 'insertOne';
    return new Promise((resolve, reject) => {
      this.db.collection(name)[method](obj, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  delete(name, obj, multiple = true) {
    const method = multiple ? 'deleteMany' : 'deleteOne';
    return new Promise((resolve, reject) => {
      this.db.collection(name)[method](obj, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  update(name, obj, newObj) {
    const method = obj instanceof Array ? 'updateMany' : 'updateOne';
    return new Promise((resolve, reject) => {
      this.db.collection(name)[method](obj, newObj, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

}

export default Database;
