// StatGraph

// A graph will have to know about the challenge rating on the page. 

// The maximum / minimum should change every time the CR gets changed, 
// but the stat curve (ratio) should remain the same. 


// Graph object 
function Graph()
{
	// Attributes of the graph
	this.NUM_COLUMNS = 10,
	this.maximum = 1, // arbitrary min & max for now
	this.minimum = 0, 

	// The graph, when initialized, should take a div and transform it into an 
	// editable bar graph. 
	this.init = function()
	{
		console.log("Graph initialized"); 
	},

	this.onclick = function()
	{

	},

	

};