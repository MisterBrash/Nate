'use strict'

let score = 0;
let accuracy = 0;
let hits = 0;
let highscore = 0;

//Check if the high score was previously saved (if this is the first time running through the code) 
if (localStorage.getItem(`highscore`) !== null) {
  highscore = localStorage.getItem('highscore')
}

//Retrieve local storage
score = localStorage.getItem('score');
accuracy = localStorage.getItem('accuracy');
hits = localStorage.getItem('hits');

//Update the visible text on the html
document.getElementById('postgame_score').textContent = score;
document.getElementById('postgame_accuracy').textContent = accuracy;
document.getElementById('postgame_hits').textContent = hits;
document.getElementById('highscore').textContent = highscore;

//Update the high score if the current score exceeds the previous
if (score > highscore) {
  highscore = score;
  localStorage.setItem('highscore', score);
  document.getElementById('highscore').textContent = highscore;
}

//Return to menu
document.getElementById('menu').addEventListener('click', menu)

function menu() {
  score = 0
  accuracy = 0
  hits = 0
  window.location.href = 'index.html'
}