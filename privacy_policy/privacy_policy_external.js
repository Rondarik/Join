async function backToLastPage() {
    localStorage.setItem('startAnimation','true');
    window.history.back();
  }

  async function init(){
    await includeHTML();
    document.querySelector('.link_container').style.display = 'none';
    setInitials();
  }