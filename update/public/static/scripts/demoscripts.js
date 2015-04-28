'use strict'; 
console.log('script loaded');
window.onload = init;

function init()
{
	console.log('page loaded');
	$('#mgentabs').tabs();


	// Set up events
	$('#saveicon').click(function()
	{
		doSaveMonster(); 
	});

	$('#xicon').click(function()
	{
		doExitMgen();
	});
	$('#newmonster').click(function()
	{
		doNewMgen();
	});
	doLoadMonster(bestiary[0]);

	$('#m_name').keyup(function()
	{
		$('#monstertitle').html($('#m_name').val());
	});

	// Set up the tabs
	$('#tab-chat').click(function(){hideTabs(); $('#chat').css('display', 'visible'); console.log("Showing chat");});
	$('#tab-objects').click(function(){hideTabs(); $('#objects').css('display', 'visible'); console.log("Showing objects");}); 
	$('#tab-monsters').click(function(){hideTabs(); $('#monsters').css('display', 'visible'); console.log("Showing monsters");});
	$('#tab-social').click(function(){hideTabs(); $('#social').css('display', 'visible'); console.log("Showing social");});
}

function hideTabs()
{
	$('#chat').css('display', 'none'); 
	$('#objects').css('display', 'none'); 
	$('#social').css('display', 'none'); 
	$('#monsters').css('display', 'none'); 

}
function doSaveMonster()
{
	console.log("saving monster");
	saveEditedMonster();
}

// load a monster object into the monster generator for editing
function doLoadMonster(monsterobj)
{
	console.log(monsterobj.name);

	$('#monstertitle').html(monsterobj.name);
	// Load values into inputs
	$('#m_name').val(monsterobj.name);
	$('#m_class1').val(monsterobj.classes.class1.name); 
	$('#m_class2').val(monsterobj.classes.class2.name);
	$('#m_alignment').val(monsterobj.alignment);
	$('#m_hp').val(monsterobj.hitPoints.hp);
	$('#m_hitdie').val(monsterobj.hitPoints.hitDie); 
	$('#m_size').val(monsterobj.spatial.size); 
	$('#m_ac').val(monsterobj.combatInfo.ac); 
	$('#m_cr').val(monsterobj.combatInfo.cr); 
	$('#m_melee').val(monsterobj.combatInfo.melee); 
	$('#m_ranged').val(monsterobj.combatInfo.ranged); 
	$('#m_actouch').val(monsterobj.combatInfo.ac_touch); 
	$('#m_acflat').val(monsterobj.combatInfo.ac_flatFooted); 
	$('#m_forts').val(monsterobj.savingThrows.fort); 
	$('#m_refs').val(monsterobj.savingThrows.ref); 
	$('#m_wils').val(monsterobj.savingThrows.wil); 

	$('#m_str').val(monsterobj.abilityScores.str); 
	$('#m_dex').val(monsterobj.abilityScores.dex); 
	$('#m_con').val(monsterobj.abilityScores.con); 
	$('#m_int').val(monsterobj.abilityScores.int); 
	$('#m_wis').val(monsterobj.abilityScores.wis);
	$('#m_cha').val(monsterobj.abilityScores.cha); 

	$('#notesarea').val(monsterobj.notes);

	$('#m_class1levels').val(monsterobj.classes.class1.levels); 
	$('#m_class2levels').val(monsterobj.classes.class2.levels); 

	$('#m_xp').val(monsterobj.drops.xp); 
	$('#m_treasure').val(monsterobj.drops.treasure); 
	$('#m_gear').val(monsterobj.drops.gear); 

	var s = $('#m_skills').val();
	for(var i = 0; i < monsterobj.skills.length; i++)
	{
		s += monsterobj.skills[i];
		s += ", "; 		
		
	}
	$('#m_skills').val(s);

	for(var i = 0; i <monsterobj.feats.length; i++)
	{
		var x = $('#m_feats').val();
		x += monsterobj.feats[i];
		x += ", "; 		
		$('#m_feats').val(x);
	}

};

function doExitMgen()
{
 // for now, just close the window
 $('#monsteredit').slideUp();
}

function getBlankMonster()
{
	return bestiary[3];
};

function doNewMgen()
{
	$('#monsteredit').slideDown(); 
	doLoadMonster(getBlankMonster());
}

function saveEditedMonster()
{
	var blank = bestiary[0]; 
	blank.name = $('#m_name').val();
	blank.classes.class1.name = $('#m_class1').val(); 
	blank.classes.class2.name = $('#m_class2').val();
	blank.alignment = $('#m_alignment').val();
	blank.hitPoints.hp = $('#m_hp').val();
	blank.hitPoints.hitDie = $('#m_hitdie').val(); 
	blank.spatial.size = $('#m_size').val(); 
	blank.combatInfo.ac = $('#m_ac').val(); 
	blank.combatInfo.cr = $('#m_cr').val(); 
	blank.combatInfo.melee = $('#m_melee').val(); 
	blank.combatInfo.ranged = $('#m_ranged').val(); 
	blank.combatInfo.ac_touch = $('#m_actouch').val(); 
	blank.combatInfo.ac_flatFooted = $('#m_acflat').val(); 
	blank.savingThrows.fort = $('#m_forts').val(); 
	blank.savingThrows.ref = $('#m_refs').val(); 
	blank.savingThrows.wil = $('#m_wils').val(); 

	blank.abilityScores.str = $('#m_str').val(); 
	blank.abilityScores.dex = $('#m_dex').val(); 
	blank.abilityScores.con = $('#m_con').val(); 
	blank.abilityScores.int = $('#m_int').val(); 
	blank.abilityScores.wis = $('#m_wis').val();
	blank.abilityScores.cha = $('#m_cha').val(); 

	blank.notes = $('#notesarea').val();

	blank.classes.class1.levels = $('#m_class1levels').val(); 
	blank.classes.class2.levels = $('#m_class2levels').val(); 

	var skills = $('#m_skills').val(); 
	skills = skills.split(','); 
	for(var i = 0; i < skills.length; i++)
	{
		blank.skills.push(skills[i]);
	}

	var feats = $('#m_feats').val(); 
	feats = feats.split(','); 
	for(var i = 0; i < feats.length; i++)
	{
		blank.feats.push(feats[i]);
	}

	console.log(blank);


	 var a = document.createElement('div'); 
	 $(a).addClass('iconarea')
	 var b = document.createElement('div'); 
	 $(b).addClass('monstericon genericicon');
	 $(a).append(b); 
	 var p = document.createElement('p'); 
	 $(p).html(blank.name);
	 $(a).append(p); 
	 $('#newmonster').before(a);
}