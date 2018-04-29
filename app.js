;"use strict";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var GAME_FPS = 60;

window.onload = resizeCanvas;
window.onresize = resizeCanvas;

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

//Game objects
var keyboard = new Keyboard();
var toolbox = new Toolbox();
var player = new Player();

var projectileList = [];

function gameLoop() {
	//Clear screen
	ctx.clearRect(0,0,canvas.width,canvas.height);

	player.move(keyboard);
	player.draw(ctx);
	player.shoot();

	for (var i = 0; i < projectileList.length; i++) {
		projectileList[i].move();
		projectileList[i].draw(ctx);
	}

	toolbox.drawDebug();
}

//Run game
setInterval(gameLoop, (1000 / GAME_FPS));