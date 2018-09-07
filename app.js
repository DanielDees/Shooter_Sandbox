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

var shotgun = new Weapon();
var nuke = new Weapon();
var laser = new Weapon();
var debugWeapon = new Weapon;

player.addWeapon(shotgun);
player.addWeapon(nuke);
player.addWeapon(laser);
player.addWeapon(debugWeapon);

//Initialize laser settings
debugWeapon.setName("Debug Weapon").
		setRounds(1).
		setSpread(0).
		setMagazineSize(1).
		setReloadTime(0).
		setRoundsPerSecond(1).
		setRange(1000).
		setDamage(5).
		setAutoReload(true).
		setRoundSpeed(0).
		setRoundWidth(150).
		setRoundHeight(50).
		setRoundColor('red').
		setRoundMoveType("spin").
		setDebug(true);

//Initialize laser settings
laser.setName("Laser").
		setRounds(1).
		setSpread(0).
		setMagazineSize(1000).
		setReloadTime(0).
		setRoundsPerSecond(60).
		setRange(2000).
		setDamage(5).
		setAutoReload(true).
		setRoundSpeed(20).
		setRoundWidth(25).
		setRoundHeight(3).
		setRoundColor('red').
		setRoundMoveType("bouncy").
		setDebug(true);

//Initialize shotgun settings
shotgun.setName("Shotgun").
		setRounds(12).
		setSpread(35).
		setMagazineSize(50).
		setReloadTime(0).
		setRoundsPerSecond(50).
		setRange(600).
		setDamage(75).
		setAutoReload(true).
		setRoundSpeed(10).
		setRoundWidth(15).
		setRoundHeight(5).
		setRoundColor('yellow').
		setRoundMoveType("bouncy");

//Initialize nuke settings
nuke.setName("Nuke").
		setRounds(1000).
		setSpread(360).
		setMagazineSize(1).
		setReloadTime(1).
		setRoundsPerSecond(1).
		setRange(2000).
		setDamage(1000).
		setAutoReload(true).
		setRoundSpeed(8).
		setRoundWidth(15).
		setRoundHeight(15).
		setRoundColor('orange').
		setRoundMoveType("normal");

player.setWeapon(debugWeapon).
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

}

function game_render() {

}

function game_loop() {
	//Clear screen
	ctx.clearRect(0,0,canvas.width,canvas.height);

	if (keyboard.keys.r && player.weapon.magazine < player.weapon.magazineSize) {
		player.weapon.beginReloading();
	}

	//Update
	player.move(keyboard);
	player.weapon.frame(game);

	//Render
	player.draw(ctx);

	obstacle.draw();

	if (keyboard.keys.x) {
		player.switchWeapon();
		keyboard.keys.x = false;
	}


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

	toolbox.drawDebug();
}

//Run game
setInterval(game_loop, (1000 / game.FPS));