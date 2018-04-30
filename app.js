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

var shotgun = new Weapon();
var nuke = new Weapon();

//Initialize shotgun settings
shotgun.setRounds(12).
		setSpread(35).
		setMagazineSize(50).
		setReloadTime(1).
		setRoundsPerSecond(50).
		setRange(600).
		setAutoReload(true).
		setProjectileSpeed(14).
		setProjectileMoveType("bouncy");

//Initialize nuke settings
nuke.setRounds(1000).
		setSpread(360).
		setMagazineSize(1).
		setReloadTime(3).
		setRoundsPerSecond(1).
		setRange(2000).
		setAutoReload(true).
		setProjectileSpeed(8).
		setProjectileMoveType("normal");

player.setWeapon(shotgun);

var projectileList = [];

function gameLoop() {
	//Clear screen
	ctx.clearRect(0,0,canvas.width,canvas.height);

	if (keyboard.keys.r && player.weapon.magazine < player.weapon.magazineSize) {
		player.weapon.beginReloading();
	}

	player.move(keyboard);
	player.draw(ctx);

	if (keyboard.keys.x && player.weapon == shotgun) {
		player.setWeapon(nuke);
		keyboard.keys.x = false;
	}
	else if (keyboard.keys.x && player.weapon == nuke) {
		player.setWeapon(shotgun);
		keyboard.keys.x = false;
	}

	player.weapon.frame(game);

	for (var i = 0; i < projectileList.length; i++) {

		var data = {
			index: i,
			context: ctx
		}

		//If the projectile self deletes, stay on current index
		if (!projectileList[i].update(data)) {
			i--;
		}
	}

	toolbox.drawDebug();
}

//Run game
setInterval(gameLoop, (1000 / game.FPS));