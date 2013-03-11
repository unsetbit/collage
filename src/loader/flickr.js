var Q = require('q/q.js'),
	SimpleElement = require("../element/Simple.js");

//var endpoint = "http://api.flickr.com/services/feeds/photos_public.gne?format=json";
var endpoint = "http://api.flickr.com/services/rest/";
var callbackCounter = 0;
var callbacks = {};
window.FLICKR_CALLBACKS = callbacks;


http://api.flickr.com/services/rest/?&&&&&extras=url_z&per_page=10&format=json

module.exports = function(tags){
	var deferred = Q.defer(),
		script = document.createElement("script"),
		callbackId = "cb" + callbackCounter++,
		src = endpoint + "&jsoncallback=FLICKR_CALLBACKS." + callbackId + "&tags=" + tags; 
	
	var params = [
		"method=flickr.photos.search",
		"api_key=06960d3c3c8affd01e65ec032513557b",
		
		// http://www.flickr.com/services/api/flickr.photos.licenses.getInfo.html
		// Anything but all rights reserved
		"license=1,2,3,4,5,6,7,8", 
		"sort=relevance",
		
		// z is a size that I think is bounded to 640px
		"extras=url_z,url_m,path_alias",
		"per_page=20",

		// Photos only (not screenshots or drawings)
		"content_type=1",
		"media=photos",

		"format=json",
		"tags=" + tags,
		"jsoncallback=FLICKR_CALLBACKS." + callbackId
	];

	script.async = true;
	script.src = endpoint + "?" + params.join("&");

	callbacks[callbackId] = function(response){
		delete callbacks[callbackId];

		var elements = [],
			photos = response.photos && response.photos.photo || [];
			waiting = photos.length;


		photos.forEach(function(item){
			var url = item.url_z || item.url_m;

			if(!url) return;

			loadImage(item.url_z || item.url_m).then(function(element){
				var anchor = document.createElement("a");
				anchor.href = "http://www.flickr.com/photos/" + item.pathalias + "/" + item.id + "/";
				anchor.width = element.width;
				anchor.height = element.height;
				anchor.target = "_blank";
				anchor.style.display = "block";
				anchor.appendChild(element);
				
				elements.push(SimpleElement.create(anchor));

				if(--waiting === 0) deferred.resolve(elements);
			}, function(){
				if(--waiting === 0) deferred.resolve(elements);
			});
		});
	}
	
	document.body.appendChild(script);	

	return deferred.promise;
};

var documentFragment = document.createDocumentFragment();
function loadImage(src){
	var	deferred = Q.defer(),
		img = new Image();
	
	img.src = src;

	img.onload = function(){
		// This forces FF to set the width/height
		documentFragment.appendChild(img);
		deferred.resolve(img);
	};

	img.onerror = deferred.reject.bind(deferred);

	return deferred.promise;
};