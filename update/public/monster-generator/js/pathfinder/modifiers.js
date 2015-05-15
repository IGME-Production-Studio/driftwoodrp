
// You receive a bonus or penalty to your AC based on your size. 
var sizeModifier = 
{
	"Colossal": -8, 
	"Gargantuan": -4, 
	"Huge": -2, 
	"Large": -1,
	"Medium": 0,
	"Small": 1, 
	"Tiny": 2, 
	"Diminuitive": 4, 
	"Fine": 8
}

// In feet
var speeds = 
{
	"Dwarf": 20,
	"Gnome": 20,
	"Halfling": 20, 
	"Human": 30, 
	"Elf": 30,
	"HalfElf": 30, 
	"HalfOrc": 30, 
	"Humanoid": 30
}

// Enum describing alignment
var alignment = 
{
	"LawfulGood" : 0, 
	"NeutralGood": 1, 
	"ChaoticGood": 2, 
	"LawfulNeutral": 3, 
	"NeutralNeutral": 4,
	"ChaoticNeutral": 5, 
	"LawfulEvil": 6, 
	"NeutralEvil": 7, 
	"ChaoticEvil": 8
}