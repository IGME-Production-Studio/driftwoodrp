//*************************************************************
//  Filename: helper.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

function arrayContains(array, element) 
{
	for(var i = 0; i < array.length; i++) 
	{
		if(array[i] == element) 
		{
			return i;
		}
	}

	return -1;
}