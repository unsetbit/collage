var Collection = require("./Collection.js"),
	StaticElement = require("./element/static.js");

module.exports = function(){
	var collection = new ImageCollection();
	return getApi(collection);
};

function getApi(collection){
	var api = Collection.getApi(collection);

	api.add = collection.add.bind(collection);
	api.loadFromFlickr = require("./loader/flickr.js").bind(collection);

	return api;
};

function ImageCollection(){
	Collection.apply(this, arguments);
}
ImageCollection.prototype = Object.create(Collection.prototype);

var documentFragment = document.createDocumentFragment();

ImageCollection.prototype.add = function(src){
	if(this.hasResource(src)) return;
	
	var self = this,
		img = new Image();
	img.src = src;
	
	this.markResource(src);
	
	img.onload = function(){
		// This forces FF to set the width/height
		documentFragment.appendChild(img);
		self.addResource(src, new StaticElement(img));
	}
};