// parse bestiary

function doTheParse()
{
	var mainText; 
	for(var i =0; i< bestiary.length; i++)
	{
		var subText = "{\"name\": \""+ bestiary[i].Name + "\","; 
		subText += "\"alignment\": \"" +bestiary[i].Alignment + "\",";

		subText += "\"drops\":{ \"xp\":\"" + bestiary[i].XP + "\",\"treasure\": \""+  bestiary[i].Treasure + "\", \"gear\": \"" + bestiary[i].Gear +"\"}";

		// classes
		//subText += "'classes': {"
		subText += "},"; 
		mainText += subText; 
	}

	$('#main').html(mainText);
}