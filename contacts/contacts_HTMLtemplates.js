/**
 * Renders the HTML for a contact based on the provided contact object.
 *
 * @param {Object} contact - The contact object containing the necessary information.
 * @return {string} The HTML string representing the contact.
 */
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

/**
 * Generates HTML for contact information display.
 *
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 * @param {string} profileBadge - The profile badge of the contact.
 * @param {string} color - The color for styling.
 * @param {string} tel - The telephone number of the contact.
 * @return {string} The HTML string representing the contact information.
 */
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
    <div class="show_more_responsive">
        <button onclick="showMoreDivContainerEditDelete()" id="showMoreResponsive">
            <div class="btn_img">
                <img src="/assets/img/more.svg" alt="">
            </div>
        </button>
        <div id="showMoreDivContainerEditDelete" class="edit_delete_popup_responsive">
            <div class="contact_info_onclick_edit_delete_responsive">
                <div onclick="openEditDialog('${email}')" class="contact_info_onclick_edit_responsive">
                    <img class="edit_icon" src="/assets/img/edit.svg" alt="">
                    <span>Edit</span>
                </div>
                <div onclick="deleteContact('${email}')" class="contact_info_onclick_delete_responsive">
                    <img class="delete_icon" src="/assets/img/delete.svg" alt="">
                    <span>Delete</span>
                </div>
            </div>
        </div>
    </div>
    `;
}

/**
 * Renders the HTML content for adding a new contact dialog.
 *
 * @return {string} The HTML content for the new contact dialog.
 */
function openAddNewContactDialogHTML() {
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
                    <img onclick="closeContactDialogFromButton()" class="close" src="/assets/img/close.svg">
                    <img onclick="closeContactDialogFromButtonResponsive()" class="close_responsive" src="/assets/img/closeWhite.svg">
                </div>
                <form class="form_container" onsubmit="addContact(); return false;">
                    <input id="addContactName" class="input_style person" title="Bitte geben Sie Ihren Vor- (Leerzeichen) Nachnamen ein, mit Großbuchstaben am Anfang jedes Namens." pattern="[A-ZÄÖÜ][a-zA-Zäöüß]* [A-ZÄÖÜ][a-zA-Zäöüß]*" type="text" placeholder="Name" required>
                    <input id="addContactMail" class="input_style mail" type="email" placeholder="Email" required>
                    <input id="addContactPhone" class="input_style phone" type="tel" pattern="[+0-9]+" title="Bitte nur Zahlen eingeben" placeholder="Phone" required>
                    <div class="form_buttons">
                    <div class="cancel_btn">
                        <button onclick="closeContactDialogFromButton()">
                            <span>Cancel</span>
                            <img class="close_icon" src="/assets/img/close.svg">
                            <img class="close_hover_icon" src="/assets/img/closeHover.svg">
                        </button>
                    </div>
                    <div class="create_contact_btn">
                        <button onsubmit="addContact()">
                            <span>Create contact</span>
                            <img src="/assets/img/check_white.svg">
                        </button>
                    </div> 
                </form>                      
        </div>
    </div>
    `;
}

/**
 * Generates the HTML for the edit contact dialog.
 *
 * @param {string} color - The color of the profile badge.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 * @return {string} The HTML string representing the edit contact dialog.
 */
function openEditDialogHTML(color, name, email) {
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
            <img onclick="closeContactDialogFromButton()" class="close" src="/assets/img/close.svg">
            <img onclick="closeContactDialogFromButtonResponsive()" class="close_responsive" src="/assets/img/closeWhite.svg">
            </div>
            <form class="form_container" onsubmit="saveEditedContact('${email}'); return false;">
                <input id="editContactName" class="input_style person" title="Bitte geben Sie Ihren Vor- (Leerzeichen) Nachnamen ein, mit Großbuchstaben am Anfang jedes Namens." pattern="[A-ZÄÖÜ][a-zA-Zäöüß]* [A-ZÄÖÜ][a-zA-Zäöüß]*" type="text" placeholder="Name" required>
                <input id="editContactMail" class="input_style mail" type="email" placeholder="Email" required>
                <input id="editContactPhone" class="input_style phone" type="tel" pattern="[+0-9]+" title="Bitte nur Zahlen eingeben" placeholder="Phone" required>
                <div class="form_buttons_edit">
                    <div class="delete_btn">
                        <button onclick="deleteContact('${email}'), closeContactDialogFromButton()">
                                <span>Delete</span>
                        </button>
                    </div>
                    <div class="save_btn">
                        <button>
                            <span>Save</span>
                            <img src="/assets/img/check_white.svg">
                        </button>
                    </div>
            </form>                     
        </div>
    </div>
    `;
}

/**
 * Renders an alphabet headline with the given letter.
 *
 * @param {string} letter - The letter to be displayed in the headline.
 * @return {string} The HTML representation of the alphabet headline.
 */
function renderAlphabetHeadline(letter) {
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

