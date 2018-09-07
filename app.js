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
var obstacle = new Obstacle();

player.addWeapon(laser);
player.addWeapon(double);
player.addWeapon(triple);
player.addWeapon(quint);
player.addWeapon(shotgun);
player.addWeapon(nuke);
// player.addWeapon(debugWeapon);

player.setWeapon(laser).
		setColor('blue').
		setCollision(false);

//Test object.
obstacle.setWidth(100).
	setHeight(100).
	setX(window.innerWidth / 2 - 50).
	setY(window.innerHeight / 2 - 50).
	setColor('grey');

var projectileList = [];
var obstacleList = [obstacle];

function game_update() {
	if (keyboard.keys.r && player.weapon.magazine < player.weapon.magazineSize) {
		player.weapon.beginReloading();
	}

	//Update
	player.move(keyboard);
	player.weapon.frame(game);

	for (var i = 0; i < projectileList.length; i++) {

		var data = {
			entities: obstacleList,
			toolbox: toolbox,
		};

		//If the projectile self deletes, stay on current index
		if (!projectileList[i].update(data)) {
			projectileList.splice(i, 1);
			i--;
		}
	}

	if (keyboard.keys.x) {
		player.switchWeapon();
		keyboard.keys.x = false;
	}
}

function game_render() {

	//Clear screen
	ctx.clearRect(0,0,canvas.width,canvas.height);

	//Move to player
	ctx.save();

	ctx.translate(player.FOV.x(), player.FOV.y());

	//Render
	player.draw();
	obstacle.draw();

	for (var i = 0; i < projectileList.length; i++) {
		projectileList[i].draw();
	}

	toolbox.drawDebug();

	//Restore
	ctx.restore();
}

function game_loop() {
	game_update();
	game_render();
}

//Run game
setInterval(game_loop, (1000 / game.FPS));