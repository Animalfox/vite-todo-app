import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupTodoApp } from '/components/TodoApp';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Todo App</h1>
    <input type="text" id="task-input" placeholder="Enter a new task" />
    <button id="add-task-button">Add Task</button>
    <h2>Tasks</h2>
    <ul id="task-list"></ul>
    <h2>Completed Tasks</h2>
    <ul id="completed-list"></ul>
  </div>
`

setupTodoApp(document.querySelector('#app'));
