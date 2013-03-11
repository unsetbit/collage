var getFromApi = require('./getFromCommonApi.js'),
	IframeElement = require("../element/Iframe.js"),
	mustache = require("mustache/mustache.js");

var endpoint = "https://graph.facebook.com/search";

/*
var LIKE_BOX_TEMPLATE = '' +
'<div 	class="fb-like-box" ' +
		'data-href="https://www.facebook.com/{{id}}" ' +
		'data-width="400" ' +
		'data-height="500" ' +
		'data-show-faces="true" ' +
		'data-stream="true" ' +
		'data-header="false">' +
'</div>';
*/

module.exports = function(options){
	switch(options.type){
		case "pages":
			return createPages(options)
		break;
	}
};

var ACTIVITY_BOX_TEMPLATE = '<div class="fb-activity" data-site="www.hrc.org" data-width="300" data-height="350" data-header="false" data-recommendations="false"></div>'

//var LIKE_BOX_TEMPLATE = '<fb:like-box href="https://www.facebook.com/{{id}}" width="400" height="500" show_faces="true" stream="true" header="false"></fb:like-box>';

var LIKE_BOX_TEMPLATE = '<div class="fb-like-box" data-href="http://www.facebook.com/{{id}}" data-width="400" data-height="500" data-show-faces="true" data-stream="false" data-header="false"></div>';

function createPages(options){
	var container = options.container;

	return getFromApi(endpoint, [
		'type=page',
		'fields=link,likes',
		'limit=3',
		'q=' + encodeURIComponent(options.query)
	]).then(function(response){
		var elements = [];

		response.data.forEach(function(item){
			var element = document.createElement("div");
			element.className="fb-like-box";
			element.style.opacity = 0;
			element.innerHTML = mustache.render(LIKE_BOX_TEMPLATE, {id: item.id});
			
			var mask = document.createElement("div");
			mask.className = "iframe-mask";
			element.appendChild(mask);

			var hasFocus = false;
			mask.addEventListener("click", function(e){
				mask.className += " in-focus";
				hasFocus = true;
				options.onFocus();
			});

			mask.addEventListener("mouseover", function(e){
				if(!hasFocus) return;
				hasFocus = false;
				mask.className = mask.className.replace(" in-focus", "");
				options.onBlur();
			});

			container.appendChild(element);
			
			FB.XFBML.parse(element);
			element.width = element.clientWidth;
			element.height = element.clientHeight;
			
			var iframeElement = new IframeElement(element);
			elements.push(iframeElement);
		});

		return elements;
	});
};
