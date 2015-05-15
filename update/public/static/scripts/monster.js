function monster(data, skills, feats, container)
{
  this.data = data;
  this.skills = skills;
  this.feats = feats;
  this.container = container;
}

monster.prototype.initialize = function()
{
  this.addEventListeners();
}

monster.prototype.addEventListeners = function()
{
  this.container.addEventListener('dragstart', this.dragStart.bind(this), false);
}

monster.prototype.dragStart = function(event)
{
  this.container.style.opacity = 0.4;
}
