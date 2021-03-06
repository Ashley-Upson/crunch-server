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
	contracts = [], // Array of the conracts.
	currentContract,
	selected = 0, // Index value of the currently selected computer.
	showShop = false; // Variable to tell the script to render the shop or not.
function computer() { // Constructor for the computer.
	this.cores = 0;
	this.cpu = 0;
	this.overclock = false;
	this.storage = 0;
	this.storageUsed = 0;
	this.nic = 0;
	this.utilisation = 0;
	this.ram = 0;
	this.ramUsage = 0;
	this.crunching = false;
	this.software = 0;
}
function newComputer() { // Function to generate a new computer with level 0 stats.
	"use strict";
	computers[computers.length] = new computer(); // Create a new computer.
}
newComputer(); // First computer for the user.
// Drawing functions.
function drawComputer(computer) {
	"use strict";
	// Get the stats of this computer.
	var cores = computers[computer].cores,
		cpu = computers[computer].cpu,
		overclock = computers[computer].overclock,
		storage = computers[computer].storage,
		conMax = computers[computer].nic,
		utilisation = computers[computer].utilisation,
		ram = computers[computer].ram,
		ramUsage = computers[computer].ramUsage,
		crunching = computers[computer].crunching,
		software = computers[computer].software,
		offsetX = ((width / 3) * 2) + 10, // X offset for the computer stats.
		offsetY = 75; // Y offset for the computer stats.
	context.textAlign = "left";
	context.fillStyle = "white";
	context.font = "16px Arial";
	context.fillRect(offsetX, offsetY - 19, 90, 1);
	context.fillText("Computer: " + (computer + 1), offsetX, offsetY - 20);
	context.font = "14px Arial";
	if(overclock == true) {
		var clock = cpus[cores][cpu] * 1.1; // Add 10%. Defined in shop.js
		clock = clock.toFixed(2);
	} else {
		var clock = cpus[cores][cpu];
	}
	context.fillText("CPU: " + clock + " Hz * " + (cores + 1), offsetX, offsetY);
	context.fillText("Storage: " + disks[storage] + " KiB", offsetX, offsetY + 20);
	context.fillText("Max. Network: " + NIC[conMax] + " KiB", offsetX, offsetY + 40);
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
	// Draw the shop buttons.
	if(showShop == true) {
		context.fillStyle = "red";
		context.fillRect(((width / 3) * 2) - 110, 45, 100, 50);
		context.fillStyle = "black";
		context.font = "16px Arial";
		context.textAlign = "center";
		context.fillText("Close", ((width / 3) * 2) - 60, 65);
		context.fillText("Shop", ((width / 3) * 2) - 60, 85);
	} else {
		context.fillStyle = "red";
		context.fillRect(((width / 3) * 2) - 110, 45, 100, 50);
		context.fillStyle = "black";
		context.font = "16px Arial";
		context.textAlign = "center";
		context.fillText("Show", ((width / 3) * 2) - 60, 65);
		context.fillText("Shop", ((width / 3) * 2) - 60, 85);
	}
	canvas.addEventListener("mousedown", menuListener, false);
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
	// Upgrade cores.
	offsetY = offsetY + 60;
	if(x >= offsetX && x <= offsetX + 100 && y >= offsetY && y <= offsetY + 50) {
		upgradeCores(selected);
	}
	// Enable overclock.
	offsetY = offsetY + 60;
	if(x >= offsetX && x <= offsetX + 100 && y >= offsetY && y <= offsetY + 50) {
		enableOverclock(selected);
	}
	// Upgrade storage.
	offsetY = offsetY + 60;
	if(x >= offsetX && x <= offsetX + 100 && y >= offsetY && y <= offsetY + 50) {
		upgradeDisk(selected);
	}
	// Upgrade NIC.
	offsetY = offsetY + 60;
	if(x >= offsetX && x <= offsetX + 100 && y >= offsetY && y <= offsetY + 50) {
		upgradeNic(selected);
	}
	// Upgrade RAM.
	offsetY = offsetY + 60;
	if(x >= offsetX && x <= offsetX + 100 && y >= offsetY && y <= offsetY + 50) {
		upgradeRam(selected);
	}
	// Upgrade kernel.
	offsetY = offsetY + 60;
	if(x >= offsetX && x <= offsetX + 100 && y >= offsetY && y <= offsetY + 50) {
		upgradeKernel(selected);
	}
	// Upgrade ISP.
	offsetY = offsetY + 60;
	if(x >= offsetX && x <= offsetX + 100 && y >= offsetY && y <= offsetY + 50) {
		upgradeIsp(selected);
	}
}
function menuListener(event) {
	var x = event.x,
		y = event.y,
		buttonX = ((width / 3) * 2) - 110,
		buttonY = 45,
		buttonWidth = 100,
		buttonHeight = 50;
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	if(x >= buttonX && x <= (buttonX + buttonWidth) && y >= buttonY && y <= (buttonY + buttonHeight)) {
		if(showShop == true) {
			showShop = false;
			canvas.removeEventListener("mouseDown", menuListener, false);
		} else {
			showShop = true;
			drawShop();
			canvas.addEventListener("mouseDown", menuListener, false);
		}
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
	// ISP button.
	offsetY = offsetY + 60;
	context.fillStyle = "red";
	context.fillRect(offsetX, offsetY, buttonWidth, buttonHeight);
	context.fillStyle = "black";
	context.font = "16px Arial";
	context.textAlign = "center";
	context.fillText("Upgrade", offsetX + (buttonWidth / 2), offsetY + 20);
	context.fillText("ISP", offsetX + (buttonWidth / 2), offsetY + 40);
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
		drawShop(selected);
	} else {
		// Fill space with something.
	}
}
setInterval(render, 100); // Call render() every 0.1s