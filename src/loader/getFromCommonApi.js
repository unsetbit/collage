var Q = require('q/q.js');

window.API_CALLBACKS = {};

module.exports = (function(){
	var callbackCounter = 0,
		callbacks = window.API_CALLBACKS,
		defaultTimeout = 10 * 1000;

	return function(endpoint, callbackParam, params, timeout){
		var callbackId = "c" + callbackCounter++,
			deferred = Q.defer(),
			script = document.createElement("script"),
			timeoutId;
		
		if(typeof callbackParam !== "string"){
			timeout = params;
			params = callbackParam;
			callbackParam = "callback";
		}

		timeout = timeout || defaultTimeout;
		params = params || [];
		params.push(callbackParam + "=API_CALLBACKS." + callbackId);

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