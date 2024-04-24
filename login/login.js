let on = false;
let userEmail;
let userPassword;

/**
 * Initializes the function by performing various tasks such as animation, loading email and password, 
 * checking if input values are null, changing the eye, and getting all users from the server.
 *
 * @return {undefined} No return value.
 */
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

/**
 * Toggles the visibility and icon of the eye based on the password input type.
 *
 * @return {undefined} No return value.
 */
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
    } else {
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

/**
 * Toggles the visibility and icon of the eye based on the password input type.
 *
 */
function eyeOn(){
    if(document.getElementById('password').type =="password"){
        document.getElementById('eyeOff').classList.add('d-none');
        document.getElementById('eyeOpen').classList.remove('d-none');
        document.getElementById('password').type = "text";
    } 
}

/**
 * Toggles the visibility and icon of the eye based on the password input type.
 *
 */
function eye(){
    if(document.getElementById('password').type =="text"){
       document.getElementById('eyeOff').classList.remove('d-none');
       document.getElementById('eyeOpen').classList.add('d-none');
       document.getElementById('password').type = "password";
    }
}

/**
 * Saves the user's email and password to the local storage if the user is validated.
 *
 * @return {Promise<void>} This function does not return a value.
 */
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

/**
 * Loads the user's email and password from local storage and sets the corresponding input fields.
 *
 * @return {void} This function does not return a value.
 */
function loadEmailandPassword(){
    userEmail = localStorage.getItem('Email');
    userPassword = localStorage.getItem('Password');
    if(userEmail || userPassword){
        document.getElementById('uEmail').value = `${userEmail}`;
        document.getElementById('password').value = `${userPassword}`;
    }
}

/**
 * Sets the visibility of the checkbox elements and updates the value of the 'on' variable.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function checked(){
    document.getElementById('checkboxOff').classList.add('d-none');
    document.getElementById('checkboxOn').classList.remove('d-none');
    on = true;
}

/**
 * Sets the visibility of the checkbox elements and updates the value of the 'on' variable.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function unchecked(){
    document.getElementById('checkboxOff').classList.remove('d-none');
    document.getElementById('checkboxOn').classList.add('d-none');
    on = false;
}

/**
 * Redirects the user to the summary page.
 *
 * @param {string} targetUrl - The URL of the summary page.
 * @return {void} This function does not return a value.
 */
function redirectToSummary() {
    const targetUrl = '../summary/summary.html';
    window.location.href = targetUrl;
  }

/**
 * Performs an animation based on the value of the 'startAnimation' variable in local storage.
 *
 * @return {undefined} No return value.
 */
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

/**
 * Asynchronously checks if a user exists in the database with the email provided by the user.
 *
 * @return {Promise<boolean>} Returns a promise that resolves to true if the user exists and the password is correct,
 * and false otherwise. If the user does not exist, an alert is shown.
 */
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
        } else {
            document.getElementById('message').classList.remove('d-none');
            document.getElementById('password').classList.remove('marginB');
            message.textContent = `Wrong password Ups! Try again.`;
            message.style.color = 'red';
            document.getElementById('password').classList.add('redBorder');
            return false;
        }
    }
}

/**
 * Checks if the password provided by the user matches the password stored in the filteredUser object.
 *
 * @param {Object} filteredUser - The user object containing the remote password.
 * @return {boolean} Returns true if the password matches, false otherwise.
 */
function checkPassword(filteredUser){
    let pw = document.getElementById('password').value;
    let filteredRemotePassword = filteredUser['remotePassword'];
    if(pw == filteredRemotePassword){
        return true;
    } else {
        return false;
    }
}

/**
 * Saves the current user to the local storage.
 *
 * @param {Object} filteredUser - The user object containing the remote name.
 * @return {void} This function does not return a value.
 */
function saveCurrentUser(filteredUser){
    localStorage.setItem('logedInUser', filteredUser['remoteName']);
}