var shotgun = new Weapon();
var nuke = new Weapon();
var laser = new Weapon();
var debugWeapon = new Weapon();
var double = new Weapon();
var triple = new Weapon();
var quint = new Weapon();

debugWeapon.setName("Debug Weapon").
		setRounds(1).
		setSpread(0).
		setMagazineSize(1).
		setReloadTime(0).
		setRoundsPerSecond(1).
		setRange(1000).
		setDamage(5).
		setAutoReload(true).
		setRoundSpeed(0).
		setRoundWidth(150).
		setRoundHeight(50).
		setRoundColor('red').
		setRoundMoveType("spin").
		setDebug(true);

laser.setName("Laser").
		setRounds(1).
		setSpread(0).
		setMagazineSize(1000).
		setReloadTime(0).
		setRoundsPerSecond(60).
		setRange(1200).
		setDamage(5).
		setAutoReload(true).
		setRoundSpeed(20).
		setRoundWidth(25).
		setRoundHeight(3).
		setRoundColor('red').
		setRoundMoveType("bouncy").
		setDebug(true);

double.setName("Double").
		setRounds(2).
		setSpread(35).
		setMagazineSize(50).
		setReloadTime(0).
		setRoundsPerSecond(30).
		setRange(700).
		setDamage(40).
		setAutoReload(true).
		setRoundSpeed(10).
		setRoundWidth(15).
		setRoundHeight(5).
		setRoundColor('pink').
		setRoundMoveType("normal");

triple.setName("Triple").
		setRounds(3).
		setSpread(35).
		setMagazineSize(50).
		setReloadTime(0).
		setRoundsPerSecond(30).
		setRange(600).
		setDamage(40).
		setAutoReload(true).
		setRoundSpeed(10).
		setRoundWidth(15).
		setRoundHeight(5).
		setRoundColor('blue').
		setRoundMoveType("normal");

quint.setName("Quint").
		setRounds(5).
		setSpread(35).
		setMagazineSize(50).
		setReloadTime(0).
		setRoundsPerSecond(30).
		setRange(500).
		setDamage(40).
		setAutoReload(true).
		setRoundSpeed(10).
		setRoundWidth(15).
		setRoundHeight(5).
		setRoundColor('violet').
		setRoundMoveType("bouncy");

shotgun.setName("Shotgun").
		setRounds(12).
		setSpread(35).
		setMagazineSize(50).
		setReloadTime(0).
		setRoundsPerSecond(30).
		setRange(300).
		setDamage(75).
		setAutoReload(true).
		setRoundSpeed(10).
		setRoundWidth(15).
		setRoundHeight(5).
		setRoundColor('yellow').
		setRoundMoveType("bouncy");

nuke.setName("Nuke").
		setRounds(90).
		setSpread(360).
		setMagazineSize(1).
		setReloadTime(1).
		setRoundsPerSecond(1).
		setRange(2000).
		setDamage(1000).
		setAutoReload(true).
		setRoundSpeed(8).
		setRoundWidth(15).
		setRoundHeight(15).
		setRoundColor('orange').
		setRoundMoveType("normal");