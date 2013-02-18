// Video elements can't be moved around the dom because they'll reset

module.exports = IframeElement;

function IframeElement (element){
	this.element = element;
	
	this.width = this.element.clientWidth;
	this.height = this.element.clientHeight;
	this.locations = [];
	
	this.hide();
};

IframeElement.prototype.hide = function(){
	this.element.style.opacity = 0;
};

IframeElement.prototype.show = function(left, top){
	this.element.style.opacity = 1;
	this.element.style.left = left + "px";
	this.element.style.top = top + "px";
};
