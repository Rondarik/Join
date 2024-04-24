let allAddedContacts = [];
let randomColors = ['#D10000',
    '#082D6C',
    '#00FF00',
    '#FFFF00',
    '#800080',
    '#40E0D0',
    '#FF4500',
    '#50C878',
    '#4169E1',
    '#B76E79',
    '#FFF44F',
    '#4B0082',
    '#9ACD32',
    '#E6E6FA',
    '#B87333',
    '#FFE5B4',
    '#808000',
    '#E30B5C',
    '#007FFF',
    '#EAE0C8']
    
async function contactsInit() {
    await getAllContactsFromServer();
    displayContacts();
    await includeHTML();
    setInitials();
}

function displayContacts() {
    let contactListContainer = document.getElementById('contactListID');
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

function renderContact(contact) {
    return /*html*/ `
    <div class="contact_dummy" id="${contact.eMail}" onclick="displayContactInfo('${contact.eMail}'), checkIfContactIsClicked(this), handleContactDummyClick()">
        <div class="contact_dummy_border_layout">
            <div class="contact_dummy_border" style="background-color: ${contact.color}">
                ${getInitials(contact.name)}
            </div>
        </div>
        <div class="contact_dummy_info_layout">
            <div class="contact_dummy_info">
                <span class="contact_dummy_name">${contact.name}</span>
                <span class="contact_dummy_mail">${contact.eMail}</span>
            </div>
        </div>
    </div>
    `;
}

function renderAlphabetHeadline(letter){
    return /*html*/ `
    <div class="letter">
        <div class="letter_layout">
            <span>${letter}</span>
        </div>
     </div>
    <div class="divding_line_container">
        <div class="dividing_line_contacts"></div>
    </div>
    `;
}

function addClickedClassToContacts(){
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

function filterByFirstLetter(letter) {
    return dummyContacts.filter(contact => contact.name.charAt(0).toUpperCase() === letter.toUpperCase());
}

async function filterByFirstMail(Mail) {
    return dummyContacts.find(contact => contact.eMail === Mail);
}

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
}

function generateContactInfoHTML(name, email, profileBadge, color, tel) {
    return /*html*/ `
    <div class="contact_info_onclick">
        <div class="contact_info_onclick_title">
            <div>
                <div class="contact_info_onclick_profilebadge" style="background-color: ${color};">
                    <span>${profileBadge}</span>
                </div>
            </div>
            <div class="contact_info_onclick_name_edit">
                <div class="contact_info_onclick_name">
                    <span>${name}</span>
                </div>
                <div class="contact_info_onclick_edit_delete">
                    <div class="contact_info_onclick_edit" onclick="openEditDialog('${email}')">
                        <img class="edit_icon" src="/assets/img/edit.svg" alt="">
                        <img class="edit_hover_icon" src="/assets/img/editHover.svg" alt="">
                        <span>Edit</span>
                    </div>
                    <div onclick="deleteContact('${email}')" class="contact_info_onclick_delete">
                        <img class="delete_icon" src="/assets/img/delete.svg" alt="">
                        <img class="delete_hover_icon" src="/assets/img/deleteHover.svg" alt="">
                        <span>Delete</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="contact_info_onclick_text">
            <span>Contact Information</span>
        </div>
        <div class="contact_info_onclick_email_phone">
            <div class="contact_info_onclick_email">
                <div class="email_text">
                    <span>Email</span>
                </div>
                <div class="email">
                    <span>${email}</span>
                </div>
            </div>
            <div class="contact_info_onclick_phone">
                <div class="phone_text">
                    <span>Phone</span>
                </div>
                <div>
                    <span>${tel}</span>
                </div>
            </div>
        </div>
    </div>
    `;
}

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
    }, );
    contactDialog.classList.remove('fade_away');
}

function openAddNewContactDialogHTML(){
    return /*html*/ `
    <div class="contact_dialog active">
        <div class="dialog_left_area">
            <div class="dialog_left_area_container">
                    <div class="dialog_left_area_logo">
                        <img src="/assets/img/Joinlogo.svg">
                    </div>
                <div class="dialog_left_area_all_container">
                    <div class="dialog_left_area_text_container">
                        <div class="dialog_left_area_span">
                            <span>Add contact</span>
                        </div>
                        <div class="dialog_left_area_span_small">
                            <span>Tasks are better with a team!</span>
                        </div>
                    </div>   
                    <div class="dividing_line_vertical">
                    </div> 
                </div>    
            </div>
        </div>
        <div class="profilebadge_layout">
            <div class="addcontact_profilebadge_layout">
                <div class="addcontact_profilebadge">
                    <img src="/assets/img/person.svg" alt="">
                </div>    
            </div>
        </div>    
        <div class="dialog_right_area">
                <div class="dialog_right_area_close">
                    <img onclick="closeContactDialogFromButton()" src="/assets/img/close.svg">
                </div>
                <div class="form_container">
                    <input class="input_style person" id="addContactName" type="text" onchange="clearErrorAddContact('name')" placeholder="Name">
                    <span class="error d_none" id="errorContactName">This field is required</span>
                    <input class="input_style mail" id="addContactMail" type="text" onchange="clearErrorAddContact('mail')" placeholder="Email">
                    <span class="error d_none" id="errorContactMail">This field is required</span>
                    <input class="input_style phone" id="addContactPhone" type="text" onchange="clearErrorAddContact('phone')" placeholder="Phone">
                    <span class="error d_none" id="errorContactPhone">This field is required</span>
                </div>                      
                <div class="form_buttons">
                    <div class="cancel_btn">
                        <button onclick="closeContactDialogFromButton()">
                            <span>Cancel</span>
                            <img class="close_icon" src="/assets/img/close.svg">
                            <img class="close_hover_icon" src="/assets/img/closeHover.svg">
                        </button>
                    </div>
                    <div class="create_contact_btn">
                        <button onclick="addContact()">
                            <span>Create contact</span>
                            <img src="/assets/img/check_white.svg">
                        </button>
                    </div>
                </div> 
        </div>
    </div>
    `;
}

