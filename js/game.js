"use strict";

var size = 4;
var field = new gameField(size);
var game;
var win = false;

function handleMove(moveFn) {
  if (typeof moveFn !== "function") return;
  if (!moveFn()) return;

  updateRenderField();
  setTimeout(gameOver, 300);

  if (!win) {
    setTimeout(isWin, 310);
  }
}

$(document).ready(function() {
  newGame();

  var startX = 0;
  var startY = 0;

  var fieldEl = document.querySelector(".field");
  if (fieldEl) {
    fieldEl.addEventListener("touchstart", function(e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    fieldEl.addEventListener("touchmove", function(e) {
      e.preventDefault();
    }, { passive: false });

    fieldEl.addEventListener("touchend", function(e) {
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      var absDx = Math.abs(dx);
      var absDy = Math.abs(dy);

      if (Math.max(absDx, absDy) < 25) return;

      if (absDx > absDy) {
        handleMove(dx > 0 ? moveRight : moveLeft);
      } else {
        handleMove(dy > 0 ? moveDown : moveUp);
      }
    }, { passive: true });
  }
});

$(document).keydown(function(event) {
  switch (event.keyCode) {
    case 37:
      event.preventDefault();
      handleMove(moveLeft);
      break;
    case 38:
      event.preventDefault();
      handleMove(moveUp);
      break;
    case 39:
      event.preventDefault();
      handleMove(moveRight);
      break;
    case 40:
      event.preventDefault();
      handleMove(moveDown);
      break;
  }
});
