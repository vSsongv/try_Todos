const $todoList = document.querySelector('.todo-list');
const $todoForm = document.querySelector('.new-todo');
const $todoCnt = document.querySelector('.todo-count');
const $clearCompleted = document.querySelector('.clear-completed');
$clearCompleted.style.display = 'none';

let accCnt = 1;
let curCnt = 0;
let compCnt = 0;

// todo cnt part
const updateTodoCnt = cnt => {
  $todoCnt.textContent = `${cnt} item left`;
};

const deleteClass = (target, className) => {
  const $target = document.querySelector(target);
  $target.classList.remove(className);
};

const addTodo = () => {
  const $li = document.createElement('li'); // li요소
  $li.dataset.id = accCnt++;
  const $div = document.createElement('div'); // div 요소
  $div.className = 'view';
  const $input = document.createElement('input'); // input
  $input.type = 'checkbox';
  $input.className = 'toggle';
  const $label = document.createElement('label'); // label
  $label.textContent = $todoForm.value.trim();
  const $button = document.createElement('button'); // button
  $button.className = 'destroy';
  const $editInput = document.createElement('input');
  $editInput.className = 'edit';
  $editInput.value = $todoForm.value.trim();
  $editInput.style.display = 'none';

  $div.appendChild($input);
  $div.appendChild($label);
  $div.appendChild($button);
  $li.appendChild($div);
  $li.appendChild($editInput);

  $todoList.insertBefore($li, $todoList.firstChild); // ul의 첫번째 자식으로 append
};

$todoForm.addEventListener('keyup', addTodo); // enter key를 눌렀다가 뗏을 때 저장되어야 함.

// delete todo part
const deleteTodo = e => {
  if (e.target.className === 'destroy') {
    const $target = e.target.parentNode;
    if ($target.querySelector('.toggle').checked === true) {
      compCnt -= 1;
    }
    curCnt -= 1;
    updateTodoCnt(curCnt);
    e.target.parentNode.parentNode.remove();
  }
};

const $destroyButton = document.querySelector('.todo-list');
$destroyButton.addEventListener('click', deleteTodo);

// completed todo
const completedTodo = e => {
  if (e.target.className === 'toggle') {
    if (e.target.checked === true) compCnt += 1;
    else compCnt -= 1;
  }
  if (compCnt > 0) $clearCompleted.style.display = 'block';
  else $clearCompleted.style.display = 'none';
};

const $completed = document.querySelector('.todo-list');
$completed.addEventListener('change', completedTodo);

// edit todo content part
const editTodo = e => {
  if (e.target.tagName === 'LABEL') {
    const $content = e.target.textContent;
    const todos = [...document.querySelector('.todo-list').children];
    const $targetTodo = todos.find(todo => todo.textContent === $content);
    $targetTodo.firstChild.style.display = 'none';
    $targetTodo.lastChild.style.display = 'block';
  } else if (e.code === 'Enter') {
    const $li = e.target.parentNode;
    $li.firstChild.querySelector('label').textContent = e.target.value;
    $li.firstChild.style.display = 'block';
    e.target.style.display = 'none';
  }
};

const $todo = document.querySelector('.todo-list');
$todo.addEventListener('dblclick', editTodo);
$todo.addEventListener('keyup', editTodo);

// toggle all part
const toggleAll = () => {
  const $todos = $todoList.querySelectorAll('li');
  $todos.forEach(todo => {
    const $checked = todo.querySelector('.toggle').checked;
    todo.querySelector('.toggle').checked = !$checked;
  });
};

const $allToggleButton = document.querySelector('.toggle-all');
$allToggleButton.addEventListener('change', toggleAll);

// show all todos part
const showAllTodos = e => {
  deleteClass('#active', 'selected');
  deleteClass('#completed', 'selected');
  e.target.className = 'selected';
  const $todos = $todoList.querySelectorAll('li');
  $todos.forEach(todo => {
    todo.style.display = 'block'; // all li need to be visible.
  });
};

const $showAllButton = document.getElementById('all');
$showAllButton.addEventListener('click', showAllTodos);

// show active todos part
const showActiveTodos = e => {
  deleteClass('#all', 'selected');
  deleteClass('#completed', 'selected');
  e.target.className = 'selected';
  const $todos = $todoList.querySelectorAll('li');
  $todos.forEach(todo => {
    todo.style.display = todo.querySelector('.toggle').checked === false ? 'block' : 'none';
  });
};

const $showActiveButton = document.getElementById('active');
$showActiveButton.addEventListener('click', showActiveTodos);

// show completed todos part
const showCompletedTodos = e => {
  deleteClass('#all', 'selected');
  deleteClass('#active', 'selected');
  e.target.className = 'selected';
  const $todos = $todoList.querySelectorAll('li');
  $todos.forEach(todo => {
    todo.style.display = todo.querySelector('.toggle').checked === true ? 'block' : 'none';
  });
};

const $showCompletedButton = document.getElementById('completed');
$showCompletedButton.addEventListener('click', showCompletedTodos);

// clear completed todos;
const clearAllComp = () => {
  const $todos = $todoList.querySelectorAll('li');
  $todos.forEach(todo => {
    if (todo.querySelector('.toggle').checked === true) {
      compCnt -= 1;
      curCnt -= 1;
      todo.remove();
    }
  });
  updateTodoCnt(curCnt);
  if (compCnt > 0) $clearCompleted.style.display = 'block';
  else $clearCompleted.style.display = 'none';
};

const $clearCompletedButton = document.querySelector('.clear-completed');
$clearCompletedButton.addEventListener('click', clearAllComp);
