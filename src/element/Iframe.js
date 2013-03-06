var Element = require("./Element.js");

// Video elements can't be moved around the dom because they'll reset

module.exports = IframeElement;

function IframeElement (element){
	Element.call(this, element);
	this.hide();
};
IframeElement.prototype = Object.create(Element.prototype);

IframeElement.prototype.hide = function(){
	Element.prototype.hide.call(this);
	this.element.style.opacity = 0;
};

IframeElement.prototype.show = function(left, top){
	Element.prototype.show.call(this, left, top);
	this.element.style.opacity = 1;
};
