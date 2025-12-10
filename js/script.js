'use strict';

const tasksDB = {
    tasks: [],
    doneTasks: []
};

const addForm = document.querySelector('form.add'),
    addInput = addForm.querySelector('.adding__input'),
    tasksList = document.querySelector('.to-do-list'),
    doneTasksList = document.querySelector('.done-list'),
    ToDo = document.querySelector('.to-do'),
    tasksToDo = ToDo.querySelector('h1'),
    done = document.querySelector('.done'),
    doneTasks = done.querySelector('h1');

let tasksToDoCounter = 0;

addForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let newTask = addInput.value;
    if (newTask) {
        tasksDB.tasks.push(newTask);
        createTasksList(tasksDB.tasks, tasksList);
    }
    event.target.reset();
})



addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let newTask = addInput.value;

    if (newTask) {
        tasksDB.tasks.push(newTask);
        createTasksList(tasksDB.tasks, tasksList);
    }
    event.target.reset();

});



function createTasksList(tasks, parent) {
    parent.innerHTML = '';


    tasks.forEach((task) => {

        parent.innerHTML += `
             <li>
                <div class="to-do__block">
                    <div class="text">
                        ${task}
                    </div>
                    <div class="icons">
                        <button class="check__icon">
                            <img src="../img/Check.svg" alt="check icon">
                        </button>
                        <button class="trash__icon">
                            <img src="../img/trash.svg" alt="trash icon">
                        </button>
                    </div>
                </div>
             </li>`;
        tasksToDo.innerHTML = `Tasks to do ${++tasksToDoCounter}`;


    });

    document.querySelectorAll('.trash__icon').forEach((btn, i) => {
        btn.addEventListener('click', (event) => {
            btn.parentElement.parentElement.parentElement.remove();
            tasksDB.tasks.splice(i, 1);
            createTasksList(tasksDB.tasks, tasksList);
            tasksToDo.innerHTML = `Tasks to do ${--tasksToDoCounter}`;

        });
    });

    document.querySelectorAll('.check__icon').forEach((btn, i) => {
        btn.addEventListener('click', (event) => {
            let count = 0;

            tasksDB.doneTasks.push(`${tasksDB.tasks[i]}`);
            tasksDB.tasks.splice(i, 1);

            doneTasksList.innerHTML = '';

            tasksDB.doneTasks.forEach((task) => {
                doneTasksList.innerHTML += `
                   <li>
                        <div class="to-do__block">
                            <div class="text">
                                ${task}
                            </div>
                        </div>
                    </li>`;
                doneTasks.innerHTML = `Done tasks ${++count}`
                tasksToDo.innerHTML = `Tasks to do ${--tasksToDoCounter}`;
                createTasksList(tasksDB.tasks, tasksList);
            })
        })
    })
}

createTasksList(tasksDB.tasks, tasksList);


