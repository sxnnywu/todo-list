// MODELS
let tasks = [];
let focus = null;

// EVENT LISTENERS
document.getElementById('add-task').addEventListener('click', addTask);
document.getElementById('all-btn').addEventListener('click', displayAllTasks);
document.getElementById('active-btn').addEventListener('click', displayActiveTasks);
document.getElementById('completed-btn').addEventListener('click', displayCompletedTasks);
document.getElementById('quick-add').addEventListener('click', addFocus);

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
    if (focus != null){

        // Replace old focus with new one -- set the old task as false
        if(!confirm("You've already set a focus for today! Replace it with a new one?")) return;
        tasks.forEach(task => {
            if(task.focus) task.focus = false;
        })
    }

    // Ask user for focus
    const userInput = prompt("What is your focus today?");

    // No input
    if(!userInput) alert("No focus entered!");

    else{
        // Focus
        focus = userInput;
        renderFocus(userInput);
        
        // New task
        const task = {
            text: userInput,
            completed: false,
            focus: true
        };
        tasks.push(task);
        console.log(tasks);
        renderTasks(); // Render tasks
    }
}

// RENDER FOCUS
function renderFocus(focusText){
    
    // Show today div
    const today = document.querySelector('.today');
    today.classList.remove('hidden');

    // Display focus name
    const focusLabel = document.getElementById('focus-description');
    focusLabel.innerText = focusText;

    // Disable button
    document.querySelector('#quick-add').disabled = true;
}

// UPDATE PROGRESS
function updateProgress(value){

    const progressLabel = document.querySelector('.progress-label');

    // If task complete
    if(value == 100){
        const focusTask = tasks.find(task => task.focus);
        focusTask.completed = true;
        const focusTaskItem = document.querySelector('.task-item.focus');
        focusTaskItem.classList.add('completed');
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
        focus: false
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
        if (task.completed)
            taskItem.classList.add('completed');
        if (task.focus) 
            taskItem.classList.add('focus');
        taskList.appendChild(taskItem);
    });
}

// TOGGLE TASK COMPLETION
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed; // Toggle completion status
    renderTasks(); // Re-render tasks
}

// DELETE TASK
function deleteTask(index) {

    if(confirm("Delete this task?")){
        tasks.splice(index, 1); // Remove task from array
        renderTasks(); // Re-render tasks
    }   
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
        } 
        else {
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
        } 
        else {
            task.style.display = 'none';
        }
    });
}