async function addContact(){
    let name = document.getElementById('addContactName').value;
    let mail = document.getElementById('addContactMail').value;
    let phone = document.getElementById('addContactPhone').value;
    let addedContact = {
        'name': name,
        'eMail': mail,
        'tel': phone,
        'color': randomColor()
    };
    if (checkInputFieldAddContactIfEmpty()) {
        let filteredContacts = dummyContacts.filter(filterFunction);
        function filterFunction(allContacts){
            return allContacts['eMail'] == mail;
        };
        if (filteredContacts.length == 0){
            dummyContacts.push(addedContact);
            animateDivContainer();
            let contactDialog = document.getElementById('contactDialog');
            contactDialog.classList.add('fade_away');
            await setItem('allContacts',JSON.stringify(dummyContacts));
            displayContacts()
        } else {
            alert('Contact already exist');
        }
    }
}

function randomColor(){
   let color = randomColors[Math.floor(Math.random()*randomColors.length)];
    return color;
}

function openEditDialog(id) {
    let currentContact = dummyContacts.filter(contacts => contacts.eMail === id)[0];
    let dialog = document.getElementById('contactDialog');
    dialog.innerHTML = '';
    dialog.innerHTML = openEditDialogHTML(currentContact.color, currentContact.name, currentContact.eMail);
    let name = document.getElementById('editContactName');
    let mail = document.getElementById('editContactMail');
    let phone = document.getElementById('editContactPhone');
    name.value = currentContact.name;
    mail.value = currentContact.eMail;
    phone.value = currentContact.tel;
    dialog.style.display = 'block';
    dialog.querySelector('.contact_dialog').style.left = '2800px';
    setTimeout(() => {
        dialog.querySelector('.contact_dialog').style.left = '50%';
    }, );
    dialog.classList.remove('fade_away');
}

function openEditDialogHTML(color, name, email){
    let initials = getInitials(name);
    return /*html*/ `
    <div class="contact_dialog active">
        <div class="dialog_left_area">
            <div class="dialog_left_area_container_edit">
                <div>
                    <div class="dialog_left_area_logo">
                        <img src="/assets/img/Joinlogo.svg">
                    </div>
                </div>
                <div class="dialog_left_area_all_container_edit">
                    <div>
                        <div class="dialog_left_area_span">
                            <span>Edit contact</span>
                        </div>
                    </div>   
                    <div class="dividing_line_vertical">
                    </div> 
                </div>    
            </div>
        </div>
        <div class="profilebadge_layout">
            <div class="addcontact_profilebadge_layout">
                <div class="addcontact_profilebadge" style="background-color: ${color};">
                    <span>${initials}</span>
                </div>    
            </div>
        </div>    
        <div class="dialog_right_area">
                <div class="dialog_right_area_close">
                    <img onclick="closeContactDialogFromButton()" src="/assets/img/close.svg">
                </div>
                <div class="form_container">
                    <input class="input_style person" id="editContactName" type="text" onchange="clearErrorEditContact('name')" placeholder="Name">
                    <div class="error d_none" id="errorContactName">This field is required</div>
                    <input class="input_style mail" id="editContactMail" type="text" onchange="clearErrorEditContact('mail')" placeholder="Email">
                    <div class="error d_none" id="errorContactMail">This field is required</div>
                    <input class="input_style phone" id="editContactPhone" type="text" onchange="clearErrorEditContact('phone')" placeholder="Phone">
                    <div class="error d_none" id="errorContactPhone">This field is required</div>
                </div>                      
                <div class="form_buttons_edit">
                    <div class="delete_btn">
                    <button onclick="deleteContact('${email}'), closeContactDialogFromButton()">
                            <span>Delete</span>
                        </button>
                    </div>
                    <div class="save_btn">
                        <button onclick="saveEditedContact('${email}')">
                            <span>Save</span>
                            <img src="/assets/img/check_white.svg">
                        </button>
                    </div>
                </div> 
        </div>
    </div>
    `;
}

