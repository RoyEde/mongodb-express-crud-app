const errorMessages = {
  unableToConnect: 'Unable to connect to database.'
};

const successMessages = {
  connected: port => `Connected to database, app listening on port ${port}`,
  added: (id, elementKey, elementValue) =>
    `Added { _id: ${id}, ${elementKey}: '${elementValue}' }`
};

module.exports = { errorMessages, successMessages };
