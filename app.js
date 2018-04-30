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

//Initialize shotgun settings
shotgun.setRounds(10).
		setSpread(90).
		setMagazineSize(50).
		setReloadTime(1).
		setRoundsPerSecond(5).
		setRange(500).
		setAutoReload(true);

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

	player.weapon.frame(game);

	//Handle firing
	if (mouse.clicked) {
		if (player.weapon.pullTrigger(game)) {
			player.weapon.shoot2(10, 20);
		}
	}
	else {
		player.weapon.releaseTrigger();
	}

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