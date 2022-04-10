import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'
import { adScore } from './score.js'

const audioFruit = document.querySelector(`audio[data-sound="fruit"]`);
const bonusFruit = document.querySelector(`audio[data-sound="bonus"]`);

let food = getRandomFoodPosition()
let foodSpeed = 30000;
let foodSpeedInterval;
let gameLevelForFruits;
let bonusFood = false;
let bonusFoodCounter = 0;

const EXPANSION_RATE = 1
const FOODS_SCORE = 10;
const BONUS_FOOD_SCORE = 50;



export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE)

    bonusFoodCounter++;
    console.log(bonusFoodCounter);
    clearInterval(foodSpeedInterval)

    food = getRandomFoodPosition()
    changeFoodSpeed(gameLevelForFruits) 

    if(bonusFood) {
      bonusFruit.currentTime = 0;
      bonusFruit.play()
    } else {
      audioFruit.currentTime = 0;
      audioFruit.play()
    }



    if(bonusFoodCounter >= 5) {
      adScore(BONUS_FOOD_SCORE)
      bonusFood = true
      bonusFoodCounter = 0;
    } else {
      adScore(FOODS_SCORE)
      bonusFood = false
    }
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add(`${bonusFood ? 'apple' : 'cherry'}`)
  foodElement.classList.add('fruit')
  // foodElement.classList.add('cherry');
  gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}

export function changeFoodSpeed(gameLevel) {
  gameLevelForFruits = gameLevel;
  clearInterval(foodSpeedInterval)
  foodSpeed = 30000 / gameLevel;
  intervalFood()
}

function intervalFood() {
  foodSpeedInterval = setInterval(() => {
    food = getRandomFoodPosition()
    bonusFoodCounter = 0;
  }, foodSpeed);
}

intervalFood()



// const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
// const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

// console.log(audio);
// if(!audio) return;
// audio.currentTime = 0;
// audio.play()
// key.classList.add('playing')