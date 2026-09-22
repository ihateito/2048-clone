"use strict";

const GRID_SIZE = 4;
const field = new gameField(GRID_SIZE);
let game;
let win = false;

const KEY_ACTIONS = {
  37: () => moveLeft(),
  38: () => moveUp(),
  39: () => moveRight(),
  40: () => moveDown()
};

function handleMove(moveFn) {
  if (!moveFn()) return;

  updateRenderField();
  setTimeout(gameOver, 300);

  if (!win) {
    setTimeout(isWin, 310);
  }
}

$(document).ready(() => {
  newGame();
});

$(document).keydown((event) => {
  const action = KEY_ACTIONS[event.keyCode];
  if (action) {
    event.preventDefault();
    handleMove(action);
  }
});
