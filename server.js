const express = require('express');
const bodyParser = require('body-parser');

const {
  requestGet,
  requestPut,
  requestPost,
  requestDelete
} = require('./requests');

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

// read
app.get('/todos', requestGet);

// edit
app.put('/:id', requestPut);

// add
app.post('/', requestPost);

// delete
app.delete('/:id', requestDelete);

// Error middleware
app.use((error, req, res, next) => {
  res.status(error.status).json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
