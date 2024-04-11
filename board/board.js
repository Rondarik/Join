// async function getAllTasksFromServer(){
//     try {
//         allTasks = await getItem('allTasks');
//     } catch(e){
//         console.error('Loading error:', e);
//     }
// }

let allTasks = [{
    "taskID": 0,
    "processingStatus": "ToDo",
    "title": "Kochwelt Page & Recipe Recommender",
},{
    "taskID": 1,
    "processingStatus": "ToDo",
    "title": "Lernen",
},
{
    "taskID": 2,
    "processingStatus": "ToDo",
    "title": "Projekt",
},
{
    "taskID": 3,
    "processingStatus": "ToDo",
    "title": "Putzen",

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
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }
}

function startDragging(taskID){
    currentDraggedElement=taskID;
}


function generateTodoHTML(element){
    return `<div class="task_progress"draggable="true" ondragstart="startDragging(${element['taskID']})">
    <div>
        <span class="progress_title">User Story</span>
        <div class="progress_text">
            <p class="text_headline">${element['title']}</p>
            <p class="text_description">Build start page with recipe recommendation...</p>
        </div>
        <div class="progress_container">
            <progress id="file" max="100" value="50">50%</progress>
            <p class="progress_text">1/2 Subtasks</p>
        </div>
        <div class="contacts_container">
            <img class="contacts_img" src="/assets/img/contacts_board.svg" alt="">
            <img class="prio_img" src="/assets/img/prio_medium.svg" alt="">
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
    // checkEmptyProgress();
    // checkEmptyAwaitFeedback();
}

function checkEmptyToDo() {
    let toDoColumn = document.getElementById('todo');
    if (toDoColumn.innerHTML.trim() === '') {
        toDoColumn.innerHTML = '<div class="task_todo">No tasks to do</div>';
    }
}
// function checkEmptyProgress() {
//     let progressColumn = document.getElementById('progress');
//     if (progressColumn.innerHTML.trim() === '') {
//         progressColumn.innerHTML = '<div class="task_todo">No tasks in Progress</div>';
//     }
// }
// function checkEmptyAwaitFeedback() {
//     let awaitFeedbackColumn = document.getElementById('awaitFeedback');
//     if (awaitFeedbackColumn.innerHTML.trim() === '') {
//         awaitFeedbackColumn.innerHTML = '<div class="task_todo">No tasks in Await Feedback</div>';
//     }
// }

