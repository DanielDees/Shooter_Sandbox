;"use strict";

var canvas = document.getElementById("myCanvas");
var keyboard = new Keyboard();

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

window.onload = resizeCanvas;
window.onresize = resizeCanvas;

var ctx = canvas.getContext("2d");
var FPS = 60;

var player = new Player();

function gameLoop() {
	//Clear screen
	ctx.clearRect(0,0,canvas.width,canvas.height);

	player.move(keyboard);
	player.draw(ctx);

	ctx.font = "30px Courier New";
	ctx.fillText("Mouse X: " + mouse.x, 40, 40);
	ctx.fillText("Mouse Y: " + mouse.y, 40, 70);
	ctx.fillText("Clicked: " + mouse.clicked, 40, 100);
}

//Run game
var app = setInterval(gameLoop, (1000 / FPS));