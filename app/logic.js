function contract() { // Contract constructor.
	"use strict";
	function randBetween(min, max) {// Function to generate a random number.
		return ((min + Math.random()) * max);
	}
	this.id = contracts.length;
	this.data = randBetween(1, 16).toFixed(2);
	this.toDownload = this.data;
	this.toProcess = this.data;
	this.uploaded = 0;
	this.price = (this.data / 64).toFixed(2);
}
function crunch() {
	"use strict";
	if(currentContract != -1) {
		console.log("contract not -1");
		if(disks[computers[selected].storage] >= contracts[currentContract].data) {
			console.log("Storage okay");
			var intervalID = setInterval(function() {
				if(utilised > 0) {
					console.log("network in use");
					if(computers[selected].utilisation > 0) {
						console.log("computer network in use");
						if(ISP[networkSpeed] <= NIC[computers[selected].nic]) {
							var max = parseFloat(ISP[networkSpeed] - computers[selected] - utilised);
						} else {
							var max = NIC[computers[selected].nic];
						}
					} else {
						var max = NIC[computers[selected].nic];
					}
				} else {
					console.log("network not in use");
					var max = parseFloat(NIC[computers[selected].nic] - utilised);
				}
				console.log("interval")
				if(contracts[currentContract].toDownload <= 0) {
					console.log("nothing to download");
					clearInterval(intervalID);
					loadIntoRam();
				} else {
					console.log("downloading");
					computers[selected].storageUsed = parseFloat(computers[selected].storageUsed + max);
					computers[selected].utilisation = max;
					contracts[currentContract].toDownload = parseFloat(contracts[currentContract].toDownload - max);
				}
			}, 100);
		} else {
			return false;
		}
	} else {
		return false;
	}
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
	"use strict";
	var processing = contacts[currentContract].data,
		action = 0,
		clock = cpus[computers[selected].cores][computers[selected].cpu],
		intervalID = setInterval(function() {
		if(action === 0) {
			if(computers[selected].storageUsed <= 0) {
				computers[selected].storageUsed = 0;
				action = 1;
			}
			computers[selected].storageUsed = parseFloat(computers[selected].storageUsed - clock);
		} else {
			if(computers[selected].storageUsed >= processing) {
				computers[selected].storageUsed = processing;
				clearInterval(intervalID);
				upload();
			}
			computers[selected].storageUsed = parseFloat(computers[selected].storageUsed - clock);
		}
	}, 100);
}
function upload() {
	"use strict";
	if(utilised > 0) {
		if(computers[selected].utilisation > 0) {
			if(ISP[networkSpeed] <= NIC[computers[selected].nic]) {
				var max = parseFloat(ISP[networkSpeed] - computers[selected] - utilised);
			} else {
				var max = NIC[computers[selected].nic];
			}
		} else {
			var max = NIC[computers[selected].nic];
		}
	} else {
		var max = parseFloat(NIC[computers[selected].nic] - utilised);
	}
	var intervalID = setInterval(function() {
		if(computers[selected].storageUsed <= 0) {
			clearInterval(intervalID);
			dump();
		} else {
			computers[selected].storageUsed = parseFloat(computers[selected].storageUsed - max);
			computers[selected].utilisation = max;
		}
	}, 100);
}
function dump() {
	"use strict";
	cash = parseFloat(cash + contracts[currentContract].price);
	currentContract = -1;
}