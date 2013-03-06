module.exports = Element;

function Element(domElement, width, height){
	this.element = domElement;
	this.width = width || domElement.width || parseInt(domElement.clientWidth);
	this.height = height || domElement.height || parseInt(domElement.clientHeight);
	this.locations = [];
};

Element.prototype.chanceMultiplier = 1;

Element.prototype.isIn = function(left, top, right, bottom){
	var locationIndex = this.locations.length,
		boundingBox;

	while(boundingBox = this.locations[--locationIndex]){
		if((((left < boundingBox.left && boundingBox.left < right) ||
				(boundingBox.right < right && left < boundingBox.right)) &&
			((top < boundingBox.top && boundingBox.top < bottom) || 
				(boundingBox.bottom < bottom && top < boundingBox.bottom)))){
			return true;
		}
	}

	return false;
}

Element.prototype.reposition = function(left, top){
	this.element.style.left = left + "px";
	this.element.style.top = top + "px";
};

Element.prototype.hide = function(){};

Element.prototype.show = function(left, top){
	this.reposition(left, top);
};