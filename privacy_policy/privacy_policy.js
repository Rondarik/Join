async function backToLastPage() {
    localStorage.setItem('startAnimation','true');
    window.history.back();
  }

  async function init(){
    await includeHTML();
    setInitials();
  }