'use strict';

module.exports = BaseElement;

function BaseElement(domElement, width, height){
	this.element = domElement;
	this.width = width || domElement.width || parseInt(domElement.clientWidth);
	this.height = height || domElement.height || parseInt(domElement.clientHeight);
	this.locations = [];
	this.isVisible = undefined;
	
	this.element.style.position = 'absolute';
}

BaseElement.create = function(domElement, width, height){
	var element = new BaseElement(domElement, width, height);
	return BaseElement.getApi(element);
};

BaseElement.getApi = function(element){
	var api = {};
	api.element = element.element;
	api.isIn = element.isIn.bind(element);
	api.reposition = element.reposition.bind(element);
	api.show = element.show.bind(element);
	api.hide = element.hide.bind(element);

	Object.defineProperty(api, 'width', {
		get: function(){return element.width;}
	});

	Object.defineProperty(api, 'visible', {
		get: function(){return element.isVisible;}
	});

	Object.defineProperty(api, 'height', {
		get: function(){return element.height;}
	});

	Object.defineProperty(api, 'chanceMultiplier', {
		get: function(){return element.chanceMultiplier;},
		set: function(value){ element.chanceMultiplier = value;}
	});

	Object.defineProperty(api, 'locations', {
		get: function(){return element.locations; }
	});

	return api;
};

BaseElement.prototype.chanceMultiplier = 1;

BaseElement.prototype.isIn = function(left, top, right, bottom){
	var locationIndex = this.locations.length,
		boundingBox = this.locations[--locationIndex];

	while(boundingBox){
		if((((left < boundingBox.left && boundingBox.left < right) ||
				(boundingBox.right < right && left < boundingBox.right)) &&
			((top < boundingBox.top && boundingBox.top < bottom) || 
				(boundingBox.bottom < bottom && top < boundingBox.bottom)))){
			return true;
		}
		boundingBox = this.locations[--locationIndex];
	}

	return false;
};

BaseElement.prototype.reposition = function(left, top){
	this.element.style.left = left + 'px';
	this.element.style.top = top + 'px';
};

BaseElement.prototype.hide = function(){
	this.isVisible = false;
};

BaseElement.prototype.show = function(left, top){
	this.reposition(left, top);
	this.isVisible = true;
};