const hbutton = document.querySelector('#hambutton');
const navElement = document.querySelector('.nav-menu');

hbutton.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hbutton.classList.toggle('open');
});