// display actual date
const dateDisplay = document.getElementById("date");
const actualDate = new Date();
const url = "https://masacuata-todo.herokuapp.com/";

const dias = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

dateDisplay.innerText = `${
  dias[actualDate.getDay()]
}, ${actualDate.getDate()} de ${
  meses[actualDate.getMonth()]
} del ${actualDate.getFullYear()}`;

// add task
const inputAdd = document.getElementById("add-input");
const btnAdd = document.getElementById("add-btn");
let taskContainer = document.getElementById("task-container");

function appendDoneFn() {
  const tasks = taskContainer.querySelectorAll(".task-description");
  tasks.forEach((task) => {
    task.addEventListener("click", () => {
      task.querySelector(".done-btn").classList.toggle("done");
      task.querySelector(".task-text").classList.toggle("done");
    });
  });
}

function appendDeleteFn() {
  const deleteBtns = taskContainer.querySelectorAll(".delete-btn");
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      taskContainer.removeChild(deleteBtn.parentNode);
    });
  });
}

btnAdd.addEventListener("click", () => {
  

  appendDoneFn();
  appendDeleteFn();
  inputAdd.value = "";
});

// get tasks from API and display all of them
const displayTasks= () => {
  fetch(url + '1/tasks')
      .then(res => res.json())
      .then(data => data.tasks.forEach(task => displayTask(task)));
}
// display one task
const displayTask = (task) => {
  taskContainer.innerHTML += 
  `<div class="task">
    <div class="task-description">
        <div class="done-btn"></div>
        <span class="task-text">${task.taskDescription}</span> 
    </div>

    <i class="fas fa-trash delete-btn"></i>
  </div>`;
  appendDoneFn();
  appendDeleteFn();
};

// delete task from API
const deleteTask = () =>{
  
}

// initialize app
window.addEventListener("DOMContentLoaded", () => {
  displayTasks();
});