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
var laser = new Weapon();

var weaponsList = [shotgun, nuke, laser];

//Initialize laser settings
laser.setName("Laser").
		setRounds(1).
		setSpread(0).
		setMagazineSize(500).
		setReloadTime(2).
		setRoundsPerSecond(60).
		setRange(3000).
		setAutoReload(true).
		setRoundSpeed(16).
		setRoundWidth(20).
		setRoundHeight(3).
		setRoundColor('red').
		setRoundMoveType("bouncy");

//Initialize shotgun settings
shotgun.setName("Shotgun").
		setRounds(12).
		setSpread(35).
		setMagazineSize(50).
		setReloadTime(1).
		setRoundsPerSecond(50).
		setRange(600).
		setAutoReload(true).
		setRoundSpeed(14).
		setRoundWidth(15).
		setRoundHeight(5).
		setRoundColor('yellow').
		setRoundMoveType("bouncy");

//Initialize nuke settings
nuke.setName("Nuke").
		setRounds(1000).
		setSpread(360).
		setMagazineSize(1).
		setReloadTime(3).
		setRoundsPerSecond(1).
		setRange(2000).
		setAutoReload(true).
		setRoundSpeed(8).
		setRoundWidth(15).
		setRoundHeight(15).
		setRoundColor('orange').
		setRoundMoveType("normal");

player.setWeapon(laser);

var projectileList = [];

function gameLoop() {
	//Clear screen
	ctx.clearRect(0,0,canvas.width,canvas.height);

	if (keyboard.keys.r && player.weapon.magazine < player.weapon.magazineSize) {
		player.weapon.beginReloading();
	}

	player.move(keyboard);
	player.draw(ctx);

	if (keyboard.keys.x) {
		for (var i = 0; i < weaponsList.length; i++) {
			if (weaponsList[i].name == player.getWeapon().name) {
				//If using last weapon, switch to first one.
				if (i == weaponsList.length - 1) {
					player.setWeapon(weaponsList[0]);
					break;
				}
				//Switch to next weapon in list if there is one
				if (i < weaponsList.length - 1) {
					player.setWeapon(weaponsList[i + 1]);
					break;
				}
			}
		}

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