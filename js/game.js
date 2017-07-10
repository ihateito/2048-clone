"use strict";
var size = 4;
var field = new gameField(size);
var game;
var win = false;

$(document).ready(function(){
  newGame();
});

$(document).keydown(function (event) {
  switch (event.keyCode) {
		case 37:
		  	event.preventDefault();
	      if(moveLeft()) {
					updateRenderField()
					setTimeout("gameOver()", 300);
          if (!win)
            setTimeout("isWin()", 310);
				}
	      break;
	    case 38:
		  	event.preventDefault();
	      if(moveUp()){
					updateRenderField();
					setTimeout("gameOver()", 300);
          if (!win)
            setTimeout("isWin()", 310);
				}
	      break;
	    case 39:
		  	event.preventDefault();
	      if(moveRight()){
					updateRenderField();
					setTimeout("gameOver()", 300);
          if (!win)
            setTimeout("isWin()", 310);
				}
	      break;
			case 40:
		    event.preventDefault();
				if(moveDown()){
					updateRenderField();
					setTimeout("gameOver()", 300);
          if (!win)
            setTimeout("isWin()", 310);
				}
	      break;
	    default:
	      return;
  }
});
