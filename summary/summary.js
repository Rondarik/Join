document.addEventListener('DOMContentLoaded', function() {
    summaryInit();
});

/**
 * Initializes the summary by including HTML, fetching tasks from the server, updating the summary, greeting the user, and setting initial values.
 *
 * @return {Promise<void>} A promise that resolves when the summary initialization is complete.
 */
async function summaryInit(){
    await includeHTML();
    await getAllTasksFromServer();
    updateSummary();
    greetUser();
    setInitials();
    showCategory();
}

let logedInUser='';
/**
 * Sets a personalized greeting based on the current time and user name.
 *
 * @return {void} This function does not return anything.
 */
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

/**
 * Counts the number of tasks in the `allTasks` array that have the specified `processingStatus`.
 *
 * @param {string} status - The processing status to filter tasks by.
 * @return {number} The number of tasks with the specified status.
 */
function countTasksByStatus(status) {
    return allTasks.filter(task => task.processingStatus === status).length;
}

/**
 * Counts the number of tasks in the `allTasks` array that have the specified priority.
 *
 * @param {string} priority - The priority to filter tasks by.
 * @return {number} The number of tasks with the specified priority.
 */
function countTasksByPriority(priority) {
    return allTasks.filter(task => task.prio.includes(priority)).length;
}

/**
 * Returns the first task from the `allTasks` array that has the priority set to 'Urgent'.
 *
 * @return {Object|undefined} The task object with the highest priority or `undefined` if no such task exists.
 */
function getUrgentTask() {
    const urgentTasks = allTasks.filter(task => task.prio.includes('Urgent'));
    if (urgentTasks.length > 0) {
        return urgentTasks.reduce((earliestTask, currentTask) => {
            const earliestDueDate = new Date(earliestTask.dueDate);
            const currentDueDate = new Date(currentTask.dueDate);
            return earliestDueDate < currentDueDate ? earliestTask : currentTask;
        });
    } else {
        return undefined;
    }
}

/**
 * Updates the summary counts and displays them on the page.
 *
 * @return {void} This function does not return anything.
 */
function updateSummary() {
    let todoCountElement = document.getElementById('todoCount');
    let progressCountElement = document.getElementById('progressCount');
    let awaitFeedbackCountElement = document.getElementById('awaitFeedbackCount');
    let doneCountElement = document.getElementById('doneCount');
    let urgentCountElement = document.getElementById('urgentCount');
    let urgentDateElement = document.getElementById('urgentDate');
    let allTasksCountElement = document.getElementById('allTasksCount');

    if (todoCountElement && progressCountElement && awaitFeedbackCountElement && doneCountElement && urgentCountElement && urgentDateElement && allTasksCountElement) {
        let todoCount = countTasksByStatus('ToDo');
        let progressCount = countTasksByStatus('progress');
        let awaitFeedbackCount = countTasksByStatus('awaitFeedback');
        let doneCount = countTasksByStatus('done');
        let urgentCount = countTasksByPriority('Urgent');
        let urgentTask = getUrgentTask();
        let totalCount = todoCount + progressCount + awaitFeedbackCount + doneCount;

        todoCountElement.innerText = todoCount.toString();
        progressCountElement.innerText = progressCount.toString();
        awaitFeedbackCountElement.innerText = awaitFeedbackCount.toString();
        doneCountElement.innerText = doneCount.toString();
        urgentCountElement.innerText = urgentCount.toString();
        if (urgentTask) {
            urgentDateElement.innerText = formatDate(urgentTask.dueDate);
        } else {
            urgentDateElement.innerText = '';
        }
        allTasksCountElement.innerText = totalCount.toString();
    } 
}

function formatDate(dateString) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}




/**
 * Toggles the visibility of an element based on window width.
 *
 */
function toggleVisibilityBasedOnWidth() {
    let divElement = document.getElementById('summaryGreet');
    if (divElement) { 
        if (window.innerWidth <= 950) {
            setTimeout(function() {
                divElement.classList.add('d-none');
            }, 2500);
        } else {
            divElement.classList.remove('d-none');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    toggleVisibilityBasedOnWidth();
    summaryInit(); 
});

window.addEventListener('resize', toggleVisibilityBasedOnWidth);
