function contract() { // Contract constructor.
	"use strict";
	function randBetween(min, max) {// Function to generate a random number.
		return ((min + Math.random()) * max);
	}
	this.id = contracts.length - 1;
	this.data = randBetween(1, 16);
	this.toProcess = this.data;
	this.uploaded = 0;
	this.price = (this.data / 64).toFixed(2);
}
function crunch(index) {
	"use strict";
	var contract = contracts[index];
	function loadIntoRam() { // Function to load the data into RAM.
		var intervalID = setInterval(load, 100); // Run every 0.1 seconds.
		function load() {
			var perCycle = cpus[computers[selected].cores][computers[selected].cpu],
				computer = computers[selected],
				ram = memory[computer.ram];
			perCycle = (perCycle / 10).toFixed(2); // Clocks per 0.1 seconds.
			if(computer.ramUsage == ram || contract.toProcess == 0) { // RAM is full.
				clearInterval(intervalID);
				process();
			} else { // Load into RAM.
				if(ram - computer.ramUsage < contract.toProcess) { // RAM be overloaded by loading the rest of the data.
					if(ram - computer.ramUsage < perCycle) { // RAM will be overloaded by loading one cycle into the CPU.
						var max = ram - computer.ramUsage;
						computer.ramUsage += max;
						contract.toProcess -= max;
					} else { // One cycle can be handled.
						computer.ramUsage += perCycle;
						contract.toProcess -= perCycle;
					}
				} else { // There is less than one cycle of data to load.
					computer.ramUsage += contract.toProcess;
					contract.toProcess = 0;
				}
			}
			
		}
	}
	function process() {
		
	}
	function saveToDisk() {
		
	}
	function upload() {
		
	}
	function dump() {
		
	}
}