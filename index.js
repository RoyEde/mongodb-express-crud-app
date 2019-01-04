const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = 3000;
const path = require('path');

const db = require('./db');
const collection = 'todo';

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/todos', (req, res) => {
  db.getDB()
    .collection(collection)
    .find({})
    .toArray((error, documents) => {
      if (error) {
        console.error(error);
      } else {
        console.info(documents);
        res.json(documents);
      }
    });
});

app.put('/:id', (req, res) => {
  const todoID = db.getPrimaryKey(req.params.id);
  const userInput = req.body;

  db.getDB
    .collection(collection)
    .findOneAndUpdate(
      { _id: todoID },
      { $set: { todo: userInput.todo } },
      { returnOriginal: false },
      (error, result) => {
        if (error) {
          console.error(error);
        } else {
          res.json(result);
        }
      }
    );
});

app.post('/', (req, res) => {
  const userInput = req.body;

  db.getDB.collection(collection).insertOne(userInput, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      res.json({ result, document: result.ops[0] });
    }
  });
});

const messages = require('./messages');
const errorMessages = messages.errorMessages;
const successMessages = messages.successMessages;

db.connect(error => {
  if (error) {
    console.error(errorMessages.unableToConnect);
    process.exit(1);
  } else {
    app.listen(port, () => console.info(successMessages.connected(port)));
  }
});
