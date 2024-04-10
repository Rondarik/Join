document.addEventListener('DOMContentLoaded', function() {
    const contactItems = document.querySelectorAll('.contact_dummy_1');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove 'clicked' class from all items
            contactItems.forEach(item => {
                item.classList.remove('clicked');
            });

            // Add 'clicked' class to the clicked item
            this.classList.add('clicked');
        });
    });
});