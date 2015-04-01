// parse bestiary

function doTheParse()
{
	var mainText = "[";
	for(var i =0; i< bestiary.length; i++)
	{
		var subText = "{\"name\": \""+ bestiary[i].Name + "\","; 
		subText += "\"alignment\": \"" +bestiary[i].Alignment + "\",";

		subText += "\"drops\":{ \"xp\":\"" + bestiary[i].XP + "\",\"treasure\": \""+  bestiary[i].Treasure + "\", \"gear\": \"" + bestiary[i].Gear +"\"},";

		// classes
		subText += "\"classes\": { \"class1\": { \"name\": \"" + 
			bestiary[i].Class1 + "\", \"levels\": \"" 
			+ bestiary[i].Class1_Lvl + "\"}, \"class2\": { \"name\": \"" 
			+ bestiary[i].Class2 + "\", \"levels\": \"" 
			+ bestiary[i].Class2_Lvl + "\"}}, ";


		subText += "\"classifications\": { \"type\": \"" + bestiary[i].Type + "\", \"subtype\": ["; 
			if( bestiary[i].subtype1.length != 0){ subText += "\""+ bestiary[i].subtype1 + "\""; if(bestiary[i].subtype2.length != 0){ subText += ", ";}}
				if( bestiary[i].subtype2.length != 0){ subText += "\""+ bestiary[i].subtype2 + "\""; if(bestiary[i].subtype3.length != 0){ subText += ", ";}}
					if( bestiary[i].subtype3.length != 0){ subText += "\""+ bestiary[i].subtype3 + "\""; if(bestiary[i].subtype4.length != 0){ subText += ", ";}}
						if( bestiary[i].subtype4.length != 0){ subText += "\""+ bestiary[i].subtype4 + "\""; if(bestiary[i].subtype5.length != 0){ subText += ", ";}}
							if( bestiary[i].subtype5.length != 0){ subText += "\""+ bestiary[i].subtype5 + "\""; if(bestiary[i].subtype6.length != 0){ subText += ", ";}}
								if( bestiary[i].subtype6.length != 0){ subText += "\""+ bestiary[i].subtype6+ "\"";}
		subText += "], \"group\": "; // end subtypes
		subText += "\"" + bestiary[i].Group + "\"}, "; // end classifications (will need comma);

		subText += "\"features\": { \"languages\": [";
			// get all languages
			var lang = bestiary[i].Languages.split(','); 
			for(var l = 0; l < lang.length; l ++)
			{
				subText += "\"" + lang[l] + "\""; 
				if(l != lang.length-1) subText += ", "; 
			}
		subText += ", \"sq\": \"" + bestiary[i].SQ + "\", \"environment\": \""+ bestiary[i].Environment + "\", \"organization\": \"" + bestiary[i].Organization +"\"}, ";
		subText += "\"isCharacter\": "; 
			if(bestiary[i].CharacterFlag == 1) subText += "true, ";
			else subText += "false, ";
		subText += "\"isCompanion\": "; 
			if(bestiary[i].CompanionFlag == 1) subText += "true, "; 
			else subText += "false, "; 

		subText += "\"savingThrows

		subText += "}"; // end creature object
		if(i < bestiary.length-1) subText += ","; // If there is another element after this, add a comma
		mainText += subText; 
	}

	mainText+="]"; // end array
	$('#main').html(mainText);
}


/*

	"savingThrows": {"fort": 0, "ref": 0, "wil": 0 }, 
	"combatInfo": {"cr": 0, "melee": "", "ranged": "" , "ac": 0, "ac_touch": 0, "ac_flatFooted": 0 },
	"spatial": {"size": "Gargantuan", "space": 0, "reach": 0}, 
	"abilityScores": {"str": 0, "dex": 0, "con": 0, "int": 0, "wis": 0, "cha": 0},
	"hitPoints": {"hitDie": "", "hp": 0}, 
	"feats": [], 
	"skills": [],
	"speed": { "speed": "", "baseSpeed": 0, "flySpeed": "", "maneuverability": "", "climbSpeed": 0, "swimSpeed": 0, "burrowSpeed": 0, "speedSpecial": "", "speedLand": 0, "fly": 0, "climb": 0, "burrow": 0, "swim": 0}
	"notes": ""
		//"features": {"languages": [], "sq": "", "environment": "Underground", "organization": "Solitary or nest (2-20)"},
//	"isCharacter": false, 
//	"isCompanion": false,
*/