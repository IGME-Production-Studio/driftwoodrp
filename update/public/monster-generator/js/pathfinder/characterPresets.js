//ClassName,HPDie,SkillPtsPerLvl, BaseAtt, FOR, REF, WIL


var classes = 
{
"Barbarian":
  { 
    "className": "Barbarian",
    "hitDie":12,
    "skillPts":4,
    "baseAtt":statGrowth.goodBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.poorSave
  },
  "Bard":
  {
    "className":"Bard",
    "hitDie":8,
    "skillPts":6,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.poorSave,
    "reflexSave":statGrowth.goodSave,
    "willSave":statGrowth.goodSave
  },
  "Cleric":
  {
    "className":"Cleric",
    "hitDie":8,
    "skillPts":2,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.goodSave
  },
  "Druid":
  {
    "className":"Druid",
    "hitDie":8,
    "skillPts":4,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.goodSave
  },
  "Fighter":
  {
    "className":"Fighter",
    "hitDie":10,
    "skillPts":2,
    "baseAtt":statGrowth.goodBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.poorSave
  },
  "Monk":
  {
    "className":"Monk",
    "hitDie":8,
    "skillPts":4,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.goodSave,
    "willSave":statGrowth.goodSave
  },
  "Paladin":
  {
    "className":"Paladin",
    "hitDie":10,
    "skillPts":2,
    "baseAtt":statGrowth.goodBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.goodSave
  },
  "Ranger":
  {
    "className":"Ranger",
    "hitDie":10,
    "skillPts":6,
    "baseAtt":statGrowth.goodBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.goodSave,
    "willSave":statGrowth.poorSave
  },
  "Rogue": 
  {
    "className":"Rogue",
    "hitDie":8,
    "skillPts":8,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.poorSave,
    "reflexSave":statGrowth.goodSave,
    "willSave":statGrowth.poorSave
  },
  "Sorcerer":
  {
    "className":"Sorcerer",
    "hitDie":6,
    "skillPts":2,
    "baseAtt":statGrowth.poorBAB,
    "fortitudeSave":statGrowth.poorSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.goodSave
  },
  "Wizard":
  {
    "className":"Wizard",
    "hitDie":6,
    "skillPts":2,
    "baseAtt":statGrowth.poorBAB,
    "fortitudeSave":statGrowth.poorSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.goodSave
  },
  "Alchemist":
  {
    "className":"Alchemist",
    "hitDie":8,
    "skillPts":4,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.goodSave,
    "willSave":statGrowth.poorSave
  },
  "Cavalier":
  {
    "className":"Cavalier",
    "hitDie":10,
    "skillPts":4,
    "baseAtt":statGrowth.goodBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.poorSave
  },
  "Gunslinger":
  {
    "className":"Gunslinger",
    "hitDie":10,
    "skillPts":4,
    "baseAtt":statGrowth.goodBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.goodSave,
    "willSave":statGrowth.poorSave
  },
  "Inquisitor":
  {
    "className":"Inquisitor",
    "hitDie":8,
    "skillPts":6,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.goodSave
  },
  "Magus":
  {
    "className":"Magus",
    "hitDie":8,
    "skillPts":2,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.goodSave
  },
  "Oracle":
  {
    "className":"Oracle",
    "hitDie":8,
    "skillPts":4,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.poorSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.goodSave
  },
  "Summoner":
  {
    "className":"Summoner",
    "hitDie":8,
    "skillPts":2,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.poorSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.goodSave
  },
  "Witch":
  {
    "className":"Witch",
    "hitDie":6,
    "skillPts":2,
    "baseAtt":statGrowth.poorBAB,
    "fortitudeSave":statGrowth.poorSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.goodSave
  },
  "Antipaladin":
  {
    "className":"Antipaladin",
    "hitDie":10,
    "skillPts":2,
    "baseAtt":statGrowth.goodBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.goodSave
  },
  "Ninja":
  {
    "className":"Ninja",
    "hitDie":8,
    "skillPts":8,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.poorSave,
    "reflexSave":statGrowth.goodSave,
    "willSave":statGrowth.poorSave
  },
  "Samurai":
  {
    "className":"Samurai",
    "hitDie":10,
    "skillPts":4,
    "baseAtt":statGrowth.goodBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.poorSave
  },
  "Arcanist":
  {
    "className":"Arcanist",
    "hitDie":6,
    "skillPts":2,
    "baseAtt":statGrowth.poorBAB,
    "fortitudeSave":statGrowth.poorSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.goodSave
  },
  "Bloodrager":
  {
    "className":"Bloodrager",
    "hitDie":10,
    "skillPts":4,
    "baseAtt":statGrowth.goodBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.poorSave
  },
  "Brawler":
  {
    "className":"Brawler",
    "hitDie":10,
    "skillPts":4,
    "baseAtt":statGrowth.goodBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.goodSave,
    "willSave":statGrowth.poorSave
  },
  "Hunter":
  {
    "className":"Hunter",
    "hitDie":8,
    "skillPts":6,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.goodSave,
    "willSave":statGrowth.poorSave
  },
  "Investigator":
  {
    "className":"Investigator",
    "hitDie":8,
    "skillPts":6,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.poorSave,
    "reflexSave":statGrowth.goodSave,
    "willSave":statGrowth.goodSave
  },
  "Shaman":
  {
    "className":"Shaman",
    "hitDie":8,
    "skillPts":4,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.poorSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.goodSave
  },
  "Skald":
  {
    "className":"Skald",
    "hitDie":8,
    "skillPts":4,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.goodSave
  },
  "Slayer":
  {
    "className":"Slayer",
    "hitDie":10,
    "skillPts":6,
    "baseAtt":statGrowth.goodBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.goodSave,
    "willSave":statGrowth.poorSave
  },
  "Swashbuckler":
  {
    "className":"Swashbuckler",
    "hitDie":10,
    "skillPts":4,
    "baseAtt":statGrowth.goodBAB,
    "fortitudeSave":statGrowth.poorSave,
    "reflexSave":statGrowth.goodSave,
    "willSave":statGrowth.poorSave
  },
  "Warpriest":
  {
    "className":"Warpriest",
    "hitDie":8,
    "skillPts":2,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.goodSave,
    "reflexSave":statGrowth.poorSave,
    "willSave":statGrowth.goodSave
  },
  "ArcaneArcher":
  {
    "className":"Arcane Archer",
    "hitDie":10,
    "skillPts":4,
    "baseAtt":statGrowth.goodBAB,
    "fortitudeSave":statGrowth.PgoodSave,
    "reflexSave":statGrowth.PgoodSave,
    "willSave":statGrowth.PpoorSave
  },
  "ArcaneTrickster":
  {
    "className":"Arcane Trickster",
    "hitDie":6,
    "skillPts":4,
    "baseAtt":statGrowth.poorBAB,
    "fortitudeSave":statGrowth.PpoorSave,
    "reflexSave":statGrowth.PgoodSave,
    "willSave":statGrowth.PgoodSave
  },
  "Assassin":
  {
    "className":"Assassin",
    "hitDie":8,
    "skillPts":4,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.PpoorSave,
    "reflexSave":statGrowth.PgoodSave,
    "willSave":statGrowth.PpoorSave
  },
  "DragonDisciple":
  {
    "className":"Dragon Disciple",
    "hitDie":12,
    "skillPts":2,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.PgoodSave,
    "reflexSave":statGrowth.PpoorSave,
    "willSave":statGrowth.PgoodSave
  },
  "Duelist":
  {
    "className":"Duelist",
    "hitDie":10,
    "skillPts":4,
    "baseAtt":statGrowth.goodBAB,
    "fortitudeSave":statGrowth.PpoorSave,
    "reflexSave":statGrowth.PgoodSave,
    "willSave":statGrowth.PpoorSave
  },
  "EldritchKnight":
  {
    "className":"Eldritch Knight",
    "hitDie":10,
    "skillPts":2,
    "baseAtt":statGrowth.goodBAB,
    "fortitudeSave":statGrowth.PgoodSave,
    "reflexSave":statGrowth.PpoorSave,
    "willSave":statGrowth.PpoorSave
  },
  "Loremaster":
  {
    "className":"Loremaster",
    "hitDie":6,
    "skillPts":4,
    "baseAtt":statGrowth.poorBAB,
    "fortitudeSave":statGrowth.PpoorSave,
    "reflexSave":statGrowth.PpoorSave,
    "willSave":statGrowth.PgoodSave
  },
  "Mystic Theurge":
  {
    "className":"Mystic Theurge",
    "hitDie":6,
    "skillPts":2,
    "baseAtt":statGrowth.poorBAB,
    "fortitudeSave":statGrowth.PpoorSave,
    "reflexSave":statGrowth.PpoorSave,
    "willSave":statGrowth.PgoodSave
  },
  "PathfinderChronicler":
  {
    "className":"Pathfinder Chronicler",
    "hitDie":8,
    "skillPts":8,
    "baseAtt":statGrowth.poorBAB,
    "fortitudeSave":statGrowth.PpoorSave,
    "reflexSave":statGrowth.PgoodSave,
    "willSave":statGrowth.PgoodSave
  },
  "Shadowdancer":
  {
    "className":"Shadowdancer",
    "hitDie":8,
    "skillPts":6,
    "baseAtt":statGrowth.avgBAB,
    "fortitudeSave":statGrowth.PpoorSave,
    "reflexSave":statGrowth.PgoodSave,
    "willSave":statGrowth.PpoorSave
  }
};