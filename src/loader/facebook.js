var Q = require('q/q.js'),
	getFromApi = require('./getFromCommonApi.js'),
	IframeElement = require("../element/Iframe.js"),
	mustache = require("mustache/mustache.js"),
	utils = require('../utils.js');

var endpoint = "https://graph.facebook.com/search";
//var endpoint = "/search";

window.credits = window.credits || {};
var credits = window.credits.facebook = {};

module.exports = function(collage, options){
	if(!options.type) options.type = "pages";
	
	switch(options.type){
		case "pages":
			return createPages(collage, options)
		break;
	}
};

var ACTIVITY_BOX_TEMPLATE = '<div class="fb-activity" data-site="www.hrc.org" data-width="{{width}}" data-height="{{height}}" data-header="false" data-recommendations="false"></div>'
var LIKE_BOX_TEMPLATE = '<div class="fb-like-box" data-href="http://www.facebook.com/{{id}}" data-width="{{width}}" data-height="{{height}}" data-show-faces="true" data-stream="false" data-header="false"></div>';

var defaults = {
	limit: 3,
	width: 400,
	height: 600,
	minLikes: 0,
	showFaces: true,
	showStream: true,
	showHeader: false,
	ids: []
};

function createPages(collage, options){
	utils.extend(options, defaults);
	var ids = options.ids;
	var gatherIds = Q.when(ids);
	
	if(options.query){
		return getFromApi(endpoint, [
			'type=page',
			'fields=name,link,likes,category',
			'limit=' + options.limit,
			'q=' + encodeURIComponent(options.query)
		]).then(function(response){
			response.data.forEach(function(item){
				if(item.likes < options.minLikes) return;
			
				credits[item.name] = item.link;
				ids.push(item.id);
			});

			return loadLikeBoxes(collage, ids, options);
		});
	} else {
		return Q.when(loadLikeBoxes(collage, ids, options));
	}
};

function loadLikeBoxes(collage, ids, options){
	var elements = [];

	ids.forEach(function(id){
		var element = document.createElement("div");
		element.className="fb-like-box";
		element.setAttribute("data-href", "http://www.facebook.com/" + id);
		element.setAttribute("data-width", options.width);
		element.setAttribute("data-height", options.height);
		element.setAttribute("data-show-faces", options.showFaces);
		element.setAttribute("data-stream", options.showStream);
		element.setAttribute("data-header", options.showHeader);

		var iframeElement = utils.attachIframeToCollage(collage, element, options.width, options.height);
		
		FB.XFBML.parse(iframeElement);

		elements.push(new IframeElement(iframeElement));
	});
	
	return elements;
}
