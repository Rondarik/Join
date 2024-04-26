/**
 * Navigates back to the previous page in the browser history and sets a local storage item.
 *
<<<<<<< HEAD
 * @return {Promise<void>} This function does not return anything.
=======
 * @return {void} This function does not return a value.
>>>>>>> 0979ab872d20d705a6a3110a450c652efcc5dd0a
 */
async function backToLastPage() {
    localStorage.setItem('startAnimation','true');
    window.history.back();
  }

<<<<<<< HEAD
  /**
   * Initializes the function by including HTML and setting initials.
   *
   * @return {Promise<void>} A promise that resolves when the initialization is complete.
   */
=======
/**
 * Initializes the function by including HTML and setting initial values.
 *
 * @return {Promise<void>} A promise that resolves when the initialization is complete.
 */
>>>>>>> 0979ab872d20d705a6a3110a450c652efcc5dd0a
  async function init(){
    await includeHTML();
    setInitials();
  }