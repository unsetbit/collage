'use strict';

/* jshint camelcase:false */

var Q = require('../../bower_components/q/q.js'),
	SimpleElement = require('../element/Simple.js'),
	mustache = require('../../bower_components/mustache/mustache.js');

window.credits = window.credits || {};
var credits = window.credits.nyTimes = {};

var ARTICLE_TEMPLATE = '' +
		'<h2><a href="{{url}}">{{{title}}}</a></h2>' +
		'{{#image}}<img class="article-image" src="{{image.src}}" ' + 
			'width="{{image.width}}" height="{{image.height}}"/>{{/image}}' + 
		'<div class="article-attribution">' +
			'<img class="nyt-brand" ' + 
				'src="http://graphics8.nytimes.com/packages/images/developer/' + 
				'logos/poweredby_nytimes_30a.png"/>' +
			'<span class="byline">{{{byline}}}</span>' + 
			'<span class="date">{{date}}</span>' + 
		'</div>' +
		'<p>{{{body}}}</p>';

var documentFragment = document.createDocumentFragment();

var endpoint = '/svc/search/v1/article';
//var endpoint = "http://api.nytimes.com/svc/search/v1/article";

module.exports = function(collage, options){
	return query(options);
};

function query(options){
	function parseResponse(data){
		return data.results.map(function(data){
			var element = document.createElement('div');
			element.className = 'nytimes-article';

			if(data.byline){
				credits[data.byline.replace('By ', '')] = data.url;
			}
			
			var templateData = {
				title: data.title,
				byline: data.byline,
				date: (new Date(data.publication_year, data.publication_month, data.publication_day)).toLocaleDateString(),
				body: data.body,
				url: data.url
			};

			if(data.small_image_url){
				templateData.image = {
					src: data.small_image_url.replace(/thumbStandard.*\./, 'hpMedium.'),
					height: 253,
					width: 337
				};
			}

			element.innerHTML = mustache.render(ARTICLE_TEMPLATE, templateData);
			document.body.appendChild(element);

			element.width = element.clientWidth;
			element.height = element.clientHeight;

			documentFragment.appendChild(element);
			return new SimpleElement(element);
		});
	}

	if(options.data){
		return Q.when(parseResponse(options.data));
	} else {

	}
	return load(options).then(function(response){
		return parseResponse(response);
	});
}

function load(options){
	var deferred = Q.defer();

	var params = [
		'format=json',
		'fields=publication_year,publication_month,publication_day,body,date,' + 
			'title,url,byline,small_image_url,small_image_height,small_image_width',
		'api-key=af04c123c8988a12245668f5b5fa4f4c:8:67325739',
		'query=' + options.query
	];
	
	var request = new XMLHttpRequest();

	request.onload = function(){
		deferred.resolve(JSON.parse(this.responseText));
	};

	request.onerror = function(){
		deferred.reject();
	};

	request.open('get', endpoint + '?' + params.join('&'), true);
	request.send();

	return deferred.promise;
}
