function flyIn(){
    document.getElementById('flyer').classList.add('bottom');
    document.getElementById('flyer').classList.remove('d-none');
}

async function init(){
    loadUsers();
    input = document.getElementById('remotePassword').value;
    inputE = document.getElementById('remoteEmail').value;
    if((input == null)||(inputE == null)){
        document.getElementById('remoteEmail').value = '';
        document.getElementById('remotePassword').value = '';
    } else {
        changingEye();
    }  
}

function changingEye(){
    document.getElementById('lock').classList.add('d-none');
    if(document.getElementById('remotePassword').type =="password"){
        document.getElementById('eyeOff').classList.remove('d-none');
        document.getElementById('eyeOpen').classList.add('d-none');
    }else {
        document.getElementById('eyeOpen').classList.remove('d-none');
        document.getElementById('eyeOff').classList.add('d-none');
    }
    iput = document.getElementById('remotePassword').value;
    if(iput.length < 1){
        document.getElementById('lock').classList.remove('d-none'); 
        document.getElementById('eyeOff').classList.add('d-none');
        document.getElementById('eyeOpen').classList.add('d-none');
        document.getElementById('remotePassword').type = "password";
    } 
}

function eyeOn(){
    if(document.getElementById('remotePassword').type =="password"){
        document.getElementById('eyeOff').classList.add('d-none');
        document.getElementById('eyeOpen').classList.remove('d-none');
        document.getElementById('remotePassword').type = "text";
    } 
}

function eye(){
    if(document.getElementById('remotePassword').type =="text"){
       document.getElementById('eyeOff').classList.remove('d-none');
       document.getElementById('eyeOpen').classList.add('d-none');
       document.getElementById('remotePassword').type = "password";
    }
}

async function register() {
    registerBtn.disabled = true;
    console.log(allUser);
    allUser.push({
        remoteName: remoteName.value,
        remoteEmail: remoteEmail.value,
        remotePassword: remotePassword.value,
    });
    await setItem('allUser', JSON.stringify(allUser));
    resetForm();
}

function resetForm(){
    remoteName.value ='';
    remoteEmail.value = '';
    remotePassword.value = '';
    registerBtn.disabled = false;
}

async function loadUsers(){
    allUser = await getItem('allUser');
}