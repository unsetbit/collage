require('eventEmitter/EventEmitter.js');

var Collection = module.exports = function(collage){
	this.emitter = new EventEmitter();
	this.collage = collage;
	this.waiting = 0;
	this.count = 0;
	this.loaded = [];
	this.resources = {};
}

Collection.getApi = function(collection){
	var api = {};

	api.element = collection.getElement.bind(collection);
	api.getNonvisibileElement = collection.getNonvisibileElement.bind(collection);
	api.progress = collection.getProgress.bind(collection);
	api.on = collection.emitter.on.bind(collection.emitter);
	api.removeListener = collection.emitter.removeListener.bind(collection.emitter);

	Object.defineProperty(api, "elements", {
		get: function(){ return collection.loaded.slice();}
	});

	Object.defineProperty(api, "tryLimit", {
		get: function(){ return collection.tryLimit; },
		set: function(value){
			collection.tryLimit = value;
		}
	});

	Object.defineProperty(api, "skipProbability", {
		get: function(){ return collection.skipProbability; },
		set: function(value){
			collection.skipProbability = value;
		}
	});

	Object.defineProperty(api, "enabled", {
		get: function(){ return collection.enabled; },
		set: function(value){
			if(value){
				collection.enable();
			} else {
				collection.disable();
			}
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

Collection.prototype.enabled = false;
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

Collection.prototype.removeResource = function(id, resource){
	if(!(id in this.resources)) return;
	delete this.resources[id];

	var index = this.loaded.indexOf(resource);
	if(~index){
		this.loaded.splice(index, 1);
	}
};

Collection.prototype.addResource = function(id, resource){
	if(!(id in this.resources)) this.markResource(id);

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

Collection.prototype.getNonvisibileElement = function(){
	if(this.skipProbability > Math.random()) return;

	var tryCount = 0,
		elementCount = this.loaded.length,
		element,
		index;

	if(!elementCount) return;

	for(; tryCount < this.tryLimit; tryCount++){
		element = this.getElement()
		if(!element.locations.some(this.collage.touchesCanvas)){
			return element;
		}
	}
};

Collection.prototype.getElement = function(){
	return this.loaded[(Math.random() * this.loaded.length)|0];
};