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
		subText += "], \"sq\": \"" + bestiary[i].SQ + "\", \"environment\": \""+ bestiary[i].Environment + "\", \"organization\": \"" + bestiary[i].Organization +"\"}, ";
		subText += "\"isCharacter\": "; 
			if(bestiary[i].CharacterFlag == 1) subText += "true, ";
			else subText += "false, ";
		subText += "\"isCompanion\": "; 
			if(bestiary[i].CompanionFlag == 1) subText += "true, "; 
			else subText += "false, "; 

		subText += "\"savingThrows\": { \"fort\": \"" + bestiary[i].Fort + "\", \"ref\": \"" + bestiary[i].Ref + "\", \"wil\": \"" + bestiary[i].Will + "\"},";
		subText += "\"combatInfo\": {\"cr\": \"" + bestiary[i].CR + "\", \"melee\": \"" + bestiary[i].Melee + "\", \"ranged\": \"" + bestiary[i].Ranged + "\", \"ac\": \"" + bestiary[i].AC + "\", \"ac_touch\": \"" + bestiary[i].AC_Touch + "\", \"ac_flatFooted\": \"" + bestiary[i].AC_Flatfooted + "\"},";
		subText += "\"spatial\": {\"size\": \"" + bestiary[i].Size + "\", \"space\": \"" + bestiary[i].Space + "\", \"reach\": \"" + bestiary[i].Reach + "\"},"; // space, reach

		subText += "\"abilityScores\": {\"str\": \"" + bestiary[i].Str + "\", \"dex\": \"" + bestiary[i].Dex + "\", \"con\": \"" + bestiary[i].Con + "\", \"int\": \"" + bestiary[i].Int + "\", \"wis\": \""+ bestiary[i].Wis + "\", \"cha\": \"" + bestiary[i].Cha + "\"},";
		subText += "\"hitPoints\": {\"hitDie\": \"" + bestiary[i].HD + "\", \"hp\": \"" + bestiary[i].HP + "\" },";
		subText += "\"feats\": [";

		// Get all the feats loaded in 
			var fs = bestiary[i].Feats; 
			var fsarray = fs.split(','); // array of all feats
			for(var z = 0; z < fsarray.length; z ++) 
			{
				subText += "\"" + fsarray[z] + "\""; 
				if( z != fsarray.length-1 ) subText += ",";
			}

		subText += "],";

		// Skills - here we go
		subText += "\"skills\":[";

			var sk = bestiary[i].Skills; 
			var skarray = sk.split(','); 
			for(var y = 0; y < skarray.length; y ++)
			{
				subText += "\"" + skarray[y] + "\""; 
				if( y != skarray.length-1 ) subText += ","; 
			}
		subText += "],"; // end skills

		subText += "\"speed\": { \"speed\": \"" + bestiary[i].Speed + "\", \"baseSpeed\":  \"" + bestiary[i].Base_Speed + "\", \"flySpeed\": \"" + bestiary[i].Fly_Speed + "\", \"maneuverability\": \"" + bestiary[i].Maneuverability + "\", "; 
		subText += "\"climbSpeed\": \"" + bestiary[i].Climb_Speed + "\", \"swimSpeed\": \"" + bestiary[i].Swim_Speed + "\", \"burrowSpeed\": \"" + bestiary[i].Burrow_Speed + "\", \"speedSpecial\": \"" + bestiary[i].Speed_Special + "\", \"speedLand\": \"" + bestiary[i].Speed_Land + "\", \"fly\": \"" + bestiary[i].Fly + "\", \"climb\": \"" + bestiary[i].Climb + "\", \"burrow\": \"" + bestiary[i].Burrow + "\", \"swim\": \"" + bestiary[i].Swim + "\"},";
		subText += "\"notes\": \"none\"";
			subText += "}"; // end creature object
		if(i < bestiary.length-1) subText += ","; // If there is another element after this, add a comma
		mainText += subText; 
	} // end loop

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