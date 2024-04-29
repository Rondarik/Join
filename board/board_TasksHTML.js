/**
 * 
 * @param {object} element Task 
 * @param {string} categoryColor #color-code of the category
 * @param {string} subtasksHTML HTLM code of the subtasks
 * @param {number} id TaskID of the Task
 * @returns 
 */
function makeBigTaskHTML(element, categoryColor, subtasksHTML, id) {
    return /*html*/`
    <div onclick="doNotClose(event)" class="bigTaskInner">
        <div class="scroll_container">
        <div class="bigHeadline">
            <p class="bigHeadlineText" style="background-color: ${categoryColor};">${element['category']}</p>
            <img onclick="closeBigTask()" class="bigHeadlineImg" src="/assets/img/close.svg" alt="">
        </div>
        <div>
            <h2 class="bigTitle">${element['title']}</h2>
            <p class="bigInfosDescription">${element['description']}</p>
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
                <img class="delete_img" src="./assets/img/delete.svg" alt="">
                <img class="delete_img_blau" src="./assets/img/delete_blau.svg"  alt="">
                <p class="delete_edit_text">Delete</p>
            </div>
            <div class="delete_edit_line"></div>
            <div class="edit_container" onclick="openEditTasks(${id})">
                <img class="edit_img" src="./assets/img/edit.svg" alt="">
                <img class="edit_img_blau" src="./assets/img/edit_blau.svg" alt="">
                <p class="delete_edit_text">Edit</p>
            </div>
        </div>
    </div>
`;
}

/**
 * Opens the edit tasks popup for a specific task.
 *
 * @param {string} taskID - The ID of the task to edit.
 * @return {undefined} This function does not return a value.
 */
function openEditTasks(taskID) {
    const task = allTasks.find(task => task.taskID === taskID);
    subtasks = task.subtasks;
    // assignedContacts = task.assignedTo;
    assignedContacts = getAssignedContacts(task.assignedTo);
    const editPopupContent = `
           <div id="editTask" class="editTaskInner" onclick="doNotClose(event), closeAddTaskOverlay()">
               <div class="form_inner_edit">
                    <div class="editHeadline">
                        <img onclick="closePopup()" class="editHeadlineImg"  src="./assets/img/close.svg" alt="">
                    </div>
                     <div class="form_left_edit">
                    <div class="title_container">
                    <label for="taskTitle">Title<span style="color: #ffa800;"></span></label>
                    <input class="input_styles" type="text" id="taskTitle" value="${task.title}" placeholder="Enter a title" required>
                </div>
                <div class="discripton_container">
                    <label for="TaskDiscription">Description</label>
                     <textarea class="input_styles" name="" id="taskDiscription"
                       placeholder="Enter a Description">${task.description}</textarea>
               </div>
                        <div class="due_date_contaier">
                        <label for="dueDate">Due date<span style="color: #ffa800;"></span></label><br>
                        <input class="input_styles" type="date" value="${task.dueDate}" id="dueDate" required onclick="setDate()">
                    </div>
                    </div>
                    <label>Priority</label><br>
                        <div class="prio_buttons" >
                            <button type="button" class="prio_btn_1" id="urgentBtnID" onclick="setTaskPrio('Urgent')">
                                Urgent <img src="./assets/img/prio_urgent.svg" alt="">
                            </button>
                            <button type="button" class="prio_btn_2" id="mediumBtnID" onclick="setTaskPrio('Medium')">
                                Medium <img src="./assets/img/prio_medium.svg" alt="">
                            </button>
                            <button type="button" class="prio_btn_3" id="lowBtnID" onclick="setTaskPrio('Low')">
                                Low <img src="./assets/img/prio_low.svg" alt="">
                            </button>
                        </div>
                        <div class="dropdown_container">
                            <label for="assignedTo">Assigned to</label><br>
                            <div class="dropdown">
                               <div class="input_styles" id="assignedTo" onclick="showAssignablContacts(), doNotClose(event)">
                                    Select contacts to assign
                                    <img id="assign_arrow_down" src="./assets/img/arrow_drop_down.svg" alt="">
                                    <img id="assign_arrow_up" class="d-none" src="./assets/img/arrow_up_drop_down.svg" alt="">
                                </div>
                                <div class="contact_to_assign_container d-none" id="contact_to_assign_containerID" onclick="doNotClose(event)">
                                </div>
                            </div>
                            <div class="assign_contact_container" id="assignContactContainerID">
                                <!-- render content -->
                            </div>
                       </div>
                    <div class="form_right_edit">
                    <label for="subtasks">Subtasks</label><br>
                    <div class="subtasks_container input_styles">
                        <input type="text" id="subtasks" placeholder="Add new Subtask" onfocus="subtasksFucus()">
                        <img class="subtask_btn_add" id="subtaskBtnAddID" src="./assets/img/add.svg" alt="">
                        <div class="subtasks_create_buttons d-none" id="subtasksCreateButtonsID">
                            <img class="subtask_btn_close" src="./assets/img/close.svg" alt="" onclick="cancelNewSubtask()">
                            <div class="substask_seperator"></div>
                            <img class="subtask_btn_check" src="./assets/img/check.svg" alt="" onclick="addNewSubtask()">
                        </div>
                    </div>
                    <div id="allSubtasksID">
                    </div>
                </div>
                    <div class="edit_button_container">
                        <button class="edit_button" onclick="saveEditedTask('${taskID}')">Ok <img class="edit_button_img" src="./assets/img/check_weiß.svg" alt=""> </button>
                    </div>
                </div>
            </div>`;
    openPopup(editPopupContent,task.prio);
}