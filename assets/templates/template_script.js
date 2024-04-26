/**
 * Asynchronously includes HTML content into elements based on the 'w3-include-html' attribute.
 *
 * @return {Promise<void>} This function does not return anything directly but updates the HTML content of elements.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/**
 * Toggles the navigation menu between active and inactive states.
 *
 * @return {void} This function does not return a value.
 */
function toggleNavMenu() {
    let navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

const links = document.querySelectorAll('.link');

for (let i = 0; i < links.length; i++) {
    if (links[i].href === window.location.href) {
        links[i].classList.add('active');
    }
}

/**
 * Sets the initials of the active user in the HTML element with the ID 'activeUserInitial'.
 *
 * @return {void} This function does not return a value.
 */
function setInitials() {
    const userActive = getUserName();
    const initials = makeInitials(userActive);
    document.getElementById('activeUserInitial').innerHTML = initials;
}

/**
 * Splits a string into names, extracts the first letter of the first name (uppercase), 
 * and if there is more than one name, appends the first letter of the last name (uppercase) to it.
 *
 * @param {string} string - The input string to extract initials from.
 * @return {string} The initials extracted from the input string.
 */
function makeInitials(string) {
    let names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
}

/**
 * Retrieves the initials of the active user from local storage.
 *
 * @return {string} The initials of the active user, or 'Guest' if no user is active.
 */
function getUserInitials() {
    const userActive = localStorage.getItem('logedInUser');
    if (userActive) {
        return userActive;
    } else {
        return 'Guest';
    }
}

/**
 * Retrieves the username stored in the localStorage under the key 'logedInUser'.
 *
 * @return {string|null} The username if it exists, null otherwise.
 */
function getUserName(){
    const userName = localStorage.getItem('logedInUser');
    return userName;
}

/**
 * Sets necessary local storage items to empty strings and redirects to the login page.
 *
 * @return {void} No return value.
 */
async function backToLogin() {
      localStorage.setItem('startAnimation','true');
      localStorage.setItem('Password','');
      localStorage.setItem('logedInUser','');
      localStorage.setItem('Email','');
      redirectToLogin();
    }

/**
 * Redirects the user to the login page.
 *
 * @return {void} This function does not return anything.
 */
function redirectToLogin() {
        const targetUrl = '../login/login.html';
        window.location.href = targetUrl;
}

/**
 * Sets the active sideboard category based on the current URL path.
 *
 * @return {void} This function does not return a value.
 */
function showCategory() {
    if (window.location.pathname == '/add_task/add_task.html') {
        document.getElementById('addTask').classList.add('active_sideboard');
    }
    if (window.location.pathname == '/summary/summary.html') {
        document.getElementById('summary').classList.add('active_sideboard');
    }
    if (window.location.pathname == '/board/board.html') {
        document.getElementById('board').classList.add('active_sideboard');
    }
    if (window.location.pathname == '/contacts/contacts.html') {
        document.getElementById('contacts').classList.add('active_sideboard');
    }
}