var Collection = require("./Collection.js"),
	StaticElement = require("./element/Static.js");

var ImageCollection = module.exports = function(){
	Collection.apply(this, arguments);
}

ImageCollection.create = function(collage, options){
	options = options || {};

	var collection = new ImageCollection(collage);

	if(options.tryLimit) collection.tryLimit = options.tryLimit;
	if(options.priority !== void 0) collection.priority = options.priority;
	if(options.skipProbability !== void 0) collection.skipProbability = options.skipProbability;
	if(!options.disabled) collection.enable();

	return ImageCollection.getApi(collection);
};
ImageCollection.prototype = Object.create(Collection.prototype);

ImageCollection.getApi = function(collection){
	var api = Collection.getApi(collection);

	api.add = collection.add.bind(collection);
	api.loadFromFlickr = require("./loader/flickr.js").bind(collection);

	return api;
};

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
		var item =  new StaticElement(img);
		self.addResource(src, item);
	};

	img.onerror = function(){
		self.clearLoading();
		self.removeResource(src);
	};
};