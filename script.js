let logedInAs = "";
let allTasks = [];
let allUser = [];
let allContacts = [];

async function deleteAllUser(){
    await setItem('allUser', JSON.stringify([]));
}