// Datafile for stat growth presets
// BAB = Base Ability Bonus
// "save" - saving throw
var statGrowth = {}; 

statGrowth.goodBAB = 
[
	1, 1, 1, 1, 1,
	1, 1, 1, 1, 1,
	1, 1, 1, 1, 1,
	1, 1, 1, 1, 1
];

statGrowth.avgBAB = 
[
	0, 1, 1, 1, 0,
	1, 1, 1, 0, 1, 
	1, 1, 0, 1, 1, 
	1, 0, 1, 1, 1
];

statGrowth.poorBAB = 
[
	0, 1, 0, 1, 0,
	1, 0, 1, 0, 1,
	0, 1, 0, 1, 0,
	1, 0, 1, 0, 1
];

statGrowth.goodSave = 
[
	2, 1, 0, 1, 0,
	1, 0, 1, 0, 1,
	0, 1, 0, 1, 0,
	1, 0, 1, 0, 1
];

statGrowth.poorSave = 
[
	0, 0, 1, 0, 0,
	1, 0, 0, 1, 0, 
	0, 1, 0, 0, 1,
	0, 0, 1, 0, 0
];

statGrowth.PgoodSave = 
[
	1, 0, 1, 0, 1,
	0, 1, 0, 1, 0
];

statGrowth.PpoorSave = 
[
	0, 1, 0, 0, 1,
	0, 0, 1, 0, 0
];

var raceBonus = 
{
	"Dwarf": { "Con": 2, "Wis": 2, "Cha": -2},
	"Elf": {"Dex": 2, "Int": 2, "Con": -2 },
	"Gnome": {"Con": 2, "Cha": 2, "Str": -2},
	"HalfElf": {"Choice": 2},
	"Halfling": {"Dex": 2, "Cha": 2, "Str": -2},
	"HalfOrc": {"Choice": 2},
	"Human": {"Choice": 2}
};

// Characters have classes, 
// Monsters don't or they have monster classes, 
// and hybrids have both. 
// Monsters will not roll for Ability Scores either
var characterType = 
{
	"Character": 0, 
	"Monster": 1, 
	"Hybrid": 2
};
