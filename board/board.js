let currentDraggedElement;

// let allTasksJson= [{
//     "taskID": 0,
//     "processingStatus": "ToDo",
//     "title": "Kochwelt Page & Recipe Recommender",
//     "description":'Build start page with recipe recommendation...',
//     "assignedTo":[],
//     "dueDate":'2023-05-10',
//     "prio":['/assets/img/prio_medium.svg','Medium'],
//     "category":'User Story',
//     "subtasks": [
//         {"name": "Start Page Layout", "checked": false},
//         {"name": "Implement Recipe Recommendation", "checked": false}
//     ]

// },{
//     "taskID": 1,
//     "processingStatus": "ToDo",
//     "title": "HTML Base Template Creation",
//     "description":'Create reusable HTML base templates...',
//     "assignedTo":[],
//     "dueDate":'10/5/2023',
//     "prio":['/assets/img/prio_low.svg','Low'],
//     "category":'Technical Task',
//     "subtasks":[]

// },
// {
//     "taskID": 2,
//     "processingStatus": "progress",
//     "title": "Daily Kochwelt Recipe",
//     "description":'Implement daily recipe and portion calculator....',
//     "assignedTo":[],
//     "dueDate":'10/5/2023',
//     "prio":['/assets/img/prio_medium.svg','Medium'],
//     "category":'User Story',
//     "subtasks": [
//         {"name": "Start Page Layout", "checked": false},
//         {"name": "Implement Recipe Recommendation", "checked": false},
//         {"name": "Implement Recipe Recommendation", "checked": false}
//     ]

// },
// {
//     "taskID": 3,
//     "processingStatus": "awaitFeedback",
//     "title": "CSS Architecture Planning",
//     "description":'Define CSS naming conventions and structure...',
//     "assignedTo":[],
//     "dueDate":'10/5/2023',
//     "prio":['/assets/img/prio_urgent.svg','Urgent'],
//     "category":'Technical Task',
//     "subtasks":[]
// }];

async function boardInit(){
    await includeHTML();
    await getAllTasksFromServer();
    allTasksJson = allTasks;
    updateHTML();
    setInitials();
   

    console.log (allTasks);
}

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
    let completedSubtasks = 0;
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
                <progress id="file" max="100" value="0">0%</progress>
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
                <div class="small_card_users_area">` +
                getAssignedToIconsHTML(element['assignedTo']) +
                /*html*/ `
                </div>
                <img class="prio_img" src="${element['prio'][0]}" alt="">
            </div>
        </div>
    </div>`;
}

function getAssignedToIconsHTML(contacts) {
    let html = /*html*/ `<div class="overlapped_contact_icons">`;
    let shift = 0;
    
    contacts.forEach(contact => {
        let initials = makeInitials(contact.name);
        html += /*html*/ `<div class='contacts_icon' style="background-color: ${contact.color}; transform: translateX(${shift}px);">${initials}</div>`;
        shift -= 10;
    });

    html += /*html*/`</div>`;
    return html;
}


function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(processingStatus) {
    allTasksJson[currentDraggedElement]['processingStatus'] = processingStatus;
    updateHTML();
    await setItem('allTasks', JSON.stringify(allTasks));
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

function showBigTask(element){
    let id = element['taskID'];
    let categoryColor = '';
    if(element['category'] === 'User Story') {
        categoryColor = '#0038FF';
    } else if(element['category'] === 'Technical Task') {
        categoryColor = '#1FD7C1'; 
    }

    let subtasksHTML = ''; 
    if (element['subtasks'] && element['subtasks'].length > 0) {
        subtasksHTML += '<h3 class="h3">Subtasks</h3>';
        for (let i = 0; i < element['subtasks'].length; i++) {
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
            <div class="scroll_container">
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
                <div>` +
                    getAssignedToHTML(element.assignedTo) +
                    /*html*/ `</div>
                </div>
            <div> ${subtasksHTML}</div>
            </div>
            <div class="delete_edit_container">
                <div class="delete_container" onclick="deleteTasks(${id})">
                    <img class="delete_img" src="/assets/img/delete.svg" alt="">
                    <img class="delete_img_blau" src="/assets/img/delete_blau.svg"  alt="">
                    <p class="delete_edit_text">Delete</p>
                </div>
                <div class="delete_edit_line"></div>
                <div class="edit_container" onclick="openEditTasks(${id})">
                    <img class="edit_img" src="/assets/img/edit.svg" alt="">
                    <img class="edit_img_blau" src="/assets/img/edit_blau.svg" alt="">
                    <p class="delete_edit_text">Edit</p>
                </div>
            </div>
        </div>
    `;
}

function getContactForBigCardHTML(contact) {
    return (
      /*html*/ `
        <div class='bigTaskAssignedTo'>` +
      getContactLogoHTML(contact) +
      /*html*/ `  
          <div>${contact.name}</div>
        </div>
      `
    );
  }

function getAssignedToHTML(contacts) {
    let html = "";
    contacts.forEach((contact) => (html += getContactForBigCardHTML(contact)));
    return html;
}

