const mongoDB = require('mongodb');

const MongoClient = mongoDB.MongoClient;
const ObjectID = mongoDB.ObjectID;

const dbname = 'crud_mongodb';

const url = 'mongodb://localhost:27017';

const mongoOptions = {
  useNewUrlParser: true
};

const state = {
  db: null
};

const connect = callback => {
  if (state.db) {
    callback();
  } else {
    MongoClient.connect(
      url,
      mongoOptions,
      (error, client) => {
        if (error) {
          callback(error);
        } else {
          state.db = client.db(dbname);
          callback();
        }
      }
    );
  }
};

const getPrimaryKey = _id => ObjectID(_id);

const getDB = () => state.db;

module.exports = { getDB, connect, getPrimaryKey };
