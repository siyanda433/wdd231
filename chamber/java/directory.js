const directory = document.getElementById('member-directory');
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');
const lastModified = document.getElementById('last-modified');
const year = document.getElementById('year');
const url = "https://example.com/chamber/data/members.json"; // Replace with actual URL if needed

const getBusinessData = async (displayBusinessStyleValue) => {
    cards.innerHTML = "";
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.table(data.members);
        // console.log(displayBusinessStyle.value)
 
        if (displayBusinessStyleValue == "card") {
            displayLogoCards(data.members);
        } else if (displayBusinessStyleValue == "list") {
            displayBusinessList(data.members);
        }
    } catch (error) {
        console.error("Error fetching data:", error); // Handle any errors    
    }
}

async function fetchMembers() {
  try {
    const response = await fetch('chanmber/data/members.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

function displayMembers(members) {
  directory.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('div');
    card.className = 'member-card';

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" />
      <div>
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
      </div>
    `;
    directory.appendChild(card);
  });
}

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
  lastModified.textContent = document.lastModified;
  year.textContent = new Date().getFullYear();
});
