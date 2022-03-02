const express = require('express');

const app = express();
const port = 9000;

let todos = [
  { id: 3, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'HTML', completed: false },
];

// get 방식으로 root uri에 접근했을 때 콜백 함수(send)를 실행해라.
// res. 이기 때문에 server가 client에게 Hello라는 문자열을 전송하겠다.
// 잘 받아지면 기본은 렌더링이 됨!
// app.get('/', (req, res) => {
// 이 안에가 뭔지에 따라 보내지는게 달라짐.
// 아래는 순수 문자열이므로 순수 문자열이 나오지만,
// res.send('Hello');
// html인 경우 html로 보내진다. -> express의 기능.
// res.send('<h1>Hello</h1>');
// });

// express가 static 파일을 제공하는 기능
// public 폴더라고 알려줌.
app.use(express.static('public'));
app.use(express.json());

// GET /todos
app.get('/todos', (req, res) => {
  // 원래는 db에서 받아오는 코드 필요

  // 더미데이터를 보냄.
  res.send(todos);
});

app.post('/todos', (req, res) => {
  // 페이로드를 받아야 함.
  console.log(req.body);
  todos = [req.body, ...todos];
  // 더미데이터를 보냄.
  res.send(todos);
});

/*
todos 배열의 모든 요소의 completed를 payload와 일치시킨다.
PATCH http://localhost:9000/todos
content-type: application/json

{
    "completed": true
}
*/
app.patch('/todos', (req, res) => {
  const { completed } = req.body;
  /// console.log(completed, typeof completed); true boolean

  todos = todos.map(todo => ({ ...todo, completed }));
  res.send(todos);
});

/*
# payload => content or completed
PATCH http://localhost:9000/todos/4
content-type: application/json

{
    "completed": true or "content" : "something"
}
*/
// 변수는 콜론으로
// payload는 body로 받고,
// 변수는 params으로 받는다.
app.patch('/todos/:id', (req, res) => {
  // console.log(req.params); { id: '3' } -> id는 문자열이므로 숫자로 변경해야함.
  const { id } = req.params;
  const payload = req.body;

  // payload는 객체니까 풀어줘야됨.
  todos = todos.map(todo => (todo.id === +id ? { ...todo, ...payload } : todo));
  res.send(todos);
});

// DELETE  http://localhost:9000/todos/4
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  todos = todos.filter(todo => todo.id !== +id);
  res.send(todos);
});

// DELETE  http://localhost:9000/todos?completed=true
app.delete('/todos', (req, res) => {
  const { completed } = req.query;
  // console.log(completed); string

  todos = todos.filter(todo => JSON.parse(completed) !== todo.completed);
  res.send(todos);
});

// 콜백은 웹서버가 성공적으로 가동되면 실행됨./
// 언제 요청이 올 지 모르니까 계속 요청이 오고 있는지 기다리는 역할.
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
