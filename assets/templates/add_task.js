let taskPrio = "medium";

async function addNewTask(){
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
    activUserTasks.push(task);
    await setItem('allTasks', JSON.stringify(activUserTasks));
    console.log(activUserTasks);
}

async function clearTaskForm(){
    // location.reload();
    try {
        activUserTasks = JSON.parse(await getItem('allTasks'));
    } catch(e){
        console.error('Loading error:', e);
    }
    console.log(activUserTasks);
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