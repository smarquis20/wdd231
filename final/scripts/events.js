document.getElementById('currentyear').innerHTML = new Date().getFullYear();
document.getElementById('lastModified').innerHTML = document.lastModified;

document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('.nav-menu');
    const header = document.querySelector('header');
    const missionContainer = document.querySelector('.mission-container');

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
        let title = document.createElement('h2');
        let cap = document.createElement('p');
        let cost = document.createElement('p');
        let description = document.createElement('p');

        card.classList.add('toggleContentCard');

        title.textContent = block.title;
        cap.textContent = block.cap;
        cost.textContent = block.cost;
        description.textContent = block.description;

        card.appendChild(title);
        card.appendChild(cap);
        card.appendChild(cost);
        card.appendChild(description);

        toggleContent.appendChild(card);
    });

}