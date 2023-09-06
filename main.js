const btnAddEle = document.querySelector('button'); // Button to add tasks
const taskName = document.querySelector('#content'); // Input field for task content
const resultEle = document.querySelector('#result'); // Display area for the list of tasks

btnAddEle.addEventListener('click', handleButtonClick);

// Display the initial list of tasks
handleRenderTasks();

const handleButtonClick = () => {
    // Get the input value, trim whitespace
    const inputValue = taskName.value.trim();
    if (!inputValue) {
        alert('Please enter a task name !!');
        return;
    }

    const taskId = btnAddEle.getAttribute('data-id');  // Get the id value from the data-id attribute of the add task button
    const tasks = getTasksFromLocalStorage();
    const task = { name: inputValue };

    // Check if taskId already exists, then update the task, otherwise add a new task
    if (taskId !== null) {
        handleUpdateTask(taskId, task, tasks);
    } else {
        handleAddTask(task, tasks);
    }

    taskName.value = '';
    handleRenderTasks();
}

const handleUpdateTask = (id, updatedTask, tasks) => {
    tasks[id] = updatedTask; // Update task content by id
    btnAddEle.removeAttribute('data-id'); // Remove the data-id attribute from the add task button to return to the "add new" mode
    saveTasksToLocalStorage(tasks);
}

const handleAddTask = (newTask, tasks) => {
    tasks.push(newTask);
    saveTasksToLocalStorage(tasks);
}

const handleDeleteTask = (id) => {
    if (confirm("Do you want to delete it?")) {
        const tasks = getTasksFromLocalStorage();
        tasks.splice(id, 1); // Delete the task by id
        saveTasksToLocalStorage(tasks);
        handleRenderTasks();
    }
}

const handleRenderTasks = () => {
    const tasks = getTasksFromLocalStorage();
    let content = '<ul>'

    tasks.forEach((task, index) => {
        content += `<li>
            <div class="task-name">${task.name}</div>
            <a href="#" onclick="editTask(${index})">Edit</a>
            <a href="#" onclick="deleteTask(${index})">Delete</a>
         </li>`;
    });

    content += '</ul>';
    resultEle.innerHTML = content;
}

const handleEditTask = (id) => {
    const tasks = getTasksFromLocalStorage();
    const task = tasks[id]; // Get the task to edit

    // Display the task name in the input field and update the data-id attribute on the add task button for editing
    if (task) {
        taskName.value = task.name;
        btnAddEle.setAttribute('data-id', id);
    }
}

const getTasksFromLocalStorage = () => {
    // Get the list of tasks from Local Storage or return an empty array if there is no data
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
}

const saveTasksToLocalStorage = (tasks) => {
    // Save the list of tasks to Local Storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
