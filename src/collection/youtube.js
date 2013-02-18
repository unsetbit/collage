var Collection = require("./Collection.js"),
	VideoElement = require("./element/video.js");

module.exports = function(container){
	var collection = new YoutubeCollection(container);
	return getApi(collection);
};

function getApi(collection){
	var api = Collection.getApi(collection);

	api.add = collection.add.bind(collection);
	
	return api;
}

function YoutubeCollection(container){
	Collection.apply(this, arguments);
	this.container = this.collage.element;
	this.documentFragment = document.createDocumentFragment();
}
YoutubeCollection.prototype = Object.create(Collection.prototype);

YoutubeCollection.prototype.add = function(id, options){
	if(this.hasResource(id)) return;
	
	var self = this;

	options = options || {};
	
	this.markResource(id);

	createYTPlayer({
		videoId: id,
		container: this.container,
		width: options.width,
		height: options.height,
		callback: function(player){
			if(options.loop) player.loop = true;

			if(options.continuousPlay){
				player.continuousPlay = true;
				player.playVideo();
			}

			if(options.mute) player.mute();

			self.addResource(id, new VideoElement(player));
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
    
  var element = $('<div class="video-container"><div id="' + playerId + '"></div><div class="video-mask"></div></div>')[0];
  options.container.appendChild(element);
  
  new YT.Player(playerId, {
    height: height,
    width: width,
    playerVars: { 'controls': 0 },
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
      onStateChange: function(e){
      }
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
