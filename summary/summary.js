
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
            const dummyContact = dummyContacts[0];
            if(dummyContact.name){
            nameElement.innerHTML = dummyContact.name;
            }else{
                nameElement.innerHTML ='Guest'
            }
            greet.innerHTML = greeting;
        }
           

        
     
  