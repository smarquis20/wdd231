document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;

const url = 'data/members.json';
const cards = document.querySelector('#cards');
const hbutton = document.querySelector('#hambutton');
const navElement = document.querySelector('.nav-menu');
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');
const display = document.querySelector('article');

hbutton.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hbutton.classList.toggle('open');
});

gridButton.addEventListener('click', () => {
    display.classList.add('grid-view');
    display.classList.remove('list-view');
});

listButton.addEventListener('click', () => {
    display.classList.add('list-view');
    display.classList.remove('grid-view');
});

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    members = data.members;

    displayMembers(members);
}

const displayMembers = (members) => {

    cards.innerHTML = '';

    members.forEach((member) => {
        let card = document.createElement('section');
        let name = document.createElement('h2');
        let address = document.createElement('p');
        let city = document.createElement('p');
        let addressCity = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let logo = document.createElement('img');
        let membership = document.createElement('p');

        logo.textContent = member.image;
        name.textContent = member.name;
        address.textContent = member.address;
        address.classList.add('street');
        city.textContent = member.city;
        city.classList.add('town');
        addressCity.textContent = `${member.address} ${member.city}`;
        addressCity.classList.add('fullAddress');
        phone.textContent = member.phone;
    

        logo.setAttribute('src', member.image);
        logo.setAttribute('alt', `Company logo of ${member.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '200');
        logo.setAttribute('height', 'auto');

        website.textContent = `Details`;
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');

        card.appendChild(name);
        card.appendChild(logo);
        card.appendChild(address);
        card.appendChild(city);
        card.appendChild(addressCity);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);

        cards.appendChild(card)
    });
}

getMemberData();