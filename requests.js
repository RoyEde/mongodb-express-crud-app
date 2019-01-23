const Joi = require('joi');

const { getDB, getPrimaryKey } = require('./db');
const { errorMessages, successMessages } = require('./messages');
const { collection } = require('./config');

const schema = Joi.object().keys({
  todo: Joi.string().required()
});

const requestGet = (req, res) => {
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

  Joi.validate(userInput, schema, (error, result) => {
    if (error) {
      res.json({
        status: 400,
        error: {
          message: errorMessages.invalidInput
        }
      });
    } else {
      getDB()
        .collection(collection)
        .findOneAndUpdate(
          { _id: todoID },
          { $set: { todo: userInput.todo } },
          { returnOriginal: true },
          (error, result) => {
            if (error) {
              console.error(`error: ${error}`);
              const dbError = new Error(errorMessages.update);
              dbError.status = 400;
              next(dbError);
            } else {
              console.log(
                successMessages.edited(
                  todoID,
                  'todo',
                  userInput.todo,
                  `Todo: ${result.value.todo} was updated to`
                )
              );
              res.json({
                result: {
                  ...result,
                  updated: userInput.todo
                },
                message: successMessages.edited(
                  todoID,
                  'todo',
                  userInput.todo,
                  `Todo: ${result.value.todo} was updated to`
                )
              });
            }
          }
        );
    }
  });
};

const requestPost = (req, res, next) => {
  const userInput = req.body;

  Joi.validate(userInput, schema, (error, result) => {
    if (error) {
      const inputError = new Error(errorMessages.invalidInput);
      inputError.status = 400;
      next(inputError);
    } else {
      getDB()
        .collection(collection)
        .insertOne(userInput, (error, result) => {
          if (error) {
            console.error(error);
            const dbError = new Error(errorMessages.insert);
            dbError.status = 400;
            next(dbError);
          } else {
            console.log(
              successMessages.inserted(
                result.ops[0]._id,
                'todo',
                result.ops[0].todo
              )
            );
            res.status = 200;
            res.json({
              result,
              document: result.ops[0],
              message: successMessages.inserted(
                result.ops[0]._id,
                'todo',
                result.ops[0].todo
              ),
              error: null
            });
          }
        });
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
        next(error);
      } else {
        console.log(successMessages.deleted(todoID, 'todo'));
        res.json({
          result,
          message: successMessages.deleted(todoID, 'todo')
        });
      }
    });
};

module.exports = { requestGet, requestPut, requestPost, requestDelete };
