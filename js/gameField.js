"use strict";

function gameField(size) {
  this.field = {}
  this.trash = {}
  this.score = 0;
}

gameField.prototype.addCell = function() {
  if (Object.keys(this.field).length >= size * size)
    return;
  var i = getRandomInt(1, size);
  var j = getRandomInt(1, size);
  while (this.field["" + i + j]) {
      i = getRandomInt(1, size);
      j = getRandomInt(1, size);
  }
  this.field["" + i + j] = new cell(i, j, generateValue());
  return this.field["" + i + j];
};
//Logic, don't touch

gameField.prototype.moveAxisX = function(fromJ, toJ, step) {
  var shift = false;
  for (var i = 1; i <= size; i++) {
    var idFirstEmptyCell = undefined;
    for (var j = fromJ; j != toJ + step; j += step) {
      var cell = "" + i + j;
      if (cell in this.field) {
        if (idFirstEmptyCell){
          var emptyCell = "" + i + idFirstEmptyCell;
          this.field[emptyCell] = this.field[cell];
          this.field[emptyCell].j = idFirstEmptyCell;
          delete this.field[cell];
          idFirstEmptyCell += step;
          if (!shift)
            shift = true;
        }
      }
      else
        if (!idFirstEmptyCell)
          idFirstEmptyCell = j;
    }
  }
  return shift;
};

gameField.prototype.moveAxisY = function(fromI, toI, step) {
  var shift = false;
  for (var j = 1; j <= size; j++) {
    var idFirstEmptyCell = undefined;
    for (var i = fromI; i != toI + step; i += step) {
      var cell = "" + i + j;
      if (cell in this.field) {
        if (idFirstEmptyCell){
          var emptyCell = "" + idFirstEmptyCell + j;
          this.field[emptyCell] = this.field[cell];
          this.field[emptyCell].i = idFirstEmptyCell;
          delete this.field[cell];
          idFirstEmptyCell += step;
          if (!shift)
            shift = true;
        }
      }
      else
        if (!idFirstEmptyCell)
          idFirstEmptyCell = i;
    }
  }
  return shift;
};



gameField.prototype.sumCellAxisX = function(fromJ, toJ, step) {
  var shift = false;
  for (var i = 1; i <= size; i++)
    for (var j = fromJ; j != toJ + step; j += step){
      var cell = "" + i + j;
      var prevCell = "" + i + (j + step);
      if (cell in this.field && prevCell in this.field)
        if (this.field[cell].value == this.field[prevCell].value) {
          this.field[prevCell].value *= 2;
          this.score += this.field[prevCell].value;
          this.trash[Object.keys(this.trash).length] = this.field[cell].div;
          delete this.field[cell];
          j += step;
          if (!shift)
            shift = true;
        }
    }
  return shift;
};



gameField.prototype.sumCellAxisY = function(fromI, toI, step) {
  var shift = false;
  for (var j = 1; j <= size; j++)
    for (var i = fromI; i != toI + step; i += step){
      var cell = "" + i + j;
      var prevCell = "" + (i + step) + j;
      if (cell in this.field && prevCell in this.field)
        if (this.field[cell].value == this.field[prevCell].value) {
          this.field[prevCell].value *= 2;
          this.score += this.field[prevCell].value;
          this.trash[Object.keys(this.trash).length] = this.field[cell].div;
          delete this.field[cell];
          i += step;
          if (!shift)
            shift = true;
        }
    }
  return shift;
};
