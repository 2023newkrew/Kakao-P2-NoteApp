const sidebarButton = document.querySelector(".header__sidebar-button");
const sidebarEl = document.querySelector(".sidebar__container");
sidebarButton.addEventListener("click", toggleSidebar);

function toggleSidebar() {
  sidebarEl.classList.toggle("hide");
}
