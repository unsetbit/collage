var Q = require('q/q.js'),
	SimpleElement = require("../element/Simple.js"),
	utils = require("../utils.js"),
	getFromApi = require('./getFromCommonApi.js');

window.credits = window.credits || {};
var credits = window.credits.flickr = {};

var endpoint = "http://api.flickr.com/services/rest/";
//var endpoint = "/services/rest/";

module.exports = getPhotos;

var defaults = {
	sort: "relevance",
	count: "20",
	license: "1,2,3,4,5,6,7,8", // http://www.flickr.com/services/api/flickr.photos.licenses.getInfo.html
	apiKey: "06960d3c3c8affd01e65ec032513557b",
	media: "photos",
	tagMode: "all",
	isCommons: false,
	contentType: "1" // Photos only (not screenshots or drawings)
};

function getPhotos(collage, options){
	var deferred = Q.defer(),
		params;
	
	if(typeof options === "string") options = {tags: options};
	utils.extend(options, defaults);

	params = [
		"format=json",
		"method=flickr.photos.search",
		"extras=url_z,url_m,path_alias",
		"api_key=" + options.apiKey,
		"license=" + options.license, 
		"sort=" + options.sort,
		"tag_mode=" + options.tagMode,
		"per_page=" + options.count,
		"content_type=" + options.contentType,
		"media=" + options.media,
		"tags=" + options.tags
	];

	if(options.isCommons){
		params.push("is_commons=" + options.isCommons);
	}

	getFromApi(endpoint, "jsoncallback", params).then(function(response){
		var elements = [],
			photos = response.photos && response.photos.photo || [],
			waiting = photos.length;

		photos.forEach(function(item){
			var url = item.url_z || item.url_m;

			if(!url){
				waiting--;
				return;
			};

			loadImage(item.url_z || item.url_m).then(function(element){
				var anchor = document.createElement("a");
				anchor.href = "http://www.flickr.com/photos/" + item.pathalias + "/" + item.id + "/";
				anchor.width = element.width;
				anchor.height = element.height;
				anchor.target = "_blank";
				anchor.style.display = "block";
				anchor.appendChild(element);
				
				credits[item.pathalias] = anchor.href;
				
				elements.push(SimpleElement.create(anchor));
				if(--waiting === 0) deferred.resolve(elements);
			}, function(){
				if(--waiting === 0) deferred.resolve(elements);
			});
		});
	});

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