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

let touchStartX = 0;
let touchStartY = 0;

$(document).on("touchstart", (e) => {
  const touch = e.originalEvent.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
});

$(document).on("touchend", (e) => {
  const touch = e.originalEvent.changedTouches[0];
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  if (Math.max(absDx, absDy) < 30) return;

  if (absDx > absDy) {
    handleMove(dx > 0 ? KEY_ACTIONS[39] : KEY_ACTIONS[37]);
  } else {
    handleMove(dy > 0 ? KEY_ACTIONS[40] : KEY_ACTIONS[38]);
  }
});
