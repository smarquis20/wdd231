document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;
const hbutton = document.querySelector('#hambutton');
const navElement = document.querySelector('.nav-menu');
const discoverPlace = document.querySelector('#discover-place');
const visitMessage = document.querySelector('#visit-message');
const url = 'data/discover.json';

hbutton.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hbutton.classList.toggle('open');
});

  async function getPlaceData() {
    const response = await fetch(url);
    const data = await response.json();
    places = data.places;

    displayPlaces(places);
}

const displayPlaces = (places) => {

    discoverPlace.innerHTML = '';

    places.forEach((place) => {
        let card = document.createElement('div');
        let name = document.createElement('h2');
        let figure = document.createElement('figure');
        let photo = document.createElement('img');
        let address = document.createElement('address');
        let description = document.createElement('p');
        let learn = document.createElement('button');

        card.classList.add('discoverPlaceCard');

        name.textContent = place.name;
        photo.setAttribute('src', place.photo_url);
        photo.setAttribute('alt', ` ${place.name}`);
        photo.setAttribute('loading', 'lazy');
        photo.classList.add('discoverPlace-img');

        learn.textContent = "Learn More";
        learn.addEventListener('click', () => {
            window.open(place.learn, '_blank')
        });

        address.textContent = place.address;
        description.textContent = place.description;

        figure.appendChild(photo);

        card.appendChild(name);
        card.appendChild(figure);
        card.appendChild(description);
        card.appendChild(address);
        card.appendChild(learn);

        discoverPlace.appendChild(card);
    });

}

function displayLastVisit() {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const lastVisitTime = parseInt(lastVisit);
        const visitMath = now - lastVisitTime;
        const visitDays = Math.floor(visitMath / (1000 * 60 * 60 * 24));

        if (visitDays < 1) {
            visitMessage.textContent = 'Back so soon! Awesome!';
        } else {
            visitMessage.textContent = 'You last visited ' + visitDays + ' days ago.'
        }
    }

    localStorage.setItem('lastVisit', now);
}

getPlaceData();
displayLastVisit();