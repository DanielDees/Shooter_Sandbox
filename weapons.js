;"use strict";

var shotgun = new Weapon();
var nuke = new Weapon();
var laser = new Weapon();
var double = new Weapon();
var triple = new Weapon();
var quint = new Weapon();

//Debug
var debugWeapon1 = new Weapon();
var debugWeapon2 = new Weapon();

debugWeapon1.setName("Debug Weapon (Bounce)").
		setRounds(90).
		setSpread(360).
		setMagazineSize(1).
		setReloadTime(0).
		setRoundsPerSecond(20).
		setRange(1000).
		setDamage(5).
		setRoundSpeed(20).
		setRoundWidth(25).
		setRoundHeight(3).
		setRoundColor('red').
		setRoundMoveType("bouncy").
		setDebug(false);

debugWeapon2.setName("Debug Weapon (Spin)").
		setRounds(1).
		setSpread(0).
		setMagazineSize(1).
		setReloadTime(0).
		setRoundsPerSecond(1).
		setRange(1).
		setDamage(0).
		setRoundSpeed(0).
		setRoundWidth(150).
		setRoundHeight(50).
		setRoundColor('red').
		setRoundMoveType("spin").
		setDebug(true);

laser.setName("Laser").
		setRounds(1).
		setSpread(0).
		setMagazineSize(1).
		setReloadTime(0).
		setRoundsPerSecond(60).
		setRange(1800).
		setDamage(5).
		setRoundSpeed(20).
		setRoundWidth(25).
		setRoundHeight(3).
		setRoundColor('red').
		setRoundMoveType("bouncy").
		setDebug(false);

double.setName("Double").
		setRounds(2).
		setSpread(35).
		setMagazineSize(180).
		setReloadTime(1).
		setRoundsPerSecond(30).
		setRange(700).
		setDamage(40).
		setRoundSpeed(13).
		setRoundWidth(20).
		setRoundHeight(7).
		setRoundColor('green').
		setRoundMoveType("bouncy");

triple.setName("Triple").
		setRounds(3).
		setSpread(35).
		setMagazineSize(100).
		setReloadTime(1).
		setRoundsPerSecond(20).
		setRange(600).
		setDamage(40).
		setRoundSpeed(11).
		setRoundWidth(15).
		setRoundHeight(7).
		setRoundColor('blue').
		setRoundMoveType("bouncy");

quint.setName("Quint").
		setRounds(5).
		setSpread(35).
		setMagazineSize(60).
		setReloadTime(1).
		setRoundsPerSecond(15).
		setRange(500).
		setDamage(40).
		setRoundSpeed(10).
		setRoundWidth(12).
		setRoundHeight(8).
		setRoundColor('teal').
		setRoundMoveType("bouncy");

shotgun.setName("Shotgun").
		setRounds(10).
		setSpread(35).
		setMagazineSize(30).
		setReloadTime(1).
		setRoundsPerSecond(10).
		setRange(300).
		setDamage(75).
		setRoundSpeed(10).
		setRoundWidth(12).
		setRoundHeight(9).
		setRoundColor('yellow').
		setRoundMoveType("bouncy");

nuke.setName("Nuke").
		setRounds(90).
		setSpread(360).
		setMagazineSize(1).
		setReloadTime(0).
		setRoundsPerSecond(1).
		setRange(2000).
		setDamage(1000).
		setRoundSpeed(8).
		setRoundWidth(15).
		setRoundHeight(15).
		setRoundColor('orange').
		setRoundMoveType("normal");