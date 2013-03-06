module.exports = Element;

function Element(domElement, width, height){
	this.element = domElement;
	this.width = width || domElement.width || parseInt(domElement.clientWidth);
	this.height = height || domElement.height || parseInt(domElement.clientHeight);
	this.locations = [];
};

Element.create = function(domElement, width, height){
	var element = new Element(domElement, width, height);
	return Element.getApi(element);
};

Element.getApi = function(element){
	var api = {};
	
	api.isIn = element.isIn.bind(element);
	api.reposition = element.reposition.bind(element);
	api.show = element.show.bind(element);
	api.hide = element.hide.bind(element);

	Object.defineProperty(api, "width", {
		get: function(){return element.width;}
	});

	Object.defineProperty(api, "height", {
		get: function(){return element.height;}
	});

	Object.defineProperty(api, "chanceMultiplier", {
		get: function(){return element.chanceMultiplier;},
		set: function(value){ element.chanceMultiplier = value;}
	});

	Object.defineProperty(api, "locations", {
		get: function(){return element.locations}
	});

	return api;
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