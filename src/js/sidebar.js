const initSideBar = () => {
  const menuBtnEl = document.querySelector('.header__menu-button');
  const sideBarContainerEl = document.querySelector('.side-bar-container');

  const toggleSideBar = () => {
    sideBarContainerEl.classList.toggle('side-bar-container--collapsed');
  };

  menuBtnEl.addEventListener('click', toggleSideBar);
};

export default initSideBar;
