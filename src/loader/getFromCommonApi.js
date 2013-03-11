var Q = require('q/q.js');

module.exports = (function(){
	var callbackCounter = 0,
		callbacks = {},
		defaultTimeout = 10 * 1000;

	window.GOOGLE_API_CALLBACKS = callbacks;

	return function getFromGoogle(endpoint, params, timeout){
		var callbackId = "c" + callbackCounter++,
			deferred = Q.defer(),
			script = document.createElement("script"),
			timeoutId;
		
		timeout = timeout || defaultTimeout;
		params = params || [];
		params.push("callback=GOOGLE_API_CALLBACKS." + callbackId);

		timeoutId = setTimeout(function(){
			deferred.reject("timeout");
		}, timeout);
		
		callbacks[callbackId] = function(response){
			clearTimeout(timeoutId);
			delete callbacks[callbackId];
			deferred.resolve(response);
		}

		script.async = true;
		script.src = endpoint + "?" + params.join("&"); 
		document.body.appendChild(script);
		return deferred.promise;
	}
}());