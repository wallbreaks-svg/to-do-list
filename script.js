const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const counter = document.getElementById('counter');

function updateStatus() {
  emptyState.style.display = taskList.children.length === 0 ? 'block' : 'none';
  const left = taskList.querySelectorAll('.task-text:not(.done)').length;
  counter.textContent = left + ' left';
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;

  const li = document.createElement('li');

  const box = document.createElement('span');
  box.className = 'checkbox';

  const span = document.createElement('span');
  span.textContent = text;
  span.className = 'task-text';

  function toggleDone() {
    span.classList.toggle('done');
    box.classList.toggle('checked');
    updateStatus();
  }
  span.addEventListener('click', toggleDone);
  box.addEventListener('click', toggleDone);

  const delBtn = document.createElement('button');
  delBtn.textContent = 'del';
  delBtn.className = 'delete-btn';
  delBtn.addEventListener('click', () => {
    li.remove();
    updateStatus();
  });

  li.appendChild(box);
  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);

  taskInput.value = '';
  taskInput.focus();
  updateStatus();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

updateStatus();