# crunch-server
JavaScript game.
<br>
Idea of the game:
<ul>
	<li>You run a company that crunches data for their clients.</li>
	<li>There is no specific end-point; just keep going.</li>
	<li>You will be given a starter set of hardware and software.</li>
	<li>Your task is to upgrade both and take on bigger contracts.</li>
</ul>
<br>
To-do:
<ul>
	<li>Generate contract list based on current hardware levels; specifically ignore software.</li>
	<li>Crunching function; software defines what hardware can be used, its efficiency at crunching and how many cores can be used.</li>
	<li>Add multi computer support; run from a central server and distribute the contract load based on hardware/software.</li>
</ul>
Possible future updates:
<ul>
	<li>Scoring system.</li>
	<li>Player positioning system; defined by hardware and software, and possible contracts completed.</li>
	<li>Multiplayer support; allow players to create their own companies and hire others to distribute contracts.</li>
	<li>Further multiplayer support; maybe allow companies to work together.</li>
</ul>
<br>
<br>
Logic ideas:
<ul>
	<li>Crunching contracts:</li>
	<ul>
		<li>Load the contract details.</li>
		<li>Load the contract into ram.</li>
		<li>Crunch contact:</li>
		<ul>
			<li>Execute ram.</li>
			<li>Save contract back to disk.</li>
			<li>Load next block.</li>
			<li>Crunch till complete.</li>
			<li>Send contract off via connection.</li>
			<li>Receive payment.</li>
			<li>Dump contract details.</li>
		</ul>
	</ul>
</ul>