let taskPrio = ['/assets/img/prio_medium.svg','Medium'];
let assignedContacts = [];
let subtasks = [];

/**
 * Initializes the task by including HTML, setting initial values, and clearing the task form.
 *
 * @return {Promise<void>} A promise that resolves when the task initialization is complete.
 */
async function addTaskInit() {
    await includeHTML();
    setInitials();
    clearTaskForm();
}

/**
 * Adds a new task to the list of tasks.
 *
 * @param {string} processingStatus - The status of the task being added.
 * @return {Promise<void>} A promise that resolves when the task is added successfully.
 */
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
            "subtasks": subtasks
        };
        allTasks.push(task);
        await setItem('allTasks', JSON.stringify(allTasks));
        showToastMessage();
        console.log(allTasks);
    }
}

/**
 * Clears the task form by resetting input values and clearing assigned contacts and subtasks.
 *
 * @param None
 * @return None
 */
function clearTaskForm() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDiscription').value = '';
    assignedContacts = [];
    document.getElementById('dueDate').value = '';
    setTaskPrio('medium');
    document.getElementById('category').value = '';
    subtasks = [];
    renderNewSubtask();
}

/**
 * Toggles the visibility of the assignable contacts container and renders the contacts and user tags.
 *
 * @param None
 * @return None
 */
function showAssignablContacts() {
    document.getElementById('assign_arrow_up').classList.toggle('d-none');
    document.getElementById('assign_arrow_down').classList.toggle('d-none');
    let contactsContainer = document.getElementById('contact_to_assign_containerID');
    contactsContainer.classList.toggle('d-none');
    contactsContainer.innerHTML = '';
    renderAllContacts(contactsContainer);
    renderUserTag();
}

/**
 * Closes the assign contacts box and renders the user tag.
 *
 * @param {Element} contactsContainer - The container element for the assign contacts box.
 * @return {void} This function does not return a value.
 */
function closeAssignContactsBox() {
    let contactsContainer = document.getElementById('contact_to_assign_containerID');
    contactsContainer.classList.add('d-none');
    renderUserTag();
}

/**
 * Renders all contacts in the specified container.
 *
 * @param {HTMLElement} contactsContainer - The container to render the contacts into.
 * @return {void} 
 */
/**
 * Renders all contacts in the specified container.
 *
 * @param {HTMLElement} contactsContainer - The container to render the contacts into.
 * @return {void} 
 */
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

/**
 * Generates initials from a given string.
 *
 * @param {string} string - The input string from which initials are generated.
 * @return {string} The generated initials.
 */
function makeInitials(string) {
    var names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
}

/**
 * Renders the HTML for a contact box that can be assigned to a task.
 *
 * @param {string} bgColor - The background color of the contact box.
 * @param {string} initials - The initials of the contact person.
 * @param {string} userName - The name of the contact person.
 * @param {number} id - The id of the contact box.
 * @return {string} The HTML for the assignable contact box.
 */
function renderAssignablContactsHTML(bgColor, initials, userName, id) {
    return /*html*/ `
        <div class="contact_to_assign_box" id="assignBox${id}" onclick="editContanctsInTask(${id})" >
            <div class="user_name_box">
                <div class="user_tag" style="background-color: ${bgColor}">${initials}</div>
                <div class="user_name">${userName}</div>
            </div>
            <img id="assignCheckbox${id}" src="/assets/img/checkboxOff.svg" alt="">
        </div> `;
}

/**
 * Edits the contacts in a task.
 *
 * @param {number} id - The ID of the task.
 * @return {undefined} This function does not return a value.
 */
function editContanctsInTask(id) {
    if (assignedContacts.includes(dummyContacts[id])) {
        deleteContactFromTask(dummyContacts[id], id);
    } else {
        changStyleFromAddedContact(id);
        assignedContacts.push(dummyContacts[id]);
    }
}

/**
 * Changes the style of a contact box and its checkbox when the contact is added to a task.
 *
 * @param {number} id - The ID of the contact box.
 * @return {void} This function does not return anything.
 */
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

function showToastMessage() {
    document.getElementById('messageAddedTask').classList.remove('d-none');
    const myTimeout = setTimeout(switchToBaordSide, 1000);
}

