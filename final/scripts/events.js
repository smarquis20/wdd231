document.getElementById('currentyear').innerHTML = new Date().getFullYear();
document.getElementById('lastModified').innerHTML = document.lastModified;

document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('.nav-menu');
    const header = document.querySelector('header');
    const missionContainer = document.querySelector('.time-events');

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

const urls = {
    'toggle-button1': 'data/block1.json',
    'toggle-button2': 'data/block2.json',
    'toggle-button3': 'data/block3.json'
}

document.addEventListener('DOMContentLoaded', () => {

    const toggleButtons = document.querySelectorAll('.toggle-button1, .toggle-button2, .toggle-button3');

    toggleButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const content = button.parentElement.nextElementSibling;
            content.classList.toggle('expanded');
            button.classList.toggle('expanded');

            if(!content.dataset.loaded) {
                const buttonNumber = button.classList[0];
                await getBlockData(urls[buttonNumber], content);
                content.dataset.loaded = 'true';
            }
        });

    });
});

async function getBlockData(url, toggleContent) {   
    const response = await fetch(url);
    const data = await response.json();
    displayBlocks(data.blocks, toggleContent);
}

const displayBlocks = (blocks, toggleContent) => {

    toggleContent.innerHTML = '';

    blocks.forEach((block) => {
        let card = document.createElement('div');
        let defaultImg = document.createElement('img');
        let title = document.createElement('h2');

        card.classList.add('toggleContentCard');

        defaultImg.textContent = block.image;
        title.textContent = block.title;

        defaultImg.setAttribute('src', block.image);
        defaultImg.setAttribute('alt', `Default Image for ${block.title}`);
        defaultImg.setAttribute('loading', 'lazy');
        defaultImg.setAttribute('width', '100');
        defaultImg.setAttribute('height', 'auto');

        card.appendChild(defaultImg);
        card.appendChild(title);

        card.addEventListener('click', () => {
            createModal(block);
        });

        toggleContent.appendChild(card);
    });

}

function createModal(block) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    const image = document.createElement('img');
    const title = document.createElement('h2');
    const cost = document.createElement('p');
    const age = document.createElement('p');
    const cap = document.createElement('p');
    const description = document.createElement('p');
    const closeButton = document.createElement('button');

    title.textContent = block.title;
    cost.innerHTML = `<strong>Cost:</strong> ${block.cost}`;
    age.innerHTML = `<strong>Age Range:</strong> ${block.age}`;
    cap.innerHTML = `<strong>Student Capacity:</strong> ${block.cap}`;
    description.textContent = block.description;

    image.setAttribute('src', block.image);
    image.setAttribute('alt', `Default Image for ${block.title}`);
    image.setAttribute('loading', 'lazy');
    image.setAttribute('width', '100');
    image.setAttribute('height', 'auto');
    
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    modalContent.appendChild(image);
    modalContent.appendChild(title);
    modalContent.appendChild(cost);
    modalContent.appendChild(age);
    modalContent.appendChild(cap);
    modalContent.appendChild(description);
    modalContent.appendChild(closeButton);
    
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}