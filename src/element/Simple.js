var Element = require("./Element.js");

module.exports = SimpleElement;

function SimpleElement (element){
	Element.call(this, element, parseInt(element.width), parseInt(element.height));
	this.appended;
};
SimpleElement.prototype = Object.create(Element.prototype);

SimpleElement.create = function(element){
	element = new SimpleElement(element);
	return SimpleElement.getApi(element);
}

SimpleElement.getApi = function(element){
	return Element.getApi(element);
};

var hidingArea = document.createDocumentFragment();
SimpleElement.prototype.hide = function(){	
	Element.prototype.hide.call(this);
	this.element.style.display = "none";
	//hidingArea.appendChild(this.element);
};

SimpleElement.prototype.show = function(left, top, container){
	Element.prototype.show.call(this, left, top);
	this.element.style.display = "block";
	if(!this.appended){
		container.appendChild(this.element);
		this.appended = true;
	}
};