// Harware/software stats.
var cpus = [16,	32,	64,	128, 256, 512, 1024], // Hertz; 1Hz = 1 byte of calculations.
	disks = [8, 16, 32, 64, 128, 256, 512], // KiB
	NIC = [1, 2, 4, 8, 16, 32, 64], // KiB/s.
	ISP = [2, 4, 8, 16, 32, 64, 128], // ISP network speeds; KiB/s.
	memory = [4, 8, 16, 32, 64, 128, 256], // Ram levels; KiB.
	software = [1, 2, 3, 4, 5, 6, 7]; // Maximum cores available for use.