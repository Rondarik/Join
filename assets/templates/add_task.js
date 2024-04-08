function addNewTask(){
    console.log('Hello World')
}


function setTaskPrio(prio) {
    let taskPrio = prio

    setBtnCollorByPrio(prio);
}

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