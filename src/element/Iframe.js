'use strict';

var BaseElement = require('./Element.js');

module.exports = IframeElement;

// iOS has a rendering bug related to iframes,
var isiOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

function IframeElement (element){
	BaseElement.call(this, element, parseInt(element.width), parseInt(element.height));

	this.iframe = this.element.querySelector('iframe') || this.element;
	this.isLocal = this.iframe.contentDocument && this.iframe.contentDocument.body && 
		this.iframe.contentDocument.body.innerHTML !== '';
	
	// Hack to fix for iOS's failure to render the inside of a iframe 
	// when using css transforms. If we have permission to edit the iframe,
	// this method is much more performant that the hack in .show
	if(isiOS && this.isLocal){
		this.iframe.contentDocument.body.style.webkitTransform = 'translate3d(0, 0, 0)';
	}
	
	this.hide();
}
IframeElement.prototype = Object.create(BaseElement.prototype);

IframeElement.create = function(element){
	element = new IframeElement(element);
	return IframeElement.getApi(element);
};

IframeElement.getApi = function(element){
	return BaseElement.getApi(element);
};

IframeElement.prototype.hide = function(){
	BaseElement.prototype.hide.call(this);
	this.element.style.opacity = 0;
	
	if(this.fidget){
		clearInterval(this.fidget);
		this.fidget = void 0;
	}
};

IframeElement.prototype.show = function(left, top){
	BaseElement.prototype.show.call(this, left, top);
	this.element.style.opacity = 1;

	// Hack to fix for iOS's failure to render the 
	// inside of a iframe when using css transforms.
	if(isiOS && !this.isLocal && !this.fidget){
		var iframe = this.iframe,
			flipper = 0.001;

		this.fidget = setInterval(function(){
			iframe.style.opacity = 1 + flipper;
			flipper *= -1;
		}, 200);
	}
};
