'use strict';
/* globals YT */

var Q = require('../../bower_components/q/q.js');
var VideoElement = require('../element/Video.js');
var getFromApi = require('./getFromCommonApi.js');
var utils = require('../utils.js');
var TIMEOUT = 10 * 1000;

window.credits = window.credits || {};
var credits = window.credits.youtube = {};

module.exports = function(collage, options){
	if(options.query){
		return queryVideos(options).then(function(videoIds){
			options.videoIds = videoIds;
			return loadVideos(collage, options);
		});
	}

	if(options.videoId){
		options.videoIds = [options.videoId];

		return loadVideos(collage, options).then(function(elements){
			return elements[0];
		});
	} else if(options.videoIds){
		return loadVideos(collage, options);	
	}
};

var defaults = {
	duration: 'short',
	key: 'AIzaSyAZw0kviWeCOidthcZAYs5oCZ0k8DsOuUk'
};

var queryVideos = (function(){
	var endpoint = 'https://www.googleapis.com/youtube/v3/search';
	//var endpoint = 'https://d3ggoqbhpexke2.cloudfront.net/youtube/v3/search';

	return function(options){
		utils.extend(options, defaults);

		var params = [
				'part=id,snippet',
				'videoDuration=' + options.duration,
				'type=video',
				'videoEmbeddable=true',
				'videoSyndicated=true',
				'key=' + options.key,
				'q=' + encodeURIComponent(options.query)
			];
		
		return getFromApi(endpoint, params).then(function(response){
			var videoIds = [];

			response.items.forEach(function(item){
				credits[item.snippet.channelTitle] = 'http://youtube.com/' + item.snippet.channelTitle;
				videoIds.push(item.id.videoId);
			});

			return videoIds;
		});
	};
}());

var loadVideos = (function(){
	return function(collage, options){
		if(!Array.isArray(options.videoIds)) return;
		
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
		};

		while(index--){
			videoOptions = Object.create(options);
			videoOptions.videoId = options.videoIds[index];
			loadVideo(collage, videoOptions);
		}

		return deferred.promise;
	};
}());

var isiOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

var loadVideo = (function(){
	var playerIdCounter = 0;
	return function(collage, options){
		var videoId = options.videoId,
			width = options.width || 1060,
			height = options.height || 650;

		var playerId = 'player' + (playerIdCounter++);

		var element = document.createElement('div');
		element.width = width;
		element.height = height;
		element.className = 'youtube-video';
		
		if(isiOS) element.className += ' hide-video-mask';

		element.innerHTML = '<div id="' + playerId + '"></div><div class="video-mask"></div>';
		collage.element.appendChild(element);
		
		var videoElement;

		new YT.Player(playerId, {
			height: height,
			width: width,
			playerVars: { 
				controls: 0, 
				html5: 1,
				start: (options.startTime || 0)
			},
			videoId: videoId,
			events: {
				onReady: function(e){
					var playerObj = e.target;
					videoElement = VideoElement.create(element, playerObj, {
						continuousPlay: options.continuousPlay,
						autoplay: options.autoplay,
						loop: options.loop
					});
					
					if(isiOS){
						videoElement.on('playing', function(){
							element.className = element.className.replace(' hide-video-mask', '');
						});

						videoElement.on('paused', function(){
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
				},
				onError: function(){
				}
			}
		});
	};
}());
