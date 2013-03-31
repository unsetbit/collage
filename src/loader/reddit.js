var Q = require('q/q.js'),
	SimpleElement = require("../element/Simple.js"),
	IframeElement = require("../element/Iframe.js"),
	utils = require("../utils.js"),
	getFromApi = require('./getFromCommonApi.js');

window.credits = window.credits || {};
var credits = window.credits.reddit = {};

var endpoint = "http://www.reddit.com/r/all/search.json";
//var endpoint = "/r/all/search.json";

module.exports = function(collage, options){
	if(options.type === "embed"){
		return getEmbed(collage, options);
	} else {
		return getPhotos(collage, options);
	}
};

function getEmbed(collage, options){
	utils.extend(options, defaults);
	params = [
		"limit=" + options.limit,
		"restrict_sr=" + options.restrict_sr, 
		"sort=" + options.sort,
		"t=" + options.time,
		"q=" + options.query
	];

	var iframe;
	var self = this,
		iframe = document.createElement("IFRAME"),
		iframeDoc,
		iframeContent;

	var element = utils.attachIframeToCollage(collage, iframe, options.width, options.height);

	iframeDoc = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
	iframeContent = "<html><head><title></title></head><body>";
	iframeContent += '<script type="text/javascript" src="http://www.reddit.com/r/' + options.subreddit + '/search.embed?' + params.join("&").replace(' ', '%20') + '"></script>';
	iframeContent += "</body></html>";
	
	iframeDoc.open();
	iframeDoc.write(iframeContent);
	iframeDoc.close();
	
	return Q.when(new IframeElement(element));
}

var defaults = {
	limit: "20",
	subreddit: "all",
	restrict_sr: "false",
	sort: "top",
	time: "all",
	nsfw: "false",
	minComments: 0,
	width: 500,
	height:600,
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
			
			credits[item.author] = "http://www.reddit.com" + item.permalink;
			
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