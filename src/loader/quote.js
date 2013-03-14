var Q = require('q/q.js');
var SimpleElement = require("../element/Simple.js");

var documentFragment = document.createDocumentFragment();

module.exports = function(collage, src){
	var	element = document.createElement("div");
	
	img.src = src;

	img.onload = function(){
		// This forces FF to set the width/height
		documentFragment.appendChild(img);
		deferred.resolve(new SimpleElement(img));
	};

	img.onerror = deferred.reject.bind(deferred);

	return deferred.promise;
};