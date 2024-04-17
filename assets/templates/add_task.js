let taskPrio = "medium";
let assignedContacts = [];
let subtasks = [];

async function addNewTask(processingStatus) {
    await getAllTasksFromServer();
    if (checkInputForNewTask()) {
        let taskTilte = document.getElementById('taskTitle').value;
        let taskDiscription = document.getElementById('taskDiscription').value;
        let date = document.getElementById('dueDate').value;
        let category = document.getElementById('category').value;
        let task = {
            "taskID": setTaskID(),
            "processingStatus": processingStatus,
            "title": taskTilte,
            "description": taskDiscription,
            "assignedTo": assignedContacts,
            "dueDate": date,
            "prio": taskPrio,
            "category": category,
            "subtasks": []
        };
        allTasks.push(task);
        // await setItem('allTasks', JSON.stringify(allTasks));
        console.log(allTasks);
    }
}

function clearTaskForm() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDiscription').value = '';
    assignedContacts = [];
    document.getElementById('dueDate').value = '';
    setBtnCollorByPrio('medium');
    document.getElementById('category').value = '';
    subtasks = [];
    renderNewSubtask();
}

function showAssignablContacts() {
    document.getElementById('assign_arrow_up').classList.toggle('d-none');
    document.getElementById('assign_arrow_down').classList.toggle('d-none');
    let contactsContainer = document.getElementById('contact_to_assign_containerID');
    contactsContainer.classList.toggle('d-none');
    contactsContainer.innerHTML = '';
    renderAllContacts(contactsContainer);
    renderUserTag();
}

function closeAssignContactsBox() {
    let contactsContainer = document.getElementById('contact_to_assign_containerID');
    contactsContainer.classList.add('d-none');
    renderUserTag();
}

function renderAllContacts(contactsContainer) {
    for (let i = 0; i < dummyContacts.length; i++) {
        const bgColor = dummyContacts[i].color;
        const userName = dummyContacts[i].name;
        const initials = makeInitials(userName);
        contactsContainer.innerHTML += renderAssignablContactsHTML(bgColor, initials, userName, i);
        if (assignedContacts.includes(dummyContacts[i])) {
            changStyleFromAddedContact(i);
        }
    }
}

function makeInitials(string) {
    var names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
}

function renderAssignablContactsHTML(bgColor, initials, userName, id) {
    return /*html*/ `
        <div class="contact_to_assign_box" id="assignBox${id}" onclick="editContanctsInTask(${id})" >
            <div class="user_name_box">
                <div class="user_tag" style="background-color: ${bgColor}">${initials}</div>
                <div class="user_name">${userName}</div>
            </div>
            <img id="assignCheckbox${id}" src="/assets/img/checkboxOff.svg" alt="">
        </div>
    `;
}

function editContanctsInTask(id) {
    if (assignedContacts.includes(dummyContacts[id])) {
        deleteContactFromTask(dummyContacts[id], id);
    } else {
        changStyleFromAddedContact(id);
        assignedContacts.push(dummyContacts[id]);
    }
}

function changStyleFromAddedContact(id) {
    let contactBox = document.getElementById(`assignBox${id}`);
    let assignCheckbox = document.getElementById(`assignCheckbox${id}`);
    contactBox.style.backgroundColor = '#2A3647'
    contactBox.style.color = '#ffffff';
    assignCheckbox.src = '/assets/img/checkboxOn_white.svg';
}

function deleteContactFromTask(element, id) {
    let contactBox = document.getElementById(`assignBox${id}`);
    let assignCheckbox = document.getElementById(`assignCheckbox${id}`);
    let index = assignedContacts.indexOf(element);
    contactBox.style.backgroundColor = '#ffffff'
    contactBox.style.color = '#000000';
    assignCheckbox.src = '/assets/img/checkboxOff.svg';
    assignedContacts.splice(index, 1);
}

function doNotClose(event) {
    event.stopPropagation();
}

function renderUserTag() {
    let userTags = document.getElementById('assignContactContainerID');
    userTags.innerHTML = '';
    for (let i = 0; i < assignedContacts.length; i++) {
        const name = assignedContacts[i].name;
        const bgColor = assignedContacts[i].color;
        userTags.innerHTML += /*html*/ `
             <div class="user_tag" style="background-color: ${bgColor};">${makeInitials(name)}</div>
        `;
    }

}




// Hier nur für Testzwecke
// async function getAllTasksFromServer() {
//     try {
//         allTasks = await getItem('allTasks');
//     } catch (e) {
//         console.error('Loading error:', e);
//     }
// }

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




/**
 *  Subtasks 
 */

