"use strict";

const $field = $(".field");
const $scoreContainer = $(".score-container");
const $gameOver = $(".game-over");
const $win = $(".win");

function renderCell(cell) {
  if (!cell) return null;

  cell.div = $("<div>", { class: "value-cell", text: cell.value }).css({
    "background-color": getNumberCellBgColor(cell.value),
    top: getPosTop(cell.i - 1, cell.j - 1) + 25,
    left: getPosLeft(cell.i - 1, cell.j - 1) + 25
  });

  $field.append(cell.div);
  return cell;
}

function showAnimation(cell) {
  if (!cell?.div) return;

  cell.div.css({
    top: getPosTop(cell.i - 1, cell.j - 1),
    left: getPosLeft(cell.i - 1, cell.j - 1),
    width: 100,
    height: 100,
    "font-size": getNumberCellFontSize(cell.value),
    "line-height": "100px"
  });
}

function updateCells(fieldObj) {
  Object.values(fieldObj).forEach((item) => {
    if (!item.div) {
      item.div = $("<div>", { class: "value-cell" });
      $field.append(item.div);
    }

    item.div.css({
      top: getPosTop(item.i - 1, item.j - 1),
      left: getPosLeft(item.i - 1, item.j - 1)
    });
  });
}

function updateCellsValue(fieldObj) {
  Object.values(fieldObj).forEach((item) => {
    if (!item.div) return;

    item.div
      .text(item.value)
      .css({
        color: getNumberCellFontColor(item.value),
        "background-color": getNumberCellBgColor(item.value),
        "font-size": getNumberCellFontSize(item.value)
      });
  });
}

function updateScore(score) {
  $scoreContainer.text(score);
}

function renderGameOver() {
  $gameOver.css("visibility", "visible");
}

function renderWin() {
  $win.css("visibility", "visible");
}

function hideGameOver() {
  $gameOver.css("visibility", "hidden");
}

function hideWin() {
  $win.css("visibility", "hidden");
}

function clearValueCell() {
  $(".value-cell").remove();
}
