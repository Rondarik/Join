
let allTasks = [{
    "taskID": 0,
    "processingStatus": "ToDo",
    "title": "Kochwelt Page & Recipe Recommender",
    "description":'Build start page with recipe recommendation...',
    "assignedTo":[],
    "dueDate":10/5/2023,
    "prio":'/assets/img/prio_medium.svg',
    "category":'User Story',
    "subtasks":['Start Page Loyout', 'Implement Recipe Recommendation']

},{
    "taskID": 1,
    "processingStatus": "progress",
    "title": "HTML Base Template Creation",
    "description":'Create reusable HTML base templates...',
    "assignedTo":[],
    "dueDate":10/5/2023,
    "prio":'/assets/img/prio_low.svg',
    "category":'Technical Task',
    "subtasks":[]

},
{
    "taskID": 2,
    "processingStatus": "progress",
    "title": "Daily Kochwelt Recipe",
    "description":'Implement daily recipe and portion calculator....',
    "assignedTo":[],
    "dueDate":10/5/2023,
    "prio":'/assets/img/prio_medium.svg',
    "category":'User Story',
    "subtasks":['Start Page Loyout', 'Implement Recipe Recommendation']

},
{
    "taskID": 3,
    "processingStatus": "awaitFeedback",
    "title": "CSS Architecture Planning",
    "description":'Define CSS naming conventions and structure...',
    "assignedTo":[],
    "dueDate":10/5/2023,
    "prio":'/assets/img/prio_urgent.svg',
    "category":'Technical Task',
    "subtasks":[]
}];



function showAddTaskOverlay() {
    document.getElementById('addTaskOverlayID').classList.remove('d-none');
}

function closeAddTaskOverlay(){
    document.getElementById('addTaskOverlayID').classList.add('d-none');

}

function doNotClose(event) {
    event.stopPropagation();
}

let currentDraggedElement;

function updateHTML() {
    let toDo = allTasks.filter(t => t['processingStatus'] == 'ToDo');

    document.getElementById('todo').innerHTML = '';
    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('todo').innerHTML += generateTodoHTML(element);
    }

    let progress = allTasks.filter(t => t['processingStatus'] == 'progress');

    document.getElementById('progress').innerHTML = '';
    for (let index = 0; index < progress.length; index++) {
        const element = progress[index];
        document.getElementById('progress').innerHTML += generateTodoHTML(element);
    }

    let awaitFeedback = allTasks.filter(t => t['processingStatus'] == 'awaitFeedback');

    document.getElementById('awaitFeedback').innerHTML = '';
    for (let index = 0; index < awaitFeedback.length; index++) {
        const element = awaitFeedback[index];
        document.getElementById('awaitFeedback').innerHTML += generateTodoHTML(element);
    }

    let done = allTasks.filter(t => t['processingStatus'] == 'done');

    document.getElementById('done').innerHTML = '';
    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateTodoHTML(element,index);
    }
    // updateSummary();
}



function startDragging(taskID){
    currentDraggedElement=taskID;
}


function generateTodoHTML(element){
    let categoryColor = '';
    if(element['category'] === 'User Story') {
        categoryColor = '#0038FF';
    } else if(element['category'] === 'Technical Task') {
        categoryColor = '#1FD7C1'; 
    }

    return `<div onclick="openBigTask(allTasks[0])" class="task_progress" draggable="true" ondragstart="startDragging(${element['taskID']})">

    <div>
        <span class="progress_title" style="background-color: ${categoryColor};">${element['category']}</span>
        <div class="progress_text">
            <p class="text_headline">${element['title']}</p>
            <p class="text_description">${element['description']}</p>
        </div>
        <div class="progress_container">
            <progress id="file" max="100" value="50">50%</progress>
            <p class="progress_text">1/2 Subtasks</p>
        </div>
        <div class="contacts_container">
            <img class="contacts_img" src="/assets/img/contacts_board.svg" alt="">
            <img class="prio_img" src="${element['prio']}" alt="">
        </div>
    </div>
</div>
</div>`

}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(processingStatus) {
    allTasks[currentDraggedElement]['processingStatus'] = processingStatus;
    updateHTML();
    checkEmptyToDo();
    checkEmptyDone();
    checkEmptyProgress();
    checkEmptyAwaitFeedback();
}
function checkEmptyColumn(columnId, message) {
    let column = document.getElementById(columnId);
    if (column.innerHTML.trim() === '') {
        column.innerHTML = `<div class="task_todo">${message}</div>`;
    }
}

function checkEmptyToDo() {
    checkEmptyColumn('todo', 'No tasks to do');
}

function checkEmptyProgress() {
    checkEmptyColumn('progress', 'No tasks in Progress');
}

function checkEmptyAwaitFeedback() {
    checkEmptyColumn('awaitFeedback', 'No tasks in Await Feedback');
}

function checkEmptyDone() {
    checkEmptyColumn('done', 'No tasks Done');
}

function openBigTask(element){
    document.getElementById('bigTask').classList.remove('d-none');
    document.getElementById('bigTask').classList.add('show');
    let bigTask = document.getElementById('bigTask');
    bigTask.innerHTML =showBigTask(element);
}

function closeBigTask(){
    document.getElementById('bigTask').classList.add('d-none');
}

function showBigTask(element){
    let categoryColor = '';
    if(element['category'] === 'User Story') {
        categoryColor = '#0038FF';
    } else if(element['category'] === 'Technical Task') {
        categoryColor = '#1FD7C1'; 
    }
    return /*html*/`
        <div onclick="doNotClose(event)" class="bigTaskInner">
        <div class="bigHeadline">
            <p class="bigHeadlineText" style="background-color: ${categoryColor};">${element['category']}</p>
            <img onclick="closeBigTask()" class="bigHeadlineImg" src="/assets/img/close.svg" alt="">
        </div>
        <div>
            <h2 class="bigTitle">${element['title']}</h2>
            <p class="bigInfosText">${element['description']}</p>
        </div>
        <div>
            <p class="bigInfosText">Due date: ${element['dueDate']}</p>
            <p class="bigInfosText">Priority: Medium <img src="${element['prio']}" alt=""></p>
        </div>
                <div class="bigInfosText">
                    <h3 class="h3">Assigned To:</h3>
                    <li>Max Muster</li>
                    <li>Marcus Header</li>
                    <li>Mevlida Salendrkovic</li>
                </div>
                <div class="bigInfosText">
                    <h3 class="h3">Subtasks</h3>
                    <input type="checkbox">Implement Recipe Recommendation<br>
                    <input type="checkbox">Start Page Loyout
                </div>
                <div class="delete_edit_container">
                    <div class="delete_container">
                        <img class="delete_edit_img" src="/assets/img/delete.svg" alt="">
                        <p class="delete_edit_text">Delete</p>
                    </div>
                    <div class="delete_edit_line"></div>
                    <div class="edit_container">
                        <img class="delete_edit_img" src="/assets/img/edit.svg" alt="">
                        <p class="delete_edit_text">Edit</p>
                    </div>
                </div>
</div>`
}