const directory = document.getElementById('member-directory');
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');
const lastModified = document.getElementById('last-modified');
const year = document.getElementById('year');

const fetchMembers = async () => {
  try {
    const response = await fetch('chamber/data/members.json');
    if (!response.ok) throw new Error('Failed to fetch member data');
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error('Error loading members:', error);
  }
};

const displayMembers = (members) => {
  directory.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="chamber/images/${member.image}" alt="${member.name} logo" loading="lazy" />
      <div>
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
      </div>
    `;
    directory.appendChild(card);
  });
};

gridBtn.addEventListener('click', () => {
  directory.classList.add('grid-view');
  directory.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
  directory.classList.add('list-view');
  directory.classList.remove('grid-view');
});

document.addEventListener('DOMContentLoaded', () => {
  fetchMembers();
  year.textContent = new Date().getFullYear();
  lastModified.textContent = document.lastModified;
});
