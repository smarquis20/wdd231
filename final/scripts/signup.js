function getSignupData() {
    const details = new URLSearchParams(window.location.search);
    return {
        Guardian_First: details.get('g-first-name') || 'Not Provided',
        Guardian_Last: details.get('g-last-name') || 'Not Provided',
        Student_First: details.get('s-first-name') || 'Not Provided',
        Student_Last: details.get('s-last-name') || 'Not Provided',
        Email: details.get('email') || 'Not Provided',
        Phone: details.get('phone') || 'Not Provided',
        Address: details.get('address') || 'Not Provided',
        City: details.get('city') || 'Not Provided',
        Zip: details.get('zip-code') || 'Not Provided',
        Questions: details.get('questions') || 'Not Provided',
        Timestamp: details.get('timestamp')
    };
}

document.addEventListener('DOMContentLoaded', function () {
    const signupDetails = getSignupData();
    const signupList = document.getElementById('signupDetails');

    Object.entries(signupDetails).forEach(([key, value]) => {
        const listItem = document.createElement('li');
        const label = document.createElement('strong');

        label.textContent = key + ': ';
        listItem.appendChild(label);
        listItem.appendChild(document.createTextNode(value));
        signupList.appendChild(listItem);
    });
});