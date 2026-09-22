"use strict";

const size = 4;
const field = new gameField(size);
let game = true;
let win = false;

const KEY_ACTIONS = {
  37: () => moveLeft(),
  38: () => moveUp(),
  39: () => moveRight(),
  40: () => moveDown()
};

function handleMove(moveFn) {
  if (typeof moveFn !== "function") return;
  if (!moveFn()) return;

  updateRenderField();
  setTimeout(gameOver, 300);

  if (!win) {
    setTimeout(isWin, 310);
  }
}

$(document).ready(() => {
  newGame();

  let startX = 0;
  let startY = 0;

  document.addEventListener(
    "touchstart",
    (e) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    (e) => {
      const touch = e.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (Math.max(absDx, absDy) < 20) return;

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
