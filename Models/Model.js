/*
 * The model class is the base class for all models which
 * can be drawn to the canvas.
 */
 
function Model()
{
	this.debug = false;

	this.x = 0;
	this.y = 0;

	this.width = 0;
	this.height = 0;

	this.speed = 0;
	this.angle = 0;

	this.collidable = true;

	this.distanceTraveled = 0;

	this.color = 'black';
}

/*
 * Called every frame of the game.
 */
Model.prototype.frame = function() {
	//implement me
};

Model.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);

	if (this.debug) {
		this.drawDebug();
	}
};

Model.prototype.drawDebug = function() {

	var x = 30;
	var y = parseInt(ctx.font);

	ctx.fillStyle = "blue";
	ctx.font = "24px Courier New";

	var left = this.getLeft() - this.x;
	var right = this.getRight() - this.x;
	var bottom = this.getBottom() - this.y;
	var top = this.getTop() - this.y;
	var rotated_width = this.testWidth();
	var rotated_height = this.testHeight();

	var debugInfo = [
		// ["Angle (Degrees)", (this.angle * (180 / Math.PI)).toFixed(0)],
		// ["Left", (left).toFixed(0)],
		// ["Right", (right).toFixed(0)],
		// ["Bottom", (bottom).toFixed(0)],
		// ["Top", (top).toFixed(0)],
		// ["Rotated Width", (rotated_width).toFixed(0)],
		// ["Rotated Height", (rotated_height).toFixed(0)],
	];
	
	for (var i = 0; i < debugInfo.length; i++) {
		ctx.fillText(debugInfo[i][0] + ": " + debugInfo[i][1], x, 400 + y * i);
	}	
	
	ctx.lineWidth = 3;

	//Left/Right text position
	var mid_height = this.getTop() + ((this.getBottom() - this.getTop())  / 2);
	//Top/Bottom text position
	var mid_width = this.getLeft() + ((this.getRight() - this.getLeft())  / 4);

	//Left
	ctx.strokeStyle = 'green';
	ctx.beginPath();
	ctx.moveTo(this.getLeft(), this.getTop());
	ctx.lineTo(this.getLeft(), this.getBottom());
	ctx.stroke();
	// ctx.fillText('Left', this.getLeft() - 60, mid_height);
	
	//Bottom
	ctx.strokeStyle = 'brown';
	ctx.beginPath();
	ctx.moveTo(this.getLeft(), this.getBottom());
	ctx.lineTo(this.getRight(), this.getBottom());
	ctx.stroke();
	// ctx.fillText('Bottom', mid_width, this.getBottom() + 25);
	
	//Right
	ctx.strokeStyle = 'red';
	ctx.beginPath();
	ctx.moveTo(this.getRight(), this.getBottom());
	ctx.lineTo(this.getRight(), this.getTop());
	ctx.stroke();
	// ctx.fillText('Right', this.getRight() + 5, mid_height);

	//Top
	ctx.strokeStyle = 'teal';
	ctx.beginPath();
	ctx.moveTo(this.getRight(), this.getTop());
	ctx.lineTo(this.getLeft(), this.getTop());
	ctx.stroke();
	// ctx.fillText('Top', mid_width, this.getTop() - 10);

	ctx.strokeStyle = 'black';
	//Actual projectile size
	//ctx.strokeRect(this.x, this.y, this.width, this.height);

	//Actual hitbox size
	//ctx.strokeRect(this.x, this.y + this.height + 10, this.testWidth(), this.testHeight());
}

Model.prototype.move = function() {

	this.x += this.speed.x;
	this.y += this.speed.y;

	//Distance formula = sqrt(x^2 + y^2)
	var x = Math.pow(this.speed.x, 2);
	var y = Math.pow(this.speed.y, 2);
	var distance = Math.sqrt(x + y);

	this.distanceTraveled += distance;
}

Model.prototype.getX = function() {
	return this.x;
};

