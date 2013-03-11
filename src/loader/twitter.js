// This uses an undocumented twitter api (twttr.widget.createTweet) so it might break

var Q = require('q/q.js'),
	getFromApi = require('./getFromCommonApi.js'),	
	IframeElement = require('../element/Iframe.js');

var TIMEOUT = 1000 * 10;

// options should have container and query
module.exports = function(options){
	var container = options.container;

	if(options.query){
		return queryTweets(options.query).then(function(tweetIds){
			return loadTweets(tweetIds, container);
		});	
	} else if(options.ids) {
		return loadTweets(options.ids, container);
	} else if(options.id){
		return loadTweets([options.id], container).then(function(elements){
			if(elements && elements.length) return elements[0];
		});
	}
};

var loadTweets = (function(){
	return function(ids, container){
		if(!Array.isArray(ids) || !container) return;
		
		var index = ids.length,
			deferred = Q.defer(),
			elements = [],
			timedOut = false,
			waitingForResize = [];
			timeout = setTimeout(function(){
				timedOut = true;
				clearInterval(heightChecker);
				deferred.resolve(elements);
			}, TIMEOUT);

		function heightCheck(){
			var index = waitingForResize.length,
				element;

			while(index--){
				element = waitingForResize[index];
				if(element.height !== "0"  && element.width !== "0"){
					elements.push(IframeElement.create(element));

					if(elements.length === ids.length){
						clearTimeout(timeout);
						clearInterval(heightChecker);
						deferred.resolve(elements);
					}

					waitingForResize.splice(index, 1);
				}
			}
		}

		var heightChecker = setInterval(heightCheck, 250);

		while(index--){
			twttr.widgets.createTweet(ids[index], container, function(element){
				if(timedOut) return;

				var iframeWindow =  'contentWindow' in element? element.contentWindow : element.contentDocument.defaultView;
				
				var onResizeCallback = iframeWindow.onresize,
					onMouseMoveCallback = iframeWindow.onmousemove;
				
				// Iframes capture all events, this allows us to bubble the event
				// up to this window's scope
				iframeWindow.onmousemove = function(e){
					onMouseMoveCallback && onMouseMoveCallback(e);
					var evt = document.createEvent("MouseEvents"),
						boundingClientRect = element.getBoundingClientRect();

					evt.initMouseEvent(	"mousemove", 
										true, 
										false, 
										window,
										e.detail,
										e.screenX,
										e.screenY, 
										e.clientX + boundingClientRect.left, 
										e.clientY + boundingClientRect.top, 
										e.ctrlKey, 
										e.altKey,
										e.shiftKey, 
										e.metaKey,
										e.button, 
										null);
					
					element.dispatchEvent(evt);
				};

				waitingForResize.push(element);
				element.style.opacity = 0;
				/*
				iframeWindow.onresize = function(e){
					onResizeCallback && onResizeCallback(e);
					console.log("RESIZE");
					if(element.height !== "0"){
						//element.style.opacity = 1;
						elements.push(IframeElement.create(element));
						
						if(elements.length === ids.length){
							clearTimeout(timeout);
							deferred.resolve(elements);
						}
					}
				}*/
			});
		}

		return deferred.promise;
	};
}());

var queryTweets = (function(){
	var endpoint = "http://search.twitter.com/search.json";

	return function(query){
		return getFromApi(endpoint, [
			'format=json',
			'q=' + encodeURIComponent(query)
		]).then(function(response){
			var tweetIds = [],
				dupeCheck = [];

			response.results.forEach(function(item){
				// Skip retweets
				if(~dupeCheck.indexOf(item.text)){
					return;
				} else {
					dupeCheck.push(item.text);
				}

				// Skip matches on username
				if(~item.from_user.toLowerCase().indexOf(query.toLowerCase())){
					return;	
				}
				
				tweetIds.push(item.id_str);
			});

			return tweetIds;
		});
	};
}());