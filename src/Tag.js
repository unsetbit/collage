module.exports = Tag;

function Tag(){
	this.elements = [];
}

Tag.create = function(options){
	options = options || {};
	var tag = new Tag();
	
	if("skipProbability" in options) tag.skipProbability = options.skipProbability;
	if("tryLimit" in options) tag.tryLimit = options.tryLimit;

	return tag;
};

Tag.prototype.chanceMultiplier = 1;
Tag.prototype.skipProbability = 0;

Tag.prototype.add = function(element){
	var chanceMultiplier = element.chanceMultiplier;
	while(chanceMultiplier--) this.elements.push(element);
};

Tag.prototype.remove = function(element){
	var	index;

	// Remove all instances of the element
	while(~(index =  this.elements.indexOf(element))){
		this.elements.splice(index, 1);
	}
};

Tag.prototype.getElements = function(){
	return this.elements.slice();
};

Tag.prototype.getRandomElement = function(){
	return this.elements[(Math.random() * this.elements.length)|0];
};


