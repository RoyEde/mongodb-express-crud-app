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
    body: JSON.stringify({ todo: input.textContent })
  })
};

const buttonFactory = (className, id) => {
  const button = document.createElement('button');
  button.className = className;
  button.id = id;
  return button;
};

const resetInput = input => (input.value = '');

const buildIDS = todo => ({
  editID: `edit_${todo._id}`,
  deleteID: `delete_${todo._id}`,
  listItemID: `listItem_${todo._id}`,
  todoID: `todo_${todo._id}`
});

const buildTemplate = (todo, ids) => {
  const classPrefix = tail => `container__list__item${tail}`;

  const listItem = document.createElement('li');
  listItem.className = classPrefix('');
  listItem.id = ids.listItemID;

  const content = document.createElement('p');
  content.id = ids.todoID;
  content.className = classPrefix('__text');
  content.textContent = todo.todo;

  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = classPrefix('__buttons');

  const editButton = buttonFactory(
    `${classPrefix('__buttons__button')} ${classPrefix(
      '__buttons__button--edit'
    )}`,
    ids.editID
  );

  const deleteButton = buttonFactory(
    `${classPrefix('__buttons__button')} ${classPrefix(
      '__buttons__button--delete'
    )}`,
    ids.deleteID
  );

  buttonsContainer.append(editButton, deleteButton);

  listItem.append(content, buttonsContainer);

  return listItem;
};

const parseResponse = response => response.json();

document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const form = document.getElementById('form');
  const todoUserInput = document.getElementById('todoUserInput');

  const deleteTodo = (todo, listItemID, deleteID) => {
    document.getElementById(`${deleteID}`).onclick = () =>
      confirm(`Delete { _id: ${todo._id}, todo: ${todo.todo} }?`) &&
      fetch(`/${todo._id}`, METHODS.delete)
        .then(parseResponse)
        .then(data => {
          if (!data.error) {
            if (data.result.ok === 1) {
              document.getElementById(`${listItemID}`).remove();
              showSnackbar(data.message, 'log');
            }
          } else {
            showSnackbar(data.error.message);
          }
        });
  };

  const editTodo = (todo, todoID, editID) => {
    const classPrefix = tail => `container__list__item__buttons__button${tail}`;
    const todoItem = document.getElementById(`${todoID}`);
    const editButton = document.getElementById(`${editID}`);

    editButton.onclick = () => {
      if (todoItem.textContent !== todo.todo) {
        fetch(`/${todo._id}`, METHODS.edit(todoItem))
          .then(parseResponse)
          .then(data => {
            if (!data.error) {
              if (data.result.ok === 1) {
                document.getElementById(`${todoID}`).textContent =
                  data.result.updated;
                showSnackbar(data.message, 'log');
                const newTodo = {
                  _id: data.result.value._id,
                  todo: data.updated
                };
                const { listItemID, deleteID } = buildIDS(newTodo);
                deleteTodo(newTodo, listItemID, deleteID);
              }
            } else {
              showSnackbar(data.error.message);
            }
          });
      }
      editButton.className = `${classPrefix('')} ${classPrefix('--edit')}`;
      todoItem.contentEditable = false;
      editingTodo(todo, todoID, editID);
    };
  };

  const editingTodo = (todo, todoID, editID) => {
    const classPrefix = tail => `container__list__item__buttons__button${tail}`;
    const editButton = document.getElementById(`${editID}`);

    editButton.onclick = () => {
      const todoItem = document.getElementById(`${todoID}`);
      editButton.className = `${classPrefix('')} ${classPrefix('--editing')}`;
      todoItem.contentEditable = true;
      todoItem.focus();

      const todoItemRange = document.createRange();
      todoItemRange.selectNodeContents(todoItem);

      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(todoItemRange);

      editTodo(todo, todoID, editID);
    };
  };

  const buildTodo = todo => {
    const ids = buildIDS(todo);
    display.append(buildTemplate(todo, ids));
    editingTodo(todo, ids.todoID, ids.editID);
    deleteTodo(todo, ids.listItemID, ids.deleteID);
  };

  const displayTodos = data => data.forEach(buildTodo);

  form.onsubmit = event =>
    event.preventDefault() ||
    fetch('/', METHODS.add(todoUserInput))
      .then(parseResponse)
      .then(data => {
        if (!data.error) {
          if (data.result.ok === 1 && data.result.n === 1) {
            buildTodo(data.document);
            showSnackbar(data.message, 'info');
          }
        } else {
          showSnackbar(data.error.message, 'error');
        }
        resetInput(todoUserInput);
      });

  const getTodos = () =>
    fetch('/todos', METHODS.get)
      .then(parseResponse)
      .then(data => displayTodos(data));

  getTodos();
});
