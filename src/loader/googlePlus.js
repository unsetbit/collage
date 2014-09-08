'use strict';

var mustache = require('../../bower_components/mustache/mustache.js');
var getFromApi = require('./getFromCommonApi.js');
var SimpleElement = require('../element/Simple.js');
	
module.exports = function(collage, query){
	return queryActivities(query);
};

var ARTICLE_TEMPLATE = '' +
'<div class="article-wrapper">' +
	'<div class="post-attribution">' +
		'<a href="{{authorUrl}}">' +
			'{{#authorImage}}<img class="author-image" src="{{authorImage.src}}" ' + 
				'width="{{authorImage.width}}" height="{{authorImage.height}}"/>{{/authorImage}}' +
			'<span class="author-name">{{authorName}}</span>' +
		'</a>' + 
		'<span class="post-date">on Google Plus &ndash; {{date}}</span>' +
	'</div>' +
	'<p class="author-comments">{{{authorComments}}}</p>' + 
	'<div class="article">' + 
		'<a href="{{articleUrl}}">' +
			'{{#image}}<img class="article-image" src="{{image.src}}" width="{{image.width}}" ' + 
				'height="{{image.height}}"/>{{/image}}' + 
			'<div class="article-attribution">' +
				'<span>{{title}}</span>' + 
			'</div>' + 
		'</a>' +
		'<p class="article-body">{{body}}</p>' +
	'</div>' +
'</div>';

var documentFragment = document.createDocumentFragment();

var queryActivities = (function(){
	var endpoint = 'https://www.googleapis.com/plus/v1/activities';

	return function(query){
		var params = [
				'key=AIzaSyAZw0kviWeCOidthcZAYs5oCZ0k8DsOuUk',
				'query=' + encodeURIComponent(query)
			];
		
		return getFromApi(endpoint, params).then(function(response){
			var elements = [];

			response.items.forEach(function(item){
				if(!(item && item.object && item.object.attachments && item.object.attachments.length > 0)) return;
				var article = item.object.attachments[0];
				if(article.objectType !== 'article') return;

				var actor = item.object.actor || item.actor,
					authorComments = item.object.content;
				if(authorComments && authorComments.length > 150){
					authorComments = authorComments.substr(0, 150) + '&hellip;';
				}

				var templateParams = {
					authorName: actor.displayName,
					authorUrl: actor.url,
					authorId: actor.id,
					date: new Date(item.published).toLocaleDateString(),
					authorComments: authorComments,
					articleUrl: article.url,
					title: article.displayName,
					body: article.content
				};
								
				if(actor.image){
					templateParams.authorImage = {
						src: actor.image.url,
						width: 50,
						height: 50
					};
				}

				if(article.image){
					templateParams.image = {
						src: article.image.url,
						width: article.image.width,
						height: article.image.height
					};
				}
				
				var element = document.createElement('div');
				element.className = 'gplus-article';
				element.innerHTML = mustache.render(ARTICLE_TEMPLATE, templateParams);
				document.body.appendChild(element);
				
				element.width = element.clientWidth;
				element.height = element.clientHeight;

				elements.push(new SimpleElement(element));
				documentFragment.appendChild(element);

			});

			return elements;
		});
	};
}());