Model.prototype.getY = function() {
	return this.y;
};

Model.prototype.getWidth = function() {
	return this.width;
};

Model.prototype.getHeight = function() {
	return this.height;
};

Model.prototype.getCollision = function() {
	return this.collidable;
}

Model.prototype.getAngle = function() {
	return this.angle;
}

Model.prototype.getTop = function() {

	var top = this.width * Math.sin(this.angle);
	var bottom = this.height * Math.cos(this.angle);

	var min = Math.min(0, top, bottom);
	var max = Math.max(0, top, bottom);

	//The actual height
	var height = Math.abs(top) + Math.abs(bottom);

	//The calculated height
	var total = Math.abs(min) + Math.abs(max);

	if (total != height && min != 0) {
		return this.y - height;
	}

	//Top-most point
	return this.y + min;
};

Model.prototype.getBottom = function() {

	var top = this.width * Math.sin(this.angle);
	var bottom = this.height * Math.cos(this.angle);

	var min = Math.min(0, top, bottom);
	var max = Math.max(0, top, bottom);

	//The actual height
	var height = Math.abs(top) + Math.abs(bottom);

	//The calculated height
	var total = Math.abs(min) + Math.abs(max);

	if (total != height && max != 0) {
		return this.y + height;
	}

	//Bottom-most point
	return this.y + max;
};

Model.prototype.getLeft = function() {

	var left = -this.height * Math.sin(this.angle);
	var right = this.width * Math.cos(this.angle);

	var min = Math.min(0, left, right);
	var max = Math.max(0, left, right);

	//The actual width
	var width = Math.abs(left) + Math.abs(right);

	//The calculated width
	var total = Math.abs(min) + Math.abs(max);

	if (total != width && min != 0) {
		return this.x - width;
	}

	//Left-most point
	return this.x + min;
};

Model.prototype.getRight = function() {

	var left = -this.height * Math.sin(this.angle);
	var right = this.width * Math.cos(this.angle);

	var min = Math.min(0, left, right);
	var max = Math.max(0, left, right);

	//The actual width
	var width = Math.abs(left) + Math.abs(right);

	//The calculated width
	var total = Math.abs(min) + Math.abs(max);

	if (total != width && max != 0) {
		return this.x + width;
	}

	//Right-most point
	return this.x + max;
}

Model.prototype.testWidth = function() {

	var left = -this.height * Math.sin(this.angle);
	var right = +this.width * Math.cos(this.angle);

	//Right-most point
	return (Math.abs(left) + Math.abs(right));
}

Model.prototype.testHeight = function() {

	var top = this.width * Math.sin(this.angle);
	var bottom = this.height * Math.cos(this.angle);

	//Bottom-most point
	return (Math.abs(top) + Math.abs(bottom));
}

Model.prototype.getColor = function() {
	return this.color;
}

Model.prototype.getDebug = function() {
	return this.debug;
}

Model.prototype.setX = function(x) {
	this.x = x;
	return this;
};

Model.prototype.setY = function(y) {
	this.y = y;
	return this;
};

Model.prototype.setTop = function(y) {
	this.y = y;
	return this;
};

Model.prototype.setBottom = function(y) {
	this.y = y - this.height;
	return this;
};

Model.prototype.setLeft = function(x) {
	this.x = x;
	return this;
};

Model.prototype.setRight = function(x) {
	this.x = x - this.width;
	return this;
};

Model.prototype.setWidth = function(width) {
	this.width = width;
	return this;
};

Model.prototype.setHeight = function(height) {
	this.height = height;
	return this;
};

Model.prototype.setCollision = function(collidable) {
	this.collidable = collidable;
	return this;
}

Model.prototype.setAngle = function(angle) {
	this.angle = angle;
	return this;
}

Model.prototype.setColor = function(color) {
	this.color = color;
	return this;
};

Model.prototype.setDebug = function(debug) {
	this.debug = debug;
}