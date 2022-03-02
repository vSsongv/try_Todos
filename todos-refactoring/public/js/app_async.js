const $toggleAll = document.querySelector('.toggle-all');
const $newTodo = document.querySelector('.new-todo');
const $todoList = document.querySelector('.todo-list');
const $main = document.querySelector('.main');
const $footer = document.querySelector('.footer');
const $todoCount = document.querySelector('.todo-count');
const $filters = document.querySelector('.filters');
const $clearCompleted = document.querySelector('.clear-completed');

/**
 * @typedef {Object} Todo
 * @property {number} id
 * @property {string} content
 * @property {boolean} completed
 */

/** @typedef {'all'|'active'|'completed'} Filter */

/** @type {Todo[]} */
let todos = [];
/** @type {Filter} */
let currentFilter = 'all';

const render = () => {
  const _todos = todos.filter(todo =>
    currentFilter === 'completed' ? todo.completed : currentFilter === 'active' ? !todo.completed : true
  );

  $todoList.innerHTML = _todos
    .map(
      ({ id, content, completed }) => `
        <li data-id="${id}">
          <div class="view">
            <input type="checkbox" class="toggle" ${completed ? 'checked' : ''}/>
            <label>${content}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${content}" />
        </li>`
    )
    .join('');

  // todo의 갯수가 0이면 .main, .footer 요소를 비표시한다.
  [$main, $footer].forEach($el => $el.classList.toggle('hidden', todos.length === 0));

  const activeTodos = todos.filter(todo => !todo.completed);

  // activeTodos의 갯수가 0 또는 1개면 'n item left' todo의 갯수가 2개 이상이면 'n items left'
  $todoCount.textContent = `${activeTodos.length} ${activeTodos.length > 1 ? 'items' : 'item'} left`;

  // completed 상태인 todo가 없으면 비표시한다
  const completedTodos = todos.filter(todo => todo.completed);
  $clearCompleted.classList.toggle('hidden', completedTodos.length === 0);
};

/** @type {(_todos: Todo[]) => void} */
const setTodos = _todos => {
  todos = _todos;
  console.log('[todos]', todos);

  render();
};

/** @type {(filter: Filter) => void} */
const setFilter = filter => {
  currentFilter = filter;
  render();
};

const fetchTodos = async () => {
  try {
    const { data: todos } = await axios.get('/todos');
    setTodos(todos);
  } catch (e) {
    console.error(e);
  }
};

const toggleAllTodos = async completed => {
  try {
    const { data: todos } = await axios.patch('/todos', { completed });
    setTodos(todos);
  } catch (e) {
    console.error(e);
  }
};

const generateId = () => Math.max(...todos.map(todo => todo.id), 0) + 1;

const addTodo = async content => {
  try {
    const { data: todos } = await axios.post('/todos', { id: generateId(), content, completed: false });
    setTodos(todos);
  } catch (e) {
    console.error(e);
  }
};

const toggleTodo = async id => {
  const { completed } = todos.find(todo => todo.id === +id);
  try {
    const { data: todos } = await axios.patch(`/todos/${id}`, { completed: !completed });
    setTodos(todos);
  } catch (e) {
    console.error(e);
  }
};

const updateTodoContent = async (id, content) => {
  try {
    const { data: todos } = await axios.patch(`/todos/${id}`, { content });
    setTodos(todos);
  } catch (e) {
    console.error(e);
  }
};

const removeTodo = async id => {
  try {
    const { data: todos } = await axios.delete(`/todos/${id}`);
    setTodos(todos);
  } catch (e) {
    console.error(e);
  }
};

const removeAllCompletedTodos = async () => {
  try {
    const { data: todos } = await axios.delete('/todos?completed=true');
    setTodos(todos);
  } catch (e) {
    console.error(e);
  }
};

// Event bindings
// initial rendering
window.addEventListener('DOMContentLoaded', fetchTodos);

// toggle all todo completed
$toggleAll.onchange = e => {
  toggleAllTodos(e.target.checked);
};

// add todo
$newTodo.onkeyup = e => {
  if (e.key !== 'Enter') return;

  const content = e.target.value.trim();
  if (content !== '') addTodo(content);
  e.target.value = '';
};

// toggle todo completed
$todoList.onchange = e => {
  // input text에서 change 이벤트가 발생하는 경우도 있다.
  if (!e.target.classList.contains('toggle')) return;
  // toggleTodo(e.target.parentNode.parentNode.dataset.id);
  // https://caniuse.com/?search=closest
  toggleTodo(e.target.closest('li').dataset.id);
};

// edit mode
$todoList.ondblclick = e => {
  if (!e.target.matches('.view > label')) return;
  // e.target.parentNode.parentNode.classList.add('editing');
  e.target.closest('li').classList.add('editing');
};

// update todo content
$todoList.onkeyup = e => {
  if (e.key !== 'Enter' || !e.target.classList.contains('edit')) return;
  updateTodoContent(e.target.closest('li').dataset.id, e.target.value);
  // editTodoContent에 의해 rerendering되므로 .editing을 제거할 필요가 없다.
  // e.target.closest('li').classList.remove('editing');
};

// remove todo
$todoList.onclick = e => {
  if (!e.target.classList.contains('destroy')) return;
  removeTodo(e.target.closest('li').dataset.id);
};

// filter todos
$filters.onclick = e => {
  if (!e.target.matches('.filters > li > a')) return;

  $filters.querySelectorAll('a').forEach($filter => {
    $filter.classList.toggle('selected', $filter === e.target);
  });
  // $filters.querySelector('a.selected').classList.remove('selected');
  // e.target.classList.add('selected');

  setFilter(e.target.id);
};

// remove all completed todos
$clearCompleted.onclick = removeAllCompletedTodos;
