
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
            if (logedInAs) {
                greeting += logedInAs; 
                nameElement.innerHTML = logedInAs; 
            } else {
                nameElement.innerHTML = 'Guest'; 
            }

            greet.innerHTML=greeting;
}


