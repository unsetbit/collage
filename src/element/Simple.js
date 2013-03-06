var Element = require("./Element.js");

module.exports = StaticElement;

function StaticElement (element){
	Element.call(this, element, parseInt(element.width), parseInt(element.height));
};
StaticElement.prototype = Object.create(Element.prototype);

var hidingArea = document.createDocumentFragment();
StaticElement.prototype.hide = function(){	
	Element.prototype.hide.call(this);
	hidingArea.appendChild(this.element);
};

StaticElement.prototype.show = function(left, top, container){
	Element.prototype.show.call(this, left, top);
	container.appendChild(this.element);
};