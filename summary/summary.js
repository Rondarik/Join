async function summaryInit(){
    await includeHTML();
    await getAllTasksFromServer();
    updateSummary();
    greetUser();
    setInitials();
}

// function getUserName(){
//     const userName = localStorage.getItem('logedInUser');
//     return userName;
// }

let logedInUser='';
function greetUser(){
    const now = new Date();
            const hour = now.getHours();
            const greet= document.getElementById('greeting');
            const nameElement = document.getElementById('activeUser');
            let greeting;
            if (hour < 12) {
                greeting = 'Good morning,';
            } else if (hour < 18) {
                greeting = 'Good afternoon,';
            } else {
                greeting = 'Good evening,';
            }
            const userName = getUserName();
            if(userName){
            nameElement.innerHTML = userName;
            }else{
                nameElement.innerHTML ='Guest'
            }
            greet.innerHTML = greeting;
}

// function greetMobile() {
//     let divElement = document.getElementById('summaryGreet');
//     if (window.innerWidth <= 720) {
//         setTimeout(function() {
//             divElement.classList.add('d-none');
//         }, 2500);
//     } else {
//         divElement.classList.remove('d-none');
//     }
// }

// document.addEventListener('DOMContentLoaded', greetMobile);

// window.addEventListener('resize', greetMobile);

// function setInitials() {
//     const userActive = getUserName();
//     const initials = makeInitials(userActive);
//     document.getElementById('activeUserInitial').innerHTML= initials;
//   }
  
//   function makeInitials(string) {
//     let names = string.split(' '),
//         initials = names[0].substring(0, 1).toUpperCase();
//     if (names.length > 1) {
//         initials += names[names.length - 1].substring(0, 1).toUpperCase();
//     }
//     return initials;
//   }
  
//   function getUserInitials() {
//     const userActive = localStorage.getItem('logedInUser');
//     if (userActive) {
//       return userActive;
//   } else {
//       return 'Guest';
//   }
//   }

function countTasksByStatus(status) {
    return allTasks.filter(task => task.processingStatus === status).length;
}
function countTasksByPriority(priority) {
    return allTasks.filter(task => task.prio.includes(priority)).length;
}

function getUrgentTask() {
    return allTasks.find(task => task.prio.includes('Urgent'));
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
    if (urgentTask) {
        document.getElementById('urgentDate').innerText = urgentTask.dueDate;
    } else {
        document.getElementById('urgentDate').innerText = '';
    }
    document.getElementById('allTasksCount').innerText = totalCount.toString();
}
