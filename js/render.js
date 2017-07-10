"use strict"
//91s 45 words 95s speak


function renderCell(cell) {
  if (!cell)
    return;
  cell.div = $('<div class = "value-cell"></div>');
  cell.div.text(cell.value);
  cell.div.css("background-color",getNumberCellBgColor(cell.value));
  cell.div.css("top", getPosTop(cell.i - 1, cell.j - 1) + 25);
  cell.div.css("left", getPosLeft(cell.i - 1, cell.j - 1) + 25);
  $(".field").append(cell.div);
  return cell;
}

function showAnimation(cell) {
  if (!cell)
    return;
  cell.div.css("top", getPosTop(cell.i - 1, cell.j - 1));
  cell.div.css("left", getPosLeft(cell.i - 1, cell.j - 1));
  cell.div.css("width", 100);
  cell.div.css("height", 100);
  cell.div.css("font-size", getNumberCellFontSize(cell.value));
  cell.div.css("line-height", 100+"px");
}


function updateCells(field) {
  for (var key in field) {
    if (!field[key].div) {
      field[key].div = $('<div class = "value-cell"></div>');
      $(".field").append(field[key].div);
    }

    field[key].div.css("top", getPosTop(field[key].i - 1, field[key].j - 1));
    field[key].div.css("left", getPosLeft(field[key].i - 1, field[key].j - 1));
  }
}

function updateCellsValue(field) {
  for (var key in field) {
    field[key].div.css("color", getNumberCellFontColor(field[key].value));
    field[key].div.css("background-color",getNumberCellBgColor(field[key].value));
    field[key].div.css("font-size", getNumberCellFontSize(field[key].value));
    field[key].div.text(field[key].value);
  }
}

function updateScore(score) {
  $(".score-container").text(score);
}

function renderGameOver() {
  $(".game-over").css("visibility", "visible");
}

function renderWin() {
  $(".win").css("visibility", "visible");
}

function hideGameOver() {
  $(".game-over").css("visibility", "hidden");
}

function hideWin() {
  $(".win").css("visibility", "hidden");
}

function clearValueCell() {
  $(".value-cell").remove();
}
