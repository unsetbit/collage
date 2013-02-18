var Collection = require("./Collection.js"),
	IframeElement = require('./element/iframe.js');

module.exports = function(container){
	var collection = new TweetCollection(container);
	return getApi(collection);
};

function getApi(collection){
	var api = Collection.getApi(collection);

	api.add = collection.add.bind(collection);
	api.addByQuery = collection.addByQuery.bind(collection);

	return api;
};

function TweetCollection(){
	Collection.apply(this, arguments);
	this.container = this.collage.element;
	this.tweetArea = document.createElement("div");
	this.tweetArea.className = "tweet-area";
	this.container.appendChild(this.tweetArea);
	this.loading = [];

	var self = this;
	this.emitter.on("ready", function(){
		clearInterval(self.checkLoadedInterval);
		self.checkLoadedInterval = void 0;
	});
}
TweetCollection.prototype = Object.create(Collection.prototype);

TweetCollection.prototype.checkLoadStatus = function(){
	var url, iframe;
	
	for(url in this.loading){
		if(this.loading.hasOwnProperty(url)){
			iframe = this.loading[url].iframe;
			if(iframe  && iframe.clientHeight !== 0 && iframe.contentDocument && iframe.contentDocument.body.innerHTML !== ""){
				this.loading[url].onload();
				delete this.loading[url];
			}
		}
	}
};
var SEARCH_ENDPOINT = "http://search.twitter.com/search.json?format=json";
var callbackCounter = 0;
var callbacks = {};
window.TWITTER_CALLBACKS = callbacks;
TweetCollection.prototype.addByQuery = function(query){
	var self = this,
		script = document.createElement("script"),
		callbackId = "cb" + callbackCounter++,
		src = SEARCH_ENDPOINT + "&callback=TWITTER_CALLBACKS." + callbackId + "&q=" + query; 
	
	script.async = true;
	script.src = src;
	
	callbacks[callbackId] = function(data){
		delete callbacks[callbackId];
		data.results.forEach(function(item){
			self.add("https://twitter.com/" + item.from_user + "/status/" + item.id_str);
		});
	}
	
	document.body.appendChild(script);
};

TweetCollection.prototype.add = function(url){
	if(this.hasResource(url)) return;
	
	var self = this,
		element = document.createElement("blockquote"),
		anchor = document.createElement("a");
	
	element.className = "twitter-tweet";
	
	anchor.href = url;
	element.appendChild(anchor);

	this.tweetArea.appendChild(element);
	twttr.widgets.load(this.tweetArea);
	
	var iframes = this.tweetArea.getElementsByTagName("iframe");
	element = iframes[iframes.length - 1];
	
	this.markResource(url);

	this.loading[url] = {
		iframe: element,
		onload: function(){
			self.addResource(url, new IframeElement(element));
		}
	};

	if(!this.checkLoadedInterval){
		this.checkLoadedInterval = setInterval(function(){
			self.checkLoadStatus();
		},500);
	}
};