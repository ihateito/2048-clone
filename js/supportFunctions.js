"use strict"

var documentWidth = window.screen.width;
var documentHeight = window.screen.height;
var gridContainerWidth = 500;
var cellSpace = 20;
var cellSideLength = 100;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateValue() {
  var percent = getRandomInt(0, 100);
  if (percent >= 0 && percent <= 91)
    return 2;
  else
    if (percent > 91 && percent <= 100)
      return 4;
}

function getPosTop(i, j){
	return cellSpace + i * (cellSpace + cellSideLength);
}

function getPosLeft(i, j){
	return cellSpace + j * (cellSpace + cellSideLength);
}

function getNumberCellFontSize(number){
	if(number <= 64)
		return 0.6 * cellSideLength + "px";
	else if(number <= 512)
		return 0.5 * cellSideLength + "px";
	else if(number <=8192)
		return 0.4 * cellSideLength + "px";
	else
		return 0.3 *cellSideLength + "px";
	return "white";
}

function getNumberCellBgColor(number){
	switch(number){
		case 2:return "#eee4da"; break;
		case 4:return "#ede0c8"; break;
		case 8:return "#f2b179"; break;
		case 16:return "#f59563"; break;
		case 32:return "#f67c5f"; break;
		case 64:return "#ec6544"; break;
		case 128:return "#e44d29"; break;
		case 256:return "#edcf72"; break;
		case 512:return "#c8a145"; break;
		case 1024:return "#a8832b"; break;
		case 2048:return "#86aa9c"; break;
		case 4096:return "#a6c"; break;
		case 8192:return "#791e6f"; break;
	}
	return "black";
}

function getNumberCellFontColor(number){
	if(number <= 4){
		return "#776e65";
	}
	return "white";
}


function canMoveX(field) {
  for (var i = 1; i <= size; i++)
    for (var j = 1; j < size; j++) {
      var cell = "" + i + j;
      var nextCell = "" + i + (j + 1);
      if (field[cell].value == field[nextCell].value)
        return true;
    }
  return false;
}

function canMoveY(field) {
  for (var j = 1; j <= size; j++) 
    for (var i = 1; i < size; i++) {
      var cell = "" + i + j;
      var nextCell = "" + (i + 1) + j;
      if (field[cell].value == field[nextCell].value)
        return true;
    }
  return false;
}
