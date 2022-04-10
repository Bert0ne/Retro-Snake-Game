import { update as updateSnake, draw as drawSnake, snakeSpeed, getSnakeHead, snakeIntersection , restartSnake, changeSnakeSpeed} from './snake.js'
import { update as updateFood, draw as drawFood, changeFoodSpeed } from './food.js'
import { outsideGrid } from './grid.js'
import { resetScore, saveScore, loadSavedScores } from './score.js'
import { stopSnake, addKeyListener, deleteKeyListener, clickArrowListener } from './input.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game__board');
const gameOverBoard = document.querySelector('.game_over_container');
const gameOverBtn = document.querySelector('.game_over__btn')
const levelSelect = document.querySelector('.select-level')
const gameOverSound = document.querySelector(`audio[data-sound="over"]`);

function main(currentTime) {
  if (gameOver) {
    gameOverProcedure()
  }

  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / snakeSpeed) return

  lastRenderTime = currentTime

  update()
  draw()
}

window.addEventListener('DOMContentLoaded', () => {
    loadSavedScores()
    addKeyListener()
    clickArrowListener()
    addLevelChangeListener()
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

    gameOverSound.currentTime = 0;
    gameOverSound.play()

    saveScore()  
    resetScore()
    stopSnake()
    restartSnake()
    loadSavedScores()
    deleteKeyListener()
    gameOverBoard.classList.add('notActive')

    window.addEventListener('keydown', (e) => {
      console.log(e.key);
      if(e.key == 'Enter') {
        gameOverPanelDown()
      }
    })

    gameOverBtn.addEventListener('click', () => {
        // window.location = '/'  
        gameOverPanelDown()
    })
}

function gameOverPanelDown() {
  addKeyListener() 
  clickArrowListener()
  gameOverBoard.classList.remove('notActive');
}

function addLevelChangeListener() {
  levelSelect.addEventListener('change', (e) => {
    const speedValue = e.target.value;
    changeSnakeSpeed(speedValue)
    changeFoodSpeed(speedValue)
  })
}