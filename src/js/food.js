import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'
import { adScore } from './score.js'
let food = getRandomFoodPosition()
const EXPANSION_RATE = 1
const FOODS_SCORE = 10;

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE)
    food = getRandomFoodPosition()
    adScore(FOODS_SCORE)
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}