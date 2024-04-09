function addNewTask(){
    console.log(activUserTasks);
    let taskTilte = document.getElementById('taskTitle').value;
    // let taskDiscription = document.getElementById('TaskDiscription').value;

    let task = {
        "taskID": "0",
        "title": taskTilte,
        "description": "Description for Task 1",
    };
  
    activUserTasks.push(task);
    console.log(activUserTasks);
}

function setTaskID() {
    
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