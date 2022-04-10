const scoreBoard = document.querySelector('.panel__score');
const panelLastScores = document.querySelector('.panel__last-scores ul');
const finalScore = document.querySelector('.final__score')

let gameScore = 0;
let lastScoresArray = []

export function adScore(scoreAmount) {
    gameScore += scoreAmount;
    scoreBoard.innerHTML = gameScore;
}


export function saveScore() {
    // finalScore.innerHTML = gameScore;

    if(gameScore == 0) return
    if(gameScore != 0){

        lastScoresArray.push(gameScore)
        lastScoresArray.length >= 10 ? lastScoresArray.shift() : '';
        finalScore.innerHTML = gameScore;
        // finalScore.innerHTML = lastScoresArray.at(-1);
        // gameScore == 0 ? finalScore.innerHTML = 0 : finalScore.innerHTML = lastScoresArray.at(-1);   
        localStorage.setItem('LastScores',JSON.stringify(lastScoresArray))
    }
}

export function resetScore() {
    gameScore = 0;
    scoreBoard.innerHTML = gameScore;
}

export function loadSavedScores() {
    const savedScores = localStorage.getItem('LastScores');
    if (savedScores) lastScoresArray = JSON.parse(savedScores); 

    panelLastScores.innerHTML = '';
    lastScoresArray.forEach(el => {
        let scoreEl = `<li>${el}</li>`
        panelLastScores.innerHTML += scoreEl;
    })
}