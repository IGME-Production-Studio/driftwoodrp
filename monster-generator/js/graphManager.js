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

function getGraphObj(graphID)
{
	for(var i =0;i< graphids.length; i++)
	{
		if(graphids[i].id == graphID)
			return graphids[i].graph;
		else continue; 
	}
}

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
			data: [0,1,2,3,4,5,6,7,8,9,10]
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
			{ scaleShowGridLines: true, pointHitDetectionRadius: 10, datasetFill: true, responsive: true});
		 
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

window.onresize = function()
{
	for(var i =0; i < graphids.length; i++)
	{
		// updating
		graphids[i].graph.update();
	}
}

function updateGlobalChartConfigs()
{

};


window.onload = function(){

	console.log("initializing graphs");
	initGraphs();
};