function switchToBaordSide() {
    window.location.href = '../board/board.html';
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

// /**
//  * this function set the selected priority in the clobal variable for the new task
//  * 
//  * @param {string} prio - the priority of task, selected by the user
//  */
// function setTaskPrio(prio) {
//     taskPrio = prio;
//     setTaskPrio(prio);
// }

/**
 * This function swaps the background color and the icon in the priority buttons
 * 
 * @param {string} prio - This is the priority that is set via the respective button
 */
function setTaskPrio(prio) {
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
        taskPrio = ['/assets/img/prio_urgent.svg','Urgent'];
        urgentBtn.classList.add('clicked');
        urgentBtn.querySelector('img').src = '/assets/img/prio_urgent_white.svg';
    }
    if (prio === 'medium') {
        taskPrio = ['/assets/img/prio_medium.svg','Medium'];
        mediumBtn.classList.add('clicked');
        mediumBtn.querySelector('img').src = '/assets/img/prio_medium_white.svg';
    }
    if (prio === 'low') {
        taskPrio = ['/assets/img/prio_low.svg','Low'];
        lowBtn.classList.add('clicked');
        lowBtn.querySelector('img').src = '/assets/img/prio_low_white.svg';
    }
}

/**
 *  Subtasks 
 */

/**
 * Sets the visibility of the subtasks create buttons and hides the subtask add button.
 *
 * @return {void} This function does not return anything.
 */
function subtasksFucus() {
    document.getElementById('subtasksCreateButtonsID').classList.remove('d-none');
    document.getElementById('subtaskBtnAddID').classList.add('d-none');
}

/**
 * Sets the visibility and value of subtask-related elements when the subtask input loses focus.
 *
 * @return {undefined} This function does not return a value.
 */
function subtasksNoFucus() {
    document.getElementById('subtasksCreateButtonsID').classList.add('d-none');
    document.getElementById('subtaskBtnAddID').classList.remove('d-none');
    document.getElementById('subtasks').value = '';
}


/**
 * Adds a new subtask to the subtasks array, renders the new subtask, and clears the subtask input field.
 *
 * @return {void} This function does not return a value.
 */
function addNewSubtask() {
    let inputValue = document.getElementById('subtasks').value;
    let subtask = {
        'name': inputValue,
        'clicked': false
    }
    subtasks.push(subtask);
    renderNewSubtask();
    subtasksNoFucus();
    console.log('add Subtask ' + subtasks[0].clicked);
}

    /**
     * Cancels the creation of a new subtask by resetting the subtask input field and hiding the subtask creation buttons.
     *
     * @return {void} This function does not return a value.
     */
function cancelNewSubtask() {
    subtasksNoFucus();
}

/**
 * Renders the new subtasks by updating the HTML of the 'allSubtasksID' element.
 *
 * @return {void} This function does not return a value.
 */
function renderNewSubtask() {
    let subtasksContainer = document.getElementById('allSubtasksID');
    subtasksContainer.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i].name;
        subtasksContainer.innerHTML += subtaskHTML(i, subtask);
    }
}

