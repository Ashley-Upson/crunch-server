function contract() { // Contract constructor.
	"use strict";
	function randBetween(min, max) {// Function to generate a random number.
		return ((min + Math.random()) * max);
	}
	this.id = contracts.length;
	this.data = randBetween(1, 16).toFixed(2);
	this.toProcess = this.data;
	this.uploaded = 0;
	this.price = (this.data / 64).toFixed(2);
}
function loadIntoRam() { // Function to load the data into RAM.
	"use strict";
	var intervalID = setInterval(function() {
		var contract = contracts[currentContract], // Access the global variable.
			per = cpus[computers[selected].cores][computers[selected].cpu],
			ram = memory[computers[selected].ram],
			perCycle = (per / 10).toFixed(2); // Clocks per 0.1 seconds.
		if(computers[selected].ramUsage == ram || contract.toProcess == 0) { // RAM is full or nothing left to process.
			clearInterval(intervalID);
			process();
		} else { // Load into RAM.
			if((ram - computers[selected].ramUsage) < contract.toProcess) { // RAM be overloaded by loading the rest of the data.
				if((ram - computers[selected].ramUsage) < perCycle) { // RAM will be overloaded by loading one cycle into the CPU.
					var max = ram - parseFloat(computers[selected].ramUsage);
					computers[selected].ramUsage = parseFloat(computers[selected].ramUsage + max);
					contract.toProcess = parseFloat(contract.toProcess - max);
				} else { // One cycle can be handled.
					computers[selected].ramUsage += parseFloat(perCycle);
					contract.toProcess = contract.toProcess - perCycle;
				}
			} else { // There is less than one cycle of data to load.
				computers[selected].ramUsage = parseFloat(computers[selected].ramUsage + contract.toProcess);
				contract.toProcess = 0;
			}
		}
	}, 100); // Run every 0.1 seconds.
}
function process() {

}
function saveToDisk() {

}
function upload() {

}
function dump() {

}
function crunch() {
	"use strict";
	console.log("started contract");
	loadIntoRam();
}