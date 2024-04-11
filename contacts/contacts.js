document.addEventListener('DOMContentLoaded', function() {
    const contactItems = document.querySelectorAll('.contact_dummy_1');
    const contactContainer = document.getElementById('contact');
    let contactInfoOnClick = document.querySelector('.contact_info_onclick');

    contactItems.forEach(item => {
        item.addEventListener('click', handleContactItemClick);
    });

    function handleContactItemClick(event) {
        const alreadyClicked = this.classList.contains('clicked');
        
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
        contactItems.forEach(item => {
            item.classList.remove('clicked');
        });
    }

    function hideContactInfoOnClick() {
        if (contactInfoOnClick) {
            contactInfoOnClick.style.display = 'none';
        }
    }

    function displayContactInfo(item) {
        const name = item.querySelector('.contact_dummy_name').textContent;
        const email = item.querySelector('.contact_dummy_mail').textContent;
        const profileBadge = item.querySelector('.contact_dummy_border').textContent;
        const contactHTML = generateContactHTML(name, email, profileBadge);
        contactContainer.innerHTML = contactHTML;
        contactInfoOnClick = document.querySelector('.contact_info_onclick');
        if (contactInfoOnClick) {
            contactInfoOnClick.style.display = 'flex';
            setTimeout(() => {contactInfoOnClick.classList.add('show');}, 50);
        }
    }

    function generateContactHTML(name, email, profileBadge) {
        return `
            <div class="contact_info_onclick">
                <div class="contact_info_onclick_title">
                    <div class="contact_info_onclick_profilebadge_layout">
                        <div class="contact_info_onclick_profilebadge">
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
                            <span>+49 1111 111 11 1</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }


    function displayEditDeleteImages() {
        const editContainer = document.querySelector('.contact_info_onclick_edit');
        const deleteContainer = document.querySelector('.contact_info_onclick_delete');

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
});
