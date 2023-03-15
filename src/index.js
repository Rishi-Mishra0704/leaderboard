import './style.css';
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
const API = {
  createGame: async () => {
    return { gameId: 'scores' };
  },
  getScores: async (gameId) => {
    const scores = JSON.parse(localStorage.getItem(gameId)) || [];
    return { scores };
  },
  submitScore: async (gameId, name, score) => {
    const scores = JSON.parse(localStorage.getItem(gameId)) || [];
    scores.push({ name, score });
    localStorage.setItem(gameId, JSON.stringify(scores));
    return { scores };
  },
};

const scoresDiv = document.getElementById('scores');
const refreshButton = document.querySelector('.refresh button');
const submitButton = document.querySelector('.input-scores button');
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');

let gameId;
let scores = [];

const updateScores = () => {
  scoresDiv.innerHTML = '';
  for (let i = 0; i < scores.length; i += 1) {
    const score = scores[i];
    const div = document.createElement('div');
    div.innerHTML = `${score.name}: ${score.score}<hr class="dash">`;
    scoresDiv.appendChild(div);
  }
};

const handleRefresh = async () => {
  try {
    const response = await API.getScores(gameId);
    scores = response.scores;
    updateScores();
  } catch (error) {
    console.error(error);
  }
};

const handleSubmit = async () => {
  const name = nameInput.value.trim();
  const score = parseInt(scoreInput.value.trim(), 10);

  if (name && score) {
    try {
      await API.submitScore(gameId, name, score);
      scores = [];
      nameInput.value = '';
      scoreInput.value = '';
    } catch (error) {
      console.error(error);
    }
  }
};

const createGame = async () => {
  try {
    const response = await API.createGame('My Game');
    gameId = response.gameId;
  } catch (error) {
    console.error(error);
  }
};

createGame();

refreshButton.addEventListener('click', handleRefresh);
submitButton.addEventListener('click', handleSubmit);
