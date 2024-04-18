async function init(){
        await includeHTML();
        updateSummary();
        greetUser();
        setInitials();
  }

function getUserName(){
    const userName = localStorage.getItem('logedInUser');
    return userName;
}

let logedInUser='';
function greetUser(){
    const now = new Date();
            const hour = now.getHours();
            const greet= document.getElementById('greeting');
            const nameElement = document.getElementById('activeUser');
            let greeting;
            if (hour < 12) {
                greeting = 'Good morning,';
            } else if (hour < 18) {
                greeting = 'Good afternoon,';
            } else {
                greeting = 'Good evening,';
            }
            const userName = getUserName();
            if(userName){
            nameElement.innerHTML = userName;
            }else{
                nameElement.innerHTML ='Guest'
            }
            greet.innerHTML = greeting;
}

function setInitials() {
    const userActive = getUserName();
    const initials = makeInitials(userActive);
    document.getElementById('activeUserInitial').innerHTML= initials;
  }
  
  function makeInitials(string) {
    let names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }
  
  function getUserInitials() {
    const userActive = localStorage.getItem('logedInUser');
    if (userActive) {
      return userActive;
  } else {
      return 'Guest';
  }
  }