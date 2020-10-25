// define DOM variables
let addTodoBtn = document.getElementById('addTodo');
let input = document.getElementById('input');
let todoContainer = document.getElementById('todoContainer');
let form = document.getElementById('form');

let todoCount = 1;

// add todos
addTodoBtn.addEventListener('click', () => {
    // prevent page refresh when submit
    form.addEventListener('submit', event => event.preventDefault());

    // create todo
    let todo = document.createElement('p');
    todo.innerText = `${todoCount++}.-${input.value}`;
    
    // add "done" function
    todo.addEventListener('click', () => {
        if(todo.style.textDecoration == "line-through")
            todo.style.textDecoration = "none";    
        else 
            todo.style.textDecoration = "line-through";
    });

    // add "delete" function
    todo.addEventListener('dblclick', () => todoContainer.removeChild(todo));

    // append todo in todoContainer
    todoContainer.appendChild(todo);
    input.value = "";
});


// local storage
let storage = window.localStorage;
