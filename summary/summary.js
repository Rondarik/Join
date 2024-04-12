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

// function updateSummary() {
//     const todoCount = countTasksByStatus('ToDo');
//     const progressCount = countTasksByStatus('progress');
//     const awaitFeedbackCount = countTasksByStatus('awaitFeedback');
//     const doneCount = countTasksByStatus('done');

//     document.getElementById('todoCount').innerText = todoCount;
//     document.getElementById('progressCount').innerText = progressCount;
//     document.getElementById('awaitFeedbackCount').innerText = awaitFeedbackCount;
//     document.getElementById('doneCount').innerText = doneCount;
// }



