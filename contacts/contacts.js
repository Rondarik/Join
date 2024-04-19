async function contactsInit() {
    await includeHTML();
    setInitials();
    bindContactItemClickEvents();
}


function bindContactItemClickEvents() {
    let contactItems = document.querySelectorAll('.contact_dummy');
    contactItems.forEach(item => {
        item.addEventListener('click', handleContactItemClick);
    });
}


function handleContactItemClick(event) {
    let alreadyClicked = this.classList.contains('clicked');
    removeClickedClassFromItems();
    if (!alreadyClicked) {
        this.classList.add('clicked');
        displayContactInfo(this);
        displayEditDeleteImages();
    } else {
        hideContactInfoOnClick();
    }
}


function removeClickedClassFromItems() {
    let contactItems = document.querySelectorAll('.contact_dummy');
    contactItems.forEach(item => {
        item.classList.remove('clicked');
    });
}


function hideContactInfoOnClick() {
    let contactInfoOnClick = document.querySelector('.contact_info_onclick');
    if (contactInfoOnClick) {
        contactInfoOnClick.style.display = 'none';
    }
}


function displayContactInfo(item) {
    let contactContainer = document.getElementById('contact');
    let name = item.querySelector('.contact_dummy_name').textContent;
    let email = item.querySelector('.contact_dummy_mail').textContent;
    let profileBadge = item.querySelector('.contact_dummy_border').textContent;
    let index = Array.from(item.parentNode.children).indexOf(item);
    let color = dummyContacts[index].color;
    let tel = dummyContacts[index].tel;
    let contactHTML = generateContactHTML(name, email, profileBadge, color, tel);
    contactContainer.innerHTML = contactHTML;
    let contactInfoOnClick = document.querySelector('.contact_info_onclick');
    if (contactInfoOnClick) {
        contactInfoOnClick.style.display = 'flex';
        setTimeout(() => { contactInfoOnClick.classList.add('show'); }, 50);
    }
}


function generateContactHTML(name, email, profileBadge, color, tel) {
    return `
    <div class="contact_info_onclick">
        <div class="contact_info_onclick_title">
            <div class="contact_info_onclick_profilebadge_layout">
                <div class="contact_info_onclick_profilebadge" style="background-color: ${color};">
                    <span>${profileBadge}</span>
                </div>
            </div>
            <div class="contact_info_onclick_name_edit">
                <div class="contact_info_onclick_name">
                    <span>${name}</span>
                </div>
                <div class="contact_info_onclick_edit_delete">
                    <div class="contact_info_onclick_edit">
                        <img class="edit_icon" src="/assets/img/edit.svg" alt="">
                        <img class="edit_hover_icon" src="/assets/img/editHover.svg" alt="">
                        <span>Edit</span>
                    </div>
                    <div class="contact_info_onclick_delete">
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
                <div class="phone_number">
                    <span>${tel}</span>
                </div>
            </div>
        </div>
    </div>
    `;
}


function displayContacts() {
    let contactListContainer = document.querySelector('.contact_list');
    let contactsHTML = '';

    for (let i = 0; i < dummyContacts.length; i++) {
        let contact = dummyContacts[i];
        let {name, eMail, color} = contact;
        let initials = getInitials(name);

        let contactHTML = `
        <div class="letter_a">
        <div class="letter_a_layout">
            <span>A</span>
        </div>
    </div>
    <div class="divding_line_container">
        <div class="dividing_line_contacts"></div>
    </div>
            <div class="contact_dummy">
                <div class="contact_dummy_border_layout">
                    <div class="contact_dummy_border" style="background-color: ${color};">
                    ${initials}
                    </div>
                </div>
                <div class="contact_dummy_info_layout">
                    <div class="contact_dummy_info">
                        <span class="contact_dummy_name">${name}</span>
                        <span class="contact_dummy_mail">${eMail}</span>
                    </div>
                </div>
            </div>
        `;
        contactsHTML += contactHTML;
    }
    contactListContainer.innerHTML = contactsHTML;
}


function openContactDialog() {
    let dialog = document.getElementById('contactDialog');
    dialog.innerHTML = '';
    dialog.innerHTML = `
        <div class="contact_dialog active">
            <div class="dialog_left_area">
                <div class="dialog_left_area_container">
                    <div class="dialog_left_area_logo_container">
                        <div class="dialog_left_area_logo">
                            <img src="/assets/img/Joinlogo.svg">
                        </div>
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
            <div class="dialog_right_area">
            </div>
        </div>
    `
    dialog.style.display = 'block';
    dialog.querySelector('.contact_dialog').style.left = '2800px';
    setTimeout(() => {
        dialog.querySelector('.contact_dialog').style.left = '50%';
    }, );
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
        }, 400);
    }
}


function getInitials(name) {
    let words = name.split(' ');
    let initials = '';
    words.forEach(word => {initials += word.charAt(0);
    });
    return initials.toUpperCase(); 
}


function displayEditDeleteImages() {
    let editContainer = document.querySelector('.contact_info_onclick_edit');
    let deleteContainer = document.querySelector('.contact_info_onclick_delete');
    editContainer.addEventListener('mouseenter', showEditHoverIcon);
    editContainer.addEventListener('mouseleave', hideEditHoverIcon);
    deleteContainer.addEventListener('mouseenter', showDeleteHoverIcon);
    deleteContainer.addEventListener('mouseleave', hideDeleteHoverIcon);
    editContainer.querySelector('.edit_icon').style.display = 'block';
    editContainer.querySelector('.edit_hover_icon').style.display = 'none';
    deleteContainer.querySelector('.delete_icon').style.display = 'block';
    deleteContainer.querySelector('.delete_hover_icon').style.display = 'none';
}


function showEditHoverIcon() {
    this.querySelector('.edit_hover_icon').style.display = 'block';
    this.querySelector('.edit_icon').style.display = 'none';
}


function hideEditHoverIcon() {
    this.querySelector('.edit_hover_icon').style.display = 'none';
    this.querySelector('.edit_icon').style.display = 'block';
}


function showDeleteHoverIcon() {
    this.querySelector('.delete_hover_icon').style.display = 'block';
    this.querySelector('.delete_icon').style.display = 'none';
}


function hideDeleteHoverIcon() {
    this.querySelector('.delete_hover_icon').style.display = 'none';
    this.querySelector('.delete_icon').style.display = 'block';
}


document.addEventListener('DOMContentLoaded', function() {
    contactsInit();
    displayContacts();
});
