// Function to fetch character data from the API
function fetchData() {
  return fetch('http://localhost:3000/characters')
    .then(res => res.json())
    .then(data => functionData(data));
}

// Function to handle character data
function functionData(data) {
  const characterBar = document.getElementById("character-bar");
  const detailedInfo = document.getElementById("detailed-info");
  const votesForm = document.getElementById("votes-form");
  const characterForm = document.getElementById("character-form");
  const resetVotesBtn = document.getElementById("reset-votes");
  const characterName = document.getElementById('name');
  const characterVotes = document.getElementById('vote-count');
  const characterImage = document.getElementById('image');
  const Votes = document.getElementById('votes');

  // Populate character names in the character bar
  data.forEach(character => {
    const span = document.createElement("span");
    span.textContent = character.name;
    span.addEventListener("click", () => {
      characterName.textContent = character.name
      characterImage.src = character.image
      characterVotes.textContent = character.votes
      
    });
    characterBar.appendChild(span);
    votesForm.addEventListener('submit', (e)=>{
      votecount = votes.value;
      characterVotes.textContent = votecount
      e.preventDefault()

    })
    
  });
  
}

document.addEventListener('DOMContentLoaded',fetchData)