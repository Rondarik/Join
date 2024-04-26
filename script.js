let logedInAs =[];
let allTasks = [];
let allUser = [];

/**
 * Asynchronously retrieves all tasks from the server using 'allTasks' key.
 *
 * @return {Promise<void>} A promise that resolves after retrieving the tasks or handles errors.
 */
async function getAllTasksFromServer(){
    try {
        allTasks = await getItem('allTasks');
    } catch(e){
        console.error('Loading error:', e);
    }
}

/**
 * Asynchronously retrieves all users from the server using 'allUser' key.
 *
 * @return {Promise<void>} A promise that resolves after retrieving the users or handles errors.
 */
async function getAllUserFromServer(){
    try {
        allUser = await getItem('allUser');
    } catch(e){
        console.error('Loading error:', e);
    }
}

/**
 * Asynchronously retrieves all contacts from the server using 'allContacts' key.
 *
 * @return {Promise<void>} A promise that resolves after retrieving the contacts or handles errors.
 */
async function getAllContactsFromServer(){
    try {
        dummyContacts = await getItem('allContacts');
    } catch(e){
        console.error('Loading error:', e);
    }
}

/**
 * Asynchronously deletes all users by setting 'allUser' key to an empty array in the server.
 *
 * @return {Promise<void>} A promise that resolves after deleting all users or handles errors.
 */
async function deleteAllUser(){
    await setItem('allUser', JSON.stringify([]));
}