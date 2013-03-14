require('eventEmitter/EventEmitter.js');
var Element = require("./Element.js");

module.exports = VideoElement;

// Manages global tasks, such as periodic polling of players
// to gather time information
var timeManager = (function(){
	var ACTIVE_ELEMENTS = [],
		PERIODIC_LISTENER,
		api = {};

	api.add = function(element){
		ACTIVE_ELEMENTS.push(element);
		if(ACTIVE_ELEMENTS.length === 1){
			PERIODIC_LISTENER = setInterval(function(){
				ACTIVE_ELEMENTS.forEach(function(element){
					var time = Math.round(element.player.getCurrentTime()),
						elapsed = time - element.lastReportedTime;
					
					if(elapsed === 0) return;
					if(elapsed === 1){
						element.lastReportedTime = time;
						element.emitter.emit('time', time);
						element.emitter.emit('time:' + time);
					} else { // In case we missed some ticks, make up for them
						var start = element.lastReportedTime + 1;
						for(; start < time; start++){
							element.lastReportedTime = start;
							element.emitter.emit('time', start);
							element.emitter.emit('time:' + start);
						}
					}
				});
			}, 500); 	// 500 ms ensures that we account for fluctuations in 
					// timing so we report the time accurate to the second
		}
	}

	api.remove = function(element){
		var index = ACTIVE_ELEMENTS.indexOf(element);
		if(~index){
			ACTIVE_ELEMENTS.splice(index, 1);
			if(ACTIVE_ELEMENTS.length === 0){
				clearInterval(PERIODIC_LISTENER);  
			}	
		}
	}

	return api;
}());

function VideoElement (element, player){
	Element.call(this, element);
	this.player = player;
	this.emitter = new EventEmitter();
	this.lastReportedTime = 0;
	player.addEventListener("onStateChange", this.statusChangeHandler.bind(this));
	player.addEventListener("onError", this.errorHandler.bind(this));
	this.hide();
};
VideoElement.prototype = Object.create(Element.prototype);

VideoElement.create = function(element, player, options){
	var videoElement = new VideoElement(element, player);

	if(options.continuousPlay) videoElement.continuousPlay = true;
	if(options.autoplay) videoElement.autoplay = true;
	if(options.loop) videoElement.loop = true;
	
	return VideoElement.getApi(videoElement);
};

VideoElement.getApi = function(element){
	var api = Element.getApi(element);
	api.player = element.player;
	api.element = element.element;
	api.on = element.emitter.on.bind(element.emitter);
	api.removeListener = element.emitter.removeListener.bind(element.emitter);
	api.destroy = element.destroy.bind(element);
	return api;
};

VideoElement.prototype.continuousPlay = false;
VideoElement.prototype.autoplay = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? false : true );
VideoElement.prototype.loop = false;
VideoElement.prototype.playing = false;

VideoElement.prototype.errorHandler = function(e){
	if(e.data === 150){
		console.log(this);
		this.destroy();
	}
};

VideoElement.prototype.destroy = function(){
	this.height = 0;
	this.width = 0;
	this.bottom = this.top;
	this.left = this.right;
	this.element.parentNode.removeChild(this.element);
};

VideoElement.prototype.hide = function(){
	Element.prototype.hide.call(this);
	this.element.style.opacity = 0;
	
	if(!this.continuousPlay){
		this.player.pauseVideo();
	}
};

VideoElement.prototype.show = function(left, top){
	this.element.style.opacity = 1;
	Element.prototype.show.call(this, left, top);
	
	if(this.playing && !this.continuousPlay){
		this.player.playVideo();
	} else if(!this.playing && this.autoplay) {
		this.playing = true;
		this.player.playVideo();
	}
};

VideoElement.prototype.statusChangeHandler = function(status){
	switch(status.data){
		case -1:
			this.emitter.emit('unstarted');
		break;
		case 0:
			this.emitter.emit('ended');
			timeManager.remove(this);
			if(this.loop){
				this.player.seekTo(0);
				this.player.playVideo();
			}
		break;
		case 1:
			this.emitter.emit('playing');
			timeManager.add(this);
		break;
		case 2:
			this.emitter.emit('paused');
			timeManager.remove(this);
		break;
		case 3:
			this.emitter.emit('buffering');
		break;
		case 5:
			this.emitter.emit('video cued');
		break;
	}
}