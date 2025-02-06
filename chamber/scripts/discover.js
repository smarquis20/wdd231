document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;
const hbutton = document.querySelector('#hambutton');
const discoverPlace = document.querySelector('#discover-place');
const url = 'data/discover.json';

hbutton.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hbutton.classList.toggle('open');
});

  async function getPlaceData() {
    const response = await fetch(url);
    const data = await response.json();
    places = data.places;

    console.log(places);
    displayPlaces(places);
}

const displayPlaces = (places) => {

    discoverPlace.innerHTML = '';

    places.forEach((place) => {
        let card = document.createElement('div');
        let name = document.createElement('h3');
        let photo = document.createElement('img');
        let address = document.createElement('p');
        let cost = document.createElement('p');
        let description = document.createElement('p');

        card.classList.add('discoverPlaceCard');

        name.textContent = place.name;
        photo.setAttribute('src', place.photo_url);
        photo.setAttribute('alt', ` ${place.name}`);
        photo.setAttribute('loading', 'lazy');
        photo.classList.add('discoverPlace-img');

        address.textContent = place.address;
        cost.textContent = place.cost;
        description.textContent = place.description;

        card.appendChild(name);
        card.appendChild(photo);
        card.appendChild(cost);
        card.appendChild(description);
        card.appendChild(address);

        discoverPlace.appendChild(card);
    });

}

getPlaceData();