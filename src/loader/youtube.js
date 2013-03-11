require('eventEmitter/EventEmitter.js');

var Q = require('q/q.js');
var VideoElement = require('../element/Video.js');
var getFromApi = require('./getFromCommonApi.js');
var TIMEOUT = 10 * 1000;

module.exports = function(options){
	if(options.query){
		return queryVideos(options.query).then(function(videoIds){
			options.videoIds = videoIds;
			return loadVideos(options);
		})
	}

	if(options.videoId){
		options.videoIds = [options.videoId];

		return loadVideos(options).then(function(elements){
			return elements[0];
		});
	} else if(options.videoIds){
		return loadVideos(options);	
	}
};

var queryVideos = (function(){
	var endpoint = "https://www.googleapis.com/youtube/v3/search";

	return function(query){
		var params = [
				"part=id",
				"videoDuration=short",
				"type=video",
				"videoEmbeddable=true",
				"videoSyndicated=true",
				"key=AIzaSyAZw0kviWeCOidthcZAYs5oCZ0k8DsOuUk",
				"query=" + encodeURIComponent(query)
			];
		
		return getFromApi(endpoint, params).then(function(response){
			var videoIds = [];
			
			response.items.forEach(function(item){
				videoIds.push(item.id.videoId);
			});

			return videoIds;
		});
	};
}());

var loadVideos = (function(){
	return function(options){
		if(!Array.isArray(options.videoIds) || !options.container) return;
		
		var index = options.videoIds.length,
			deferred = Q.defer(),
			elements = [],
			videoOptions,
			timedOut = false,
			timeout = setTimeout(function(){
				timedOut = true;
				deferred.resolve(elements);
			}, TIMEOUT);

		options.callback = function(element){
			if(timedOut || !element) return;
			elements.push(element);

			if(elements.length === options.videoIds.length){
				clearTimeout(timeout);
				deferred.resolve(elements);
			}
		}

		while(index--){
			videoOptions = Object.create(options);
			videoOptions.videoId = options.videoIds[index];
			loadVideo(videoOptions);
		}

		return deferred.promise;
	};
}());

var isiOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

var loadVideo = (function(){
	var playerIdCounter = 0;
	return function(options){
		var videoId = options.videoId,
			width = options.width || 1060,
			height = options.height || 650;

		var playerId = "player" + (playerIdCounter++);

		var element = document.createElement("div");
		element.width = width;
		element.height = height;
		element.className = "youtube-video";
		
		if(isiOS) element.className += " hide-video-mask";

		element.innerHTML = '<div id="' + playerId + '"></div><div class="video-mask"></div>';
		options.container.appendChild(element);
		
		var videoElement;

		new YT.Player(playerId, {
			height: height,
			width: width,
			playerVars: { 'controls': 0, 'html5': 1 },
			videoId: videoId,
			events: {
				onReady: function(e){
					var playerObj = e.target;

					videoElement = VideoElement.create(element, playerObj, {
						continuousPlay: options.continuousPlay,
						autoPlay: options.autoPlay,
						loop: options.loop
					});
					
					if(isiOS){
						videoElement.on("playing", function(){
							element.className = element.className.replace(' hide-video-mask', '');
						});

						videoElement.on("paused", function(){
							element.className += ' hide-video-mask';
						});
					}

					playerObj.pauseVideo();
					if(options.continuousPlay){
						playerObj.unMute();
						playerObj.setVolume(100);
					}

					if(options.mute){
						playerObj.mute();
						playerObj.setVolume(0);
					}
					
					if(options.callback) options.callback(videoElement);
				}
			}
		});
	};
}());
