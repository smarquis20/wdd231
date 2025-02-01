document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;
const membershipContainer = document.getElementById("membership-container");

const memberships = [
    {
        id: "nonprofit",
        title: "Non-Profit Membership",
        price: "Free",
        perks: [
            "✔ Free Membership for Non-Profits",
            "✔ Access to Special Events",
            "✔ Training and Free Advertisment"
        ]
    },
    {
        id: "bronze",
        title: "Bronze Membership",
        price: "$50",
        perks: [
            "✔ Includes Non-Profit Level Perks",
            "✔ Placement on the Directory Page",
            "✔ Access to Newsletter"
        ]
    },
    {
        id: "silver",
        title: "Silver Membership",
        price: "$75",
        perks: [
            "✔ Includes Bronze Level Perks",
            "✔ Priority Sponsorship",
            "✔ Advertisment Spot on Directory Page"
        ]
    },
    {
        id: "gold",
        title: "Gold Membership",
        price: "$100",
        perks: [
            "✔ Includes Silver Level Perks",
            "✔ Premium Advertising Positioning",
            "✔ Placement on Homepage"
        ]
    }
]

const hbutton = document.querySelector('#hambutton');
const navElement = document.querySelector('.nav-menu');

hbutton.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hbutton.classList.toggle('open');
});

document.addEventListener("DOMContentLoaded", function () {
    let timeStampField = document.getElementById('timestamp');
    let now = new Date();
    timeStampField.value = now.toISOString();

    setTimeout(() => {
        membershipContainer.classList.add('show');
    }, 300);
});

function createMembershipCards(membership) {
    const card = document.createElement('div');
    card.classList.add('membership-card');
    const name = document.createElement('h3');
    const button = document.createElement('button');

    name.textContent = membership.title;
    button.textContent = 'Learn More';
    button.addEventListener('click', () => {
        createModal(membership);
    })

    card.append(name);
    card.append(button);

    membershipContainer.appendChild(card);
}

memberships.forEach(createMembershipCards);

function createModal(membership) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    const title = document.createElement('h3');
    const price = document.createElement('p');
    
    const perkList = document.createElement('ul');
    const closeButton = document.createElement('button');

    title.textContent = membership.title;
    price.textContent = membership.price;

    membership.perks.forEach(perk => {
        const perkItem = document.createElement('li');
        perkItem.textContent = perk;
        perkList.appendChild(perkItem);
    });

    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modalContent.appendChild(title);
    modalContent.appendChild(price);
    modalContent.appendChild(perkList);
    modalContent.appendChild(closeButton);
    
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}