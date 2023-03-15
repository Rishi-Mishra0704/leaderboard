import './style.css';

const API_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
let gameId = 'Zl4d7IVkemOTTVg2fUdz';

const createGame = async (gameName) => {
  const response = await fetch(`${API_URL}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: gameName }),
  });

  const data = await response.json();

  gameId = data.result;
};

const getScores = async () => {
  const response = await fetch(`${API_URL}/games/${gameId}/scores`);
  const data = await response.json();

  if (!data || !data.result) {
    throw new Error('Invalid response from server');
  }

  return data.result;
};

const submitScore = async (name, score) => {
  const response = await fetch(`${API_URL}/games/${gameId}/scores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, score }),

  });

  const data = await response.json();

  if (!data || !data.result) {
    throw new Error('Invalid response from server');
  }

  return data.result;
};

const scoresDiv = document.getElementById('scores');
const refreshButton = document.querySelector('.refresh button');
const submitButton = document.querySelector('.input-scores button');
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');

let scores = [];

const updateScores = (scoresArray) => {
  scoresDiv.innerHTML = '';

  scoresArray.forEach((score) => {
    const div = document.createElement('div');
    div.innerHTML = `<div class = "displayed-score">${score.user}: ${score.score}</div><hr class="dash">`;
    scoresDiv.appendChild(div);
  });
};

const handleRefresh = async () => {
  try {
    scores = await getScores();
    updateScores(scores);
  } catch (error) {
    throw new Error('Error fetching scores:', error);
  }
};

const handleSubmit = async () => {
  const name = nameInput.value.trim();
  const score = parseInt(scoreInput.value.trim(), 10);

  if (name && score) {
    try {
      await submitScore(name, score);
      scores = await getScores();
      nameInput.value = '';
      scoreInput.value = '';
      updateScores(scores);
    } catch (error) {
      throw new Error('Error submitting score:', error);
    }
  }
};

const initializeGame = async () => {
  try {
    await createGame('My Game');
    scores = await getScores();
    updateScores(scores);
  } catch (error) {
    throw new Error('Error initializing game:', error);
  }
};

initializeGame();

refreshButton.addEventListener('click', handleRefresh);
submitButton.addEventListener('click', handleSubmit);
