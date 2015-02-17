// Graph Manager

// Store ids of what we need to initialize
var graphids = 
[
	{'id': 'hpGraph', 'graph': {}},
	{'id': 'strGraph', 'graph': {}},
	{'id': 'chaGraph', 'graph': {}},
	{'id': 'dexGraph', 'graph': {}},
	{'id': 'intGraph', 'graph': {}},
	{'id': 'wisGraph', 'graph': {}}
];

// "Enum" for presets (used for comparison and passing to setGraphPreset() ) 
var GRAPH_PRESET_SMALL = 0; 
var GRAPH_PRESET_MEDIUM = 1; 
var GRAPH_PRESET_LARGE = 2; 

// Helper function: Takes string of 
// Graph ID and returns the graph object associated. 
function getGraphObj(graphID)
{
	for(var i =0;i< graphids.length; i++)
	{
		if(graphids[i].id == graphID)
			return graphids[i].graph;
		else continue; 
	}
}

// Set a graph to a pre-defined preset, small medium or large (for now) 
// graphID: id of the graph's element in the document.
// graphPreset: "enum" of what you would like e.g. GRAPH_PRESET_SMALL, etc. 
function setGraphPreset(graphID, graphPreset)
{
	// Get the graph object
	var graph = getGraphObj(graphID);
	
	for(var i = 0; i < graph.datasets[0].points.length; i++)
	{
		graph.datasets[0].points[i].value ++;
	}

};

// Increment graph as a matter of scale. 
function incrementGraph(graphID)
{
	// Easy access to graph obj
	var graph = getGraphObj(graphID); 
	if(graph == undefined){ return; }

	console.log(graph);
	console.log(graph.datasets);
	for(var i = 0; i < graph.datasets[0].points.length; i++)
	{
		graph.datasets[0].points[i].value ++;
	}
	graph.update();
}

function decrementGraph(graphID)
{
// easy access to graph obj
	var graph = getGraphObj(graphID); 
	if(graphID == undefined) return; 

	for(var i = 0; i < graph.datasets[0].points.length; i++)
	{
		graph.datasets[0].points[i].value --;
	}
	graph.update();
}

// Resizes the graphs when the window is resized. 
window.onresize = function()
{
	for(var i =0; i < graphids.length; i++)
	{
		// updating
		graphids[i].graph.update();
	}
}

// Added this comment
// Define sample data for graph
var data1 = 
{
	labels: ['1','2','3','4','5','6','7','8','9','10'], 
	datasets: 
	[
		{
			label: 'My First Dataset', 
			fillColor: 'rgba(250,50,133, 0.5)', 
			strokeColor: 'rgba(0,0,0)',
			highlightFill: 'rgba(209,105,214)',
			highlightStroke: 'rgba(112,11,117)', 
			data: [.5,1,1.5,2,2.5,3,3.5,4,4.5, 5]
		}
	]
};

// Pass in 2D context of each canas to initialize chart. 
function initGraphs()
{
	for(var i =0; i < graphids.length; i++)
	{
		var ctx = document.getElementById(graphids[i].id).getContext('2d'); 

		var myChart = new Chart(ctx).Line(data1, 
			{ scaleOverride: true, scaleSteps: 10, scaleStepWidth: 1, 
				scaleStartValue: 0, scalescaleShowGridLines: true, pointHitDetectionRadius: 10, datasetFill: true, responsive: true});
		 
		graphids[i].graph = myChart;

		// Graph click event. For interactivity. 
		$('#'+ graphids[i].id).click(function(evt)
		{
			console.log("CLICK!");
			var activePts = getGraphObj( $(this).attr('id') ).getPointsAtEvent(evt);
			console.log(activePts);
			// Test
			activePts[0].value ++; 
			getGraphObj( $(this).attr('id') ).update(); 
			console.log( getGraphObj($(this).attr('id')));
		});
	}
};

window.onload = function(){

	console.log("initializing graphs");
	initGraphs();

	$('#plusHP').click(function()
	{
		incrementGraph( 'hpGraph');
		console.log("incremented?");
	});
	$('#minusHP').click(function()
	{
		decrementGraph( 'hpGraph');
		console.log("decremented?");
	});
};
