let logedInAs = "";
let allTasks = [];
let allUser = [];
let allContacts = [];

async function getAllTasksFromServer(){
    try {
        allTasks = await getItem('allTasks');
    } catch(e){
        console.error('Loading error:', e);
    }
    console.log(allTasks); // nur zur Kontrolle!
}

async function getAllUserFromServer(){
    try {
        allUser = await getItem('allUser');
    } catch(e){
        console.error('Loading error:', e);
    }
    console.log(allUser); // nur zur Kontrolle!
}

async function deleteAllUser(){
    await setItem('allUser', JSON.stringify([]));
}