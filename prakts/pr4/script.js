// Elements
const taskInput = document.getElementById('newTaskInput');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task on 'Enter'
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && taskInput.value.trim()) {
        addTask(taskInput.value.trim());
        taskInput.value = '';
    }
});

function addTask(taskText, completed = false, createdAt = new Date().toISOString()) {
    const taskItem = document.createElement('li');
    taskItem.dataset.createdAt = createdAt;

    // Create checkbox according to the completion status
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = completed; // Set checked state based on completion

    if (completed) {
        taskItem.classList.add('completed'); // Mark task as completed
        checkbox.style.display = 'none'; // Hide checkbox if completed
    }

    // Create task text element
    const taskTextElement = document.createElement('span');
    taskTextElement.className = 'taskText';
    taskTextElement.contentEditable = 'false';
    taskTextElement.textContent = `${taskText} (${formatDate(createdAt)})`;

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.textContent = '✖';

    // Append elements to task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(deleteBtn);

    // Append task to list
    taskList.appendChild(taskItem);
    saveTasks();

    // Checkbox logic
    checkbox.addEventListener('click', function() {
        taskItem.classList.toggle('completed');
        checkbox.style.display = 'none'; // Hide checkbox when completed
        saveTasks();
    });

    // Delete logic
    deleteBtn.addEventListener('click', function() {
        taskItem.remove();
        saveTasks();
    });

    // Edit logic
    taskTextElement.addEventListener('dblclick', function() {
        this.setAttribute('contenteditable', 'true');
        this.focus();
        this.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.setAttribute('contenteditable', 'false');
                saveTasks();
            }
        });
    });
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(taskItem => {
        tasks.push({
            text: taskItem.querySelector('.taskText').textContent.replace(/ \(\d{2}.\d{2}.\d{2}, \d{2}:\d{2}\)/, ''),
            completed: taskItem.classList.contains('completed'),
            createdAt: taskItem.dataset.createdAt
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTask(task.text, task.completed, task.createdAt);
    });
    loadFilterState();
}

// Date formatting
function formatDate(date) {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear().toString().slice(-2)}, ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

// Sorting tasks
document.getElementById('allTasksBtn').addEventListener('click', () => filterTasks('all'));
document.getElementById('completedTasksBtn').addEventListener('click', () => filterTasks('completed'));
document.getElementById('uncompletedTasksBtn').addEventListener('click', () => filterTasks('uncompleted'));

function filterTasks(filter) {
    taskList.querySelectorAll('li').forEach(taskItem => {
        const isCompleted = taskItem.classList.contains('completed');
        taskItem.style.display = (filter === 'all' || (filter === 'completed' && isCompleted) || (filter === 'uncompleted' && !isCompleted)) ? 'flex' : 'none';
    });
    saveFilterState(filter);
}

// Save filter state to localStorage
function saveFilterState(filter) {
    localStorage.setItem('taskFilter', filter);
}

// Load filter state from localStorage
function loadFilterState() {
    const savedFilter = localStorage.getItem('taskFilter') || 'all';
    filterTasks(savedFilter);
}
