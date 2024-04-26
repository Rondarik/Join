let allAddedContacts = [];

/**
 * Initializes contacts by fetching them from the server, displaying them, including HTML, and setting initials.
 *
 * @return {Promise<void>} A promise that resolves after the contacts initialization is complete.
 */
async function contactsInit() {
    await getAllContactsFromServer();
    displayContacts();
    await includeHTML();
    setInitials();
}

/**
 * Displays the contacts in the contact list container.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function displayContacts() {
    let contactListContainer = document.getElementById('contactListID');
    contactListContainer.innerHTML = '';
    let firstLetterList = getFirstLetters();
    for (let i = 0; i < firstLetterList.length; i++) {
        const letter = firstLetterList[i];
        const headlineHTML = renderAlphabetHeadline(letter, i);
        const contactsByLetterList = filterByFirstLetter(letter);
        let contactHTML = "";
        for (let j = 0; j < contactsByLetterList.length; j++) {
            const contact = contactsByLetterList[j];
            contactHTML += renderContact(contact);
        }
        contactListContainer.innerHTML += headlineHTML + contactHTML;
    }
}

/**
 * Filters the dummyContacts array based on the provided letter.
 *
 * @param {string} letter - The letter to filter the contacts by.
 * @return {Array} An array of contacts whose first letter of the name matches the provided letter.
 */
function filterByFirstLetter(letter) {
    return dummyContacts.filter(contact => contact.name.charAt(0).toUpperCase() === letter.toUpperCase());
}

/**
 * Filters the dummyContacts array based on the provided email address.
 *
 * @param {string} Mail - The email address to filter the contacts by.
 * @return {Object | undefined} The contact object with the matching email address, if found.
 */
async function filterByFirstMail(Mail) {
    return dummyContacts.find(contact => contact.eMail === Mail);
}

/**
 * Generates an array of unique first letters extracted from the names in the dummyContacts array.
 *
 * @return {Array} An array of unique first letters.
 */
function getFirstLetters() {
    let firstLetterList = [];
    for (let i = 0; i < dummyContacts.length; i++) {
        const name = dummyContacts[i].name;
        const firstLetter = name.charAt(0);
        if (!firstLetterList.includes(firstLetter)) {
            firstLetterList.push(firstLetter);
            firstLetterList.sort();
        }
    }
    return firstLetterList;
}

/**
 * Displays the contact information for a given contact ID.
 *
 * @param {string} id - The ID of the contact to display.
 * @return {Promise<void>} A promise that resolves when the contact information is displayed.
 */
async function displayContactInfo(id) {
    let contactContainer = document.getElementById('contact');
    let clickedContact = await filterByFirstMail(id);
    let name = clickedContact.name;
    let email = clickedContact.eMail;
    let profileBadge = getInitials(name);
    let color = clickedContact.color;
    let tel = clickedContact.tel;
    contactContainer.innerHTML = generateContactInfoHTML(name, email, profileBadge, color, tel);
    addClickedClassToContacts();
    let showMoreResponsive = document.getElementById('showMoreResponsive');
    showMoreResponsive.style.display = 'block';
}

/**
 * Opens the dialog for adding a new contact. 
 *
 * @return {void} No return value
 */
function openAddNewContactDialog() {
    let contactDialog = document.getElementById('contactDialog');
    contactDialog.style.display = 'block';
    let dialog = document.getElementById('contactDialog');
    dialog.innerHTML = '';
    dialog.innerHTML = openAddNewContactDialogHTML();
    dialog.style.display = 'block';
    dialog.querySelector('.contact_dialog').style.left = '2800px';
    setTimeout(() => {
        dialog.querySelector('.contact_dialog').style.left = '50%';
    },);
    contactDialog.classList.remove('fade_away');
}

/**
 * Opens the dialog for adding a new contact in a responsive manner.
 *
 * @return {void} No return value
 */
function openAddNewContactDialogResponsive() {
    let contactDialog = document.getElementById('contactDialog');
    contactDialog.style.display = 'block';
    let dialog = document.getElementById('contactDialog');
    dialog.innerHTML = '';
    dialog.innerHTML = openAddNewContactDialogHTML();
    dialog.style.display = 'block';
    dialog.querySelector('.contact_dialog').style.transform = 'translate(-50%, 100%)';
    contactDialog.classList.add('transition');
    setTimeout(() => {
        dialog.querySelector('.contact_dialog').style.transform = 'translate(-50%, -50%)';
    }, 50);
    contactDialog.classList.remove('fade_away');
}

