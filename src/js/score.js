const scoreBoard = document.querySelector('.panel__score');
const panelLastScores = document.querySelector('.panel__last-scores ul');
const finalScore = document.querySelector('.final__score')

let gameScore = 0;
let lastScoresArray = []

export function adScore(scoreAmount) {
    gameScore += scoreAmount;
    // console.log(gameScore);
    scoreBoard.innerHTML = gameScore;
}

export function resetScore() {
    gameScore = 0;
    scoreBoard.innerHTML = gameScore;
}

export function saveScore() {
    console.log(gameScore);
    finalScore.innerHTML = gameScore;

    if(gameScore == 0) return
    lastScoresArray.push(gameScore)
    localStorage.setItem('LastScores',JSON.stringify(lastScoresArray))
}

export function loadSavedScores() {
    const savedScores = localStorage.getItem('LastScores');
    if (savedScores) lastScoresArray = JSON.parse(savedScores); 

    lastScoresArray.forEach(el => {
        let scoreEl = `<li>${el}</li>`
        panelLastScores.innerHTML += scoreEl;
    })
}