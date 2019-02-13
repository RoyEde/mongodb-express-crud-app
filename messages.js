const successTemplate = (elementKey, elementValue, message) =>
  `${message} ${elementKey}: '${elementValue}'`;

const errorTemplate = type => `Failed to ${type} Todo Document`;

const errorMessages = {
  unableToConnect: `
  Unable to connect to the database.
  Have you initiated your mongoDB service?
  `,
  invalidInput: 'Invalid Input',
  insert: errorTemplate('insert'),
  delete: errorTemplate('delete'),
  update: errorTemplate('update')
};

const successMessages = {
  connected: port => `Connected to database, app listening on port ${port}`,
  inserted: (...args) => successTemplate(...args, 'Inserted'),
  edited: (...args) => successTemplate(...args),
  deleted: elementKey => `Deleted ${elementKey}`
};

module.exports = { errorMessages, successMessages };
