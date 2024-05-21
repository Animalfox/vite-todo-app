// src/components/TodoApp.js

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

export class TodoApp {
  constructor(element) {
    this.tasks = [];
    this.completedTasks = [];
    this.element = element;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  bindEvents() {
    const addButton = this.element.querySelector('#add-task-button');
    const taskInput = this.element.querySelector('#task-input');

    addButton.addEventListener('click', () => this.addTask());
    taskInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.addTask();
      }
    });
  }

  addTask() {
    const taskText = this.element.querySelector('#task-input').value.trim();
    if (taskText) {
      const newTask = {
        id: generateId(),
        dateCreated: new Date(),
        dateCompleted: null,
        text: taskText,
      };
      this.tasks.push(newTask);
      this.element.querySelector('#task-input').value = '';
      this.render();
    }
  }

  toggleTaskCompletion(taskId) {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
      const [task] = this.tasks.splice(taskIndex, 1);
      task.dateCompleted = new Date();
      this.completedTasks.push(task);
      this.completedTasks.sort((a, b) => b.dateCompleted - a.dateCompleted);
    } else {
      const completedTaskIndex = this.completedTasks.findIndex(task => task.id === taskId);
      const [task] = this.completedTasks.splice(completedTaskIndex, 1);
      task.dateCompleted = null;
      this.tasks.push(task);
      this.tasks.sort((a, b) => a.dateCreated - b.dateCreated);
    }
    this.render();
  }

  deleteTask(taskId, isCompleted) {
    if (isCompleted) {
      this.completedTasks = this.completedTasks.filter(task => task.id !== taskId);
    } else {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
    this.render();
  }

  render() {
    const taskList = this.element.querySelector('#task-list');
    const completedList = this.element.querySelector('#completed-list');

    taskList.innerHTML = this.tasks.map(task => `
      <li>
        <label>
          <input type="checkbox" onclick="todoApp.toggleTaskCompletion('${task.id}')">
          ${task.text}
        </label>
        <button onclick="todoApp.deleteTask('${task.id}', false)">Delete</button>
      </li>
    `).join('');

    completedList.innerHTML = this.completedTasks.map(task => `
      <li>
        <label>
          <input type="checkbox" checked onclick="todoApp.toggleTaskCompletion('${task.id}')">
          ${task.text}
        </label>
        <button onclick="todoApp.deleteTask('${task.id}', true)">Delete</button>
      </li>
    `).join('');
  }
}

export function setupTodoApp(element) {
  const todoApp = new TodoApp(element);
  window.todoApp = todoApp; // Для доступа к методам через глобальный объект
}
