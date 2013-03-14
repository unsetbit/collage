var Q = require('q/q.js'),
	SimpleElement = require("../element/Simple.js"),
	utils = require("../utils.js"),
	getFromApi = require('./getFromCommonApi.js');

var endpoint = "http://www.reddit.com/search.json";

module.exports = getPhotos;

var defaults = {
	limit: "20",
	restrict_sr: "false",
	sort: "top",
	time: "all",
	nsfw: "false",
	minComments: 0,
	minScore: 0
};

function getPhotos(collage, options){
	var deferred = Q.defer(),
		params;
	
	if(typeof options === "string") options = {tags: options};
	utils.extend(options, defaults);

	params = [
		"limit=" + options.limit,
		"restrict_sr=" + options.restrict_sr, 
		"sort=" + options.sort,
		"t=" + options.time,
		"q=" + options.query
	];
	
	getFromApi(endpoint, "jsonp", params).then(function(response){
		var elements = [],
			photos = response.data && response.data.children || [],
			waiting;

		photos = photos.filter(function(item){
			item = item.data;

			if(	item.score < options.minScore || 
				item.num_comments < options.minComments ||
				(!~item.url.indexOf(".jpg"))){
				return false;	
			}

			return true;
		});

		waiting = photos.length;
		photos.forEach(function(item){
			item = item.data;

			loadImage(item.url).then(function(element){
				var anchor = document.createElement("a");
				anchor.href = "http://www.reddit.com" + item.permalink;
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