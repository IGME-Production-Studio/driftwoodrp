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
			+ bestiary[i].Class2_Lvl + "\"}}";

		subText += "}";
		if(i < bestiary.length-1) subText += ","
		mainText += subText; 
	}

	mainText+="]";
	$('#main').html(mainText);
}