function subtasksFucus() {
    document.getElementById('subtasksCreateButtonsID').classList.remove('d-none');
    document.getElementById('subtaskBtnAddID').classList.add('d-none');
}

function subtasksNoFucus() {
    document.getElementById('subtasksCreateButtonsID').classList.add('d-none');
    document.getElementById('subtaskBtnAddID').classList.remove('d-none');
    document.getElementById('subtasks').value = '';
}

function addNewSubtask() {
    let inputValue = document.getElementById('subtasks').value;
    subtasks.push(inputValue);
    renderNewSubtask();
    subtasksNoFucus();


    console.log('add Subtask ' + subtasks);
}

function cancelNewSubtask() {
    subtasksNoFucus();
}

function renderNewSubtask() {
    let subtasksContainer = document.getElementById('allSubtasksID');
    subtasksContainer.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        subtasksContainer.innerHTML += subtaskHTML(i, subtask);
    }
}

function subtaskHTML(ID, text) {
    return /*html*/ `
        <div id="subtaskID${ID}" class="subtask_box" onmouseover="mouseoverStyleSubtaskInput(${ID})" onmouseout="mouseoutStyleSubtaskInput(${ID})">
            <input type="text" id="inputSubtaskID${ID}" value="${text}" class="input_subtask" onfocus="onfocusStyleSubtaskInput(${ID})">
            <div class="edit_buttons d-none" id="substaskEditButtonsID${ID}">
                <img class="subtask_btn_edit" src="/assets/img/edit.svg" alt="" onclick="editSubtask(${ID})">
                <div class="substask_seperator"></div>
                <img class="subtask_btn_delete" src="/assets/img/delete.svg" alt="" onclick="deleteSubtask(${ID})">
            </div>
            <div class="edit_buttons d-none" id="substaskConfirmButtonsID${ID}">
                <img class="subtask_btn_delete" src="/assets/img/delete.svg" alt="" onclick="deleteSubtask(${ID})">
                <div class="substask_seperator"></div>
                <img class="subtask_btn_check" src="/assets/img/check.svg" alt="" onclick="saveChangedSubtask(${ID})">
            </div>
        </div>
    `;
}


let subtaskIsFocused = false;
function mouseoverStyleSubtaskInput(ID) {
    if (!subtaskIsFocused) {
        document.getElementById(`substaskEditButtonsID${ID}`).classList.remove('d-none');
    }
}

function mouseoutStyleSubtaskInput(ID) {
    document.getElementById(`substaskEditButtonsID${ID}`).classList.add('d-none');
}


function onfocusStyleSubtaskInput(ID) {
    subtaskIsFocused = true;
    document.getElementById(`subtaskID${ID}`).style.backgroundColor = '#ffffff';
    document.getElementById(`substaskEditButtonsID${ID}`).classList.add('d-none');
    document.getElementById(`substaskConfirmButtonsID${ID}`).classList.remove('d-none');
}

function editSubtask(ID) {
    let inputField = document.getElementById(`inputSubtaskID${ID}`);
    inputField.focus();
    inputField.setSelectionRange(inputField.value.length, inputField.value.length);
}

function deleteSubtask(ID) {
    subtasks.splice(ID, 1);
    renderNewSubtask();
    subtaskIsFocused = false;
}

function saveChangedSubtask(ID) {
    let inputValue = document.getElementById(`inputSubtaskID${ID}`).value;
    subtasks.splice(ID, 1, inputValue);
    renderNewSubtask();
    subtaskIsFocused = false;
}

function checkInputForNewTask() {
    let taskTilte = document.getElementById('taskTitle').value;
    let date = document.getElementById('dueDate').value;
    let category = document.getElementById('category').value;
    let errorTitle = document.getElementById('errorTitleID');
    let errorDate = document.getElementById('errorDueDateID');
    let errorCategory = document.getElementById('errorCategoryID');
    let allFieldsAreEmpty = false;

    taskTilte == '' ? errorTitle.classList.remove('d-none') : errorTitle.classList.add('d-none');
    date == '' ? errorDate.classList.remove('d-none') : errorDate.classList.add('d-none');
    category == '' ? errorCategory.classList.remove('d-none') : errorCategory.classList.add('d-none');


    if ((taskTilte != '') && (date != '') && (category != '')) {
        allFieldsAreEmpty = true;
    }
    console.log(allFieldsAreEmpty);
    return allFieldsAreEmpty;
}

function setDate() {
    var today = new Date().toISOString().split('T')[0];
    var dateInput = document.getElementById('dueDate');
    dateInput.setAttribute('min', today);
}