import './style.css'

// Get the necessary HTML elements
const scoreContainer = document.getElementById('score-container');
const scoresDiv = document.getElementById('scores');
const refreshButton = document.querySelector('.refresh button');
const submitButton = document.querySelector('.input-scores button');
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');

// Store the scores in an array
let scores = [];

// Function to update the scores displayed on the page
function updateScores() {
  scoresDiv.innerHTML = ''; // Clear the previous scores
  for (let i = 0; i < scores.length; i++) {
    const score = scores[i];
    const div = document.createElement('div');
    div.innerHTML = `${score.name}: ${score.score}`;
    scoresDiv.appendChild(div);
  }
}

// Function to handle the refresh button click
function handleRefresh() {
    scores = []; // Remove all the scores
    updateScores();
  }
  
// Function to handle the submit button click
function handleSubmit() {
  const name = nameInput.value.trim();
  const score = parseInt(scoreInput.value.trim());

  if (name && score) { // Check that both inputs are valid
    scores.push({name, score});
    nameInput.value = '';
    scoreInput.value = '';
    updateScores();
  }
}

// Add event listeners to the buttons
refreshButton.addEventListener('click', handleRefresh);
submitButton.addEventListener('click', handleSubmit);
