//const initialValue = [];
//localStorage.setItem('todoList', JSON.stringify(initialValue));

const initialValue2 = [];
localStorage.setItem('checkedTodos', JSON.stringify(initialValue2));

const initialValue3 = [];
localStorage.setItem('urgentTodos', JSON.stringify(initialValue3));

document.getElementById("checkedItems").style.display = "none";
document.getElementById("urgentItems").style.display = "none";

renderTodoList(JSON.parse(localStorage.getItem('todoList')));

function renderTodoList(list) {
  let todoListHTML = '';

  list.forEach(input => {
    const {name, dueDate} = input;
    let html = `
      <div class="name-output">${name}</div>
      <div class="due-date-output">${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">
        Delete
      </button>
      <button class="done-todo-button" data-todo-name="${name}" data-todo-due-date="${dueDate}">
        Done
      </button>
      <button class="urgent-todo-button" data-todo-name="${name}" data-todo-due-date="${dueDate}">
        Urgent
      </button>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, position) => {
      deleteButton.addEventListener('click', () => {
        list.splice(position, 1);
        renderTodoList(list);
      });
    });

  document.querySelectorAll('.done-todo-button')
    .forEach((doneButton, position) => {
      doneButton.addEventListener('click', () => {
        const todoName = doneButton.dataset.todoName;
        const todoDueDate = doneButton.dataset.todoDueDate;
        list.splice(position, 1);
        renderTodoList(list);

        const checkedTodos = JSON.parse(localStorage.getItem('checkedTodos'));
        checkedTodos.push({
          name: todoName,
          dueDate: todoDueDate
        });
        localStorage.setItem('checkedTodos', JSON.stringify(checkedTodos));
      });
    });

  document.querySelectorAll('.urgent-todo-button')
    .forEach((urgentButton, position) => {
      urgentButton.addEventListener('click', () => {
        const todoName = urgentButton.dataset.todoName;
        const todoDueDate = urgentButton.dataset.todoDueDate;
        list.splice(position, 1);
        renderTodoList(list);

        const urgentTodos = JSON.parse(localStorage.getItem('urgentTodos'));
        urgentTodos.push({
          name: todoName,
          dueDate: todoDueDate
        });
        localStorage.setItem('urgentTodos', JSON.stringify(urgentTodos));
      });
    });
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = document.querySelector('.js-name-input').value;
  const dueDate = document.querySelector('.js-due-date-input').value;

  const todoList = JSON.parse(localStorage.getItem('todoList'));

  todoList.push({
    name: name,
    dueDate: dueDate
  });

  localStorage.setItem('todoList', JSON.stringify(todoList));

  inputElement.value = '';

  renderTodoList(todoList);
}

document.querySelector('.js-checked-button')
  .addEventListener('click', () => {
    var x = document.getElementById("mainPage");
    if(x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
      document.getElementById("checkedItems").style.display = "block";
      showCheckedTodoList(JSON.parse(localStorage.getItem('checkedTodos')));
    }
  });

document.querySelector('.urgent-events-button')
  .addEventListener('click', () => {
    var x =  document.getElementById("mainPage");
    if(x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
      document.getElementById("urgentItems").style.display = "block";
      showUrgentTodoList(JSON.parse(localStorage.getItem('urgentTodos')));
    }
  });

document.querySelector('.js-back-button')
  .addEventListener('click', () => {
    var x = document.getElementById("checkedItems");
    if(x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
      document.getElementById("mainPage").style.display = 'block';
    }
  });

document.querySelector('.urgent-back-button')
  .addEventListener('click', () => {
    var x = document.getElementById("urgentItems");
    if(x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
      document.getElementById("mainPage").style.display = 'block';
    }
  });

function showCheckedTodoList(checkedTodoList) {
  let checkedHTML = '';
  checkedTodoList.forEach((todo) => {
    const {name, dueDate} = todo;
  
    let html = `
      <div class="name-output">${name}</div>
      <div class="due-date-output">${dueDate}</div>
      <button class="delete-checked-todo-button js-delete-checked-todo-button">
        Delete
      </button>
    `;

    checkedHTML += html;
  });

  document.querySelector('.js-checked-todo-list')
  .innerHTML = checkedHTML;

  document.querySelectorAll('.js-delete-checked-todo-button')
  .forEach((button, position) => {
    button.addEventListener('click', () => {
      checkedTodoList.splice(position, 1);
      showCheckedTodoList(checkedTodoList);
    });
  });
}

function showUrgentTodoList(urgentList) {
  let urgentHTML = '';

  urgentList.forEach((todo) => {
    const {name, dueDate} = todo;

    let html = `
      <div class="name-output">${name}</div>
      <div class="due-date-output">${dueDate}</div>
      <button class="delete-urgent-todo-button js-delete-urgent-todo-button">
        Delete
      </button>
    `;

    urgentHTML += html;
  });

  document.querySelector('.js-urgent-todo-list')
  .innerHTML = urgentHTML;

  document.querySelectorAll('.js-delete-urgent-todo-button')
    .forEach((button, position) => {
      button.addEventListener('click', () => {
        urgentList.splice(position, 1);
      showUrgentTodoList(urgentList);
      });
    });
}


function APIcall() {
  console.log("making API call...");
  const userAction = async () => {
    const response = await fetch('https://localhost:7170/api/todos');
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson);
  }
  userAction();
}

APIcall();

