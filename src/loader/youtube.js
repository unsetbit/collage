require('eventEmitter/EventEmitter.js');

var Q = require('q/q.js');
var VideoElement = require('../element/Video.js');

module.exports = function(options){
	// Handle single video ids case
	if(options.videoId) return loadVideo(options);

	if(options.videoIds){
		var videoIdIndex = options.videoIds.length,
			promises = [];

		while(videoIdIndex--){
			options.videoId = options.videoIds[videoIdIndex];
			promises.push(loadVideo(options));
		}
		
		return Q.all(promises);
	}
};

var playerIdCounter = 0;
function loadVideo(options){
	var deferred = Q.defer(),
		videoId = options.videoId,
		width = options.width || 1060,
		height = options.height || 650;

	var playerId = "player" + (playerIdCounter++);

	var element = document.createElement("div");
	element.width = width;
	element.height = height;
	element.className = "youtube-video";
	element.innerHTML = '<div id="' + playerId + '"></div><div class="video-mask"></div>';
	options.container.appendChild(element);
	
	new YT.Player(playerId, {
		height: height,
		width: width,
		playerVars: { 'controls': 0, 'html5': 1 },
		videoId: videoId,
		events: {
			onReady: function(e){
				var playerObj = e.target,
					videoElement = VideoElement.create(element, playerObj, {
						continuousPlay: options.continuousPlay
					});
				
				if(options.loop) videoElement.loop = true;
				
				if(options.continuousPlay){
					playerObj.unMute();
					playerObj.setVolume(100);
				}

				if(options.mute){
					playerObj.mute();
					playerObj.setVolume(0);
				}

				deferred.resolve(videoElement);
				
				if(options.callback) options.callback(videoElement);
			},
			onError: function(e){
				deferred.reject(e);
			}
		}
	});

	return deferred.promise;
};

function getApi(player){
	var api = {};
	api.player = player.player;
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

	player.addEventListener("onStateChange", this.onStatusChange.bind(this));
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
			
			if(this.loop){
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