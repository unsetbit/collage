var EventEmitter = require('eventEmitter/EventEmitter.js').EventEmitter;

var Collection = module.exports = function(collage, disable){
	this.emitter = new EventEmitter();
	this.collage = collage;
	this.waiting = 0;
	this.count = 0;
	this.loaded = [];
	this.resources = {};

	if(disable){
		this.disable();
	} else {
		this.enable();
	}
}

Collection.getApi = function(collection){
	var api = {};

	api.element = collection.getRandom.bind(collection);
	api.progress = collection.getProgress.bind(collection);
	api.on = collection.emitter.on.bind(collection.emitter);
	api.removeListener = collection.emitter.removeListener.bind(collection.emitter);
	api.enable = collection.enable.bind(collection);
	api.disable = collection.disable.bind(collection);
	
	Object.defineProperty(api, "skipProbability", {
		get: function(){ return collection.skipProbability; },
		set: function(value){
			collection.skipProbability = value;
		}
	});

	Object.defineProperty(api, "priority", {
		get: function(){ return collection.priority; },
		set: function(value){
			collection.priority = value;

			if(collection.enabled){
				collection.collage.removeCollection(collection);
				collection.collage.addCollection(collection);
			}
		}
	});

	return api;
};

Collection.prototype.enabled = true;
Collection.prototype.tryLimit = 1;

Collection.prototype.priority = -1 * Infinity;
Collection.prototype.skipProbability = 0;

Collection.prototype.enable = function(){
	if(this.enabled) return;

	this.enabled = true;
	this.collage.addCollection(this);
	this.emitter.emit("enabled");
};

Collection.prototype.disable = function(){
	if(!this.enabled) return;
	
	this.enabled = false;
	this.collage.removeCollection(this);
	this.emitter.emit("disabled");
};

Collection.prototype.markResource = function(id){
	if(id in this.resources) return;

	this.resources[id] = true;
	this.count++;
	
	this.setLoading();
};

Collection.prototype.addResource = function(id, resource){
	if(!this.hasResource(id)) this.markResource(id);

	this.loaded.push(resource);
	
	this.clearLoading();

	this.emitter.emit("progress", this.getProgress());
};

Collection.prototype.hasResource = function(id){
	return (id in this.resources);
};

Collection.prototype.setLoading = function(){
	this.waiting++;
	if(this.waiting === 1){
		this.emitter.emit("loading");
	}
};

Collection.prototype.clearLoading = function(){
	this.waiting--;
	if(!this.waiting){
		this.emitter.emit("ready");
	}
};

Collection.prototype.getProgress = function(){
	return this.loaded.length / this.count;	
};

Collection.prototype.getRandom = function(){
	if(Math.random() < this.skipProbability) return;

	var tryCount = 0,
		element;

	for(; tryCount < tryLimit; tryCount++){
		element = this.loaded[(Math.random() * this.loaded.length)|0];
		if(!this.collage.hasLocationNearViewport(element)){
			return element;
		}
	}
};
