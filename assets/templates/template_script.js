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

function setInitials() {
    const userActive = getUserName();
    const initials = makeInitials(userActive);
    document.getElementById('activeUserInitial').innerHTML = initials;
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
function getUserName(){
    const userName = localStorage.getItem('logedInUser');
    return userName;
}


async function backToLogin() {
      localStorage.setItem('startAnimation','true');
      localStorage.setItem('Password','');
      localStorage.setItem('logedInUser','');
      localStorage.setItem('Email','');
      redirectToLogin();
    }

    function redirectToLogin() {
        const targetUrl = '../login/login.html';
        window.location.href = targetUrl;
      }

    