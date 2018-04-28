//Keyboard Events ===============
document.onkeypress = Keyboard.keyClick;
document.onkeydown = Keyboard.keyClick;
document.onkeyup = Keyboard.keyRelease; 

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

var keyboard = new Keyboard();

function Keyboard() {

  this.keys = {};

  //Still need to handle issues with capitalization
  this.keyRelease = function(e) {

    var x = e.key;
    var xLower = x.toLowerCase();
    var xUpper = x.toUpperCase();

    //console.log("Release: " + x + " | " + x.toUpperCase());

    delete this.keys[x];
    delete this.keys[xLower];
    delete this.keys[xUpper];
  }

  this.keyClick = function(e) {

    this.keys[e.key] = true;

    //e.preventDefault();
    //console.log("Pressed: " + e.key);
    
  }
}
