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
	selected = 0, // Index value of the currently selected computer.
	showShop = true; // Variable to tell the script to render the shop or not.
// Computer stats [cores, cpu, overclock, storage, connectionMax, utilisation, ram, ramUsage, crunching, software].
function newComputer() { // Function to generate a new computer with level 0 stats.
	"use strict";
	computers[computers.length] = [0, 0, false, 0, 0, 0, 0, 0, false, 0]; // Create a new computer.
}
newComputer(); // First computer for the user.
// Drawing functions.
function drawComputer(computer) {
	"use strict";
	// Get the stats of this computer.
	var cores = computers[computer][0],
		cpu = computers[computer][1],
		overclocked = computers[computer][2],
		storage = computers[computer][3],
		conMax = computers[computer][4],
		utilisation = computers[computer][5],
		ram = computers[computer][6],
		ramUsage = computers[computer][7],
		crunching = computers[computer][8],
		software = computers[computer][9],
		offsetX = ((width / 3) * 2) + 10, // X offset for the computer stats.
		offsetY = 75; // Y offset for the computer stats.
	context.textAlign = "left";
	context.fillStyle = "white";
	context.font = "16px Arial";
	context.fillRect(offsetX, offsetY - 19, 90, 1);
	context.fillText("Computer: " + (computer + 1), offsetX, offsetY - 20);
	context.font = "14px Arial";
	context.fillText("CPU: " + cpus[cores][cpu] + " Hz * " + (cores + 1), offsetX, offsetY);
	context.fillText("Storage: " + disks[storage] + " KiB", offsetX, offsetY + 20);
	context.fillText("Max. Network: " + NIC[storage] + " KiB", offsetX, offsetY + 40);
	context.fillText("Net. Usage: " + utilisation.toFixed(2) + " of " + ISP[networkSpeed] + " KiB/s", offsetX, offsetY + 60);
	context.fillText("RAM: " + ramUsage + " of " + memory[ram] + " KiB", offsetX, offsetY + 80);
	context.fillText("Usable cores: " + kernel[software] + " of " + (cores + 1), offsetX, offsetY + 100);
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
function shopListener(event) {
	"use strict";
	var x = event.x,
		y = event.y,
		offsetX = 10,
		offsetY = 45;
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	// Upgrade CPU.
	if(x >= offsetX && x <= offsetX + 100 && y >= offsetY && y <= offsetY + 50) {
		upgradeCpu(selected);
	}
	// Upgrade Cores.
	offsetY = offsetY + 60;
	if(x >= offsetX && x <= offsetX + 100 && y >= offsetY && y <= offsetY + 50) {
		upgradeCores(selected);
	}
}
function drawShop(computer) { // Draw the upgrades shop for the computer.
	"use strict";
	var offsetX = 10,
		offsetY = 45,
		buttonWidth = 100,
		buttonHeight = 50;
	// CPU button.
	context.fillStyle = "red";
	context.fillRect(offsetX, offsetY, buttonWidth, buttonHeight);
	context.fillStyle = "black";
	context.font = "16px Arial";
	context.textAlign = "center";
	context.fillText("Upgrade", offsetX + (buttonWidth / 2), offsetY + 20);
	context.fillText("CPU", offsetX + (buttonWidth / 2), offsetY + 40);
	context.fillStyle = "white";
	context.textAlign = "left";
	context.fillText("£cost", offsetX + buttonWidth + 10, offsetY + 30);
	// CPU Cores button.
	offsetY = offsetY + 60;
	context.fillStyle = "red";
	context.fillRect(offsetX, offsetY, buttonWidth, buttonHeight);
	context.fillStyle = "black";
	context.font = "16px Arial";
	context.textAlign = "center";
	context.fillText("Upgrade", offsetX + (buttonWidth / 2), offsetY + 20);
	context.fillText("Cores", offsetX + (buttonWidth / 2), offsetY + 40);
	context.fillStyle = "white";
	context.textAlign = "left";
	context.fillText("£cost", offsetX + buttonWidth + 10, offsetY + 30);
	// Overclock button.
	offsetY = offsetY + 60;
	context.fillStyle = "red";
	context.fillRect(offsetX, offsetY, buttonWidth, buttonHeight);
	context.fillStyle = "black";
	context.font = "16px Arial";
	context.textAlign = "center";
	context.fillText("Enable", offsetX + (buttonWidth / 2), offsetY + 20);
	context.fillText("Overclock", offsetX + (buttonWidth / 2), offsetY + 40);
	context.fillStyle = "white";
	context.textAlign = "left";
	context.fillText("£cost", offsetX + buttonWidth + 10, offsetY + 30);
	// Storage button.
	offsetY = offsetY + 60;
	context.fillStyle = "red";
	context.fillRect(offsetX, offsetY, buttonWidth, buttonHeight);
	context.fillStyle = "black";
	context.font = "16px Arial";
	context.textAlign = "center";
	context.fillText("Upgrade", offsetX + (buttonWidth / 2), offsetY + 20);
	context.fillText("Storage", offsetX + (buttonWidth / 2), offsetY + 40);
	context.fillStyle = "white";
	context.textAlign = "left";
	context.fillText("£cost", offsetX + buttonWidth + 10, offsetY + 30);
	// NIC button.
	offsetY = offsetY + 60;
	context.fillStyle = "red";
	context.fillRect(offsetX, offsetY, buttonWidth, buttonHeight);
	context.fillStyle = "black";
	context.font = "16px Arial";
	context.textAlign = "center";
	context.fillText("Upgrade", offsetX + (buttonWidth / 2), offsetY + 20);
	context.fillText("NIC", offsetX + (buttonWidth / 2), offsetY + 40);
	context.fillStyle = "white";
	context.textAlign = "left";
	context.fillText("£cost", offsetX + buttonWidth + 10, offsetY + 30);
	// RAM button.
	offsetY = offsetY + 60;
	context.fillStyle = "red";
	context.fillRect(offsetX, offsetY, buttonWidth, buttonHeight);
	context.fillStyle = "black";
	context.font = "16px Arial";
	context.textAlign = "center";
	context.fillText("Upgrade", offsetX + (buttonWidth / 2), offsetY + 20);
	context.fillText("RAM", offsetX + (buttonWidth / 2), offsetY + 40);
	context.fillStyle = "white";
	context.textAlign = "left";
	context.fillText("£cost", offsetX + buttonWidth + 10, offsetY + 30);
	// Kernel button.
	offsetY = offsetY + 60;
	context.fillStyle = "red";
	context.fillRect(offsetX, offsetY, buttonWidth, buttonHeight);
	context.fillStyle = "black";
	context.font = "16px Arial";
	context.textAlign = "center";
	context.fillText("Upgrade", offsetX + (buttonWidth / 2), offsetY + 20);
	context.fillText("Kernel", offsetX + (buttonWidth / 2), offsetY + 40);
	context.fillStyle = "white";
	context.textAlign = "left";
	context.fillText("£cost", offsetX + buttonWidth + 10, offsetY + 30);
	// Set event listener.
	canvas.addEventListener("mousedown", shopListener, false);
}
function render() {
	"use strict";
	drawDisplay();
	drawComputer(selected);
	if(showShop) {
		drawShop(0);
	} else {
		// Fill space with something.
	}
}
setInterval(render, 100); // Call render() every 0.1s