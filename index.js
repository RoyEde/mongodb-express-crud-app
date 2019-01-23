const { connect } = require('./db');
const { errorMessages, successMessages } = require('./messages');
const { nodeDefaultPort } = require('./config');
const app = require('./server');

const port =
  (parseInt(process.argv[2], 10) && process.argv[2]) || nodeDefaultPort;

connect(error => {
  if (error) {
    console.error(errorMessages.unableToConnect);
    process.exit(1);
  } else {
    app.listen(port, () => console.info(successMessages.connected(port)));
  }
});
