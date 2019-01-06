const resetInput = input => (input.value = '');

const buildIDS = todo => ({
  editID: `edit_${todo._id}`,
  deleteID: `delete_${todo._id}`,
  listItemID: `listItem_${todo._id}`,
  todoID: `todo_${todo._id}`
});

const buildTemplate = (todo, ids) =>
  `<li class="container__list__item" id="${ids.listItemID}">
      <p id="${ids.todoID}">${todo.todo}</p>
      <button type="button" class="container__list__item__button--edit" id="${
        ids.editID
      }">
        Edit
      </button>
      <button type="button" class="container__list__item__button--delete" id="${
        ids.editID
      }">
        Delete
      </button>
    </li>`;

document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const form = document.getElementById('form');
  const todoUserInput = document.getElementById('todoUserInput');

  const displayTodos = data => {
    let content = '';
    data.forEach(todo => {
      let ids = buildIDS(todo);
      content += buildTemplate(todo, ids);
      // editTodo(todo, ids.todoID, ids.editID);
      // deleteTodo(todo, ids.todoID, ids.deleteID);
    });
    display.innerHTML = content;
  };

  form.onsubmit = event =>
    event.preventDefault() ||
    fetch('/', {
      method: 'post',
      body: JSON.stringify({ todo: todoUserInput.value }),
      headers: {
        'Content-Type': 'application/json; chatser=utf-8'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.result.ok == 1 && data.result.n == 1) {
          let ids = buildIDS(data.document);
          display.innerHTML += buildTemplate(data.document, ids);
          // editTodo(data.document, ids.todoID, ids.editID);
          // deleteTodo(data.document, ids.todoID, ids.deleteID);
        }
        resetInput(todoUserInput);
      });

  const getTodos = () =>
    fetch('/todos', { method: 'get' })
      .then(response => response.json())
      .then(data => console.log(data) || displayTodos(data));

  getTodos();
});
