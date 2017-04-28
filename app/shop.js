// Harware/software stats.
var cpus = [[16, 32, 64, 128, 256, 512, 1024]], // Hertz; 1Hz = 1 byte of calculations; single cores.
	disks = [8, 16, 32, 64, 128, 256, 512], // KiB
	NIC = [1, 2, 4, 8, 16, 32, 64], // KiB/s.
	ISP = [2, 4, 8, 16, 32, 64, 128], // ISP network speeds; KiB/s.
	memory = [4, 8, 16, 32, 64, 128, 256], // Ram levels; KiB.
	kernel = [1, 2, 3, 4, 5, 6, 7, 8]; // Maximum cores available for use.
// Upgrade functions.
// Computer stats [cores, cpu, overclock, storage, connectionMax, utilisation, ram, ramUsage, crunching, software].
function upgradeCpu(computer) {
	"use strict";
	var current = computers[computer][1],
		next = current + 1,
		cores = computers[computer][0];
	if(next < cpus[cores].length) {
		computers[computer][1] = next; // Set new CPU.
		computers[computer][2] = false; // Disable overclock for new CPU.
		return true;
	} else {
		return false;
	}
}
function upgradeCores(computer) {
	"use strict";
	var current = computers[computer][0],
		next = current + 1;
	if(next < cpus.length) {
		computers[computer][0] = next;
	} else {
		return false;
	}
}
function enableOverclock() {
	"use strict";
	
}
function upgradeDisk(computer) {
	"use strict";
	var current = computers[computer][3],
		next = current + 1;
	if(next < cpus.length) {
		computers[computer][3] = next;
	} else {
		return false;
	}
}