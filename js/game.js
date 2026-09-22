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

  let touchStartX = 0;
  let touchStartY = 0;

  window.addEventListener(
    "touchstart",
    (e) => {
      if (!e.target.closest(".field")) return;
      touchStartX = e.touches[0].screenX;
      touchStartY = e.touches[0].screenY;
    },
    { passive: true }
  );

  window.addEventListener(
    "touchmove",
    (e) => {
      if (e.target.closest(".field")) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  window.addEventListener(
    "touchend",
    (e) => {
      if (!e.target.closest(".field")) return;

      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;

      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (Math.max(absDx, absDy) < 30) return;

      if (absDx > absDy) {
        handleMove(dx > 0 ? KEY_ACTIONS[39] : KEY_ACTIONS[37]);
      } else {
        handleMove(dy > 0 ? KEY_ACTIONS[40] : KEY_ACTIONS[38]);
      }
    },
    { passive: true }
  );
});

$(document).keydown((event) => {
  const action = KEY_ACTIONS[event.keyCode];
  if (action) {
    event.preventDefault();
    handleMove(action);
  }
});
