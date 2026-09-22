"use strict";

function newGame() {
  game = true;
  field.score = 0;
  updateScore(field.score);
  clearField();
  firstGen();

  Object.values(field.field).forEach(renderCell);
  setTimeout(() => {
    Object.values(field.field).forEach(showAnimation);
  }, 50);
}

function updateField() {
  setTimeout(() => updateCells(field.field), 100);
  setTimeout(() => {
    updateCellsValue(field.field);
    updateScore(field.score);
  }, 200);
}

function removeCells() {
  setTimeout(() => {
    for (const key of Object.keys(field.trash)) {
      field.trash[key].remove();
      delete field.trash[key];
    }
  }, 200);
}

function addNewCell() {
  let tempCell;
  setTimeout(() => {
    tempCell = renderCell(field.addCell());
  }, 220);
  setTimeout(() => {
    if (tempCell) showAnimation(tempCell);
  }, 270);
}

function updateRenderField() {
  removeCells();
  updateField();
  addNewCell();
}

function moveAxis(step, isVertical) {
  const [start, end] = step > 0 ? [1, size] : [size, 1];
  const moveFn = isVertical ? field.moveAxisY : field.moveAxisX;
  const sumFn = isVertical ? field.sumCellAxisY : field.sumCellAxisX;

  const shifted1 = moveFn.call(field, start, end, step);
  const merged = sumFn.call(field, start, end, step);
  const shifted2 = moveFn.call(field, start, end, step);

  return Boolean(shifted1 || merged || shifted2);
}

const moveUp = () => moveAxis(1, true);
const moveDown = () => moveAxis(-1, true);
const moveLeft = () => moveAxis(1, false);
const moveRight = () => moveAxis(-1, false);

function firstGen() {
  const numberTiles = getRandomInt(2, 4);
  for (let k = 0; k < numberTiles; k++) {
    field.addCell();
  }
}

function gameOver() {
  const isFull = Object.keys(field.field).length >= size * size;
  if (isFull && !canMoveY(field.field) && !canMoveX(field.field)) {
    renderGameOver();
  }
}

function isWin() {
  const hasWon = Object.values(field.field).some(cell => cell.value === 2048);
  if (hasWon) {
    renderWin();
    win = true;
  }
}

function clearField() {
  clearValueCell();
  for (const key of Object.keys(field.field)) {
    delete field.field[key];
  }
  hideGameOver();
  hideWin();
}
