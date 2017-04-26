// Output the version information.
document.getElementById("version").innerHTML = "<b>0.1-alpha</b>";
// Global variables.
var canvas = document.getElementById("canvas"), // Canvas for the game.
	context = canvas.getContext("2d"), // Drawing API.
	width = canvas.width, // Width of the canvas.
	height = canvas.height, // Height of the canvas.
	cash = 0, // Money that the player has available to them.
	// Hardware and software info for user.
	cpu = 0,
	overclock = false,
	storage = 0,
	connection = 0,
	ram = 0,
	crunching = false;

// Drawing functions.
function drawDisplay() { // Function to draw the main display.
	"use strict";
	// Top info bar.
	context.fillStyle = "black";
	context.rect(0, 0, width, height);
	context.fill();
	context.textAlign = "center";
	context.fillStyle = "white";
	context.font = "20px Arial";
	context.fillText("Crunch Server", width / 2, 25);
	context.textAlign = "left";
	context.fillText("Cash: £" + cash, 25, 25);
	context.fillStyle = "red";
	context.fillRect(0, 35, width, 1);
	// Draw hardware/software stats.
	var offsetX = (width / 3) * 2,
		offsetY = 35;
	context.fillRect(offsetX, offsetY, 1, height - offsetY);
}
drawDisplay();