import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'
import { adScore } from './score.js'

let food = getRandomFoodPosition()
let foodSpeed = 30000;
let foodSpeedInterval;
let gameLevelForFruits;

const EXPANSION_RATE = 1
const FOODS_SCORE = 10;



export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE)
    clearInterval(foodSpeedInterval)
    food = getRandomFoodPosition()
    changeFoodSpeed(gameLevelForFruits) 
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


// export function foodChangePlaceAfterTime(gameLevel) {
//   // let foodTime = 30 / (gameLevel / 2)
//   // console.log(foodTime);

//   setInterval(() => {
//     food = getRandomFoodPosition()
//   }, gameLevel);
// }

export function changeFoodSpeed(gameLevel) {
  gameLevelForFruits = gameLevel;
  clearInterval(foodSpeedInterval)
  foodSpeed = 30000 / gameLevel;
  intervalFood()
}

function intervalFood() {
  foodSpeedInterval = setInterval(() => {
    food = getRandomFoodPosition()
  }, foodSpeed);
}

intervalFood()