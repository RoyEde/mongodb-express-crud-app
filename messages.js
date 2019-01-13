const errorMessages = {
  unableToConnect: 'Unable to connect to the database.'
};

const successTemplate = (id, elementKey, elementValue, message) =>
  `${message}: { _id: ${id}, ${elementKey}: '${elementValue}' }`;

const successMessages = {
  connected: port => `Connected to database, app listening on port ${port}`,
  added: (...args) => successTemplate(...args, 'Added'),
  edited: (...args) => successTemplate(...args, 'Updated to'),
  deleted: (id, elementKey) => `Deleted ${elementKey} with id: ${id}`
};

module.exports = { errorMessages, successMessages };
