let currentDraggedElement;
let allTasksJson= [{
    "taskID": 0,
    "processingStatus": "ToDo",
    "title": "Kochwelt Page & Recipe Recommender",
    "description":'Build start page with recipe recommendation...',
    "assignedTo":[],
    "dueDate":'10/5/2023',
    "prio":['/assets/img/prio_medium.svg','Medium'],
    "category":'User Story',
    "subtasks": [
        {"name": "Start Page Layout", "checked": false},
        {"name": "Implement Recipe Recommendation", "checked": false}
    ]

},{
    "taskID": 1,
    "processingStatus": "ToDo",
    "title": "HTML Base Template Creation",
    "description":'Create reusable HTML base templates...',
    "assignedTo":[],
    "dueDate":'10/5/2023',
    "prio":['/assets/img/prio_low.svg','Low'],
    "category":'Technical Task',
    "subtasks":[]

},
{
    "taskID": 2,
    "processingStatus": "progress",
    "title": "Daily Kochwelt Recipe",
    "description":'Implement daily recipe and portion calculator....',
    "assignedTo":[],
    "dueDate":'10/5/2023',
    "prio":['/assets/img/prio_medium.svg','Medium'],
    "category":'User Story',
    "subtasks": [
        {"name": "Start Page Layout", "checked": false},
        {"name": "Implement Recipe Recommendation", "checked": false}
    ]

},
{
    "taskID": 3,
    "processingStatus": "awaitFeedback",
    "title": "CSS Architecture Planning",
    "description":'Define CSS naming conventions and structure...',
    "assignedTo":[],
    "dueDate":'10/5/2023',
    "prio":['/assets/img/prio_urgent.svg','Urgent'],
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



function updateHTML() {
    const statuses = ['ToDo', 'progress', 'awaitFeedback', 'done'];

    for (let i = 0; i < statuses.length; i++) {
        const status = statuses[i];
        const tasks = allTasksJson.filter(task => task['processingStatus'] === status);
        const container = document.getElementById(status.toLowerCase());

        container.innerHTML = '';
        for (let j = 0; j < tasks.length; j++) {
            container.innerHTML += generateTodoHTML(tasks[j]);
        }
    }

}


function startDragging(taskID){
    currentDraggedElement=taskID;
}

function calculateProgress(subtasks) {
    let progressValue = 0;
    let completedSubtasks = 0; // Hier definieren wir die Variablen in der calculateProgress Funktion
    let totalSubtasks = 0;
    if (subtasks) {
        const totalSubtasks = subtasks.length;
        const completedSubtasks = subtasks.filter(subtask => subtask.completed).length;
        if (totalSubtasks > 0) {
            progressValue = (completedSubtasks / totalSubtasks) * 100;
        }
    }
    return { progressValue, completedSubtasks, totalSubtasks }; 
}

function generateTodoHTML(element) {
    let id = element['taskID'];
    let categoryColor = '';
    if (element['category'] === 'User Story') {
        categoryColor = '#0038FF';
    } else if (element['category'] === 'Technical Task') {
        categoryColor = '#1FD7C1';
    }

    let subtaskHTML = ''; 
    let totalSubtasks = 0; 
    if (element['subtasks']) {
        totalSubtasks = element['subtasks'].length;
    }

    if (totalSubtasks > 0) {
        subtaskHTML = `
            <div class="progress_container">
                <progress id="file" max="100" value="0">0%</progress> <!-- Hier wird der Wert des Fortschritts auf 0 gesetzt -->
                <p class="progress_text">0/${totalSubtasks} Subtasks</p>
            </div>`;
    }
    return `<div id="tasks_card_${element['taskID']}" onclick="openBigTask(${id})" class="task_progress" draggable="true" ondragstart="startDragging(${element['taskID']})">
        <div>
            <span class="progress_title" style="background-color: ${categoryColor};">${element['category']}</span>
            <div class="progress_text">
                <p class="text_headline">${element['title']}</p>
                <p class="text_description">${element['description']}</p>
            </div>
            ${subtaskHTML} 
            <div class="contacts_container">
                <img class="contacts_img" src="/assets/img/contacts_board.svg" alt="">
                <img class="prio_img" src="${element['prio'][0]}" alt="">
            </div>
        </div>
    </div>`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(processingStatus) {
    allTasksJson[currentDraggedElement]['processingStatus'] = processingStatus;
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

function openBigTask(id){
    for (let i=0; i<allTasksJson.length; i++){
            const task=allTasksJson[i]['taskID'];
    if (task==id) {
        document.getElementById('bigTask').classList.remove('d-none');
        document.getElementById('bigTask').classList.add('show');
        let bigTask = document.getElementById('bigTask');
        bigTask.innerHTML = showBigTask(allTasksJson[i]);
    } 
}
}


function closeBigTask(){
    document.getElementById('bigTask').classList.add('d-none');
}

// function showBigTask(element){
//     let id= element['taskID'];
//     let categoryColor = '';
//     if(element['category'] === 'User Story') {
//         categoryColor = '#0038FF';
//     } else if(element['category'] === 'Technical Task') {
//         categoryColor = '#1FD7C1'; 
//     }
//     return /*html*/`
//         <div onclick="doNotClose(event)" class="bigTaskInner">
//         <div class="bigHeadline">
//             <p class="bigHeadlineText" style="background-color: ${categoryColor};">${element['category']}</p>
//             <img onclick="closeBigTask()" class="bigHeadlineImg" src="/assets/img/close.svg" alt="">
//         </div>
//         <div>
//             <h2 class="bigTitle">${element['title']}</h2>
//             <p class="bigInfosText">${element['description']}</p>
//         </div>
//         <div>
//             <div class="bigInfosText"><p>Due date:</p> ${element['dueDate']}</div>
//             <div class="bigInfosText"><p>Priority:</p> ${element['prio'][1]} <img src="${element['prio'][0]}" alt=""></div>
//         </div>
//                 <div class="bigInfosContacts">
//                     <h3 class="h3">Assigned To:</h3>
//                     <li>${element['assignedTo']}</li>
//                 </div>
//                 <div class="bigInfosSubtasks">
//                     <h3 class="h3">Subtasks</h3>
//                     <div class="bigSubtasksContainer">
//                     <img  onclick="checked()" id="checkboxOff" src="../assets/img/checkboxOff.svg" alt="" style="cursor:pointer;">
//                     <img  onclick="unchecked()" id="checkboxOn" class="d-none" src="../assets/img/checkboxOn.svg" alt="" style="cursor:pointer;">
//                     <p class="bigInfosContacts" >${element['subtasks'][0]}</p> 
//                     </div>
//                 </div>
//                 <div class="delete_edit_container">
//                     <div class="delete_container" onclick="deleteTasks(${id})">
//                         <img class="delete_img" src="/assets/img/delete.svg" alt="">
//                         <img class="delete_img_blau" src="/assets/img/delete_blau.svg"  alt="">
//                         <p class="delete_edit_text">Delete</p>
//                     </div>
//                     <div class="delete_edit_line"></div>
//                     <div class="edit_container">
//                         <img class="edit_img" src="/assets/img/edit.svg" alt="">
//                         <img class="edit_img_blau" src="/assets/img/edit_blau.svg" alt="">
//                         <p class="delete_edit_text">Edit</p>
//                     </div>
//                 </div>
// </div>`
// }

// function toggleSubtask(taskID, subtaskIndex) {
//     // Code zur Toggle-Logik hier einfügen
// }


function showBigTask(element){
    let id = element['taskID'];
    let categoryColor = '';
    if(element['category'] === 'User Story') {
        categoryColor = '#0038FF';
    } else if(element['category'] === 'Technical Task') {
        categoryColor = '#1FD7C1'; 
    }

    let subtasksHTML = ''; // Hier initialisieren wir die Variable für den HTML-Code der Subtasks

    // Überprüfen, ob Subtasks vorhanden sind
    if (element['subtasks'] && element['subtasks'].length > 0) {
        subtasksHTML += '<h3 class="h3">Subtasks</h3>'; // Überschrift für die Subtasks

        // Iteration durch alle Subtasks des Elements
        for (let i = 0; i < element['subtasks'].length; i++) {
            // Erstellen des HTML-Codes für jeden Subtask
            subtasksHTML += `
                <div class="bigSubtasksContainer">
                <img  onclick="checked(${id},${i})" id="checkboxOff" src="../assets/img/checkboxOff.svg" alt="" style="cursor:pointer;">
                <img  onclick="unchecked(${id},${i})" id="checkboxOn" class="d-none" src="../assets/img/checkboxOn.svg" alt="" style="cursor:pointer;">
                <p class="bigInfosContacts">${element['subtasks'][i].name}</p>
                </div>`;
        }
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
                <div class="bigInfosText"><p>Due date:</p> ${element['dueDate']}</div>
                <div class="bigInfosText"><p>Priority:</p> ${element['prio'][1]} <img src="${element['prio'][0]}" alt=""></div>
            </div>
            <div class="bigInfosContacts">
                <h3 class="h3">Assigned To:</h3>
                <li>${element['assignedTo']}</li>
            </div>
            ${subtasksHTML} <!-- Hier fügen wir den HTML-Code der Subtasks ein -->
            <div class="delete_edit_container">
                <div class="delete_container" onclick="deleteTasks(${id})">
                    <img class="delete_img" src="/assets/img/delete.svg" alt="">
                    <img class="delete_img_blau" src="/assets/img/delete_blau.svg"  alt="">
                    <p class="delete_edit_text">Delete</p>
                </div>
                <div class="delete_edit_line"></div>
                <div class="edit_container">
                    <img class="edit_img" src="/assets/img/edit.svg" alt="">
                    <img class="edit_img_blau" src="/assets/img/edit_blau.svg" alt="">
                    <p class="delete_edit_text">Edit</p>
                </div>
            </div>
        </div>
    `;
}


function findTaskFunction() {
    let search = document.getElementById('search').value.toLowerCase();
    let searchArray = [];
    document.getElementById('todo').innerHTML = '';
    document.getElementById('progress').innerHTML = '';
    document.getElementById('awaitfeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < allTasksJson.length; i++) {
        const element = allTasksJson[i];
        if (element['title'].toLowerCase().includes(search) || element['description'].toLowerCase().includes(search)) {
            searchArray.push(element);
        }
    }
    for (let index = 0; index < searchArray.length; index++) {
        const element = searchArray[index];
        if (element['processingStatus'] === 'ToDo') {
            document.getElementById('todo').innerHTML += generateTodoHTML(element);
        } else if (element['processingStatus'] === 'progress') {
            document.getElementById('progress').innerHTML += generateTodoHTML(element);
        } else if (element['processingStatus'] === 'awaitFeedback') {
            document.getElementById('awaitfeedback').innerHTML += generateTodoHTML(element);
        } else if (element['processingStatus'] === 'done') {
            document.getElementById('done').innerHTML += generateTodoHTML(element);
        }
    }
}

function updateSummary() {
    let todoCount = countTasksByStatus('ToDo');
    let progressCount = countTasksByStatus('progress');
    let awaitFeedbackCount = countTasksByStatus('awaitFeedback');
    let doneCount = countTasksByStatus('done');
    let urgentCount = countTasksByPriority('Urgent');
    let urgentTask = getUrgentTask();
    let totalCount = todoCount + progressCount + awaitFeedbackCount + doneCount;

    document.getElementById('todoCount').innerText = todoCount.toString();
    document.getElementById('progressCount').innerText = progressCount.toString();
    document.getElementById('awaitFeedbackCount').innerText = awaitFeedbackCount.toString();
    document.getElementById('doneCount').innerText = doneCount.toString();
    document.getElementById('urgentCount').innerText = urgentCount.toString();
    document.getElementById('urgentDate').innerText = urgentTask ? urgentTask.dueDate : '';
    document.getElementById('allTasksCount').innerText = totalCount.toString();
}

function countTasksByStatus(status) {
    return allTasksJson.filter(task => task.processingStatus === status).length;
}
function countTasksByPriority(priority) {
    return allTasksJson.filter(task => task.prio.includes(priority)).length;
}

function getUrgentTask() {
    return allTasksJson.find(task => task.prio.includes('Urgent'));
}

function deleteTasks(taskID) {
    const index = allTasksJson.findIndex(task => task.taskID === taskID);
    if (index !== -1) {
        allTasksJson.splice(index, 1);
        updateHTML();
    } 
    closeBigTask();
}
