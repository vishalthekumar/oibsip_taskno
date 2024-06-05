let pendingTasks = [];
let completedTasks = [];

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const task = {
            text: taskText,
            timestamp: new Date().toLocaleString()
        };
        pendingTasks.push(task);
        taskInput.value = "";
        renderTasks();
    }
}

function completeTask(index) {
    const task = pendingTasks.splice(index, 1)[0];
    completedTasks.push({ ...task, completedAt: new Date().toLocaleString() });
    renderTasks();
}

function deleteTask(index, isCompleted) {
    if (isCompleted) {
        completedTasks.splice(index, 1);
    } else {
        pendingTasks.splice(index, 1);
    }
    renderTasks();
}

function editTask(index, isCompleted) {
    const newTaskText = prompt("Edit the task:", isCompleted ? completedTasks[index].text : pendingTasks[index].text);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        if (isCompleted) {
            completedTasks[index].text = newTaskText.trim();
        } else {
            pendingTasks[index].text = newTaskText.trim();
        }
        renderTasks();
    }
}

function renderTasks() {
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');

    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    pendingTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            ${task.text} <small>Added: ${task.timestamp}</small>
            <div>
                <button class="complete-btn" onclick="completeTask(${index})">Complete</button>
                <button class="edit-btn" onclick="editTask(${index}, false)">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index}, false)">Delete</button>
            </div>
        `;
        pendingTasksList.appendChild(taskItem);
    });

    completedTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('completed');
        taskItem.innerHTML = `
            ${task.text} <small>Completed: ${task.completedAt}</small>
            <div>
                <button class="edit-btn" onclick="editTask(${index}, true)">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index}, true)">Delete</button>
            </div>
        `;
        completedTasksList.appendChild(taskItem);
    });
}
