var abilityScoreChart = {};

var graphNames=  
[
	{ 'id': 'abilityScoreGraphCanvas', 'graph': {} }
]

function initGraphs()
{
	// first graph only
	abilityScoreChart = new Chart(ctx).Radar(data, options);	
}