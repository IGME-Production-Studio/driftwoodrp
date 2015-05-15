//*************************************************************
//  Filename: helper.js
//
//  Author: Jake Higgins <jth7036@rit.edu>
//*************************************************************

//*************************************************************
//  Function:
//      arrayContains
//
//  Parameters:
//    array - The array to search through
//		element - The element to find in the array
//
//  Description:
//      Determines if an element is contained within an array
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