let input=document.querySelector(".input");
let submit =document.querySelector(".add");
let tasksDiv=document.querySelector('.tasks');
//Emptyarray
let arraysOfTasks=[];
//check if there is tasks in localStorage
if(localStorage.getItem("tasks")){
    arraysOfTasks=JSON.parse(localStorage.getItem("tasks"))
}

getDataFromLocalStorage()
submit.onclick = function() {
if(input.value !== ""){
    addTaskToArray(input.value);
    input.value=""
}
}
//Click on TaskELement
tasksDiv.addEventListener("click",(e)=>{
    //DeleteButton
    if(e.target.classList.contains("del")){
        //remove element from page
        e.target.parentElement.remove();
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

    }
    //Task ELement
    if(e.target.classList.contain("task")){
        // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
    }
})


function addTaskToArray(tasktext){
    const task={
        id:Date.now(),
        title:tasktext,
        completed:false,
    };
    //push task on array of tasks
    arraysOfTasks.push(task);
    console.log(arraysOfTasks);
    //Add tasks to page
    addElementsToPageFrom(arraysOfTasks);
    //Add task to localStorage
    addDataToLocalStorageFrom(arraysOfTasks);

console.log(arraysOfTasks);
console.log(JSON.stringify(arraysOfTasks))
}
function addElementsToPageFrom(arraysOfTasks){
    tasksDiv.innerHTML="";
    //looping of array of tasks
    arraysOfTasks.forEach((task)=>{
        let div=document.createElement("div");
        div.className="task";
        if(task.completed){
            div.className="task done"
        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title))
        console.log(div)
        //create Delete Button
        let span=document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("Delete"));
       div.appendChild(span);
       tasksDiv.appendChild(div)
    })



}
function addDataToLocalStorageFrom(arraysOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arraysOfTasks));
  }

function getDataFromLocalStorage(){
    let data=window.localStorage.getItem("tasks");
    if(data){
        let tasks=JSON.parse(data);
        console.log(tasks)
        addElementsToPageFrom(tasks)

    }
}
function deleteTaskWith(taskId){
    // for(let i=0; i<arraysOfTasks.length;i++){
    //     console.log(`${arraysOfTasks[i].id} === ${taskId}`)
    // }
    arraysOfTasks = arraysOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arraysOfTasks);
}

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arraysOfTasks.length; i++) {
      if (arraysOfTasks[i].id == taskId) {
        arraysOfTasks[i].completed == false ? (arraysOfTasks[i].completed = true) : (arraysOfTasks[i].completed = false);
      }
    }
    addDataToLocalStorageFrom(arraysOfTasks);
  }