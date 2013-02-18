var Collection = require("./Collection.js"),
	StaticElement = require("./element/static.js"),
	mustache = require("mustache/mustache.js");

module.exports = function(){
	var collection = new NYTimesArticleCollection();
	return getApi(collection);
};

function getApi(collection){
	var api = Collection.getApi(collection);

	api.add = collection.add.bind(collection);
	
	return api;
};

function NYTimesArticleCollection(){
	Collection.apply(this, arguments);
}
NYTimesArticleCollection.prototype = Object.create(Collection.prototype);

var ARTICLE_TEMPLATE = '' +
		'<h2><a href="{{url}}">{{{title}}}</a></h2>' +
		'{{#image}}<img class="article-image" src="{{image.src}}" width="{{image.width}}" height="{{image.height}}"/>{{/image}}' + 
		'<div class="article-attribution">' +
			'<img class="nyt-brand" src="http://graphics8.nytimes.com/packages/images/developer/logos/poweredby_nytimes_30a.png"/>' +
			'<span class="byline">{{{byline}}}</span>' + 
			'<span class="date">{{date}}</span>' + 
		'</div>' +
		'<p>{{{body}}}</p>';

var documentFragment = document.createDocumentFragment();

NYTimesArticleCollection.prototype.add = function(data){
	if(this.hasResource(data.title)) return;
	
	var self = this,
		element = document.createElement("div");
	
	element.className = "nytimes-article";

	var templateData = {
		title: data.title,
		byline: data.byline,
		date: (new Date(data.publication_year, data.publication_month, data.publication_day)).toLocaleDateString(),
		body: data.body,
		url: data.url
	};

	if(data.small_image_url){
		templateData.image = {
			src: data.small_image_url.replace(/thumbStandard.*\./, "hpMedium."),
			height: 253,
			width: 337
		};
	}

	element.innerHTML = mustache.render(ARTICLE_TEMPLATE, templateData);
	document.body.appendChild(element);

	this.markResource(data.title);
	
	setTimeout(function(){
		element.width = element.clientWidth;
		element.height = element.clientHeight;

		documentFragment.appendChild(element);
		self.addResource(data.title, new StaticElement(element));
	});
};