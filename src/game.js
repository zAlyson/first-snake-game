import {
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersectsItself,
  SNAKE_SPEED,
} from './entities/snake.js';

import { update as updateFood, draw as drawFood } from './entities/food.js';

import { outsideGrid } from './entities/grid.js';

let lastRenderTime = 0;
let gameOver = false;

const gameBoard = document.getElementById('game-board');

function main(currentTime) {
  if (gameOver) {
    if (confirm("You've lost! Press 'Ok' to try again.")) {
      window.location = '/';
    }

    return;
  }

  window.requestAnimationFrame(main);

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = '';

  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersectsItself();
}
