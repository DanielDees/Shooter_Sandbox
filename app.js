;"use strict";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var game = {};
game.FPS = 60;

var projectileList = [];
var obstacleList = [];

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

//Test function.
function createRandomObstacles(count) {

	var min = -2000;
	var max = 2000;

	for (var i = 0; i < count; i++) {
		
		var obstacle = new Obstacle();

		//Test object.
		obstacle.setWidth(70).
			setHeight(70).
			setX(Math.random() * (max - min) + min).
			setY(Math.random() * (max - min) + min).
			setColor('violet').
			setHitboxBounds();

		obstacleList.push(obstacle);
	}
}

//Random Obtacles
createRandomObstacles(200);

player.addWeapon(laser);
player.addWeapon(double);
player.addWeapon(triple);
player.addWeapon(quint);
player.addWeapon(shotgun);
player.addWeapon(nuke);

//Debug
//Collision
player.addWeapon(debugWeapon1);
//Spin
player.addWeapon(debugWeapon2);

player.setWeapon(laser).
		setColor('blue').
		setCollision(true).
		setHitboxBounds();

function game_update() {
	if (keyboard.keys.r && player.weapon.magazine < player.weapon.magazineSize) {
		player.weapon.beginReloading();
	}

	//Update
	player.move();

	//Can probably be pulled out of the projectile class to save memory.
	for (var i = 0; i < obstacleList.length; i++) {
		if (toolbox.collision(player, obstacleList[i])) {
			player.move(obstacleList[i]);
		}
	}

	player.weapon.frame(game);

	for (var i = 0; i < projectileList.length; i++) {

		var data = {
			entities: obstacleList,
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

	ctx.translate(-player.FOV.x(), -player.FOV.y());

	//Render
	player.draw();

	for (var i = 0; i < projectileList.length; i++) {
		projectileList[i].draw();
	}

	for (var i = 0; i < obstacleList.length; i++) {
		obstacleList[i].draw();
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