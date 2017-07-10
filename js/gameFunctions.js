"use strict";

function newGame() {
  game = true;
  field.score = 0;
  updateScore(field.score);
  clearField();
  firstGen();
	for (var key in field.field)
		renderCell(field.field[key]);
	setTimeout(function() { for (var key in field.field) showAnimation(field.field[key]); }, 50);
}
//Object.keys(menu).length
function updateField() {
		setTimeout(function() { updateCells(field.field); }, 100);
		setTimeout(function() { updateCellsValue(field.field); updateScore(field.score);}, 200);
}

function removeCells() {
		setTimeout(function() { for (var key in field.trash) field.trash[key].remove(); delete field.trash[key]; }, 200);
}

function addNewCell() {
	var tempCell;
	setTimeout(function() { tempCell = renderCell(field.addCell()); }, 220);
	setTimeout(function() { showAnimation(tempCell); }, 270);
}

function updateRenderField() {
  removeCells();
  updateField();
  addNewCell();
}

function moveUp() {
	var shift = false;
	shift += field.moveAxisY(1, size, 1);
	shift += field.sumCellAxisY(1, size, 1);
	shift += field.moveAxisY(1, size, 1);
	return shift;
}

function moveDown() {
	var shift = false;
	shift += field.moveAxisY(size, 1, -1);
	shift += field.sumCellAxisY(size, 1, -1);
	shift += field.moveAxisY(size, 1, -1);
	return shift;
}

function moveLeft() {
	var shift = false;
	shift += field.moveAxisX(1, size, 1);
	shift += field.sumCellAxisX(1, size, 1);
	shift += field.moveAxisX(1, size, 1);
	return shift;
}

function moveRight() {
	var shift = false;
	shift += field.moveAxisX(size, 1, -1);
	shift += field.sumCellAxisX(size, 1, -1);
	shift += field.moveAxisX(size, 1, -1);
	return shift;
}

function firstGen() {
  var numberTiles = getRandomInt(2, 4);
  for (var k = 1; k <= numberTiles; k++)
    field.addCell();
};

function gameOver() {
  if (Object.keys(field.field).length == size * size && !canMoveY(field.field) && !canMoveX(field.field)) {
    renderGameOver();
  }
}

function isWin() {
  for (var key in field.field)
    if (field.field[key].value == 2048) {
      renderWin();
      win = true;
    }
}

function clearField() {
  clearValueCell();
  for (var key in field.field) {
    delete field.field[key];
  }
  hideGameOver();
  hideWin();
};
