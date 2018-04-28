;"use strict";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var FPS = 60;

function Box() {

	this.x = 0;
	this.y = 0;
	this.w = 20;
	this.h = 20;

	this.spd = 4;

	this.move = function() {
		if (keys.w) {
			this.y -= this.spd;
		}
		if (keys.s) {
			this.y += this.spd;
		}
		if (keys.a) {
			this.x -= this.spd;
		}
		if (keys.d) {
			this.x += this.spd;
		}
		console.log("Here!");
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

}

//Run game
var app = setInterval(gameLoop, (1000 / FPS));