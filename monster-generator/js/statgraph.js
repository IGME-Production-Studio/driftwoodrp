// StatGraph

// A graph will have to know about the challenge rating on the page. 

// The maximum / minimum should change every time the CR gets changed, 
// but the stat curve (ratio) should remain the same. 


// Graph object 
function Graph()
{
	// Attributes of the graph
	this.NUM_COLUMNS = 10;

	this.isMouseDown = false; 

	this.init = function()
	{
		console.log("Graph created.");
	};

	// --------------------
	// Mouse Functions
	// --------------------
	$(this).mousedown(function()
		{
			// On mousedown, the graph checks for which bar the mouse is over and 
			// sets the y position of that bar to the next approximate height. 
			isMouseDown = true; 
		});
	$(this).mousemove(function()
		{
			// On mousemove, if the mouse is down, do mousedown events for each bar, changing 
			// height as the mouse is dragged. 
		});
	$(this).mouseup(function()
		{
			// Reset the graph variable that says the mouse is down. 
		});
	



};