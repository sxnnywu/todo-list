// TASK MODEL
let tasks = [];

// EVENT LISTENERS
document.getElementById('add-task').addEventListener('click', addTask);
document.getElementById('all-btn').addEventListener('click', displayAllTasks);
document.getElementById('active-btn').addEventListener('click', displayActiveTasks);
document.getElementById('completed-btn').addEventListener('click', displayCompletedTasks);

// DISPLAY DATE
document.getElementsByClassName("date")[0].innerHTML = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

// ADD FOCUS
function addFocus() {

}

// ADD TASKS
function addTask() {

    console.log('Adding task...');

    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    // If user didn't enter a task, show an alert
    if (!task) {
        alert('Please enter a task.');
        return;
    }

    // Create a new task object and add it to the tasks array
    const task = {
        text: taskText,
        completed: false
    };
    tasks.push(task);


    taskInput.value = ''; // Clear input field
    renderTasks(); // Render tasks
}

// RENDER TASKS
function renderTasks() {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">
            <label for="task-${index}">${task.text}</label>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskList.appendChild(taskItem);
    });
}

// DISPLAY ALL TASKS
function displayAllTasks() {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => {
        task.style.display = 'flex';
    });
}

// DISPLAY ACTIVE TASKS
function displayActiveTasks() {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => {
        if (task.classList.contains('completed')) {
            task.style.display = 'none';
        } else {
            task.style.display = 'flex';
        }
    });
}

// DISPLAY COMPLETED TASKS
function displayCompletedTasks() {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => {
        if (task.classList.contains('completed')) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}