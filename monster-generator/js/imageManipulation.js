function imageHandler(e2)
{
	var store = document.getElementById('imgstore');
	store.innerHTML='<img src="' + e2.target.result + '" height = 187 width = 280>';
}

function loadimage(e1)
{
	var filename = e1.target.files[0];
	var fr = new FileReader();
	fr.onload = imageHandler;
	fr.readAsDataURL(filename);
}

function imageManipulation()
{
	var y = document.getElementById("getimage");
	y.addEventListener('change',loadimage, false);
}