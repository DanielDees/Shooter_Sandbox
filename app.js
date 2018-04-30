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

//Initialize shotgun settings
laser.setName("laser").
		setRounds(1).
		setSpread(0).
		setMagazineSize(2000).
		setReloadTime(2).
		setRoundsPerSecond(60).
		setRange(4000).
		setAutoReload(true).
		setRoundSpeed(16).
		setRoundMoveType("bouncy");

//Initialize shotgun settings
shotgun.setName("shotgun").
		setRounds(12).
		setSpread(35).
		setMagazineSize(50).
		setReloadTime(1).
		setRoundsPerSecond(50).
		setRange(600).
		setAutoReload(true).
		setRoundSpeed(14).
		setRoundMoveType("bouncy");

//Initialize nuke settings
nuke.setName("nuke").
		setRounds(1000).
		setSpread(360).
		setMagazineSize(1).
		setReloadTime(3).
		setRoundsPerSecond(1).
		setRange(2000).
		setAutoReload(true).
		setRoundSpeed(8).
		setRoundMoveType("normal");

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

	if (keyboard.keys.x) {
		for (var i = 0; i < weaponsList.length; i++) {
			//Switch to next weapon in list if there is one
			if (weaponsList[i].name == player.getWeapon().name && i < weaponsList.length - 1) {
				player.setWeapon(weaponsList[i + 1]);
				keyboard.keys.x = false;
				break;
			}
			//If using last weapon, switch to first one.
			else if (weaponsList[i].name == player.getWeapon().name && i == weaponsList.length - 1) {
				player.setWeapon(weaponsList[0]);
				keyboard.keys.x = false;
				break;
			}
		}
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