async function saveEditedContact(id){
    let currentContact = dummyContacts.filter(contacts => contacts.eMail === id)[0];
    let name = document.getElementById('editContactName');
    let mail = document.getElementById('editContactMail');
    let phone = document.getElementById('editContactPhone');
    currentContact.name = name.value;
    currentContact.eMail = mail.value;
    currentContact.tel = phone.value;
    if (checkInputFieldEditIfEmpty()) {
        await setItem('allContacts',JSON.stringify(dummyContacts));
        await contactsInit();
    }
    closeContactDialogFromButton();
}

async function deleteContact(id){
    let currentContact = dummyContacts.filter(contacts => contacts.eMail === id)[0];
    let index = dummyContacts.indexOf(currentContact);
    dummyContacts.splice(index, 1);
    await setItem('allContacts',JSON.stringify(dummyContacts));
    await contactsInit();
}

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

function getInitials(name) {
    let words = name.split(' ');
    let initials = '';
    words.forEach(word => {initials += word.charAt(0);
    });
    return initials.toUpperCase(); 
}

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

function handleContactDummyClick() {
    if (window.matchMedia("(max-width: 800px)").matches) {
        document.querySelector('.contact_list').style.display = 'none';
        document.querySelector('.contact_layout').style.display = 'flex';
        document.querySelector('.contact_layout').style.height = '730px';
        document.querySelector('.contacts').style.height = '0px';
    }
}

function backPageButton() {
    const contactContainer = document.querySelector('.contacts');
    const contactLayoutContainer = document.querySelector('.contact_layout');
    const contactDummyElements = document.querySelectorAll('.contact_dummy');
    contactContainer.style.display = 'block';
    contactLayoutContainer.style.display = 'none';
    document.querySelector('.contacts').style.height = '940px';
    document.querySelector('.contact_list').style.display = 'block';
    contactDummyElements.forEach(element => {
        element.classList.remove('clicked');
    });
}


function checkInputFieldAddContactIfEmpty() {
    const addContactName = document.getElementById('addContactName');
    const addContactMail = document.getElementById('addContactMail');
    const addContactPhone = document.getElementById('addContactPhone');
    const errorName = document.getElementById('errorContactName');
    const errorMail = document.getElementById('errorContactMail');
    const errorPhone = document.getElementById('errorContactPhone');
    let allFieldsAreNotEmpty = true;
    const validateField = (field, errorElement) => {
        if (field.value.trim() === '') {
            errorElement.classList.remove('d_none');
            field.classList.add('red_border');
            allFieldsAreNotEmpty = false;
        } else {
            errorElement.classList.add('d_none');
            field.classList.remove('red_border');
        }
    };
    validateField(addContactName, errorName);
    validateField(addContactMail, errorMail);
    validateField(addContactPhone, errorPhone);
    return allFieldsAreNotEmpty;
}


function checkInputFieldEditIfEmpty() {
    const editContactName = document.getElementById('editContactName');
    const editContactMail = document.getElementById('editContactMail');
    const editContactPhone = document.getElementById('editContactPhone');
    const errorName = document.getElementById('errorContactName');
    const errorMail = document.getElementById('errorContactMail');
    const errorPhone = document.getElementById('errorContactPhone');
    let allFieldsAreNotEmpty = true;
    const validateField = (field, errorElement) => {
        if (field.value.trim() === '') {
            errorElement.classList.remove('d_none');
            field.classList.add('red_border');
            allFieldsAreNotEmpty = false;
        } else {
            errorElement.classList.add('d_none');
            field.classList.remove('red_border');
        }
    };
    validateField(editContactName, errorName);
    validateField(editContactMail, errorMail);
    validateField(editContactPhone, errorPhone);
    return allFieldsAreNotEmpty;
}


function clearErrorAddContact(inputField) {
    let addContactName = document.getElementById('addContactName');
    let addContactMail = document.getElementById('addContactMail');
    let addContactPhone = document.getElementById('addContactPhone');
    let errorName = document.getElementById('errorContactName');
    let errorMail = document.getElementById('errorContactMail');
    let errorPhone = document.getElementById('errorContactPhone');
    if (inputField == 'name') {
        addContactName.classList.remove('red_border');
        errorName.classList.add('d_none');
    }
    if (inputField == 'mail') {
        addContactMail.classList.remove('red_border');
        errorMail.classList.add('d_none');
    }
    if (inputField == 'phone') {
        addContactPhone.classList.remove('red_border');
        errorPhone.classList.add('d_none');
    }
}


function clearErrorEditContact(inputField){
    let editContactName = document.getElementById('editContactName');
    let editContactMail = document.getElementById('editContactMail');
    let editContactPhone = document.getElementById('editContactPhone');
    let errorName = document.getElementById('errorContactName');
    let errorMail = document.getElementById('errorContactMail');
    let errorPhone = document.getElementById('errorContactPhone');
    if (inputField == 'name') {
        editContactName.classList.remove('red_border');
        errorName.classList.add('d_none');
    }
    if (inputField == 'mail') {
        editContactMail.classList.remove('red_border');
        errorMail.classList.add('d_none');
    }
    if (inputField == 'phone') {
        editContactPhone.classList.remove('red_border');
        errorPhone.classList.add('d_none');
    }
}