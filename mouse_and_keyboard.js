//Keyboard Events ===============
document.onkeypress = keyClick;
document.onkeydown = keyClick;
document.onkeyup = getKeyUp; 

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
