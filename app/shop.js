// Harware/software stats.
var cpus = [[16, 32, 64, 128, 256, 512, 1024]], // Hertz; 1Hz = 1 byte of calculations; single cores.
	disks = [8, 16, 32, 64, 128, 256, 512], // KiB.
	NIC = [1, 2, 4, 8, 16, 32, 64], // KiB/s.
	ISP = [2, 4, 8, 16, 32, 64, 128], // ISP network speeds; KiB/s.
	memory = [4, 8, 16, 32, 64, 128, 256], // Ram levels; KiB.
	kernel = [1, 2, 3, 4, 5, 6, 7, 8]; // Maximum cores available for use.
function upgradeCpu(computer) {
	"use strict";
	var current = computers[computer].cpu,
		next = current + 1,
		cores = computers[computer].cores;
	if(next < cpus[cores].length) {
		computers[computer].cpu = next; // Set new CPU.
		computers[computer].overclock = false; // Disable overclock for new CPU.
		return true;
	} else {
		return false;
	}
}
function upgradeCores(computer) {
	"use strict";
	var current = computers[computer].cores,
		next = current + 1;
	if(next < cpus.length) {
		computers[computer].cores = next;
		return true;
	} else {
		return false;
	}
}
function enableOverclock(computer) {
	"use strict";
	computers[computer].overclock = true;
	return true;
}
function upgradeDisk(computer) {
	"use strict";
	var current = computers[computer].storage,
		next = current + 1;
	if(next < disks.length) {
		computers[computer].storage = next;
		return true;
	} else {
		return false;
	}
}
function upgradeNic(computer) {
	"use strict";
	var current = computers[computer].nic,
		next = current + 1;
	if(next < NIC.length) {
		computers[computer].nic = next;
		return true;
	} else {
		return false;
	}
}
function upgradeIsp() {
	"use strict";
	var current = networkSpeed,
		next = networkSpeed + 1;
	if(next < ISP.length) {
		networkSpeed = next;
		return true;
	} else {
		return false;
	}
}
function upgradeRam(computer) {
	"use strict";
	var current = computers[computer].ram,
		next = current + 1;
	if(next < memory.length) {
		computers[computer].ram = next;
		return true;
	} else {
		return false;
	}
}
function upgradeKernel(computer) {
	"use strict";
	var current = computers[computer].software,
		next = current + 1;
	if(next < kernel.length) {
		computers[computer].software = next;
		return true;
	} else {
		return false;
	}
}