const errorMessages = {
  unableToConnect: 'Unable to connect to database.'
};

const successMessages = {
  connected: port => `Connected to database, app listening on port ${port}`
};

module.exports = { errorMessages, successMessages };
