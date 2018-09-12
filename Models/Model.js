;"use strict";

/*
 * The model class is the base class for all models which
 * can be drawn to the canvas.
 */
 
function Model()
{
	this.id = Math.random();

	this.debug = false;

	this.x = 0;
	this.y = 0;

	this.width = 0;
	this.height = 0;

	this.hitbox = {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	};

	this.speed = 0;
	this.angle = 0;

	this.collidable = true;

	//Which zone of the GAME_MAP projectile is in
	this.map_zone = [0,0];

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

	//Check if within player FOV
	if (this.getRight() < player.FOV.x() || 
		this.getLeft() > player.FOV.x() + canvas.width ||
		this.getBottom() < player.FOV.y() ||
		this.getTop() > player.FOV.y() + canvas.height) {
		return false;
	}

	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);

	if (this.debug) {
		this.drawDebug();
	}

	return true;
};

Model.prototype.drawDebug = function() {

	var x = 30;
	var y = parseInt(ctx.font);

	ctx.fillStyle = "blue";
	ctx.font = "24px Courier New";

	var debugInfo = [
		// ["Angle (Degrees)", (this.angle * (180 / Math.PI)).toFixed(0)],
	];
	
	for (var i = 0; i < debugInfo.length; i++) {
		ctx.fillText(debugInfo[i][0] + ": " + debugInfo[i][1], x, 400 + y * i);
	}	
	
	ctx.lineWidth = 3;

	//Left/Right text position
	var mid_height = this.getTop() + ((this.getBottom() - this.getTop())  / 2);
	//Top/Bottom text position
	var mid_width = this.getLeft() + ((this.getRight() - this.getLeft())  / 4);

	ctx.strokeStyle = 'black';
	//Actual projectile size
	// ctx.strokeRect(this.x, this.y, this.width, this.height);

	// Hitbox
	ctx.strokeRect(this.getLeft(), this.getTop(), this.getHitboxWidth(), this.getHitboxHeight());
	ctx.fillText('Left', this.getLeft() - 60, mid_height);
	ctx.fillText('Bottom', mid_width, this.getBottom() + 25);
	ctx.fillText('Right', this.getRight() + 5, mid_height);
	ctx.fillText('Top', mid_width, this.getTop() - 10);
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

Model.prototype.getHitboxWidth = function() {	
 	var left = -this.height * Math.sin(this.angle);	
	var right = +this.width * Math.cos(this.angle);	

	return (Math.abs(left) + Math.abs(right));	
}	
 Model.prototype.getHitboxHeight = function() {	
 	var top = this.width * Math.sin(this.angle);	
	var bottom = this.height * Math.cos(this.angle);	

	return (Math.abs(top) + Math.abs(bottom));	
}

Model.prototype.getHitboxBounds = function() {
	var hitbox = {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	};

	var y = this.getHitboxBound( this.width, this.height);
	var x = this.getHitboxBound(-this.height, this.width);

	hitbox.top = y.min;
	hitbox.bottom = y.max;
	hitbox.left = x.min;
	hitbox.right = x.max;

	return hitbox;
}

Model.prototype.debugHitBox = function(){
	//Hitbox for rectangles which rotate on top-right corner
	var hit_box = [
		//Top left
		{x:0, y:0},
		{x:0, y:0},
		{x:0, y:0},
		{x:0, y:0}
	];

	var angle_offset;
	var distance;

	//Top right
	angle_offset = 0;
	distance = this.width;
	hit_box[1].x = Math.cos(this.angle + angle_offset) * distance;
	hit_box[1].y = Math.sin(this.angle + angle_offset) * distance;

	//Bottom right
	distance = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
	angle_offset = Math.asin(this.height / distance);
	hit_box[2].x = Math.cos(this.angle + angle_offset) * distance;
	hit_box[2].y = Math.sin(this.angle + angle_offset) * distance;

	//Bottom left
	angle_offset = 0.5 * Math.PI;
	distance = this.height;
	hit_box[3].x = Math.cos(this.angle + angle_offset) * distance;
	hit_box[3].y = Math.sin(this.angle + angle_offset) * distance;

	//Draw a rect for each coordinate
	for(var i=0; i<4; i++)
	{
		var xy = hit_box[i];

		ctx.fillStyle = "purple";
		ctx.fillRect(this.x + xy.x, this.y + xy.y, 5, 5);
	}
};

Model.prototype.getCollision = function() {
	return this.collidable;
}

Model.prototype.getMapZone = function() {

	//If model is outside of the map
	if (this.map_zone[0] < 0 || this.map_zone[1] < 0) {
		return false;
	}

	return this.map_zone;
}

Model.prototype.getAngle = function() {
	return this.angle;
}

Model.prototype.getHitboxBound = function(size_a, size_b) {

	var side_a = size_a * Math.sin(this.angle);
	var side_b = size_b * Math.cos(this.angle);

	var min = Math.min(0, side_a, side_b);
	var max = Math.max(0, side_a, side_b);

	var min_max_result = {
		min: min,
		max: max
	};

	//The calculated measurement
	var calculated = Math.abs(min) + Math.abs(max);

	//Actual measurement
	var actual = Math.abs(side_a) + Math.abs(side_b);

	if (calculated != actual) {
		if(max != 0) {
			min_max_result.max = actual;
		}

		if(min != 0) {
			min_max_result.min = -actual;
		}
	}

	return min_max_result;
}

Model.prototype.setHitboxBounds = function() {
	this.hitbox = this.getHitboxBounds();
	return this;
}

Model.prototype.getTop = function() {
	return this.y + this.hitbox.top;
};

Model.prototype.getBottom = function() {
	return this.y + this.hitbox.bottom;
};

Model.prototype.getLeft = function() {
	return this.x + this.hitbox.left;
};

Model.prototype.getRight = function() {
	return this.x + this.hitbox.right;
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

Model.prototype.setMapZone = function() {

	//Test removing the toFixed(0). It may not be necessary anymore
	//Get GAME_MAP zone
	row = Math.floor((this.getTop() / GAME_MAP.zoneSize));
	col = Math.floor((this.getLeft() / GAME_MAP.zoneSize));

	this.map_zone = [row, col];
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