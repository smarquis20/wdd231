document.getElementById('currentyear').innerHTML = new Date().getFullYear();
document.getElementById('lastModified').innerHTML = document.lastModified;
const staffBio = document.querySelector('#staffBio');

document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('.nav-menu');
    const header = document.querySelector('header');
    const missionContainer = document.querySelector('.form-box');

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

document.addEventListener("DOMContentLoaded", function () {
    let timeStampField = document.getElementById('timestamp');
    let now = new Date();
    timeStampField.value = now.toISOString();
});

const url = 'data/aboutus.json';

async function getBioData() {
   const response = await fetch(url);
   const data = await response.json();
   members = data.members;

   displayMembers(members);
}

const displayMembers = (members) => {

    members.forEach((member) => {
        let card = document.createElement('div');
        let photo = document.createElement('img');
        let title = document.createElement('h2');
        let name = document.createElement('p');
        let email = document.createElement('p');

        card.classList.add('staffBioCard');

        name.innerHTML = `<strong>Name:</strong> ${member.name}`;
        photo.setAttribute('src', member.image);
        photo.setAttribute('alt', ` ${member.name}`);
        photo.setAttribute('loading', 'lazy');
        title.textContent = member.title;
        email.innerHTML = `<strong>Email:</strong> ${member.email}`;

        card.appendChild(photo);
        card.appendChild(title);
        card.appendChild(name);
        card.appendChild(email);

        staffBio.appendChild(card);
    });
}

getBioData();