const upArr = document.querySelector('.up')
const downArr = document.querySelector('.down')
const leftArr = document.querySelector('.left')
const rightArr = document.querySelector('.right')

let isClicked = false

let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }


export function getInputDirection() {
  lastInputDirection = inputDirection
  return inputDirection
}

export function stopSnake() {
  inputDirection = { x: 0, y: 0 }
}

export function addKeyListener() {
  window.addEventListener('keydown', keyListener)
}

function keyListener(e) {
  switch (e.key) {
    case 'ArrowUp':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: -1 }
      break
    case 'ArrowDown':
      if (lastInputDirection.y !== 0 || inputDirection.y == 0 && inputDirection.x == 0 ) break
      inputDirection = { x: 0, y: 1 }
      break
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: -1, y: 0 }
      break
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: 1, y: 0 }
      break
  }
}

export function deleteKeyListener() {
  window.removeEventListener('keydown', keyListener)
}

export function clickArrowListener() {
  let arrayOfArrows = [upArr, downArr, leftArr, rightArr];
  arrayOfArrows.forEach(el => {
    el.addEventListener('click', clickArrow)
  })
}

function clickArrow(e) {
  let arrow = e.currentTarget.dataset.arrow;

  switch (arrow) {
    case 'up':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: -1 }
      break
    case 'down':
      if (lastInputDirection.y !== 0 || inputDirection.y == 0 && inputDirection.x == 0 ) break
      inputDirection = { x: 0, y: 1 }
      break
    case 'left':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: -1, y: 0 }
      break
    case 'right':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: 1, y: 0 }
      break
  }
}
