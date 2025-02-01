document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;

const hbutton = document.querySelector('#hambutton');
const navElement = document.querySelector('.nav-menu');

hbutton.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hbutton.classList.toggle('open');
});

function getMemberData() {
    const details = new URLSearchParams(window.location.search);
    return {
        First: details.get('first-name') || 'Not Provided',
        Last: details.get('last-name') || 'Not Provided',
        Organization: details.get('org-title') || 'Not Provided',
        Email: details.get('email') || 'Not Provided',
        Phone: details.get('phone') || 'Not Provided',
        Business: details.get('business-name') || 'Not Provided',
        Description: details.get('description') || 'Not Provided',
        Membership: details.get('membership-level') || 'Not Provided',
        Timestamp: details.get('timestamp')
    };
}

document.addEventListener('DOMContentLoaded', function () {
    const memberDetails = getMemberData();
    const memberList = document.getElementById('memberDetails');

    Object.entries(memberDetails).forEach(([key, value]) => {
        const listItem = document.createElement('li');
        const label = document.createElement('strong');

        label.textContent = key + ': ';
        listItem.appendChild(label);
        listItem.appendChild(document.createTextNode(value));
        memberList.appendChild(listItem);
    });
});