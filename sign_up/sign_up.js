let on = false;

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
    localStorage.setItem('startAnimation','true');
    checkPassword();
    resetForm();
    flyIn();
    setTimeout(redirectToLogin,1000);
}

function resetForm(){
    remoteName.value ='';
    remoteEmail.value = '';
    remotePassword.value = '';
    document.getElementById('remoteCPassword').value = '';
    registerBtn.disabled = false;
}

async function loadUsers(){
    allUser = await getItem('allUser');
}

// alle Mails vom Server downloaden
// vergleichen ob Email bereits vorhanden ist
//wennn ja dann Fehlermeldung -> rote Schrift darunter
// wenn richtig neuen User anlegen

// async function checkUser(){
//     if('remoteEmail' = true){

//     } else {

//     }
// }

function changingEyes(){ 
    document.getElementById('locks').classList.add('d-none');
    if(document.getElementById('remoteCPassword').type =="password"){
        document.getElementById('eyesOff').classList.remove('d-none');
        document.getElementById('eyesOpen').classList.add('d-none');
    }else {
        document.getElementById('eyesOpen').classList.remove('d-none');
        document.getElementById('eyesOff').classList.add('d-none');
    }
    iput = document.getElementById('remoteCPassword').value;
    if(iput.length < 1){
        document.getElementById('locks').classList.remove('d-none'); 
        document.getElementById('eyesOff').classList.add('d-none');
        document.getElementById('eyesOpen').classList.add('d-none');
        document.getElementById('remoteCPassword').type = "password";
    } 
}

function eyesOn(){
    if(document.getElementById('remoteCPassword').type =="password"){
        document.getElementById('eyesOff').classList.add('d-none');
        document.getElementById('eyesOpen').classList.remove('d-none');
        document.getElementById('remoteCPassword').type = "text";
    } 
}

function eyes(){
    if(document.getElementById('remoteCPassword').type =="text"){
       document.getElementById('eyesOff').classList.remove('d-none');
       document.getElementById('eyesOpen').classList.add('d-none');
       document.getElementById('remoteCPassword').type = "password";
    }
}

function redirectToLogin() {
    const targetUrl = '../login/login.html';
    window.location.href = targetUrl;
  }

  function checked(){
    document.getElementById('checkboxOff').classList.add('d-none');
    document.getElementById('checkboxOn').classList.remove('d-none');
    on = true;
}

function unchecked(){
    document.getElementById('checkboxOff').classList.remove('d-none');
    document.getElementById('checkboxOn').classList.add('d-none');
    on = false;
}

function checkPassword(){
    let password = document.getElementById('remotePassword').value;
    let confirmPassoword = document.getElementById('remoteCPassword').value;
    console.log(password, confirmPassoword)
    let message = document.getElementById('message');

    if(password.length != 0){
        if(password == confirmPassoword){
            message.textContent = 'Passwords match';
            message.style.color = 'green'
        } else {
            message.textContent = 'Passwords do not match';
            message.style.color = 'red'
        }
    }
    else {
        alert('Passoword can not be empty!');
        message.textContent='';
    }
}