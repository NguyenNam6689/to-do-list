let btnAddEle = document.querySelector('button')
let taskName = document.querySelector('#content')

let tasks = getTaskFromLocalStorage ()
renderTasks(tasks)
btnAddEle.addEventListener('click',function (){
    if (!taskName.value){
        alert('Vui lòng nhập tên công việc !!')
        return false;
    }
    let tasksId = this.getAttribute('id') // lấy giá trị thuốc tính id từ function editTask
    let tasks = getTaskFromLocalStorage () // Lấy danh sách các task
    let task = {name : taskName.value} // tạo một đối tượng task mới với thuộc tính name được lấy từ giá trị của trường taskName.
    if (tasksId == 0 || tasksId) { 
        tasks[tasksId] = task  //cập nhật một phần tử trong mảng tasks tại vị trí cụ thể được chỉ định bởi tasksId
        this.removeAttribute('id')
    } else {
        tasks.push(task)  
    }
    taskName.value=''
    localStorage.setItem('tasks',JSON.stringify(tasks)) // trước khi lưu trữ danh sách được chuyển đổi thành chuỗi JSON
    renderTasks(tasks)
})
function editTask (id){
    let tasks = getTaskFromLocalStorage ()
    if (tasks.length > 0) {
        taskName.value=tasks[id].name
        btnAddEle.setAttribute('id',id)
    }
}
function deleteTask (id){
    if (confirm("Bạn có muốn xoá không ?")) {
        let tasks = getTaskFromLocalStorage()
        tasks.splice(id,1) // dùng để xoá id với đối số là 1 chính là số phần tử bị xoá
        localStorage.setItem('tasks',JSON.stringify(tasks))
        renderTasks(tasks)
    }
}
function renderTasks (tasks=[]) {
    let content = '<ul>'

    
    tasks.forEach((tasks, index) => {
        content += `<li>
                <div class="task-name">${tasks.name}</div>
                <a href="#" onclick="editTask(${index})">Sửa</a>
                <a href="#" onclick="deleteTask(${index})">Xoá</a>
         </li>`
    })

    content += '</ul>'
    document.querySelector('#result').innerHTML = content
}

function getTaskFromLocalStorage (){
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) :[]; // check dữ liệu từ storage có null không nếu không sẽ trả về dữ liệu từ chuỗi JSON thành 1 đối tượng JS
}