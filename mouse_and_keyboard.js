//Keyboard Events ===============
document.onkeypress = keyClick;
document.onkeydown = keyClick;
document.onkeyup = getKeyUp; 

//Mouse Events ==================
document.onmousemove = mousePos;
document.onmousedown = function() { mouse.clicked = true; };
document.onmouseup = function() { mouse.clicked = false; };


//MOUSE 
var mouse = {

  x: 0,
  y: 0,

  clicked: false,
}

function mousePos (e) {
    mouse.x = e.pageX - canvas.offsetLeft;
    mouse.y = e.pageY - canvas.offsetTop;
}

//Keys Pressed ================
var keys = {};

//Still need to handle issues with capitalization
function getKeyUp (e) {

  var x = e.key;
  var xLower = x.toLowerCase();
  var xUpper = x.toUpperCase();

  //console.log("Release: " + x + " | " + x.toUpperCase());

  delete keys[x];
  delete keys[xLower];
  delete keys[xUpper];
}

function keyClick (e) {
  keys[e.key] = true;
  //e.preventDefault();
  //console.log("Pressed: " + e.key);
}

//END MOUSE AND KEYBOARD =========
