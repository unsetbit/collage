'use strict';

var BaseElement = require('./Element.js');

module.exports = SimpleElement;

function SimpleElement (element){
	BaseElement.call(this, element, parseInt(element.width), parseInt(element.height));
	this.appended = undefined;
}
SimpleElement.prototype = Object.create(BaseElement.prototype);

SimpleElement.create = function(element){
	element = new SimpleElement(element);
	return SimpleElement.getApi(element);
};

SimpleElement.getApi = function(element){
	return BaseElement.getApi(element);
};

//var hidingArea = document.createDocumentFragment();
SimpleElement.prototype.hide = function(){	
	BaseElement.prototype.hide.call(this);
	this.element.style.display = 'none';
	//hidingArea.appendChild(this.element);
};

SimpleElement.prototype.show = function(left, top, container){
	BaseElement.prototype.show.call(this, left, top);
	this.element.style.display = 'block';
	if(!this.appended){
		container.appendChild(this.element);
		this.appended = true;
	}
};