// Graph Manager

// Store ids of what we need to initialize
var graphids = 
[
	'hpGraph', 
	'strGraph', 
	'chaGraph', 
	'dexGraph', 
	'intGraph', 
	'wisGraph'
];


// Define sample data for graph
var data1 = 
{
	labels: ['1','2','3','4','5','6','7','8','9','10'], 
	datasets: 
	[
		{
			label: 'My First Dataset', 
			fillColor: 'rgba(220, 220,220, 0.5)', 
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
	console.log("initializing graphs");
	var ctx = document.getElementById(graphids[0]).getContext('2d'); 

	var myChart = new Chart(ctx).Bar(data1);

}

$(document).ready(
{
	initGraphs(); 
});