function addNewTask(){
    let taskTilte = document.getElementById('taskTitle').value;
    let taskDiscription = document.getElementById('TaskDiscription').value;
    let date = document.getElementById('dueDate').value;

    let task = {
        "taskID": setTaskID(),
        "processingStatus": "ToDo",
        "title": taskTilte,
        "description": taskDiscription,
        "assignedTo": [],
        "dueDate": date,
        "prio": "medium",
        "category": "user story",
        "subtasks": []
    };
    activUserTasks.push(task);
    console.log(activUserTasks);
}

function clearTaskForm(){
    let category = document.getElementById('category').value;
    console.log(category);
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
    for (let i = 0; i < activUserTasks.length; i++) {
        const taskID = activUserTasks[i].taskID;
        if (taskID == ID) {
            return true;
        }
    }
    return false;
}





function setTaskPrio(prio) {
    let taskPrio = prio

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