/**
 * Adds a new contact to the list of dummy contacts.
 *
 * @return {Promise<void>} A promise that resolves when the contact is added.
 */
async function addContact() {
    let name = document.getElementById('addContactName').value;
    let mail = document.getElementById('addContactMail').value;
    let phone = document.getElementById('addContactPhone').value;
    let addedContact = {
        'name': name,
        'eMail': mail,
        'tel': phone,
        'color': randomColor()
    };
    let filteredContacts = dummyContacts.filter(filterFunction);
    function filterFunction(allContacts) {
        return allContacts['eMail'] == mail;
    };
    if (filteredContacts.length == 0) {
        addNewContact(addedContact);
    } else {
        handleDuplicateContact();
    }
}

/**
 * Adds a new contact to the list of dummy contacts and performs necessary UI updates.
 *
 * @param {Object} newContact - The contact object to be added.
 * @return {Promise<void>} A promise that resolves when the contact is added and UI updates are complete.
 */
async function addNewContact(newContact) {
    dummyContacts.push(newContact);
    let contactDialog = document.getElementById('contactDialog');
    contactDialog.classList.add('fade_away');
    if (window.innerWidth <= 900) {
        animateDivContainerResponsive();
    } else {
        animateDivContainer();
    }
    await setItem('allContacts', JSON.stringify(dummyContacts));
    displayContacts();
}

/**
 * Handles the case when a duplicate contact already exists.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function handleDuplicateContact() {
    alert('Contact already exists');
}

/**
 * Generates a random color from the predefined list of colors.
 *
 * @return {string} The randomly selected color.
 */
function randomColor() {
    let color = randomColors[Math.floor(Math.random() * randomColors.length)];
    return color;
}

/**
 * Opens the dialog for editing a contact.
 *
 * @param {string} id - The ID of the contact to edit.
 * @return {void} No return value.
 */
function openEditDialog(id) {
    let currentContact = dummyContacts.filter(contacts => contacts.eMail === id)[0];
    let dialog = document.getElementById('contactDialog');
    dialog.innerHTML = '';
    dialog.innerHTML = openEditDialogHTML(currentContact.color, currentContact.name, currentContact.eMail);
    let name = document.getElementById('editContactName');
    let mail = document.getElementById('editContactMail');
    let phone = document.getElementById('editContactPhone');
    let showMoreDivContainerEditDelete = document.getElementById('showMoreDivContainerEditDelete');
    showMoreDivContainerEditDelete.style.transform = 'translateX(110%)';
    name.value = currentContact.name;
    mail.value = currentContact.eMail;
    phone.value = currentContact.tel;
    dialog.style.display = 'block';
    animateEditDialogContainer(dialog);
}

/**
 * Animates the edit dialog container based on the screen width.
 *
 * @param {HTMLElement} dialog - The dialog element to be animated.
 */
function animateEditDialogContainer(dialog) {
    let screenWidth = window.innerWidth;
    if (screenWidth <= 900) {
        dialog.querySelector('.contact_dialog').style.transform = 'translate(-50%, 100%)';
        setTimeout(() => {
            dialog.querySelector('.contact_dialog').style.transform = 'translate(-50%, -50%)';
            dialog.classList.remove('fade_away');
        }, 50);
    } else {
        dialog.querySelector('.contact_dialog').style.left = '2800px';
        setTimeout(() => {
            dialog.querySelector('.contact_dialog').style.left = '50%';
            dialog.classList.remove('fade_away');
        }, 50);
    }
}

/**
 * Saves the edited contact information.
 *
 * @param {string} id - The ID of the contact to be edited.
 * @return {Promise<void>} A promise that resolves when the contact is saved.
 */
async function saveEditedContact(id) {
    let currentContact = dummyContacts.filter(contacts => contacts.eMail === id)[0];
    let name = document.getElementById('editContactName');
    let mail = document.getElementById('editContactMail');
    let phone = document.getElementById('editContactPhone');
    let contactDialog = document.getElementById('contactDialog');
    currentContact.name = name.value;
    currentContact.eMail = mail.value;
    currentContact.tel = phone.value;
    await setItem('allContacts', JSON.stringify(dummyContacts));
    await displayContactInfo(id);
    await contactsInit();
    contactDialog.classList.add('fade_away');
}

