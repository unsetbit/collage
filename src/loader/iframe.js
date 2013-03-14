var Q = require('q/q.js'),
	IframeElement = require("../element/Iframe.js"),
	utils = require('../utils.js');

module.exports = function(collage, options){
	var width = options.width || 500,
		height = options.height || 500;

	var iframe = document.createElement("iframe");
	iframe.src = options.url;

	var element = utils.attachIframeToCollage(collage, iframe, width, height);

	return Q.when(new IframeElement(element));
};
