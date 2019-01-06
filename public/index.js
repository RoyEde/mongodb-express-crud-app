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

document.addEventListener('DOMContentLoaded', function() {
  const display = document.getElementById('display');
  const form = document.getElementById('form');
  const todoUserInput = document.getElementById('todoUserInput');

  const displayTodos = data => {
    let content = '';
    data.forEach(todo => {
      let ids = buildIDS(todo);
      content += buildTemplate(todo, ids);
      // editTodo(todo, ids.todoId, ids.editID);
      // deleteTodo(todo, ids.todoId, ids.deleteID);
    });
    display.innerHTML = content;
  };

  const getTodos = () =>
    fetch('/todos', { method: 'get' })
      .then(response => response.json())
      .then(data => console.log(data) || displayTodos(data));

  getTodos();
});