/**
 * Deletes a contact with the specified ID from the dummyContacts array,
 * updates the local storage, and initializes the contacts.
 *
 * @param {string} id - The ID of the contact to delete.
 * @return {Promise<void>} A promise that resolves once the contact is deleted.
 */
async function deleteContact(id) {
    let currentContact = dummyContacts.filter(contacts => contacts.eMail === id)[0];
    let index = dummyContacts.indexOf(currentContact);
    let contactInfoOnClick = document.querySelector('.contact_info_onclick');
    dummyContacts.splice(index, 1);
    await setItem('allContacts', JSON.stringify(dummyContacts));
    await contactsInit();
    contactInfoOnClick.style.display = 'none';
    
    if (window.innerWidth <= 900) {
        backPageButton();
    }
}

/**
 * Closes the contact dialog if the event target matches the 'contactDialog' element.
 *
 * @param {Event} event - The event that triggered the function.
 * @return {void} No return value
 */
function closeContactDialog(event) {
    if (event.target === document.getElementById('contactDialog')) {
        let dialog = document.getElementById('contactDialog');
        dialog.querySelector('.contact_dialog').style.left = '2800px';
        setTimeout(() => {
            dialog.querySelector('.contact_dialog').classList.remove('active');
            setTimeout(() => {
                dialog.style.display = 'none';
            }, 0);
            dialog.querySelector('.contact_dialog').clas
        }, 400);
    }
}

/**
 * Closes the contact dialog by moving the dialog element to the right and hiding it.
 *
 * @return {void} This function does not return anything.
 */
function closeContactDialogFromButton() {
    let dialog = document.getElementById('contactDialog');
    dialog.querySelector('.contact_dialog').style.left = '2800px';
    setTimeout(() => {
        dialog.querySelector('.contact_dialog').classList.remove('active');
        setTimeout(() => {
            dialog.style.display = 'none';
        }, 0);
    }, 400);
}

/**
 * Closes the contact dialog from the button in a responsive manner.
 *
 * @param {none} none - No parameters.
 * @return {none} No return value.
 */
function closeContactDialogFromButtonResponsive() {
    let dialog = document.getElementById('contactDialog');
    let currentPosition = dialog.querySelector('.contact_dialog').getBoundingClientRect().top;
    dialog.classList.add('transition');
    dialog.querySelector('.contact_dialog').style.transform = `translate(-50%, ${currentPosition}px)`;
    setTimeout(() => {
        dialog.querySelector('.contact_dialog').style.transform = 'translate(-50%, 100%)';
    }, 50);
    setTimeout(() => {
        dialog.style.display = 'none';
    }, 400);
}

/**
 * Splits a name into words, extracts the first letter of each word, and returns the uppercase initials.
 *
 * @param {string} name - The input name to extract initials from.
 * @return {string} The uppercase initials extracted from the input name.
 */
function getInitials(name) {
    let words = name.split(' ');
    let initials = '';
    words.forEach(word => {
        initials += word.charAt(0);
    });
    return initials.toUpperCase();
}

/**
 * Adds a clicked class to contacts and adjusts the display properties of the contact info.
 *
 */
function addClickedClassToContacts() {
    let contactInfoOnClick = document.querySelector('.contact_info_onclick');
    let clickedContactDummy = document.querySelector('.clicked');
    if (clickedContactDummy) {
        if (contactInfoOnClick) {
            setTimeout(() => { contactInfoOnClick.classList.add('show'); }, 50);
            contactInfoOnClick.classList.remove('d_none');
            contactInfoOnClick.style.display = 'flex';
        }
    } else {
        if (contactInfoOnClick) {
            contactInfoOnClick.classList.remove('show');
            contactInfoOnClick.classList.add('d_none');
        }
    }
}

/**
 * A function that checks if a contact is clicked, toggles classes, and adjusts display properties.
 *
 * @param {Element} element - The element representing the contact being clicked.
 */
