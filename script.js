import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore')
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcons = document.querySelectorAll('.far');

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = '';
let verdictEl = document.getElementById('verdict');

// Reset all 'selected' icons
function resetSelected() {
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });
  verdictEl.textContent = '';
  stopConfetti();
  removeConfetti();
}

// Reset Score & playerChoice/computerChoice
function resetAll() {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';
  resultText.textContent = '';
  resetSelected();
}
window.resetAll = resetAll;

// Random Computer Choice
function computerRandomChoice() {
  const computerChoiceNumber = Math.random();
  if (computerChoiceNumber < 0.2) {
    computerChoice = 'rock'
  }
  else if (computerChoiceNumber <= 0.4) {
    computerChoice = 'paper'
  }
  else if (computerChoiceNumber <= 0.6) {
    computerChoice = 'scissors'
  }
  else if (computerChoiceNumber <= 0.8) {
    computerChoice = 'lizard'
  }
  else {
    computerChoice = 'spock'
  }
}

function displayVerdict(winner, loser) {
  switch (winner + ' ' + loser) {
    case 'paper rock': verdict = 'Paper covers Rock'; break;
    case 'rock scissors': verdict = 'Rock crushes Scissors'; break;
    case 'rock lizard': verdict = 'Rock crushes Lizard'; break;
    case 'spock rock': verdict = 'Spock vaporizes Rock'; break;
    case 'scissors paper': verdict = 'Scissors cut Paper'; break;
    case 'lizard paper': verdict = 'Lizard eats Paper'; break;
    case 'paper spock': verdict = 'Paper disproves Spock'; break;
    case 'scissors lizard': verdict = 'Scissors decapitate Lizard'; break;
    case 'spock scissors': verdict = 'Spock smashes Scissors'; break;
    case 'lizard spock': verdict = 'Lizard poisons Spock'; break;
  }
  verdictEl.textContent = verdict;
}
window.verdict = verdict;

// Add 'selected' styling & computer choice
function displayComputerChoice() {
  switch (computerChoice) {
    case 'rock':
      computerRock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      computerPaper.classList.add('selected');
      computerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      computerScissors.classList.add('selected');
      computerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      computerLizard.classList.add('selected');
      computerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock':
      computerSpock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Spock';
      break;
    default:
      break;
  }
}

// Check result, increase scores, update resultText
function updateScore(playerChoice) {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie";
    resultText.style.color = 'black';
    verdictEl.textContent = '';
  } else {
    const choice = choices[playerChoice];
    if (choice.defeats.indexOf(computerChoice) > -1) {
      startConfetti();
      resultText.style.color = 'green';
      verdictEl.style.color = 'green';
      resultText.textContent = "You won!";
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
      displayVerdict(playerChoice, computerChoice)
    }
    else {
      resultText.style.color = 'red';
      verdictEl.style.color = 'red';
      resultText.textContent = "You lost!"
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
      displayVerdict(computerChoice, playerChoice);
    }
  }
}

// Call functions to process turn
function checkResult(playerChoice) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

// Passing player selection value and styling icons
function select(playerChoice) {
  checkResult(playerChoice);
  // Add 'selected' styling & playerChoice
  switch (playerChoice) {
    case 'rock':
      playerRock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      playerPaper.classList.add('selected');
      playerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      playerScissors.classList.add('selected');
      playerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      playerLizard.classList.add('selected');
      playerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock':
      playerSpock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Spock';
      break;
    default:
      break;
  }
}
window.select = select;

// On startup, set initial values
resetAll();
