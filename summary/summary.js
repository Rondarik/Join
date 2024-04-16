function greetUser(){
    const now = new Date();
            const hour = now.getHours();
            const greet= document.getElementById('greeting');
            let greeting;
            if (hour < 12) {
                greeting = 'Good morning,';
            } else if (hour < 18) {
                greeting = 'Good afternoon,';
            } else {
                greeting = 'Good evening,';
            }
            greet.innerHTML=greeting;
}

// function countTasksByStatus(status) {
//     return allTasks.filter(task => task.processingStatus === status).length;
// }

// function updateSummary(){
// let todoCount = countTasks('ToDo');
// let progressCount = countTasks('progress');
// let awaitFeedbackCount = countTasks('awaitFeedback');
// let doneCount = countTasks('done');

// document.getElementById('todoCount').innerHTML= todoCount.toString();
// document.getElementById('progressCount').innerHTML = progressCount.toString();
// document.getElementById('awaitFeedbackCount').innerHTML = awaitFeedbackCount.toString();
// document.getElementById('doneCount').innerHTML = doneCount.toString();
// }



