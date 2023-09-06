const btnAddEle = document.querySelector('button'); // Nút thêm công việc
const taskName = document.querySelector('#content'); // Ô nhập nội dung công việc
const resultEle = document.querySelector('#result'); // Kết quả hiển thị danh sách công việc

btnAddEle.addEventListener('click', handleButtonClick);

// Hiển thị danh sách công việc ban đầu
renderTasks();

function handleButtonClick() {
    // Lấy giá trị nhập vào, loại bỏ khoảng trắng đầu và cuối
    const inputValue = taskName.value.trim();
    if (!inputValue) {
        alert('Vui lòng nhập tên công việc !!');
        return;
    }

    const taskId = btnAddEle.getAttribute('data-id');  // Lấy giá trị id từ thuộc tính data-id của nút thêm công việc
    const tasks = getTasksFromLocalStorage();
    const task = { name: inputValue };

    // Kiểm tra nếu taskId đã tồn tại, thì cập nhật công việc, ngược lại thêm công việc mới
    if (taskId !== null) {
        updateTask(taskId, task, tasks);
    } else {
        addTask(task, tasks);
    }

    taskName.value = '';
    renderTasks();
}

function updateTask(id, updatedTask, tasks) {
    tasks[id] = updatedTask;// Cập nhật nội dung công việc theo id
    btnAddEle.removeAttribute('data-id'); // Xóa thuộc tính data-id trên nút thêm công việc để quay trở lại chế độ thêm mới
    saveTasksToLocalStorage(tasks);
}

function addTask(newTask, tasks) {
    tasks.push(newTask);
    saveTasksToLocalStorage(tasks);
}

function deleteTask(id) {
    if (confirm("Bạn có muốn xoá không ?")) {
        const tasks = getTasksFromLocalStorage();
        tasks.splice(id, 1); // Xoá công việc theo id
        saveTasksToLocalStorage(tasks);
        renderTasks();
    }
}

function renderTasks() {
    const tasks = getTasksFromLocalStorage();
    let content = '<ul>'

    tasks.forEach((task, index) => {
        content += `<li>
            <div class="task-name">${task.name}</div>
            <a href="#" onclick="editTask(${index})">Sửa</a>
            <a href="#" onclick="deleteTask(${index})">Xoá</a>
         </li>`;
    });

    content += '</ul>';
    resultEle.innerHTML = content;
}

function editTask(id) {
    const tasks = getTasksFromLocalStorage();  
    const task = tasks[id]; // Lấy công việc cần chỉnh sửa
    
    // Hiển thị tên công việc trong ô nhập và cập nhật thuộc tính data-id trên nút thêm công việc để cập nhật
    if (task) {
        taskName.value = task.name;
        btnAddEle.setAttribute('data-id', id);
    }
}

function getTasksFromLocalStorage() {
    // Lấy danh sách công việc từ Local Storage hoặc trả về mảng rỗng nếu không có dữ liệu
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasksToLocalStorage(tasks) {
    // Lưu danh sách công việc vào Local Storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
