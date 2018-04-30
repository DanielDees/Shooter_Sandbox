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
	var y = parseInt(ctx.font);

	ctx.fillStyle = "blue";
	ctx.font = "24px Courier New";

	var debugInfo = [
		//["Mouse X", mouse.x],
		//["Mouse Y", mouse.y],
		//["Clicked", mouse.clicked],
		//["Degrees", toolbox.getAngleBetween(player, mouse).toFixed(0)],
		//["Radians", toolbox.getAngleBetween(player, mouse, "radians").toFixed(1)],
		//["Reload", player.weapon.reloading],
		["Reload", (player.weapon.reloadFrame / game.FPS).toFixed(1) + "s / " + player.weapon.reloadTime + "s"],
		["Clip", player.weapon.magazine + " / " + player.weapon.magazineSize],
		["Firing", player.weapon.firingFrame]
	];
	
	for (var i = 0; i < debugInfo.length; i++) {
		ctx.fillText(debugInfo[i][0] + ": " + debugInfo[i][1], x, 40 + y * i);
	}	
}