/**
 * 
 * @param {Number} ID 
 * @param {String} text 
 * @returns HTML-Code
 */
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
        </div>`;
}

let subtaskIsFocused = false;

/**
 * Handles the mouseover event for styling subtask input.
 *
 * @param {Number} ID - The identifier of the subtask.
 * @return {undefined} This function does not return a value.
 */
function mouseoverStyleSubtaskInput(ID) {
    if (!subtaskIsFocused) {
        document.getElementById(`substaskEditButtonsID${ID}`).classList.remove('d-none');
    }
}

/**
 * Hides the edit buttons for a subtask when the mouse moves out of the subtask input field.
 *
 * @param {number} ID - The ID of the subtask.
 * @return {void} This function does not return anything.
 */
function mouseoutStyleSubtaskInput(ID) {
    document.getElementById(`substaskEditButtonsID${ID}`).classList.add('d-none');
}

/**
 * Sets the style of the subtask input field when it receives focus.
 *
 * @param {number} ID - The ID of the subtask.
 * @return {void} This function does not return anything.
 */
function onfocusStyleSubtaskInput(ID) {
    subtaskIsFocused = true;
    document.getElementById(`subtaskID${ID}`).style.backgroundColor = '#ffffff';
    document.getElementById(`substaskEditButtonsID${ID}`).classList.add('d-none');
    document.getElementById(`substaskConfirmButtonsID${ID}`).classList.remove('d-none');
}

/**
 * Focuses on the input field for a subtask with the given ID and sets the cursor position to the end.
 *
 * @param {number} ID - The ID of the subtask.
 * @return {void} This function does not return anything.
 */
function editSubtask(ID) {
    let inputField = document.getElementById(`inputSubtaskID${ID}`);
    inputField.focus();
    inputField.setSelectionRange(inputField.value.length, inputField.value.length);
}

/**
 * Deletes a subtask from the subtasks array, renders the new subtask list, and updates the focus state.
 *
 * @param {number} ID - The ID of the subtask to be deleted.
 * @return {void} This function does not return a value.
 */
function deleteSubtask(ID) {
    subtasks.splice(ID, 1);
    renderNewSubtask();
    subtaskIsFocused = false;
}

/**
 * Updates the value of a subtask at the given ID with the value from the input field, 
 * re-renders the subtask list, and sets the subtaskIsFocused flag to false.
 *
 * @param {number} ID - The ID of the subtask to be updated.
 * @return {void} This function does not return a value.
 */
function saveChangedSubtask(ID) {
    let inputValue = document.getElementById(`inputSubtaskID${ID}`).value;
    subtasks[ID].name = inputValue;
    renderNewSubtask();
    subtaskIsFocused = false;
}

/**
 * Checks the input fields for a new task, updates error messages and styling, and determines if all fields are filled.
 *
 * @return {boolean} Indicates whether all required fields are filled for a new task.
 */
function checkInputForNewTask() {
    let taskTilte = document.getElementById('taskTitle');
    let date = document.getElementById('dueDate');
    let category = document.getElementById('category');
    let errorTitle = document.getElementById('errorTitleID');
    let errorDate = document.getElementById('errorDueDateID');
    let errorCategory = document.getElementById('errorCategoryID');
    let allFieldsAreEmpty = false;

    if (taskTilte.value == '') {
        errorTitle.classList.remove('d-none');
        taskTilte.classList.add('red_border');
    } else {
        errorTitle.classList.add('d-none');
    }
    if (date.value == '') {
        errorDate.classList.remove('d-none');
        date.classList.add('red_border');
    } else {
        errorDate.classList.add('d-none');
    }
    if (category.value == '') {
        errorCategory.classList.remove('d-none');
        category.classList.add('red_border');
    } else {
        errorCategory.classList.add('d-none');
    }

    if ((taskTilte.value != '') && (date.value != '') && (category.value != '')) {
        allFieldsAreEmpty = true;
    }
    console.log(allFieldsAreEmpty);
    return allFieldsAreEmpty;
}

/**
 * Clears the error state of the specified input field and hides the corresponding error message.
 *
 * @param {string} inputField - The name of the input field to clear the error state for. Possible values are 'titel', 'dueDate', or 'category'.
 * @return {void} This function does not return a value.
 */
function clearError(inputField) {
    let taskTilte = document.getElementById('taskTitle');
    let date = document.getElementById('dueDate');
    let category = document.getElementById('category');
    let errorTitle = document.getElementById('errorTitleID');
    let errorDate = document.getElementById('errorDueDateID');
    let errorCategory = document.getElementById('errorCategoryID');

    if (inputField == 'titel') {
        taskTilte.classList.remove('red_border');
        errorTitle.classList.add('d-none');
    }
    if (inputField == 'dueDate') {
        date.classList.remove('red_border');
        errorDate.classList.add('d-none');
    }
    if (inputField == 'category') {
        category.classList.remove('red_border');
        errorCategory.classList.add('d-none');
    }
}

/**
 * Sets the minimum date attribute for the 'dueDate' input field based on today's date.
 *
 * @param {void} This function does not take any parameters.
 * @return {void} This function does not return a value.
 */
function setDate() {
    var today = new Date().toISOString().split('T')[0];
    var dateInput = document.getElementById('dueDate');
    dateInput.setAttribute('min', today);
}

/**
 * Displays the add task overlay and sets up an event listener for the form submission.
 *
 * @param {string} status - The status of the task being added.
 * @return {void} This function does not return a value.
 */
function showAddTaskOverlay(status) {
    document.getElementById('addTaskOverlayID').classList.remove('d-none');
    document.getElementById('addTaskForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const dueDate = document.getElementById('dueDate').value;
        const category = document.getElementById('taskCategory').value;
        const priority = document.getElementById('taskPriority').value;
        const assignedTo = []; 
        const newTask = {
            taskID: generateTaskID(), 
            title: title,
            description: description,
            dueDate: dueDate,
            category: category,
            prio: priority,
            assignedTo: assignedTo,
            processingStatus: status 
        };
        const container = document.getElementById(status.toLowerCase());
        container.innerHTML += generateTodoHTML(newTask);
        closeAddTaskOverlay();
        allTasks.push(newTask);
        setItem('allTasks', JSON.stringify(allTasks));
    });
}
