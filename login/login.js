function init(){
    document.querySelector('.wholeSite').classList.add('wholeSiteStart');
    document.querySelector('.logoBig').classList.add('logoBigStart');
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