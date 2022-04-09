import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'
import { resetScore, saveScore, loadSavedScores } from './score.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game__board');


function main(currentTime) {
  if (gameOver) {
    saveScore()  
    resetScore()
    if (confirm('You lost. Press ok to restart.')) {
      window.location = '/'
    }
    return
  }


  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return


  lastRenderTime = currentTime

  update()
  draw()

}
window.addEventListener('DOMContentLoaded', ()=>{
    loadSavedScores()
    window.requestAnimationFrame(main)
})

function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

//   localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));

// const storage = localStorage.getItem('bookmarks');
// if (storage) state.bookmarks = JSON.parse(storage);