let on = false;
let userEmail;
let userPassword;

function init(){
    animation();
    loadEmailandPassword();
    input = document.getElementById('password').value;
    inputE = document.getElementById('uEmail').value;
    if((input == null)||(inputE == null)){
        document.getElementById('uEmail').value = '';
        document.getElementById('password').value = '';
    } else {
        changingEye();
    }
    getAllUserFromServer();
}

function changingEye(){
    iput = document.getElementById('password').value;

    if(iput.length <= 0){
    document.getElementById('message').classList.add('d-none');
    document.getElementById('password').classList.remove('redBorder');
    document.getElementById('password').classList.add('marginB');
}
    
    document.getElementById('lock').classList.add('d-none');

    if(document.getElementById('password').type =="password"){
        document.getElementById('eyeOff').classList.remove('d-none');
        document.getElementById('eyeOpen').classList.add('d-none');
    }else {
        document.getElementById('eyeOpen').classList.remove('d-none');
        document.getElementById('eyeOff').classList.add('d-none');
    }
    
 
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

async function saveEmailandPassword(){
    const isChecked = await checkUser();
    if(isChecked){
    if(on){
    userEmail = document.getElementById('uEmail').value;
    userPassword = document.getElementById('password').value;
    localStorage.setItem('Email', userEmail);
    localStorage.setItem('Password', userPassword);

    }
    redirectToSummary();
    }
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

function redirectToSummary() {
    const targetUrl = '../summary/summary.html';
    window.location.href = targetUrl;
  }

  function animation(){
 
    let startAnimation = localStorage.getItem('startAnimation');
    console.log(startAnimation);
    if(startAnimation === null){
    document.getElementById('whole').classList.add('wholeSiteStart');
    document.getElementById('big').classList.add('logoBigStart');
    } else{
        document.getElementById('whole').classList.remove('wholeSite');
        document.getElementById('big').classList.remove('logoBig');

        document.getElementById('whole').classList.add('wholeSiteStart');
        document.getElementById('big').classList.add('logoBigStart');

        document.getElementById('privat').style.opacity = '1';
        document.getElementById('legal').style.opacity = '1';
        document.getElementById('top').style.opacity = '1';
        document.getElementById('loginForm').style.opacity = '1';

        document.getElementById('privat').style.animation = 'unset';
        document.getElementById('legal').style.animation = 'unset';
        document.getElementById('top').style.animation = 'unset';
        document.getElementById('loginForm').style.animation = 'unset';

        localStorage.removeItem('startAnimation');
    }
}

async function checkUser(){
    let inputE = document.getElementById('uEmail').value;

    allUser = await getItem('allUser');
 
    const filteredUser = allUser.find(filterFunction);
    
    function filterFunction(allUser){
        return allUser['remoteEmail'] == inputE;
    };

    if (filteredUser == undefined){
        alert ('User bitte registrieren!');
        return false;
    } else {
        if(checkPassword(filteredUser)){
        saveCurrentUser(filteredUser);
        return true;
        } 
        else {
            document.getElementById('message').classList.remove('d-none');
            document.getElementById('password').classList.remove('marginB');
            message.textContent = `Wrong password Ups! Try again.`;
            message.style.color = 'red';
            document.getElementById('password').classList.add('redBorder');
            return false;
        }
    }
}

function checkPassword(filteredUser){
    let pw = document.getElementById('password').value;
    let filteredRemotePassword = filteredUser['remotePassword'];
    if(pw == filteredRemotePassword){
        return true;
    } else {
        return false;
    }
}

function saveCurrentUser(filteredUser){
    localStorage.setItem('logedInUser', filteredUser['remoteName']);
}