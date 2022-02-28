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
