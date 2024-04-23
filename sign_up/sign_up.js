let on = false;
let confirmed;

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
    } 
    else {
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
        document.getElementById('remotePassword').classList.remove('blueBorder');
    } else {
        document.getElementById('remotePassword').classList.add('blueBorder');
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
    const isChecked = await checkUser();
    if(isChecked){
    if(on && confirmed){
    console.log(allUser);
    allUser.push({
        remoteName: remoteName.value,
        remoteEmail: remoteEmail.value,
        remotePassword: remotePassword.value,
    });
    await setItem('allUser', JSON.stringify(allUser));
    localStorage.setItem('startAnimation','true');
    
    resetForm();
    flyIn();
    setTimeout(redirectToLogin,1000);
    } else {
        alert('Please accept the Privacy policy!');
    }
    }
}

function resetForm(){
    remoteName.value ='';
    remoteEmail.value = '';
    remotePassword.value = '';
    document.getElementById('remoteCPassword').value = '';
}

async function loadUsers(){
    allUser = await getItem('allUser');
}

// alle EMails vom Server downloaden
// vergleichen ob Email bereits vorhanden ist
//wennn ja dann Fehlermeldung -> rote Schrift darunter
// wenn richtig neuen User anlegen

async function checkUser(){
    let inputE = document.getElementById('remoteEmail').value;
    allUser = await getItem('allUser');
 
    const filtedUser = allUser.filter(filterFunction);
    
    function filterFunction(allUser){
        return allUser['remoteEmail'] == inputE;
    };

    if (filtedUser.length == 0){

        // allUser.push({
        //     remoteName: remoteName.value,
        //     remoteEmail: remoteEmail.value,
        //     remotePassword: remotePassword.value,
        // });
        return true;
    } else {
        alert ('User bereits registriert.');
        return false;
    }
}

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
    checkPassword();
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
    let confirmPassword = document.getElementById('remoteCPassword').value;
    console.log(password, confirmPassword)
    let message = document.getElementById('message');

    if(password.length != 0 && confirmPassword.length != 0){
        if(password == confirmPassword){
            message.textContent = `Passwords match`;
            message.style.color = 'green';
            document.getElementById('remoteCPassword').classList.remove('redBorder');
            document.getElementById('remoteCPassword').classList.add('greenBorder');
            document.getElementById('remoteCPassword').style.borderColor = "green";
            confirmed = true;
        } else {
            message.textContent = `Ups! your password don't match`;
            message.style.color = 'red';
            document.getElementById('remoteCPassword').classList.remove('greenBorder');
            document.getElementById('remoteCPassword').classList.add('redBorder');
            document.getElementById('remoteCPassword').style.borderColor = "red";
            confirmed = false;
        }
    }
}

async function arrowLeft(){
    localStorage.setItem('startAnimation','true');
    redirectToLogin();
}
