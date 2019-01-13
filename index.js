const express = require('express');
const bodyParser = require('body-parser');
const { nodeDefaultPort } = require('./config');

const { connect } = require('./db');
const {
  requestGet,
  requestPut,
  requestPost,
  requestDelete
} = require('./requests');
const { errorMessages, successMessages } = require('./messages');

const app = express();

app.use(bodyParser.json());

const port =
  (parseInt(process.argv[2], 10) && process.argv[2]) || nodeDefaultPort;

app.use(express.static('public'));

// read
app.get('/todos', requestGet);

// edit
app.put('/:id', requestPut);

// add
app.post('/', requestPost);

// delete
app.delete('/:id', requestDelete);

connect(error => {
  if (error) {
    console.error(errorMessages.unableToConnect);
    process.exit(1);
  } else {
    app.listen(port, () => console.info(successMessages.connected(port)));
  }
});
