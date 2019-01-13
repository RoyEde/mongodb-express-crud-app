const { MongoClient, ObjectID } = require('mongodb');
const { mongoDefaultPort, localDBName } = require('./config');

const url = `mongodb://localhost:${mongoDefaultPort}`;

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
          state.db = client.db(localDBName);
          callback();
        }
      }
    );
  }
};

const getPrimaryKey = _id => ObjectID(_id);

const getDB = () => state.db;

module.exports = { getDB, connect, getPrimaryKey };
