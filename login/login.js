let on;
let userEmail;
let userPassword;

function init(){
    document.querySelector('.wholeSite').classList.add('wholeSiteStart');
    document.querySelector('.logoBig').classList.add('logoBigStart');

    loadEmailandPassword();

    input = document.getElementById('password').value;
    inputE = document.getElementById('uEmail').value;
    if((input == null)||(inputE == null)){
        document.getElementById('uEmail').value = '';
        document.getElementById('password').value = '';
    } else {
        changingEye();
    }

    // if((input.length >= 1)||(inputE != null)){
    //     changingEye();
    // } else{
    //     document.getElementById('uEmail').value = '';
    //     document.getElementById('password').value = '';
    // }
}

function changingEye(){
    document.getElementById('lock').classList.add('d-none');

    if(document.getElementById('password').type =="password"){
        document.getElementById('eyeOff').classList.remove('d-none');
        document.getElementById('eyeOpen').classList.add('d-none');
    }else {
        document.getElementById('eyeOpen').classList.remove('d-none');
        document.getElementById('eyeOff').classList.add('d-none');
    }
    
    iput = document.getElementById('password').value;
    if(iput.length < 1){
        document.getElementById('lock').classList.remove('d-none'); 
        document.getElementById('eyeOff').classList.add('d-none');
        document.getElementById('eyeOpen').classList.add('d-none');
        document.getElementById('password').type = "password";
    } 
}

function eyeOn(){
    if(document.getElementById('password').type =="password"){
        document.getElementById('eyeOff').classList.add('d-none');
        document.getElementById('eyeOpen').classList.remove('d-none');
        document.getElementById('password').type = "text";
    } 
}

function eye(){
    if(document.getElementById('password').type =="text"){
       document.getElementById('eyeOff').classList.remove('d-none');
       document.getElementById('eyeOpen').classList.add('d-none');
       document.getElementById('password').type = "password";
    }
}

function saveEmailandPassword(){
    if(on === true){
    userEmail = document.getElementById('uEmail').value;
    userPassword = document.getElementById('password').value;
    localStorage.setItem('Email', userEmail);
    localStorage.setItem('Password', userPassword);
    logedInAs = userEmail;}
}

function loadEmailandPassword(){
    userEmail = localStorage.getItem('Email');
    userPassword = localStorage.getItem('Password');
    if(userEmail || userPassword){
        document.getElementById('uEmail').value = `${userEmail}`;
        document.getElementById('password').value = `${userPassword}`;
    }
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