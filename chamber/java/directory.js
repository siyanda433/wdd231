const memberDirectory = document.getElementById('member-directory');
const gridViewButton = document.getElementById('grid-view');
const listViewButton = document.getElementById('list-view');

async function fetchMembers() {
    try {
        const response = await fetch('members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const members = await response.json();
        return members;
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

async function displayMembers() {
    const members = await fetchMembers();
    memberDirectory.innerHTML = '';
    members.forEach((member) => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');
        memberCard.innerHTML = `
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}">${member.website}</a></p>
            <img src="images/${member.image}" alt="${member.name}">
            <p>${member.description}</p>
        `;
        memberDirectory.appendChild(memberCard);
    });
}

gridViewButton.addEventListener('click', () => {
    memberDirectory.classList.add('grid-view');
    memberDirectory.classList.remove('list-view');
});

listViewButton.addEventListener('click', () => {
    memberDirectory.classList.add('list-view');
    memberDirectory.classList.remove('grid-view');
});

displayMembers();
