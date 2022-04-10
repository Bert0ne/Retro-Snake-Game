import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection , restartSnake} from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'
import { resetScore, saveScore, loadSavedScores } from './score.js'
import { stopSnake } from './input.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game__board');
const gameOverBoard = document.querySelector('.game_over_container');
const gameOverBtn = document.querySelector('.game_over__btn')

function main(currentTime) {
  if (gameOver) {
    gameOverProcedure()
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

function gameOverProcedure() {

    saveScore()  
    resetScore()
    stopSnake()
    restartSnake()
    loadSavedScores()
    gameOverBoard.classList.add('notActive')

    gameOverBtn.addEventListener('click', () => {
        gameOverBoard.classList.remove('notActive'); 
        // window.location = '/'  
    })
   

}
