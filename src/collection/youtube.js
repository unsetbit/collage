var Collection = require("./Collection.js"),
	VideoElement = require("./element/Video.js");

var YoutubeCollection = module.exports = function(){
	Collection.apply(this, arguments);
	this.container = this.collage.element;
	this.documentFragment = document.createDocumentFragment();
}
YoutubeCollection.prototype = Object.create(Collection.prototype);

YoutubeCollection.create = function(collage, options){
	options = options || {};

	var collection = new YoutubeCollection(collage);
	
	if(options.tryLimit) collection.tryLimit = options.tryLimit;
	if(options.priority !== void 0) collection.priority = options.priority;
	if(options.skipProbability !== void 0) collection.skipProbability = options.skipProbability;
	if(!options.disabled) collection.enable();

	return YoutubeCollection.getApi(collection);
};

YoutubeCollection.getApi = function(collection){
	var api = Collection.getApi(collection);
	api.add = collection.add.bind(collection);
	return api;
};

YoutubeCollection.prototype.add = function(id, options){
	if(this.hasResource(id)) return;
	
	var self = this;

	options = options || {};
	
	this.markResource(id);

	createPlayer({
		videoId: id,
		container: this.container,
		width: options.width,
		height: options.height,
		callback: function(player){
			var element = new VideoElement(player);

			if(options.loop) player.loop = true;

			if(options.continuousPlay){
				player.continuousPlay = true;
				player.playVideo();
			}
			
			if(options.mute){
				player.mute();
				player.setVolume(0);
			}
			
			self.addResource(id, element);
			if(options.callback) options.callback(element);
		}
	});
};

// YOUTUBE player
function createPlayer(options){
	options = options || {};
	var width = options.width || 1060,
	  height = options.height || 650;

	var containerId = _.uniqueId('container');
	var playerId = _.uniqueId('player'),
	player;

	var element = $('<div class="video-container" width="' + width + '" height="' + height + '"><div id="' + playerId + '"></div><div class="video-mask"></div></div>')[0];
	options.container.appendChild(element);

	new YT.Player(playerId, {
		height: height,
		width: width,
		playerVars: { 'controls': 0, 'html5': 1 },
		videoId: options.videoId,
		events: {
			onReady: function(e){
				var playerObj = e.target;

				if(player){ 
					if(options.videoId) playerObj.cueVideoById(options.videoId);
					return;
				}

				player = new Player(playerObj, element);
				if(options.videoId) playerObj.cueVideoById(options.videoId);

				if(options.callback) {
					options.callback(getApi(player));
				}
			},
			onStateChange: function(e){}
		}
	});
};

function getApi(player){
	var api = player.player;
	api.element = player.element;
	api.on = player.emitter.on.bind(player.emitter);
	api.removeListener = player.emitter.removeListener.bind(player.emitter);
	api.kill = player.kill.bind(player);
	return api;
}

function Player(player, element){
	this.id = player.id;
	this.player = player;
	this.element = element;
	this.lastReportedTime = 0;
	this.emitter = new EventEmitter();

	player.addEventListener("onStateChange", _.bind(this.onStatusChange, this));
}

Player.prototype.kill = function(){
	this.container.parentNode.removeChild(this.container);
	this.emitter.emit('dead');
};

Player.prototype.onStatusChange = function(status){
	switch(status.data){
		case -1:
			this.emitter.emit('unstarted');
		break;
		case 0:
			this.emitter.emit('ended');
			
			if(this.player.loop){
				this.player.seekTo(0);
				this.player.playVideo();
			}
		break;
		case 1:
			this.emitter.emit('playing');
		break;
		case 2:
			this.emitter.emit('paused');
		break;
		case 3:
			this.emitter.emit('buffering');
		break;
		case 5:
			this.emitter.emit('video cued');
		break;
	}
};