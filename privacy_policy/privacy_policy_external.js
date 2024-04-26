/**
 * Asynchronously navigates back to the previous page and sets the 'startAnimation' flag in local storage to 'true'.
 *
 * @return {Promise<void>} A promise that resolves when the navigation is complete.
 */
async function backToLastPage() {
    localStorage.setItem('startAnimation','true');
    window.history.back();
  }

/**
 * Initializes the function by including HTML, hiding the link container, and setting initials.
 *
 * @return {Promise<void>} A promise that resolves when the initialization is complete.
 */
  async function init(){
    await includeHTML();
  }