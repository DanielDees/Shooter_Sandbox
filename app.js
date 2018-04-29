;"use strict";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var game = {};
game.FPS = 60;

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
var weapon = new Weapon();

var projectileList = [];

function gameLoop() {
	//Clear screen
	ctx.clearRect(0,0,canvas.width,canvas.height);

	if(keyboard.keys.r)
	{
		weapon.beginReloading();
	}

	player.move(keyboard);
	player.draw(ctx);

	weapon.frame(game);

	//Handle firing
	if(mouse.clicked) {
		if(weapon.pullTrigger(game)) {
			player.shoot2(10, 0);
		}
	}

	else {
		weapon.releaseTrigger();
	}

	for (var i = 0; i < projectileList.length; i++) {
		projectileList[i].bouncy();
		projectileList[i].draw(ctx);
	}

	toolbox.drawDebug();
}

//Run game
setInterval(gameLoop, (1000 / game.FPS));