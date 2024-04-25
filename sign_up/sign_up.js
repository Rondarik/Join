let on = false;
let confirmed;

/**
 * Animates the fly-in effect by adding the 'bottom' class and removing the 'd-none' class from the 'flyer' element.
 *
 * @param {type} None - No parameters are required.
 * @return {type} None - The function does not return a value.
 */
function flyIn(){
    document.getElementById('flyer').classList.add('bottom');
    document.getElementById('flyer').classList.remove('d-none');
}

/**
 * Initializes the function by loading users, getting input values for email and password, and either clearing the input fields or calling the 'changingEye' function based on the input values.
 *
 * @param {type} None - No parameters are required.
 * @return {type} None - The function does not return a value.
 */
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

/**
 * Toggles the visibility and icon of the eye based on the password input type.
 *
 * @return {undefined} No return value.
 */
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

/**
 * Toggles the visibility and icon of the eye based on the password input type.
 *
 * @return {undefined} No return value.
 */
function eyeOn(){
    if(document.getElementById('remotePassword').type =="password"){
        document.getElementById('eyeOff').classList.add('d-none');
        document.getElementById('eyeOpen').classList.remove('d-none');
        document.getElementById('remotePassword').type = "text";
    } 
}

/**
 * Toggles the visibility and icon of the eye based on the password input type.
 *
 * @return {undefined} No return value.
 */
function eye() {
    // Check if the password input type is set to "text"
    if (document.getElementById('remotePassword').type === "text") {
        // Remove the "d-none" class from the "eyeOff" element and add the "d-none" class to the "eyeOpen" element
        document.getElementById('eyeOff').classList.remove('d-none');
        document.getElementById('eyeOpen').classList.add('d-none');
        // Set the password input type to "password"
        document.getElementById('remotePassword').type = "password";
    }
}

/**
 * Asynchronously registers a user if the user is validated and accepts the privacy policy.
 *
 * @return {Promise<void>} Returns a Promise that resolves when the user is registered and the form is reset.
 */
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

/**
 * Resets the form by clearing the values of the remoteName, remoteEmail, remotePassword, and remoteCPassword input fields.
 *
 * @return {void} This function does not return a value.
 */
function resetForm(){
    remoteName.value ='';
    remoteEmail.value = '';
    remotePassword.value = '';
    document.getElementById('remoteCPassword').value = '';
}

/**
 * Asynchronously loads the user data from local storage.
 *
 * @return {Promise<void>} A promise that resolves when the user data is loaded.
 */
async function loadUsers(){
    allUser = await getItem('allUser');
}

// alle EMails vom Server downloaden
// vergleichen ob Email bereits vorhanden ist
//wennn ja dann Fehlermeldung -> rote Schrift darunter
// wenn richtig neuen User anlegen

/**
 * Asynchronously checks if a user exists in the database with the email provided by the user.
 *
 * @return {Promise<boolean>} Returns a promise that resolves to true if the user does not exist,
 * and false if the user already exists. If the user does not exist, an alert is shown.
 */
async function checkUser(){
    let inputE = document.getElementById('remoteEmail').value;
    allUser = await getItem('allUser');
    const filtedUser = allUser.filter(filterFunction);
    function filterFunction(allUser){
        return allUser['remoteEmail'] == inputE;
    };
    if (filtedUser.length == 0){
        return true;
    } else {
        alert ('User bereits registriert.');
        return false;
    }
}

/**
 * Toggles the visibility and icon of the eye based on the password input type.
 *
 * @return {void} This function does not return a value.
 */
function changingEyes(){ 
    iput = document.getElementById('remoteCPassword').value;
    if(iput.length <= 0){
        document.getElementById('message').classList.add('d-none');
        document.getElementById('remoteCPassword').classList.remove('redBorder');
    }
    document.getElementById('locks').classList.add('d-none');
    if(document.getElementById('remoteCPassword').type =="password"){
        document.getElementById('eyesOff').classList.remove('d-none');
        document.getElementById('eyesOpen').classList.add('d-none');
    } else {
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

/**
 * Toggles the visibility and icon of the eye based on the password input type.
 *
 * @param {type} None - No parameters are required.
 * @return {type} No return value.
 */
function eyesOn(){
    if(document.getElementById('remoteCPassword').type =="password"){
        document.getElementById('eyesOff').classList.add('d-none');
        document.getElementById('eyesOpen').classList.remove('d-none');
        document.getElementById('remoteCPassword').type = "text";
    } 
}

/**
 * Toggles the visibility and icon of the eye based on the password input type.
 *
 * @param {type} None - No parameters are required.
 * @return {type} No return value.
 */
function eyes(){
    if(document.getElementById('remoteCPassword').type =="text"){
       document.getElementById('eyesOff').classList.remove('d-none');
       document.getElementById('eyesOpen').classList.add('d-none');
       document.getElementById('remoteCPassword').type = "password";
    }
}

/**
 * Redirects the user to the login page.
 *
 * @return {void} This function does not return a value.
 */
function redirectToLogin() {
    const targetUrl = '../login/login.html';
    window.location.href = targetUrl;
}

/**
 * Toggles the visibility of the checkbox elements and updates the value of the 'on' variable.
 *
 * @return {void} This function does not return a value.
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
 * Checks if the password and confirm password fields match, and updates the UI accordingly.
 *
 * @return {void} This function does not return anything.
 */
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
            // document.getElementById('remoteCPassword').style.borderColor = "green";
            confirmed = true;
        } else {
            message.textContent = `Ups! your password don't match`;
            message.style.color = 'red';
            document.getElementById('remoteCPassword').classList.remove('greenBorder');
            document.getElementById('remoteCPassword').classList.add('redBorder');
            // document.getElementById('remoteCPassword').style.borderColor = "red";
            confirmed = false;
        }
    }
}

/**
 * Sets the animation flag in local storage to true and redirects to the login page.
 *
 * @return {void} This function does not return a value.
 */
async function arrowLeft(){
    localStorage.setItem('startAnimation','true');
    redirectToLogin();
}