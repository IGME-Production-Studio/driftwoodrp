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

// Change the character's ability score. 
// Updates the data for the graph and the attributes of the
// character object. 
// stat: String of which statistic it is. 
// add: integer, negative or positive. Amount to add or subtract. 
function doAbilityScoreChange(stat, add)
{
	switch(stat)
	{
		case "Strength":
			character.abilityScores.Strength += add;
			abilityScoreChart.datasets[0].points[0].value = abilityScoreChart.datasets[0].points[0].value +add;
			break;
		case "Constitution":
			character.abilityScores.Constitution += add;
			abilityScoreChart.datasets[0].points[1].value = abilityScoreChart.datasets[0].points[1].value +add;
			break;
		case "Dexterity":
			character.abilityScores.Dexterity += add;
			abilityScoreChart.datasets[0].points[2].value = abilityScoreChart.datasets[0].points[2].value +add;
			break;
		case "Charisma":
			character.abilityScores.Charisma += add;
			abilityScoreChart.datasets[0].points[3].value = abilityScoreChart.datasets[0].points[3].value +add;
			break;
		case "Wisdom": 
			character.abilityScores.Wisdom += add;
			abilityScoreChart.datasets[0].points[4].value = abilityScoreChart.datasets[0].points[4].value +add;
			break;
		case "Intelligence":
			character.abilityScores.Intelligence += add;
			abilityScoreChart.datasets[0].points[5].value = abilityScoreChart.datasets[0].points[5].value +add;
			break;
	}
	abilityScoreChart.update();
};

// Initialize functionality of plus / minus buttons in the Basic Details / Stats tab. 
function initAbilityScoreBtns()
{
	$('#strPlus').click(function(){
		doAbilityScoreChange("Strength", 1);
	});
	$('#strMinus').click(function(){
		doAbilityScoreChange("Strength", -1);
	});
	// ----------------
	$('#conPlus').click(function(){
		doAbilityScoreChange("Constitution", 1);
	});
	$('#conMinus').click(function(){
		doAbilityScoreChange("Constitution", -1);
	});
	// ----------------
	$('#dexPlus').click(function(){
		doAbilityScoreChange("Dexterity", 1); 
	});
	$('#dexMinus').click(function(){
		doAbilityScoreChange("Dexterity", -1);
	});
	// ----------------
	$('#chaPlus').click(function(){
		doAbilityScoreChange("Charisma", 1);
	});
	$('#chaMinus').click(function(){
		doAbilityScoreChange("Charisma", -1);
	});
	// ----------------
	$('#wisPlus').click(function(){
		doAbilityScoreChange("Wisdom", 1);
	});	
	$('#wisMinus').click(function(){
		doAbilityScoreChange("Wisdom", -1);
	});
	// ----------------
	$('#intPlus').click(function()
	{
		doAbilityScoreChange("Intelligence", 1);
	});
	$('#intMinus').click(function()
	{	
		doAbilityScoreChange("Intelligence", -1);
	});
	// ----------------
}