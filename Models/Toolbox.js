/*
 * The Toolbox contains misc. functions that can be used for
 * calculations.
*/

function Toolbox() {}

Toolbox.prototype.getAngleBetween = function(entityFrom, entityTo, radians) {
	//Calculate center of player.
	var dx = entityFrom.x + (entityFrom.width / 2) - entityTo.x;
	var dy = entityFrom.y + (entityFrom.height / 2) - entityTo.y;

	//Find angle in Rad
	var angle = Math.atan2(dy, dx);

	//Convert from Rad to Degrees
	angle *= (180 / Math.PI);

	//Make angle positive on 360 degree values
	angle += 180;

	//Convert from degrees to Radians if necessary
	if (radians) { angle *= (Math.PI / 180); }

	//Return angle in Degrees
	return angle;
}

//Shows debug information on the game screen.
Toolbox.prototype.drawDebug = function() {

	var x = 30;
	ctx.fillStyle = "blue";
	ctx.font = "24px Courier New";
	ctx.fillText("Mouse X: " + mouse.x, x, 40);
	ctx.fillText("Mouse Y: " + mouse.y, x, 60);
	ctx.fillText("Clicked: " + mouse.clicked, x, 80);
	ctx.fillText("Degrees: " + toolbox.getAngleBetween(player, mouse).toFixed(0), x, 100);
	//ctx.fillText("Radians: " + toolbox.getAngleBetween(player, mouse, "radians").toFixed(1), x, 120);
	ctx.fillText("Reload: " + weapon.reloading, x, 140);
	ctx.fillText("Reload: " + (weapon.reloadFrame / game.FPS).toFixed(1) + "s / " + weapon.reloadTime + "s", x, 160);
	ctx.fillText("Clip: " + weapon.magazine, x, 180);
	ctx.fillText("Firing: " + weapon.firingFrame, x, 200);
	//ctx.fillText("???: " + mouse.clicked, x, 220);
	//ctx.fillText("???: " + mouse.clicked, x, 240);
	
}