function checkIfContactIsClicked(element) {
    let contactInfoOnClick = element.querySelector('.contact_info_onclick');
    if (element.classList.contains('clicked')) {
        element.classList.remove('clicked');
        if (contactInfoOnClick) {
            contactInfoOnClick.classList.add('d_none');
            contactInfoOnClick.classList.remove('show');
        }
    } else {
        let allContactDummies = document.querySelectorAll('.contact_dummy');
        allContactDummies.forEach(dummy => {
            dummy.classList.remove('clicked');
        });
        element.classList.add('clicked');
        if (contactInfoOnClick) {
            contactInfoOnClick.classList.remove('d_none');
            contactInfoOnClick.classList.add('show');
        }
    }
}

/**
 * Animates the display of a container element with the ID 'contactAdded'.
 * The container is initially set to display 'block', then it is given the 'hide_animation' class
 * after a 1500ms delay. After another 1500ms delay, the container is set to display 'none'
 * and the 'hide_animation' class is removed.
 *
 * @return {void} This function does not return anything.
 */
function animateDivContainer() {
    let contactAdded = document.getElementById('contactAdded');
    contactAdded.style.display = 'block';
    setTimeout(() => {
        contactAdded.classList.add('hide_animation');
        setTimeout(() => {
            contactAdded.style.display = 'none';
            contactAdded.classList.remove('hide_animation');
        }, 1500);
    }, 1500);
}

/**
 * Animates the display of a container element with responsive behavior for screens smaller than or equal to 900 pixels.
 *
 * @param {type} None - No parameters are required.
 * @return {type} None - The function does not return a value.
 */
function animateDivContainerResponsive() {
    if (window.innerWidth > 900) {
        return;
    }
    let contactAdded = document.getElementById('contactAddedResponsive');
    contactAdded.style.transform = 'translate(-50%, 50%)';
    contactAdded.style.display = 'block';
    contactAdded.classList.add('transition');
    setTimeout(() => {
        contactAdded.style.transform = 'translate(-10%, -50%)';
    }, 50);
    setTimeout(() => {
        contactAdded.classList.add('hide_animation_responsive');
        setTimeout(() => {
            contactAdded.style.display = 'none';
            contactAdded.classList.remove('hide_animation_responsive');
        }, 600);
    }, 1500);
}

/**
 * Handles the click event for the contact dummy element based on window width.
 *
 * @return {void} No return value
 */
function handleContactDummyClick() {
    if (window.matchMedia("(max-width: 900px)").matches) {
        let addNewContactResponsiveButton = document.getElementById('addNewContactResponsiveButton')
        addNewContactResponsiveButton.style.display = 'none';
        document.querySelector('.contact_list').style.display = 'none';
        document.querySelector('.contact_layout').style.display = 'flex';
        document.querySelector('.contact_layout').style.height = '730px';
        document.querySelector('.contacts').style.height = '0px';
    }
}

/**
 * Sets the display properties of contact elements and removes a class from each element.
 *
 * @return {void} No return value.
 */
function backPageButton() {
    const contactContainer = document.querySelector('.contacts');
    const contactLayoutContainer = document.querySelector('.contact_layout');
    const contactDummyElements = document.querySelectorAll('.contact_dummy');
    let addNewContactResponsiveButton = document.getElementById('addNewContactResponsiveButton')
    let showMoreResponsive = document.getElementById('showMoreResponsive');
    let showMoreDivContainerEditDelete = document.getElementById('showMoreDivContainerEditDelete');
    showMoreDivContainerEditDelete.style.transform = 'translateX(110%)';
    addNewContactResponsiveButton.style.display = 'block';
    showMoreResponsive.style.display = 'none';
    contactContainer.style.display = 'block';
    contactLayoutContainer.style.display = 'none';
    document.querySelector('.contacts').style.height = '940px';
    document.querySelector('.contact_list').style.display = 'block';
    contactDummyElements.forEach(element => {
        element.classList.remove('clicked');
    });
}

/**
 * A function to show and animate the display of the edit/delete container element.
 *
 * @param {type} None - No parameters are required.
 * @return {type} None - The function does not return a value.
 */
function showMoreDivContainerEditDelete() {
    let showMoreDivContainerEditDelete = document.getElementById('showMoreDivContainerEditDelete');
    showMoreDivContainerEditDelete.style.display = 'flex';
    setTimeout(() => {
        showMoreDivContainerEditDelete.style.transform = 'translateX(0)';
    }, 50);
}