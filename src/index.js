const characterBar = document.getElementById("character-bar");
const detailedInfo = document.getElementById("detailed-info");
const resetVotesButton = document.getElementById("reset-votes");
const characterForm = document.getElementById("character-form");

// Fetch characters and display in character bar
fetch("http://localhost:3000/characters")
  .then((response) => response.json())
  .then((characters) => {
    characters.forEach((character) => {
      const characterSpan = document.createElement("span");
      characterSpan.textContent = character.name;
      characterSpan.addEventListener("click", () =>
        displayCharacterDetails(character),
      );
      characterBar.appendChild(characterSpan);
    });
  });

// Function to display character details
function displayCharacterDetails(character) {
  detailedInfo.innerHTML = `
    <h2>${character.name}</h2>
    <img src="${character.image}" width="300" height="300"alt="${character.name}" />
    <h3>Total Votes: ${character.votes}</h3>
    <form id="votes-form">
      <label for="votes-input"></label>
      <input type="number" id="votes-input" name="votes" required />
      <button type="submit">Add Votes</button>
    </form>
    <button id="reset-character-votes">Reset Votes</button>
  `;

  // Handle vote form submission
  const voteForm = document.getElementById("votes-form");
  voteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const votesInput = document.getElementById("votes-input");
    const votes = parseInt(votesInput.value);
    character.votes += votes;
    updateCharacterDetails(character);
  });

  // Handle reset votes button click
  const resetCharacterVotesButton = document.getElementById(
    "reset-character-votes",
  );
  resetCharacterVotesButton.addEventListener("click", () => {
    resetCharacterVotes(character);
  });
}

// Handle reset votes button click
resetVotesButton.addEventListener("click", () => {
  detailedInfo.innerHTML = "";
  // TODO: Send PATCH request to reset votes on the server (Extra Bonus Deliverable)
});

// Handle character form submission
characterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.getElementById("character-name");
  const imageInput = document.getElementById("character-image");
  const newCharacter = {
    name: nameInput.value,
    image: imageInput.value,
    votes: 0,
  };

  // Send POST request to add new character to the server
  fetch("http://localhost:3000/characters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCharacter),
  })
    .then((response) => response.json())
    .then((savedCharacter) => {
      const characterSpan = document.createElement("span");
      characterSpan.textContent = savedCharacter.name;
      characterSpan.addEventListener("click", () =>
        displayCharacterDetails(savedCharacter),
      );
      characterBar.appendChild(characterSpan);

      // Display new character details
      displayCharacterDetails(savedCharacter);
      // Reset form fields
      nameInput.value = "";
      imageInput.value = "";
    });
});

// Function to reset character votes
function resetCharacterVotes(character) {
  // Send PATCH request to reset character votes on the server
  fetch(`http://localhost:3000/characters/${character.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      votes: 0, // Reset votes to 0
    }),
  })
    .then((response) => response.json())
    .then((updatedCharacter) => {
      // Update the displayed character details with the reset votes
      updateCharacterDetails(updatedCharacter);
    });
}

// Function to update character details
function updateCharacterDetails(character) {
  const characterDetails = `
    <h2>${character.name}</h2>
    <img src="${character.image}" alt="${character.name}" />
    <p>Votes: ${character.votes}</p>
    <form id="votes-form">
      <label for="votes-input">Add Votes:</label>
      <input type="number" id="votes-input" name="votes" required />
      <button type="submit">Submit</button>
    </form>
    <button id="reset-character-votes">Reset Votes</button>
  `;

  detailedInfo.innerHTML = characterDetails;

  // Update the event listeners for the new elements
  const voteForm = document.getElementById("votes-form");
  voteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const votesInput = document.getElementById("votes-input");
    const votes = parseInt(votesInput.value);
    character.votes += votes;
    updateCharacterDetails(character);
  });

  const resetCharacterVotesButton = document.getElementById(
    "reset-character-votes",
  );
  resetCharacterVotesButton.addEventListener("click", () => {
    resetCharacterVotes(character);
  });
}
