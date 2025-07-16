// MODELS
let tasks = [];
let focus = null;
let goals = [];

// TYPING ANIMATION
const title = document.querySelector('#typed');
const fullTitle = "TO-DO LIST";
let typed = 0;
const id = setInterval(newLetter, 120);

// NEW LETTER
function newLetter(){
    if(typed < fullTitle.length){
        title.innerHTML += fullTitle[typed];
        typed++;
    }
    else {
        clearInterval(id); 
        document.querySelector('#blinker').classList.add('hide');
    }
}

// EVENT LISTENERS
document.getElementById('add-task').addEventListener('click', addTask);
document.getElementById('all-btn').addEventListener('click', displayAllTasks);
document.getElementById('active-btn').addEventListener('click', displayActiveTasks);
document.getElementById('completed-btn').addEventListener('click', displayCompletedTasks);
document.querySelector('.quick-add').addEventListener('click', addFocus);

// DISPLAY DATE
document.getElementsByClassName("date")[0].innerHTML = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

// ADD FOCUS
function addFocus() {

    // Check if there is already a focus
    if (focus != null) {

        // Replace old focus with new one -- set the old task as false
        if (!confirm("You've already set a focus for today! Replace it with a new one?")) return;
        tasks.forEach(task => {
            if (task.focus) task.focus = false;
        })
    }

    // Ask user for focus
    const userInput = prompt("What is your focus today?");

    // No input
    if (!userInput) alert("No focus entered!");

    else {
        // Focus
        focus = userInput;
        renderFocus(userInput);

        // New task
        const task = {
            text: userInput,
            completed: false,
            focus: true,
            createdAt: new Date()
        };
        tasks.push(task);
        renderTasks(); // Render tasks
    }
}

// RENDER FOCUS
function renderFocus(focusText) {

    // Show today div
    const today = document.querySelector('.today');
    today.classList.remove('hidden');

    // Display focus name
    const focusLabel = document.getElementById('focus-description');
    focusLabel.innerText = focusText;

    // Disable button
    document.querySelector('.quick-add').classList.add('disabled');
}

// COMPLETE FOCUS
function completeFocus(){
    updateProgress(100);
}

// UPDATE PROGRESS
function updateProgress(value) {

    const progressLabel = document.querySelector('.progress-label');

    // If task complete
    if (value == 100) {

        // Update model
        const focusTask = tasks.find(task => task.focus);
        focusTask.completed = true;

        // Update side bar
        const focusTaskItem = document.querySelector('.task-item.focus');
        focusTaskItem.classList.add('completed');

        // Update task list
        focusTaskItem.checked = true;
        renderTasks();
    }

    progressLabel.innerText = `${value}% complete`;
}

// ADD TASKS
function addTask() {

    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    // If user didn't enter a task, show an alert
    if (!taskText) {
        alert('Please enter a task.');
        return;
    }

    // Create a new task object and add it to the tasks array
    const task = {
        text: taskText,
        completed: false,
        focus: false,
        createdAt: new Date()
    };
    tasks.push(task);


    taskInput.value = ''; // Clear input field
    renderTasks(); // Render tasks
}

// RENDER TASKS
function renderTasks() {

    // Task list
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
        if (task.completed)
            taskItem.classList.add('completed');
        if (task.focus)
            taskItem.classList.add('focus');
        taskList.appendChild(taskItem);
    });

    // Stats
    const remaining = document.querySelector('#remaining h4');
    const done = document.querySelector('#done h4');
    const progress = document.querySelector('#progress h4');
    const today = document.querySelector('#today h4');

    const remainingCount = tasks.filter(task => !task.completed).length;
    remaining.innerText = `${remainingCount}`;

    const completedCount = tasks.filter(task => task.completed).length;
    done.innerText = `${completedCount}`;

    const completedPercent = 100 * (completedCount / tasks.length);
    progress.innerText = `${Math.round(completedPercent)}%`;

    const todayString = new Date().toDateString();
    const tasksAddedToday = tasks.filter(task => new Date(task.createdAt).toDateString() == todayString).length;
    today.innerText = `${tasksAddedToday}`;
}

// TOGGLE TASK COMPLETION
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed; // Toggle completion status
    if(tasks[index].focus) completeFocus();
    renderTasks(); // Re-render tasks
}

// DELETE TASK
function deleteTask(index) {

    if (confirm("Delete this task?")) {
        tasks.splice(index, 1); // Remove task from array
        renderTasks(); // Re-render tasks
    }
}

// DISPLAY ALL TASKS
function displayAllTasks() {
    const tasks = document.querySelectorAll('.task-item');
    document.querySelector('#active-btn').classList.remove('selected');
    document.querySelector('#completed-btn').classList.remove('selected');
    document.querySelector('#all-btn').classList.add('selected');
    tasks.forEach(task => {
        task.style.display = 'flex';
    });
}

// DISPLAY ACTIVE TASKS
function displayActiveTasks() {
    const tasks = document.querySelectorAll('.task-item');
    document.querySelector('#all-btn').classList.toggle('selected');
    document.querySelector('#completed-btn').classList.remove('selected');
    document.querySelector('#active-btn').classList.add('selected');
    tasks.forEach(task => {
        if (task.classList.contains('completed')) {
            task.style.display = 'none';
        }
        else {
            task.style.display = 'flex';
        }
    });
}

// DISPLAY COMPLETED TASKS
function displayCompletedTasks() {
    const tasks = document.querySelectorAll('.task-item');
    document.querySelector('#active-btn').classList.remove('selected');
    document.querySelector('#all-btn').classList.remove('selected');
    document.querySelector('#completed-btn').classList.add('selected');
    tasks.forEach(task => {
        if (task.classList.contains('completed')) {
            task.style.display = 'flex';
        }
        else {
            task.style.display = 'none';
        }
    });
}