import './style.css';

const API_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const gameId = 'Zl4d7IVkemOTTVg2fUdz';

const createGame = async (gameName) => {
  const response = await fetch(`${API_URL}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: gameName }),
  });

  const data = await response.json();

  if (!data || !data.result) {
    throw new Error('Invalid response from server');
  }
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
    body: JSON.stringify({ user: name, score }),
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

const updateScores = async () => {
  try {
    const data = await getScores();
    scores = data;
    scoresDiv.innerHTML = '';

    scores.forEach((score) => {
      const div = document.createElement('div');
      div.innerHTML = `<div class="displayed-score">${score.user}: ${score.score}</div><hr class="dash">`;
      scoresDiv.appendChild(div);
    });
  } catch (error) {
    throw new Error('Error updating scores:', error.message);
  }
};

const handleRefresh = async () => {
  try {
    await updateScores();
    throw new Error('Scores updated successfully');
  } catch (error) {
    throw new Error('Error refreshing scores:', error.message);
  }
};

const handleSubmit = async () => {
  const name = nameInput.value.trim();
  const score = parseInt(scoreInput.value.trim(), 10);

  if (name && score) {
    try {
      await submitScore(name, score);
      nameInput.value = '';
      scoreInput.value = '';
      await updateScores();
    } catch (error) {
      throw new Error('Error submitting score:', error.message);
    }
  }
};

const initializeGame = async () => {
  try {
    await createGame('My Game');
    await updateScores();
  } catch (error) {
    throw new Error('Error initializing game:', error.message);
  }
};

initializeGame();

refreshButton.addEventListener('click', handleRefresh);
submitButton.addEventListener('click', handleSubmit);
