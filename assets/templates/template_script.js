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



