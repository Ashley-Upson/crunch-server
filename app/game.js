// Global variables.
var canvas = document.getElementById("canvas"), // Canvas for the game.
	context = canvas.getContext("2d"), // Drawing API.
	width = canvas.width, // Width of the canvas.
	height = canvas.height, // Height of the canvas.
	cash = 0; // Money that the player has available to them.

// Drawing functions.
function drawDisplay() { // Function to draw the main display.
	"use strict";
	context.rect(0, 0, width, height);
	context.fillStyle = "black";
	context.fill();
}