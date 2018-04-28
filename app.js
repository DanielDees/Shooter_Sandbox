;"use strict";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var FPS = 60;


function gameLoop() {

	ctx.fillStyle = "blue";
	ctx.fillRect(20, 20, 50, 50);

}

//Run game
var app = setInterval(gameLoop, (1000 / FPS));