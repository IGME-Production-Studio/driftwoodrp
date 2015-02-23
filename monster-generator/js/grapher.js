var abilityScoreChart = {};

var graphNames=  
[
	{ 'id': 'abilityScoreGraphCanvas', 'graph': {} }
]

var asInitialData = 
{
	labels: ['Strength', 'Constitution', 'Dexterity', 
			'Charisma', 'Wisdom', 'Intelligence', ], 
	datasets: 
	[{
		label: "Ability Scores", 
		fillColor: "rgba(26,122,77, .8)", 
		strokeColor: "rgba(3, 33, 19, 1)", 
		pointColor: "rgba(85, 237, 174, 1)", 
		pointStrokeColor: "#fff", 
		pointHighlightFill: "#fff", 
		pointHighlightStroke: "rgba(150,255,211,1)", 
		data: [10, 10, 10, 10, 10, 10]
	}]
};

var radarGraphOptions = 
{
	pointLabelFontFamily: "Helvetica", 
	pointLabelFontSize: 16, 
	responsive: true,
	scaleOverride: true,
	scaleSteps: 20,
	scaleStepWidth: 1, 
	scaleStartValue: 0
}
function initGraphs()
{
	// first graph only for now
	var ctx = document.getElementById(graphNames[0].id).getContext('2d');
	abilityScoreChart = new Chart(ctx).Radar(asInitialData, radarGraphOptions);	
}