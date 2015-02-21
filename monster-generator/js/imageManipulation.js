//concatenates the new image
function imageHandler(e2)
{
	var store = document.getElementById('imgstore');
	store.innerHTML='<img src="' + e2.target.result + '" height = 187 width = 280>';
}

//loads the new image on the file
function loadimage(e1)
{
	var filename = e1.target.files[0];
	var fr = new FileReader();
	fr.onload = imageHandler;
	fr.readAsDataURL(filename);
	
	//changes the image value of the NPC class
	//will be updated later
	npc.image = "new image";
	//console.log(npc.image);
	
	//removes stock image
	if(document.getElementById('tempPicture'))
	{
		var stockImg = document.getElementById('tempPicture');
		stockImg.parentNode.removeChild(stockImg);
	}
}

//adds event listeners for the upload functionality to work
function imageManipulation()
{
	var y = document.getElementById("getimage");
	y.addEventListener('change',loadimage, false);
}