function getContactLogoHTML(contact) {
    return /*html*/ `
        <div class='contacts_icon' style="background-color: ${contact.color}">${makeInitials(contact.name)}</div>
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

// function formateDate(date) {
//     const yyyy = date.getFullYear();
//     let mm = date.getMonth() + 1; // Months start at 0!
//     let dd = date.getDate();
//     if (dd < 10) dd = "0" + dd;
//     if (mm < 10) mm = "0" + mm;
//     return dd + "/" + mm + "/" + yyyy;
//   }


function countTasksByStatus(status) {
    return allTasksJson.filter(task => task.processingStatus === status).length;
}
function countTasksByPriority(priority) {
    return allTasksJson.filter(task => task.prio.includes(priority)).length;
}

function getUrgentTask() {
    return allTasksJson.find(task => task.prio.includes('Urgent'));
}

async function deleteTasks(taskID) {
    const index = allTasksJson.findIndex(task => task.taskID === taskID);
    if (index !== -1) {
        allTasksJson.splice(index, 1);
        updateHTML();
    } 
    closeBigTask();
    await setItem('allTasks', JSON.stringify(allTasks));
}

// function openEditTasks(){
//     document.getElementById('editTask').classList.remove('d-none');
// }

function openEditTasks(taskID) {
    const task = allTasksJson.find(task => task.taskID === taskID);
    if (task) {
        const editPopupContent = `
        <div id="editTask" class="editTaskInner" onclick="doNotClose(event)">
        <div class="form_inner_edit">
            <div class="editHeadline">
                <img onclick="closePopup()" class="editHeadlineImg"  src="/assets/img/close.svg" alt="">
            </div>
            <div class="form_left_edit">
                <div class="title_container">
                    <label for="taskTitle">Title<span style="color: #ffa800;"></span></label><br>
                    <input class="input_styles" type="text" id="taskTitle" value="${task.title}" placeholder="Enter a title" required><br>
                </div>
                <div class="discripton_container">
                    <label for="TaskDiscription">Discription</label><br>
                    <textarea class="input_styles" name="" id="taskDiscription"
                        placeholder="Enter a Discription">${task.description}</textarea><br>
                </div>
                <div class="dropdown_container">
                    <label for="assignedTo">Assigned to</label><br>
                    <div class="dropdown">
                        <div class="input_styles" id="assignedTo" onclick="showAssignablContacts(), doNotClose(event)">
                            Select contacts to assign
                            <img id="assign_arrow_down" src="/assets/img/arrow_drop_down.svg" alt="">
                            <img id="assign_arrow_up" class="d-none" src="/assets/img/arrow_up_drop_down.svg" alt="">
                        </div>
                        <div class="contact_to_assign_container d-none" id="contact_to_assign_containerID"
                            onclick="doNotClose(event)">
                            <!-- render content -->
                        </div>
                    </div>
                    <div class="assign_contact_container" id="assignContactContainerID">
                        <!-- render content -->
                    </div>
                </div>
            </div>
            <div class="form_right_edit">
                <div class="due_date_contaier">
                    <label for="dueDate">Due date<span style="color: #ffa800;"></span></label><br>
                    <input class="input_styles" type="date" value="${task.dueDate}" id="dueDate" required onclick="setDate()">
                </div>
                <label>Prio</label><br>
                <div class="prio_buttons" >
                    <button type="button" class="prio_btn_1" id="urgentBtnID" onclick="setTaskPrio('urgent')">
                        Urgent <img src="/assets/img/prio_urgent.svg" alt="">
                    </button>
                    <button type="button" class="prio_btn_2" id="mediumBtnID" onclick="setTaskPrio('medium')">
                        Medium <img src="/assets/img/prio_medium.svg" alt="">
                    </button>
                    <button type="button" class="prio_btn_3" id="lowBtnID" onclick="setTaskPrio('low')">
                        Low <img src="/assets/img/prio_low.svg" alt="">
                    </button>
                </div>
                <label for="subtasks">Subtasks</label><br>
                <div class="subtasks_container input_styles">
                    <input type="text" id="subtasks" value="${task['subtasks'].name}"  onfocus="subtasksFucus()">
                    <img class="subtask_btn_add" id="subtaskBtnAddID" src="/assets/img/add.svg" alt="">
                    <div class="subtasks_create_buttons d-none" id="subtasksCreateButtonsID">
                        <img class="subtask_btn_close" src="/assets/img/close.svg" alt="" onclick="cancelNewSubtask()">
                        <div class="substask_seperator"></div>
                        <img class="subtask_btn_check" src="/assets/img/check.svg" alt="" onclick="addNewSubtask()">
                    </div>
                </div>
                <div id="allSubtasksID">
                </div>
            </div>
            <div class="edit_button_container">
                <button class="edit_button" onclick="saveEditedTask('${taskID}')">Ok <img class="edit_button_img" src="/assets/img/check_weiß.svg" alt=""> </button>
            </div>
        </div>
        `;
        openPopup(editPopupContent);
    }
}

function openPopup(content) {
    const editPopup = document.getElementById('editTaskOverlay');
    editPopup.innerHTML = content;
    editPopup.classList.remove('d-none');
}

function closePopup() {
    const editPopup = document.getElementById('editTaskOverlay');
    editPopup.classList.add('d-none');
}

function saveEditedTask(taskID) {
    const editedTask = {
        taskID: taskID,
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDiscription').value,
        assignedTo: document.getElementById('assignedTo').value,
        dueDate: document.getElementById('dueDate').value,
        subtasks:[]
    };
    updateTask(editedTask);

    closePopup();
}

function updateTask(editedTask) {
    for (let i = 0; i < allTasksJson.length; i++) {
        if (allTasksJson[i].taskID === editedTask.taskID) {
            allTasksJson[i].title = editedTask.title;
            allTasksJson[i].description = editedTask.description;
            allTasksJson[i].dueDate = editedTask.dueDate;
            allTasksJson[i].assignedTo = editedTask.assignedTo;
            allTasksJson[i].subtasks = editedTask.subtasks;
        }
    }
   
}
