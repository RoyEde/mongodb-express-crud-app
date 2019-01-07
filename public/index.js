const resetInput = input => (input.value = '');

const buildIDS = todo => ({
  editID: `edit_${todo._id}`,
  deleteID: `delete_${todo._id}`,
  listItemID: `listItem_${todo._id}`,
  todoID: `todo_${todo._id}`
});

const buildTemplate = (todo, ids) => {
  const listItem = document.createElement('li');
  listItem.className = 'container__list__item';
  listItem.id = ids.listItemID;

  const todoText = document.createElement('p');
  todoText.id = ids.todoID;
  todoText.className = 'container__list__item__text';
  todoText.textContent = todo.todo;

  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'container__list__item__buttons';

  const editButton = document.createElement('button');
  editButton.className = 'container__list__item__buttons__button--edit';
  editButton.id = ids.editID;
  editButton.textContent = 'Edit';

  const deleteButton = document.createElement('button');
  deleteButton.id = ids.deleteID;
  deleteButton.className = 'container__list__item__buttons__button--delete';
  deleteButton.textContent = 'Delete';

  buttonsContainer.append(editButton, deleteButton);

  listItem.append(todoText, buttonsContainer);

  return listItem;
};

const HEADERS = {
  json: {
    'Content-Type': 'application/json; charset=utf-8'
  }
};

const METHODS = {
  delete: {
    method: 'delete'
  },
  add: input => ({
    method: 'post',
    headers: HEADERS.json,
    body: JSON.stringify({ todo: input.value })
  }),
  get: {
    method: 'get'
  },
  edit: input => ({
    method: 'put',
    headers: HEADERS.json,
    body: JSON.stringify({ todo: input.value })
  })
};

const parseResponse = response => response.json();

document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const form = document.getElementById('form');
  const todoUserInput = document.getElementById('todoUserInput');

  const deleteTodo = (todo, listItemID, deleteID) => {
    document.getElementById(`${deleteID}`).onclick = () =>
      fetch(`/${todo._id}`, METHODS.delete)
        .then(parseResponse)
        .then(data => {
          if (data.ok === 1) {
            document.getElementById(`${listItemID}`).remove();
          }
        });
  };

  const editTodo = (todo, todoID, editID) => {
    document.getElementById(`${editID}`).onclick = () =>
      fetch(`/${todo._id}`, METHODS.edit(todoUserInput))
        .then(parseResponse)
        .then(data => {
          if (data.ok === 1) {
            document.getElementById(`${todoID}`).textContent = data.value.todo;
            resetInput(todoUserInput);
          }
        });
  };

  const buildTodo = todo => {
    const ids = buildIDS(todo);
    display.append(buildTemplate(todo, ids));
    editTodo(todo, ids.todoID, ids.editID);
    deleteTodo(todo, ids.listItemID, ids.deleteID);
  };

  const displayTodos = data => data.forEach(buildTodo);

  form.onsubmit = event =>
    event.preventDefault() ||
    fetch('/', METHODS.add(todoUserInput))
      .then(parseResponse)
      .then(data => {
        if (data.result.ok === 1 && data.result.n === 1) {
          buildTodo(data.document);
        }
        resetInput(todoUserInput);
      });

  const getTodos = () =>
    fetch('/todos', METHODS.get)
      .then(parseResponse)
      .then(data => displayTodos(data));

  getTodos();
});
