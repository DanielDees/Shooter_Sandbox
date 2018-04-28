//Mouse Events ==================
document.onmousemove = mousePos;
document.onmousedown = function() { mouse.clicked = true; };
document.onmouseup = function() { mouse.clicked = false; };


//MOUSE 
var mouse = {
  x: 0,
  y: 0,

  clicked: false
};

function mousePos (e) {
    mouse.x = e.pageX - canvas.offsetLeft;
    mouse.y = e.pageY - canvas.offsetTop;
}

function Keyboard() {
	this.keys = {};
	var self = this;

	//Keyboard Events ===============
	document.onkeypress = function(e){
		self.keyClick(e);
	};
	document.onkeydown = function(e){
		self.keyClick(e);
	};
	document.onkeyup = function(e){
		self.keyRelease(e);
	};
}

Keyboard.prototype.keyRelease = function(e) {
	var x = e.key;
	var xLower = x.toLowerCase();
	var xUpper = x.toUpperCase();

	this.keys[xLower] = false;
	this.keys[xUpper] = false;
};

Keyboard.prototype.keyClick = function(e) {
	this.keys[e.key] = true;
};