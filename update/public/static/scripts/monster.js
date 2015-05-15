function monster(data, skills, feats, container)
{
  this.image = "static/images/goblin.png";
  this.data = data;
  this.skills = skills;
  this.feats = feats;
  this.container = container;
}

monster.prototype.initialize = function()
{
  this.container.draggable = true;
  this.addEventListeners();
}

monster.prototype.addEventListeners = function()
{
  this.container.addEventListener('dragstart', this.dragStart.bind(this), false);
  this.container.addEventListener('dragend', this.dragEnd.bind(this), false);
}

monster.prototype.dragStart = function(event)
{
  this.container.style.opacity = 0.4;
  Tools.target = this.data.name;
}

monster.prototype.dragEnd = function(event)
{
  console.log(event);
  this.container.style.opacity = 1;
  Tools.target = null;
}
