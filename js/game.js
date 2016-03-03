// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1080;
canvas.height = 800;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.jpg";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// girl image
var girlReady = false;
var girlImage = new Image();
girlImage.onload = function () {
	girlReady = true;
};
var rand = Math.floor(Math.random()*11)
girlImage.src = "images/snh48/zp_"+rand+".jpg";
// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var girl = {};
var girlsCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);
// Reset the game when the player catches a girl
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the girl somewhere on the screen randomly
	var rand = Math.floor(Math.random()*11)
	girlImage.src = "images/snh48/zp_"+rand+".jpg";
	girl.x = 48 + (Math.random() * (canvas.width - 96));
	girl.y = 48 + (Math.random() * (canvas.height - 96));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		hero.x <= (girl.x + 32)
		&& girl.x <= (hero.x + 32)
		&& hero.y <= (girl.y + 32)
		&& girl.y <= (hero.y + 32)
	) {
		++girlsCaught;
		reset();
	}
};
// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (girlReady) {
		ctx.drawImage(girlImage, girl.x, girl.y);
	}

	// Score
	ctx.fillStyle = "rgb(200, 0, 0)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Girls saved: " + girlsCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();