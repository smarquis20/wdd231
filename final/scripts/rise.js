document.getElementById('currentyear').innerHTML = new Date().getFullYear();
document.getElementById('lastModified').innerHTML = document.lastModified;

document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('.nav-menu');
    const header = document.querySelector('header');
    const missionContainer = document.querySelector('.main-container');

    function updateNavPosition() {
        const headerHeight = header.offsetHeight;
        const navHeight = nav.offsetHeight;
        isLargeScreen = window.innerWidth >= 720;

        if (window.scrollY > headerHeight && isLargeScreen) {
            nav.className = nav.className.replace('nav-menu', 'fixed-nav');
            missionContainer.style.marginTop = `${navHeight}px`;
        } else {
            nav.className = nav.className.replace('fixed-nav', 'nav-menu');
            missionContainer.style.marginTop = '0';
        }

    }

    window.addEventListener('scroll', updateNavPosition);
    window.addEventListener('resize', updateNavPosition);
});