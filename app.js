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
var GAME_MAP = new Game_Map();

GAME_MAP.init();

//Test function.
function createRandomObstacles(count) {

	for (var i = 0; i < count; i++) {

		var obstacle = new Obstacle();

		//Test object.
		obstacle.setWidth(50).
			setHeight(50).
			setColor('violet').
			setX(Math.random() * GAME_MAP.size).
			setY(Math.random() * GAME_MAP.size).
			setHitboxBounds().
			setMapZone();

		var zone = obstacle.getMapZone();

		//If obstacle is in valid map zone
		if (obstacle.getMapZone()) {
			GAME_MAP.zones[zone[0]][zone[1]].obstacles.push(obstacle);
		}
	}
}

//Random Obtacles
createRandomObstacles(2000);

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

player.setColor('blue').
		setCollision(true).
		setHitboxBounds().
		setWeapon(debugWeapon1);

//If in valid map zone
if (player.getMapZone()) {

	var zone = player.getMapZone();

	GAME_MAP.zones[zone[0]][zone[1]].players.push(player);
}

function game_update() {
	if (keyboard.keys.r && player.weapon.magazine < player.weapon.magazineSize) {
		player.weapon.beginReloading();
	}

	//Update
	player.update();

	//Map Loop
	for (var row = 0; row < GAME_MAP.zones.length; row++) {
		for (var col = 0; col < GAME_MAP.zones[row].length; col++) {
			
			//Projectiles
			for (var i = 0; i < GAME_MAP.zones[row][col].projectiles.length; i++) {
				// GAME_MAP.zones[row][col].projectiles[i].draw();
			}

			//Player Obstacle Collisions
			for (var i = 0; i < GAME_MAP.zones[row][col].obstacles.length; i++) {
				if (toolbox.collision(player, GAME_MAP.zones[row][col].obstacles[i])) {
					player.move(GAME_MAP.zones[row][col].obstacles[i]);
				}
			}
		}
	}

	//Fire weapon
	player.weapon.frame(game);

	//Map Projectiles Loop
	for (var row = 0; row < GAME_MAP.zones.length; row++) {
		for (var col = 0; col < GAME_MAP.zones[row].length; col++) {
			for (var i = 0; i < GAME_MAP.zones[row][col].projectiles.length; i++) {

				var data = {
					entities: GAME_MAP.zones[row][col].obstacles,
				};

				//If the projectile self deletes, stay on current index
				if (!GAME_MAP.zones[row][col].projectiles[i].update(data)) {
					GAME_MAP.zones[row][col].projectiles.splice(i, 1);
					i--;
				}
			}
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

	//Save current canvas state
	ctx.save();
	
	//Move to player
	ctx.translate(-player.FOV.x(), -player.FOV.y());

	//Render
	player.draw();

	//Map Loop
	for (var row = 0; row < GAME_MAP.zones.length; row++) {
		for (var col = 0; col < GAME_MAP.zones[row].length; col++) {
			
			//Projectiles
			for (var i = 0; i < GAME_MAP.zones[row][col].projectiles.length; i++) {
				GAME_MAP.zones[row][col].projectiles[i].draw();
			}

			//Obstacles
			for (var i = 0; i < GAME_MAP.zones[row][col].obstacles.length; i++) {
				GAME_MAP.zones[row][col].obstacles[i].draw();
			}
		}
	}

	toolbox.drawDebug();

	ctx.lineWidth = 2;
	ctx.strokeRect(0, 0, GAME_MAP.size, GAME_MAP.size);

	GAME_MAP.debugZones();

	//Restore
	ctx.restore();
}

function game_loop() {
	game_update();
	game_render();
}

//Run game
setInterval(game_loop, (1000 / game.FPS));