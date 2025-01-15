const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    prophets = data.prophets;

    displayProphets(prophets);
}

const displayProphets = (prophets) => {

    cards.innerHTML = '';

    prophets.forEach((prophet) => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let birth = document.createElement('p');
        let place = document.createElement('p');
        let portrait = document.createElement('img');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birth.textContent = `Date of Birth: ${prophet.birthdate}`;
        place.textContent = `Place of Birth: ${prophet.birthplace}`;


        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastName}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(birth);
        card.appendChild(place);
        card.appendChild(portrait);

        cards.appendChild(card)
    });
}

function calculateAge(birthdate, deathdate) {
    const birthObject = new Date(birthdate);
    const birthYear = birthObject.getFullYear();
    let deathYear;

    if (deathdate) {
        const deathObject = new Date(deathdate);
        deathYear = deathObject.getFullYear();
    } else {
        const currentDate = new Date();
        deathYear = currentDate.getFullYear();
    }

    const age = deathYear - birthYear;
    return age;
}

function filteredProphets(filter) {
    let filtered;
    if (filter === 'Utah') {
        filtered = prophets.filter(prophet => prophet.birthplace === 'Utah');
    } else if (filter === 'Old') {
        filtered = prophets.filter(prophet => calculateAge(prophet.birthdate, prophet.death) >= 95);
    } else if (filter === 'Children') {
        filtered = prophets.filter(prophet => prophet.numofchildren >= 10);
    } else {
        filtered = prophets;
    }
    displayProphets(filtered);
}

getProphetData();