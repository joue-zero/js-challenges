
// Show Tasks

let noTaskCont = document.querySelector('.task-content .no-tasks');
let input      = document.querySelector('input');
let addTask      = document.querySelector('button');
let deleteAll   = document.querySelector('.delete-all');

window.onload = function () {
    input.focus();
}
// Show No Tasks Message
if(window.localStorage.length === 0) {
    handelEmpty();
    console.log('hh');
}else {
    deleteAll.style.display = "block";
    deleteAll.onclick = function () {
        window.localStorage.clear();
        window.location.reload();
    }
    showTaskes();
}


// Handel Add Taskes on click add Button Or On Enter In Input Field
addTask.addEventListener('click', function(e) {
    // console.log();
    addToLocalStorage();
});
input.onkeydown = function(e) { 
    if(e.key == 'Enter'){
        addToLocalStorage();
    }
}
function showTaskes() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let taskContainer = document.querySelector('.task-content');
    noTaskCont.style.display = "none";
    // Create The Task Div
    tasks.forEach(task => {
        let createdTask = document.createElement('div');
        createdTask.className = "task";
        let taskName = document.createElement('p');
        taskName.className="task-name";
        taskName.textContent = task['title'];
        let span = document.createElement('span');
        span.textContent = "Delete";
        span.className = "delete";
        span.id = task['id'];
        createdTask.appendChild(taskName);
        createdTask.appendChild(span);
        taskContainer.appendChild(createdTask);
    });
}

function addToLocalStorage(){
    if(input.value.length != 0){
        // Local Storage Append New Task
        let tasks= [];
        if(window.localStorage.getItem('tasks') === null){
            tasks[0] = {
                id:Date.now(),
                title: input.value
            };
        }else {
            tasks = JSON.parse(window.localStorage.getItem('tasks'));
            tasks.unshift({
                id:Date.now(),
                title: input.value
            });
        }
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
        window.location.reload();
    }
}
let allDeletsButton = document.querySelectorAll('span.delete');


allDeletsButton.forEach(span => {
    
    span.addEventListener('click',(e) => {
        let allTasks = JSON.parse(localStorage['tasks']);
        if(allTasks.length == 1) {
            deleteAll.click();
        }else{
            for(let i =0; i < allTasks.length; ++i){
            
                if(allTasks[i]['id'] == e.target.id){
                    allTasks.splice(i,1);
                }
            }
            localStorage['tasks'] = JSON.stringify(allTasks);
        }
        
        window.location.reload();
        
    })
})

function handelEmpty(){
    noTaskCont.style.display = "block";
    deleteAll.style.display = "none";
}