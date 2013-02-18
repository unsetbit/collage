module.exports = StaticElement;

function StaticElement (element){
	this.element = element;

	this.locations = [];
	
	this.width = parseInt(element.width);
	this.height = parseInt(element.height);
};

var hidingArea = document.createDocumentFragment();

StaticElement.prototype.hide = function(){
	hidingArea.appendChild(this.element);
};

StaticElement.prototype.show = function(left, top, container){
	this.element.style.left = left + "px";
	this.element.style.top = top + "px";
	container.appendChild(this.element);
};