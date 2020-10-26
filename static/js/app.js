// display actual date
const dateDisplay = document.getElementById('date');
const actualDate = new Date();

const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
                "Octubre", "Noviembre", "Diciembre"];

dateDisplay.innerText = 
`${dias[actualDate.getDay()]}, ${actualDate.getDate()} de ${meses[actualDate.getMonth()]} del ${actualDate.getFullYear()}`;


// add task
const inputAdd = document.getElementById('add-input');
const btnAdd = document.getElementById('add-btn');
let taskContainer = document.getElementById('task-container');

function addDoneFn (){
    const tasks = taskContainer.querySelectorAll('.task-description');
    tasks.forEach(task => { 
        task.addEventListener('click',  () => {
            task.querySelector('.done-btn').classList.toggle('done');
            task.querySelector('.task-text').classList.toggle('done');
        });
    });
}

function addDelete(){
    const deleteBtns = taskContainer.querySelectorAll('.delete-btn');
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', () => {
           taskContainer.removeChild(deleteBtn.parentNode);
        });
    });
}

btnAdd.addEventListener('click', () => {
    taskContainer.innerHTML +=  
    `<div class="task">
        <div class="task-description">
            <div class="done-btn"></div>
            <span class="task-text">${inputAdd.value}</span> 
        </div>

        <i class="fas fa-trash delete-btn"></i>
    </div>`;

    addDoneFn();
    addDelete();
    inputAdd.value = "";
});

window.addEventListener("DOMContentLoaded",  () => {
    addDoneFn();
    addDelete();
});