var Q = require('q/q.js');
var loadImage = require('./image.js');

var endpoint = "http://api.flickr.com/services/feeds/photos_public.gne?format=json";
var callbackCounter = 0;
var callbacks = {};
window.FLICKR_CALLBACKS = callbacks;

module.exports = function(tags){
	var deferred = Q.defer(),
		script = document.createElement("script"),
		callbackId = "cb" + callbackCounter++,
		src = endpoint + "&jsoncallback=FLICKR_CALLBACKS." + callbackId + "&tags=" + tags; 
	
	script.async = true;
	script.src = src;

	callbacks[callbackId] = function(data){
		delete callbacks[callbackId];
		var promises = [];

		data.items.forEach(function(item){
			promises.push(
				loadImage(item.media.m.replace("_m.jpg", "_z.jpg"))
			);
		});

		Q.all(promises).done(deferred.resolve.bind(deferred));
	}
	
	document.body.appendChild(script);	

	return deferred.promise;
};