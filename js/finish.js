
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');

const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 6;

finalScore.innerText = mostRecentScore;
// enable save button when name was entred 
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});
//  display best scores from the highest to the lowest 
saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(6);

//  local Storage 
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};