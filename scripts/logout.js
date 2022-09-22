const logOutBtn = document.querySelector('#closeApp');

logOutBtn.addEventListener('click', () => {
  localStorage.clear();
  window.location.href = '/';
})