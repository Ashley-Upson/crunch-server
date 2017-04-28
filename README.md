# crunch-server
JavaScript game.
<br>
Idea of the game:
	You run a company that crunches data for their clients.
	There is no specific end-point; just keep going.
	You will be given a starter set of hardware and softwar.
	Your task is to upgrade both and take on bigger contracts
<br>
To-do:
	Generate contract list based on current hardware levels; specifically ignore software.
	Generate current hardware and software list.
	Create upgrade shop.
	Crunching function; software defines what hardware can be used, its efficiency at crunching and how many cores can be used.
	Add multi computer support; run from a central server and distribute the contract load based on hardware/software.
<br>
Possible future updates:
	Scoring system.
	Player positioning system; defined by hardware and software, and possible contracts completed.
	Multiplayer support; allow players to create their own companies and hire others to distribute contracts.
	Further multiplayer support; maybe allow companies to work together.
<br>
Logic ideas:
	Crunching contracts:
		Load the contract details.
		Load the contract into ram.
		Crunch contact:
			Execute ram.
			Save contract back to disk.
			Load next block.
			Crunch till complete.
		Send contract off via connection.
		Receive payment.
		Dump contract details.
	