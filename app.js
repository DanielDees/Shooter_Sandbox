;"use strict";

var canvas = document.getElementById("myCanvas");

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

window.onload = resizeCanvas;
window.onresize = resizeCanvas;

var ctx = canvas.getContext("2d");
var FPS = 60;

function Box() {

	this.x = 0;
	this.y = 0;
	this.w = 20;
	this.h = 20;

	this.spd = 12;

	this.move = function() {
		if (keys.w) {
			this.y = Math.max(this.y - this.spd, 0);
		}
		if (keys.s) {
			this.y = Math.min(this.y + this.spd, window.innerHeight - this.h);
		}
		if (keys.a) {
			this.x = Math.max(this.x - this.spd, 0);
		}
		if (keys.d) {
			this.x = Math.min(this.x + this.spd, window.innerWidth - this.w);
		}
	}

	this.draw = function() {
		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
}

var box = new Box();

function gameLoop() {

	//Clear screen
	ctx.clearRect(0,0,canvas.width,canvas.height);

	box.move();
	box.draw();

	ctx.font = "30px Courier New";
	ctx.fillText("Mouse X: " + mouse.x, 40, 40);
	ctx.fillText("Mouse Y: " + mouse.y, 40, 70);
	ctx.fillText("Clicked: " + mouse.clicked, 40, 100);

}

//Run game
var app = setInterval(gameLoop, (1000 / FPS));