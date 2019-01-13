const { getDB, getPrimaryKey } = require('./db');
const { successMessages } = require('./messages');
const { collection } = require('./config');

const requestGet = (_, res) => {
  getDB()
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
};

const requestPut = (req, res) => {
  const todoID = getPrimaryKey(req.params.id);
  const userInput = req.body;

  getDB()
    .collection(collection)
    .findOneAndUpdate(
      { _id: todoID },
      { $set: { todo: userInput.todo } },
      { returnOriginal: false },
      (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log(successMessages.edited(todoID, 'todo', userInput.todo));
          res.json(result);
        }
      }
    );
};

const requestPost = (req, res) => {
  const userInput = req.body;

  getDB()
    .collection(collection)
    .insertOne(userInput, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(
          successMessages.added(result.ops[0]._id, 'todo', result.ops[0].todo)
        );
        res.json({ result, document: result.ops[0] });
      }
    });
};

const requestDelete = (req, res) => {
  const todoID = getPrimaryKey(req.params.id);

  getDB()
    .collection(collection)
    .findOneAndDelete({ _id: todoID }, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(successMessages.deleted(todoID, 'todo'));
        res.json(result);
      }
    });
};

module.exports = { requestGet, requestPut, requestPost, requestDelete };
