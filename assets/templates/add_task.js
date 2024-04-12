let taskPrio = "medium";
let assignedContacts = [];

async function addNewTask() {
    await getAllTasksFromServer();
    let taskTilte = document.getElementById('taskTitle').value;
    let taskDiscription = document.getElementById('TaskDiscription').value;
    let date = document.getElementById('dueDate').value;
    let category = document.getElementById('category').value;
    let task = {
        "taskID": setTaskID(),
        "processingStatus": "ToDo",
        "title": taskTilte,
        "description": taskDiscription,
        "assignedTo": [],
        "dueDate": date,
        "prio": taskPrio,
        "category": category,
        "subtasks": []
    };
    // allTasks.push(task);
    // await setItem('allTasks', JSON.stringify(allTasks));
    console.log(allTasks);
}

// async nur zum testen
async function clearTaskForm() {
    // location.reload();
    getAllTasksFromServer();
}

function showAssignablContacts() {
    document.getElementById('assign_arrow_up').classList.toggle('d-none');
    document.getElementById('assign_arrow_down').classList.toggle('d-none');
    let contactsContainer = document.getElementById('contact_to_assign_containerID');
    contactsContainer.classList.toggle('d-none');
    contactsContainer.innerHTML = '';
    renderAllContacts(contactsContainer);
}

function renderAllContacts(contactsContainer) {
    for (let i = 0; i < dummyContacts.length; i++) {
        const bgColor = dummyContacts[i].color;
        const userName = dummyContacts[i].name;
        const initials = makeInitials(userName);
        console.log(initials);
        contactsContainer.innerHTML += renderAssignablContactsHTML(bgColor,initials,userName,i);
    }
}

function makeInitials(string){
        var names = string.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    }

function renderAssignablContactsHTML(bgColor,initials,userName,id) {
    return /*html*/ `
        <div class="contact_to_assign_box" onclick="addContanctToTask(${id})" >
            <div class="user_name_box">
                <div class="user_tag" style="background-color: ${bgColor}">${initials}</div>
                <div class="user_name">${userName}</div>
            </div>
            <img src="/assets/img/checkboxOff.svg" alt="">
            <img class="d-none" src="/assets/img/checkboxOn.svg" alt="">
        </div>
    `;
}


// Hier nur für Testzwecke
async function getAllTasksFromServer() {
    try {
        allTasks = await getItem('allTasks');
    } catch (e) {
        console.error('Loading error:', e);
    }
}

/**
 * This function gets a number as taskId that does not yet exist 
 * 
 * @returns the new unique taskId
 */
function setTaskID() {
    let ID = 0;
    while (IdAlreadyExists(ID)) {
        ID++;
    }
    return ID;
}

/**
 * This function looks for the passed ID in all tasks to check whether the ID already exists
 * 
 * @param {number} ID - Task-id
 * @returns false if the number not exists in the Tasksarray
 */
function IdAlreadyExists(ID) {
    for (let i = 0; i < allTasks.length; i++) {
        const taskID = allTasks[i].taskID;
        if (taskID == ID) {
            return true;
        }
    }
    return false;
}

/**
 * this function set the selected priority in the clobal variable for the new task
 * 
 * @param {string} prio - the priority of task, selected by the user
 */
function setTaskPrio(prio) {
    taskPrio = prio;
    setBtnCollorByPrio(prio);
}

/**
 * This function swaps the background color and the icon in the priority buttons
 * 
 * @param {string} prio - This is the priority that is set via the respective button
 */
function setBtnCollorByPrio(prio) {
    let urgentBtn = document.getElementById('urgentBtnID');
    let mediumBtn = document.getElementById('mediumBtnID');
    let lowBtn = document.getElementById('lowBtnID');

    document.querySelectorAll('.prio_buttons button').forEach(btn => {
        btn.classList.remove('clicked');
        urgentBtn.querySelector('img').src = '/assets/img/prio_urgent.svg';
        mediumBtn.querySelector('img').src = '/assets/img/prio_medium.svg';
        lowBtn.querySelector('img').src = '/assets/img/prio_low.svg';
    });
    if (prio === 'urgent') {
        urgentBtn.classList.add('clicked');
        urgentBtn.querySelector('img').src = '/assets/img/prio_urgent_white.svg';
    }
    if (prio === 'medium') {
        mediumBtn.classList.add('clicked');
        mediumBtn.querySelector('img').src = '/assets/img/prio_medium_white.svg';
    }
    if (prio === 'low') {
        lowBtn.classList.add('clicked');
        lowBtn.querySelector('img').src = '/assets/img/prio_low_white.svg';
    }
}