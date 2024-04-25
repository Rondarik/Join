// let logedInAs =[];
// let allTasks = [];
// let allUser = [];
// // let allContacts = [];

// /**
//  * Asynchronously retrieves all tasks from the server using 'allTasks' key.
//  *
//  * @return {Promise<void>} A promise that resolves after retrieving the tasks or handles errors.
//  */
// async function getAllTasksFromServer(){
//     try {
//         allTasks = await getItem('allTasks');
//     } catch(e){
//         console.error('Loading error:', e);
//     }
//     console.log(allTasks); // nur zur Kontrolle!
// }

// /**
//  * Asynchronously retrieves all users from the server using 'allUser' key.
//  *
//  * @return {Promise<void>} A promise that resolves after retrieving the users or handles errors.
//  */
// async function getAllUserFromServer(){
//     try {
//         allUser = await getItem('allUser');
//     } catch(e){
//         console.error('Loading error:', e);
//     }
//     console.log(allUser); // nur zur Kontrolle!
// }

// async function getAllContactsFromServer(){
//     try {
//         dummyContacts = await getItem('allContacts');
//     } catch(e){
//         console.error('Loading error:', e);
//     }
//     console.log(dummyContacts);
// }

// async function deleteAllUser(){
//     await setItem('allUser', JSON.stringify([]));
// }

let logedInAs =[];
let allTasks = [];
let allUser = [];
// let allContacts = [];

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
    console.log(allTasks); // nur zur Kontrolle!
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
    console.log(allUser); // nur zur Kontrolle!
}

async function getAllContactsFromServer(){
    try {
        dummyContacts = await getItem('allContacts');
    } catch(e){
        console.error('Loading error:', e);
    }
    console.log(dummyContacts);
}

async function deleteAllUser(){
    await setItem('allUser', JSON.stringify([]));
}
