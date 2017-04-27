// Output the version information.
document.getElementById("version").innerHTML = "<b>0.1-alpha</b>";
// Global variables.
var canvas = document.getElementById("canvas"), // Canvas for the game.
	context = canvas.getContext("2d"), // Drawing API.
	width = canvas.width, // Width of the canvas.
	height = canvas.height, // Height of the canvas.
	cash = 0, // Money that the player has available to them.
	networkSpeed = 0, // Maximum connection speed overall.
	utilised, // Current amount of networkSpeed being used.
	computers = [], // Array of the computers.
	selected = 0; // Index value of the currently selected computer.
// Computer stats [cpu, overclock, storage, connectionMax, utilisation, ram, crunching, software].
function newComputer() { // Function to generate a new computer with level 0 stats.
	"use strict";
	computers[computers.length] = [0, false, 0, 0, 0, 0, false, 0]; // Create a new computer.
}
newComputer(); // First computer for the user.
// Drawing functions.
function drawComputer(computer) {
	"use strict";
	// Get the stats of this computer.
	var cpu = computers[computer][0],
		overclocked = computers[computer][1],
		storage = computers[computer][2],
		conMax = computers[computer][3],
		utilisation = computers[computer][4],
		ram = computers[computer][5],
		crunching = computers[computer][6],
		software = computers[computer][7],
		offsetX = ((width / 3) * 2) + 10,
		offsetY = 75;
	context.textAlign = "left";
	context.fillStyle = "white";
	context.font = "16px Arial";
	context.fillRect(offsetX, offsetY - 19, 90, 1);
	context.fillText("Computer: " + (computer + 1), offsetX, offsetY - 20);
	context.font = "14px Arial";
	context.fillText("CPU: " + cpus[cpu] + " Hz", offsetX, offsetY);
	context.fillText("Storage: " + disks[storage] + " KiB", offsetX, offsetY + 20);
	context.fillText("Max. Network: " + NIC[storage] + " KiB", offsetX, offsetY + 40);
	context.fillText("Net. Usage: " + utilisation + " of " + ISP[networkSpeed] + " KiB/s", offsetX, offsetY + 60);
}
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
function render() {
	"use strict";
	drawDisplay();
	drawComputer(selected);
}
setInterval(render, 100); // Call render() every 0.1s