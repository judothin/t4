// main.js

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.icons');
    const content = document.querySelector('.content');

    hamburgerMenu.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        content.classList.toggle('menu-open');
    });
});