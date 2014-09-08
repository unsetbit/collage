!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.collage=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],2:[function(_dereq_,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.BigSurface=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.easyTween=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

// Adapted from http://gizma.com/easing/ (which was created by Robert Penner)

exports.linear = function(currentTime, startValue, changeInValue, totalTime) {
	return changeInValue * currentTime / totalTime + startValue; 
};


exports.quadraticIn = function(currentTime, startValue, changeInValue, totalTime) {
	return changeInValue * (currentTime /= totalTime) * currentTime + startValue;
};

exports.quadraticOut = function(currentTime, startValue, changeInValue, totalTime) {
	return -changeInValue * (currentTime /= totalTime) * (currentTime - 2) + startValue;
};

exports.quadraticInOut = function(currentTime, startValue, changeInValue, totalTime) {
	currentTime /= totalTime / 2;
	
	if(currentTime < 1) return changeInValue / 2 * currentTime * currentTime + startValue;
	
	return -changeInValue / 2 * (--currentTime * (currentTime - 2) - 1) + startValue;
};

exports.cubicIn = function(currentTime, startValue, changeInValue, totalTime) {
	return changeInValue * (currentTime /= totalTime) * currentTime * currentTime + startValue;
};

exports.cubicOut = function(currentTime, startValue, changeInValue, totalTime) {
	currentTime /= totalTime;

	return changeInValue * (--currentTime * currentTime * currentTime + 1) + startValue;
};

exports.cubicInOut = function(currentTime, startValue, changeInValue, totalTime) {
	currentTime /= totalTime / 2;
	
	if(currentTime < 1) return changeInValue * (currentTime /= totalTime) * currentTime * currentTime + startValue;

	return changeInValue / 2 * ((currentTime -= 2) * currentTime * currentTime + 2) + startValue;
};


var HALF_PI = Math.PI / 2;
exports.sinusoidalIn = function(currentTime, startValue, changeInValue, totalTime) {
	return -changeInValue * Math.cos(currentTime / totalTime * HALF_PI) + changeInValue + startValue;
};

exports.sinusoidalOut = function(currentTime, startValue, changeInValue, totalTime) {
	return changeInValue * Math.sin(currentTime / totalTime * HALF_PI) + startValue;
};

exports.sinusoidalInOut = function(currentTime, startValue, changeInValue, totalTime){
	return -changeInValue / 2 * (Math.cos(Math.PI * currentTime / totalTime) - 1) + startValue;
};


exports.exponentialIn = function(currentTime, startValue, changeInValue, totalTime){
	return changeInValue * Math.pow(2, 10 * (currentTime / totalTime - 1)) + startValue;
};

exports.exponentialOut = function(currentTime, startValue, changeInValue, totalTime){
	return changeInValue * (-Math.pow(2, -10 * currentTime / totalTime) + 1) + startValue;
};

exports.exponentialInOut = function(currentTime, startValue, changeInValue, totalTime){
	currentTime /= totalTime / 2;
	
	if(currentTime < 1) return changeInValue / 2 * Math.pow(2, 10 * (currentTime -1))  + startValue;

	return changeInValue / 2 * (-Math.pow(2, -10 * --currentTime) + 2) + startValue;
};

},{}],2:[function(_dereq_,module,exports){
'use strict';

var tween = module.exports = function(easingFunc, obj, prop, targetValue, duration, callback){
	duration = duration || 0;
	
	var startValue = obj[prop],
		valueDiff = targetValue - startValue,
		startTime = Date.now(),
		pauseStart = startTime,
		paused = true,
		animationRequestId;

	function pause(){
		if(paused) return;
		paused = true;

		cancelAnimationFrame(animationRequestId);	
		pauseStart = Date.now();
	}

	function resume(){
		if(!paused) return;
		paused = false;

		startTime += Date.now() - pauseStart;
		
		animationRequestId = requestAnimationFrame(step);
	}

	function step(){
		var currentTime = Date.now() - startTime;

		if(currentTime < duration){
			obj[prop] = easingFunc(currentTime, startValue, valueDiff, duration);
			animationRequestId = requestAnimationFrame(step);
		} else {
			obj[prop] = easingFunc(duration, startValue, valueDiff, duration);
			if(callback) callback();
		}
	}

	resume();

	return {
		resume: resume,
		pause: pause
	};
};

// Bind easing helpers
var easing = _dereq_('./easing.js'),
	easingFuncName;

for(easingFuncName in easing){
	if(easing.hasOwnProperty(easingFuncName)){
		tween[easingFuncName] = tween.bind(void 0, easing[easingFuncName]);
	}
}

tween.easing = easing;
},{"./easing.js":1}]},{},[2])

(2)
});


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
/*!
 * EventEmitter v4.2.8 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

(function () {
	'use strict';

	/**
	 * Class for managing events.
	 * Can be extended to provide event functionality in other classes.
	 *
	 * @class EventEmitter Manages event registering and emitting.
	 */
	function EventEmitter() {}

	// Shortcuts to improve speed and size
	var proto = EventEmitter.prototype;
	var exports = this;
	var originalGlobalValue = exports.EventEmitter;

	/**
	 * Finds the index of the listener for the event in its storage array.
	 *
	 * @param {Function[]} listeners Array of listeners to search through.
	 * @param {Function} listener Method to look for.
	 * @return {Number} Index of the specified listener, -1 if not found
	 * @api private
	 */
	function indexOfListener(listeners, listener) {
		var i = listeners.length;
		while (i--) {
			if (listeners[i].listener === listener) {
				return i;
			}
		}

		return -1;
	}

	/**
	 * Alias a method while keeping the context correct, to allow for overwriting of target method.
	 *
	 * @param {String} name The name of the target method.
	 * @return {Function} The aliased method
	 * @api private
	 */
	function alias(name) {
		return function aliasClosure() {
			return this[name].apply(this, arguments);
		};
	}

	/**
	 * Returns the listener array for the specified event.
	 * Will initialise the event object and listener arrays if required.
	 * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	 * Each property in the object response is an array of listener functions.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Function[]|Object} All listener functions for the event.
	 */
	proto.getListeners = function getListeners(evt) {
		var events = this._getEvents();
		var response;
		var key;

		// Return a concatenated array of all matching events if
		// the selector is a regular expression.
		if (evt instanceof RegExp) {
			response = {};
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					response[key] = events[key];
				}
			}
		}
		else {
			response = events[evt] || (events[evt] = []);
		}

		return response;
	};

	/**
	 * Takes a list of listener objects and flattens it into a list of listener functions.
	 *
	 * @param {Object[]} listeners Raw listener objects.
	 * @return {Function[]} Just the listener functions.
	 */
	proto.flattenListeners = function flattenListeners(listeners) {
		var flatListeners = [];
		var i;

		for (i = 0; i < listeners.length; i += 1) {
			flatListeners.push(listeners[i].listener);
		}

		return flatListeners;
	};

	/**
	 * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Object} All listener functions for an event in an object.
	 */
	proto.getListenersAsObject = function getListenersAsObject(evt) {
		var listeners = this.getListeners(evt);
		var response;

		if (listeners instanceof Array) {
			response = {};
			response[evt] = listeners;
		}

		return response || listeners;
	};

	/**
	 * Adds a listener function to the specified event.
	 * The listener will not be added if it is a duplicate.
	 * If the listener returns true then it will be removed after it is called.
	 * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListener = function addListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var listenerIsWrapped = typeof listener === 'object';
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
				listeners[key].push(listenerIsWrapped ? listener : {
					listener: listener,
					once: false
				});
			}
		}

		return this;
	};

	/**
	 * Alias of addListener
	 */
	proto.on = alias('addListener');

	/**
	 * Semi-alias of addListener. It will add a listener that will be
	 * automatically removed after its first execution.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addOnceListener = function addOnceListener(evt, listener) {
		return this.addListener(evt, {
			listener: listener,
			once: true
		});
	};

	/**
	 * Alias of addOnceListener.
	 */
	proto.once = alias('addOnceListener');

	/**
	 * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	 * You need to tell it what event names should be matched by a regex.
	 *
	 * @param {String} evt Name of the event to create.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvent = function defineEvent(evt) {
		this.getListeners(evt);
		return this;
	};

	/**
	 * Uses defineEvent to define multiple events.
	 *
	 * @param {String[]} evts An array of event names to define.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvents = function defineEvents(evts) {
		for (var i = 0; i < evts.length; i += 1) {
			this.defineEvent(evts[i]);
		}
		return this;
	};

	/**
	 * Removes a listener function from the specified event.
	 * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to remove the listener from.
	 * @param {Function} listener Method to remove from the event.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListener = function removeListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var index;
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				index = indexOfListener(listeners[key], listener);

				if (index !== -1) {
					listeners[key].splice(index, 1);
				}
			}
		}

		return this;
	};

	/**
	 * Alias of removeListener
	 */
	proto.off = alias('removeListener');

	/**
	 * Adds listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	 * You can also pass it a regular expression to add the array of listeners to all events that match it.
	 * Yeah, this function does quite a bit. That's probably a bad thing.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListeners = function addListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(false, evt, listeners);
	};

	/**
	 * Removes listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be removed.
	 * You can also pass it a regular expression to remove the listeners from all events that match it.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListeners = function removeListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(true, evt, listeners);
	};

	/**
	 * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	 * The first argument will determine if the listeners are removed (true) or added (false).
	 * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be added/removed.
	 * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	 *
	 * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
		var i;
		var value;
		var single = remove ? this.removeListener : this.addListener;
		var multiple = remove ? this.removeListeners : this.addListeners;

		// If evt is an object then pass each of its properties to this method
		if (typeof evt === 'object' && !(evt instanceof RegExp)) {
			for (i in evt) {
				if (evt.hasOwnProperty(i) && (value = evt[i])) {
					// Pass the single listener straight through to the singular method
					if (typeof value === 'function') {
						single.call(this, i, value);
					}
					else {
						// Otherwise pass back to the multiple function
						multiple.call(this, i, value);
					}
				}
			}
		}
		else {
			// So evt must be a string
			// And listeners must be an array of listeners
			// Loop over it and pass each one to the multiple method
			i = listeners.length;
			while (i--) {
				single.call(this, evt, listeners[i]);
			}
		}

		return this;
	};

	/**
	 * Removes all listeners from a specified event.
	 * If you do not specify an event then all listeners will be removed.
	 * That means every event will be emptied.
	 * You can also pass a regex to remove all events that match it.
	 *
	 * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeEvent = function removeEvent(evt) {
		var type = typeof evt;
		var events = this._getEvents();
		var key;

		// Remove different things depending on the state of evt
		if (type === 'string') {
			// Remove all listeners for the specified event
			delete events[evt];
		}
		else if (evt instanceof RegExp) {
			// Remove all events matching the regex.
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					delete events[key];
				}
			}
		}
		else {
			// Remove all listeners in all events
			delete this._events;
		}

		return this;
	};

	/**
	 * Alias of removeEvent.
	 *
	 * Added to mirror the node API.
	 */
	proto.removeAllListeners = alias('removeEvent');

	/**
	 * Emits an event of your choice.
	 * When emitted, every listener attached to that event will be executed.
	 * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	 * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	 * So they will not arrive within the array on the other side, they will be separate.
	 * You can also pass a regular expression to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {Array} [args] Optional array of arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emitEvent = function emitEvent(evt, args) {
		var listeners = this.getListenersAsObject(evt);
		var listener;
		var i;
		var key;
		var response;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				i = listeners[key].length;

				while (i--) {
					// If the listener returns true then it shall be removed from the event
					// The function is executed either with a basic call or an apply if there is an args array
					listener = listeners[key][i];

					if (listener.once === true) {
						this.removeListener(evt, listener.listener);
					}

					response = listener.listener.apply(this, args || []);

					if (response === this._getOnceReturnValue()) {
						this.removeListener(evt, listener.listener);
					}
				}
			}
		}

		return this;
	};

	/**
	 * Alias of emitEvent
	 */
	proto.trigger = alias('emitEvent');

	/**
	 * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	 * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {...*} Optional additional arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emit = function emit(evt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(evt, args);
	};

	/**
	 * Sets the current value to check against when executing listeners. If a
	 * listeners return value matches the one set here then it will be removed
	 * after execution. This value defaults to true.
	 *
	 * @param {*} value The new value to check for when executing listeners.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.setOnceReturnValue = function setOnceReturnValue(value) {
		this._onceReturnValue = value;
		return this;
	};

	/**
	 * Fetches the current value to check against when executing listeners. If
	 * the listeners return value matches this one then it should be removed
	 * automatically. It will return true by default.
	 *
	 * @return {*|Boolean} The current value to check for or the default, true.
	 * @api private
	 */
	proto._getOnceReturnValue = function _getOnceReturnValue() {
		if (this.hasOwnProperty('_onceReturnValue')) {
			return this._onceReturnValue;
		}
		else {
			return true;
		}
	};

	/**
	 * Fetches the events object and creates one if required.
	 *
	 * @return {Object} The events storage object.
	 * @api private
	 */
	proto._getEvents = function _getEvents() {
		return this._events || (this._events = {});
	};

	/**
	 * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
	 *
	 * @return {Function} Non conflicting EventEmitter class.
	 */
	EventEmitter.noConflict = function noConflict() {
		exports.EventEmitter = originalGlobalValue;
		return EventEmitter;
	};

	// Expose the class either via AMD, CommonJS or the global object
	if (typeof define === 'function' && define.amd) {
		define(function () {
			return EventEmitter;
		});
	}
	else if (typeof module === 'object' && module.exports){
		module.exports = EventEmitter;
	}
	else {
		this.EventEmitter = EventEmitter;
	}
}.call(this));

},{}],3:[function(_dereq_,module,exports){
/*! Hammer.JS - v1.0.11 - 2014-05-20
 * http://eightmedia.github.io/hammer.js
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

(function(window, undefined) {
  'use strict';

/**
 * Hammer
 * use this to create instances
 * @param   {HTMLElement}   element
 * @param   {Object}        options
 * @returns {Hammer.Instance}
 * @constructor
 */
var Hammer = function(element, options) {
  return new Hammer.Instance(element, options || {});
};

Hammer.VERSION = '1.0.11';

// default settings
Hammer.defaults = {
  // add styles and attributes to the element to prevent the browser from doing
  // its native behavior. this doesnt prevent the scrolling, but cancels
  // the contextmenu, tap highlighting etc
  // set to false to disable this
  stop_browser_behavior: {
    // this also triggers onselectstart=false for IE
    userSelect       : 'none',
    // this makes the element blocking in IE10> and Chrome 35>, you could experiment with the value
    // see for more options the wiki: https://github.com/EightMedia/hammer.js/wiki
    touchAction      : 'pan-y',

    touchCallout     : 'none',
    contentZooming   : 'none',
    userDrag         : 'none',
    tapHighlightColor: 'rgba(0,0,0,0)'
  }

  //
  // more settings are defined per gesture at /gestures
  //
};


// detect touchevents
Hammer.HAS_POINTEREVENTS = window.navigator.pointerEnabled || window.navigator.msPointerEnabled;
Hammer.HAS_TOUCHEVENTS = ('ontouchstart' in window);

// dont use mouseevents on mobile devices
Hammer.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i;
Hammer.NO_MOUSEEVENTS = Hammer.HAS_TOUCHEVENTS && window.navigator.userAgent.match(Hammer.MOBILE_REGEX);

// eventtypes per touchevent (start, move, end)
// are filled by Event.determineEventTypes on setup
Hammer.EVENT_TYPES = {};

// interval in which Hammer recalculates current velocity in ms
Hammer.UPDATE_VELOCITY_INTERVAL = 16;

// hammer document where the base events are added at
Hammer.DOCUMENT = window.document;

// define these also as vars, for better minification
// direction defines
var DIRECTION_DOWN = Hammer.DIRECTION_DOWN = 'down';
var DIRECTION_LEFT = Hammer.DIRECTION_LEFT = 'left';
var DIRECTION_UP = Hammer.DIRECTION_UP = 'up';
var DIRECTION_RIGHT = Hammer.DIRECTION_RIGHT = 'right';

// pointer type
var POINTER_MOUSE = Hammer.POINTER_MOUSE = 'mouse';
var POINTER_TOUCH = Hammer.POINTER_TOUCH = 'touch';
var POINTER_PEN = Hammer.POINTER_PEN = 'pen';

// touch event defines
var EVENT_START = Hammer.EVENT_START = 'start';
var EVENT_MOVE = Hammer.EVENT_MOVE = 'move';
var EVENT_END = Hammer.EVENT_END = 'end';


// plugins and gestures namespaces
Hammer.plugins = Hammer.plugins || {};
Hammer.gestures = Hammer.gestures || {};


// if the window events are set...
Hammer.READY = false;


/**
 * setup events to detect gestures on the document
 */
function setup() {
  if(Hammer.READY) {
    return;
  }

  // find what eventtypes we add listeners to
  Event.determineEventTypes();

  // Register all gestures inside Hammer.gestures
  Utils.each(Hammer.gestures, function(gesture){
    Detection.register(gesture);
  });

  // Add touch events on the document
  Event.onTouch(Hammer.DOCUMENT, EVENT_MOVE, Detection.detect);
  Event.onTouch(Hammer.DOCUMENT, EVENT_END, Detection.detect);

  // Hammer is ready...!
  Hammer.READY = true;
}


var Utils = Hammer.utils = {
  /**
   * extend method,
   * also used for cloning when dest is an empty object
   * @param   {Object}    dest
   * @param   {Object}    src
   * @parm  {Boolean}  merge    do a merge
   * @returns {Object}    dest
   */
  extend: function extend(dest, src, merge) {
    for(var key in src) {
      if(dest[key] !== undefined && merge) {
        continue;
      }
      dest[key] = src[key];
    }
    return dest;
  },


  /**
   * for each
   * @param obj
   * @param iterator
   */
  each: function each(obj, iterator, context) {
    var i, o;
    // native forEach on arrays
    if ('forEach' in obj) {
      obj.forEach(iterator, context);
    }
    // arrays
    else if(obj.length !== undefined) {
      for(i=-1; (o=obj[++i]);) {
        if (iterator.call(context, o, i, obj) === false) {
          return;
        }
      }
    }
    // objects
    else {
      for(i in obj) {
        if(obj.hasOwnProperty(i) &&
            iterator.call(context, obj[i], i, obj) === false) {
          return;
        }
      }
    }
  },


  /**
   * find if a string contains the needle
   * @param   {String}  src
   * @param   {String}  needle
   * @returns {Boolean} found
   */
  inStr: function inStr(src, needle) {
    return src.indexOf(needle) > -1;
  },


  /**
   * find if a node is in the given parent
   * used for event delegation tricks
   * @param   {HTMLElement}   node
   * @param   {HTMLElement}   parent
   * @returns {boolean}       has_parent
   */
  hasParent: function hasParent(node, parent) {
    while(node) {
      if(node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  },


  /**
   * get the center of all the touches
   * @param   {Array}     touches
   * @returns {Object}    center pageXY clientXY
   */
  getCenter: function getCenter(touches) {
    var pageX = []
      , pageY = []
      , clientX = []
      , clientY = []
      , min = Math.min
      , max = Math.max;

    // no need to loop when only one touch
    if(touches.length === 1) {
      return {
        pageX: touches[0].pageX,
        pageY: touches[0].pageY,
        clientX: touches[0].clientX,
        clientY: touches[0].clientY
      };
    }

    Utils.each(touches, function(touch) {
      pageX.push(touch.pageX);
      pageY.push(touch.pageY);
      clientX.push(touch.clientX);
      clientY.push(touch.clientY);
    });

    return {
      pageX: (min.apply(Math, pageX) + max.apply(Math, pageX)) / 2,
      pageY: (min.apply(Math, pageY) + max.apply(Math, pageY)) / 2,
      clientX: (min.apply(Math, clientX) + max.apply(Math, clientX)) / 2,
      clientY: (min.apply(Math, clientY) + max.apply(Math, clientY)) / 2
    };
  },


  /**
   * calculate the velocity between two points
   * @param   {Number}    delta_time
   * @param   {Number}    delta_x
   * @param   {Number}    delta_y
   * @returns {Object}    velocity
   */
  getVelocity: function getVelocity(delta_time, delta_x, delta_y) {
    return {
      x: Math.abs(delta_x / delta_time) || 0,
      y: Math.abs(delta_y / delta_time) || 0
    };
  },


  /**
   * calculate the angle between two coordinates
   * @param   {Touch}     touch1
   * @param   {Touch}     touch2
   * @returns {Number}    angle
   */
  getAngle: function getAngle(touch1, touch2) {
    var x = touch2.clientX - touch1.clientX
      , y = touch2.clientY - touch1.clientY;
    return Math.atan2(y, x) * 180 / Math.PI;
  },


  /**
   * angle to direction define
   * @param   {Touch}     touch1
   * @param   {Touch}     touch2
   * @returns {String}    direction constant, like DIRECTION_LEFT
   */
  getDirection: function getDirection(touch1, touch2) {
    var x = Math.abs(touch1.clientX - touch2.clientX)
      , y = Math.abs(touch1.clientY - touch2.clientY);
    if(x >= y) {
      return touch1.clientX - touch2.clientX > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return touch1.clientY - touch2.clientY > 0 ? DIRECTION_UP : DIRECTION_DOWN;
  },


  /**
   * calculate the distance between two touches
   * @param   {Touch}     touch1
   * @param   {Touch}     touch2
   * @returns {Number}    distance
   */
  getDistance: function getDistance(touch1, touch2) {
    var x = touch2.clientX - touch1.clientX
      , y = touch2.clientY - touch1.clientY;
    return Math.sqrt((x * x) + (y * y));
  },


  /**
   * calculate the scale factor between two touchLists (fingers)
   * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
   * @param   {Array}     start
   * @param   {Array}     end
   * @returns {Number}    scale
   */
  getScale: function getScale(start, end) {
    // need two fingers...
    if(start.length >= 2 && end.length >= 2) {
      return this.getDistance(end[0], end[1]) / this.getDistance(start[0], start[1]);
    }
    return 1;
  },


  /**
   * calculate the rotation degrees between two touchLists (fingers)
   * @param   {Array}     start
   * @param   {Array}     end
   * @returns {Number}    rotation
   */
  getRotation: function getRotation(start, end) {
    // need two fingers
    if(start.length >= 2 && end.length >= 2) {
      return this.getAngle(end[1], end[0]) - this.getAngle(start[1], start[0]);
    }
    return 0;
  },


  /**
   * boolean if the direction is vertical
   * @param    {String}    direction
   * @returns  {Boolean}   is_vertical
   */
  isVertical: function isVertical(direction) {
    return direction == DIRECTION_UP || direction == DIRECTION_DOWN;
  },


  /**
   * toggle browser default behavior with css props
   * @param   {HtmlElement}   element
   * @param   {Object}        css_props
   * @param   {Boolean}       toggle
   */
  toggleDefaultBehavior: function toggleDefaultBehavior(element, css_props, toggle) {
    if(!css_props || !element || !element.style) {
      return;
    }

    // with css properties for modern browsers
    Utils.each(['webkit', 'moz', 'Moz', 'ms', 'o', ''], function setStyle(vendor) {
      Utils.each(css_props, function(value, prop) {
          // vender prefix at the property
          if(vendor) {
            prop = vendor + prop.substring(0, 1).toUpperCase() + prop.substring(1);
          }
          // set the style
          if(prop in element.style) {
            element.style[prop] = !toggle && value;
          }
      });
    });

    var false_fn = function(){ return false; };

    // also the disable onselectstart
    if(css_props.userSelect == 'none') {
      element.onselectstart = !toggle && false_fn;
    }
    // and disable ondragstart
    if(css_props.userDrag == 'none') {
      element.ondragstart = !toggle && false_fn;
    }
  }
};


/**
 * create new hammer instance
 * all methods should return the instance itself, so it is chainable.
 * @param   {HTMLElement}       element
 * @param   {Object}            [options={}]
 * @returns {Hammer.Instance}
 * @constructor
 */
Hammer.Instance = function(element, options) {
  var self = this;

  // setup HammerJS window events and register all gestures
  // this also sets up the default options
  setup();

  this.element = element;

  // start/stop detection option
  this.enabled = true;

  // merge options
  this.options = Utils.extend(
    Utils.extend({}, Hammer.defaults),
    options || {});

  // add some css to the element to prevent the browser from doing its native behavoir
  if(this.options.stop_browser_behavior) {
    Utils.toggleDefaultBehavior(this.element, this.options.stop_browser_behavior, false);
  }

  // start detection on touchstart
  this.eventStartHandler = Event.onTouch(element, EVENT_START, function(ev) {
    if(self.enabled) {
      Detection.startDetect(self, ev);
    }
  });

  // keep a list of user event handlers which needs to be removed when calling 'dispose'
  this.eventHandlers = [];

  // return instance
  return this;
};


Hammer.Instance.prototype = {
  /**
   * bind events to the instance
   * @param   {String}      gesture
   * @param   {Function}    handler
   * @returns {Hammer.Instance}
   */
  on: function onEvent(gesture, handler) {
    var gestures = gesture.split(' ');
    Utils.each(gestures, function(gesture) {
      this.element.addEventListener(gesture, handler, false);
      this.eventHandlers.push({ gesture: gesture, handler: handler });
    }, this);
    return this;
  },


  /**
   * unbind events to the instance
   * @param   {String}      gesture
   * @param   {Function}    handler
   * @returns {Hammer.Instance}
   */
  off: function offEvent(gesture, handler) {
    var gestures = gesture.split(' ')
      , i, eh;
    Utils.each(gestures, function(gesture) {
      this.element.removeEventListener(gesture, handler, false);

      // remove the event handler from the internal list
      for(i=-1; (eh=this.eventHandlers[++i]);) {
        if(eh.gesture === gesture && eh.handler === handler) {
          this.eventHandlers.splice(i, 1);
        }
      }
    }, this);
    return this;
  },


  /**
   * trigger gesture event
   * @param   {String}      gesture
   * @param   {Object}      [eventData]
   * @returns {Hammer.Instance}
   */
  trigger: function triggerEvent(gesture, eventData) {
    // optional
    if(!eventData) {
      eventData = {};
    }

    // create DOM event
    var event = Hammer.DOCUMENT.createEvent('Event');
    event.initEvent(gesture, true, true);
    event.gesture = eventData;

    // trigger on the target if it is in the instance element,
    // this is for event delegation tricks
    var element = this.element;
    if(Utils.hasParent(eventData.target, element)) {
      element = eventData.target;
    }

    element.dispatchEvent(event);
    return this;
  },


  /**
   * enable of disable hammer.js detection
   * @param   {Boolean}   state
   * @returns {Hammer.Instance}
   */
  enable: function enable(state) {
    this.enabled = state;
    return this;
  },


  /**
   * dispose this hammer instance
   * @returns {Hammer.Instance}
   */
  dispose: function dispose() {
    var i, eh;

    // undo all changes made by stop_browser_behavior
    if(this.options.stop_browser_behavior) {
      Utils.toggleDefaultBehavior(this.element, this.options.stop_browser_behavior, true);
    }

    // unbind all custom event handlers
    for(i=-1; (eh=this.eventHandlers[++i]);) {
      this.element.removeEventListener(eh.gesture, eh.handler, false);
    }
    this.eventHandlers = [];

    // unbind the start event listener
    Event.unbindDom(this.element, Hammer.EVENT_TYPES[EVENT_START], this.eventStartHandler);

    return null;
  }
};


/**
 * this holds the last move event,
 * used to fix empty touchend issue
 * see the onTouch event for an explanation
 * @type {Object}
 */
var last_move_event = null;

/**
 * when the mouse is hold down, this is true
 * @type {Boolean}
 */
var should_detect = false;

/**
 * when touch events have been fired, this is true
 * @type {Boolean}
 */
var touch_triggered = false;


var Event = Hammer.event = {
  /**
   * simple addEventListener
   * @param   {HTMLElement}   element
   * @param   {String}        type
   * @param   {Function}      handler
   */
  bindDom: function(element, type, handler) {
    var types = type.split(' ');
    Utils.each(types, function(type){
      element.addEventListener(type, handler, false);
    });
  },


  /**
   * simple removeEventListener
   * @param   {HTMLElement}   element
   * @param   {String}        type
   * @param   {Function}      handler
   */
  unbindDom: function(element, type, handler) {
    var types = type.split(' ');
    Utils.each(types, function(type){
      element.removeEventListener(type, handler, false);
    });
  },


  /**
   * touch events with mouse fallback
   * @param   {HTMLElement}   element
   * @param   {String}        eventType        like EVENT_MOVE
   * @param   {Function}      handler
   */
  onTouch: function onTouch(element, eventType, handler) {
    var self = this;


    var bindDomOnTouch = function bindDomOnTouch(ev) {
      var srcEventType = ev.type.toLowerCase();

      // onmouseup, but when touchend has been fired we do nothing.
      // this is for touchdevices which also fire a mouseup on touchend
      if(Utils.inStr(srcEventType, 'mouse') && touch_triggered) {
        return;
      }

      // mousebutton must be down or a touch event
      else if(Utils.inStr(srcEventType, 'touch') ||   // touch events are always on screen
        Utils.inStr(srcEventType, 'pointerdown') || // pointerevents touch
        (Utils.inStr(srcEventType, 'mouse') && ev.which === 1)   // mouse is pressed
        ) {
        should_detect = true;
      }

      // mouse isn't pressed
      else if(Utils.inStr(srcEventType, 'mouse') && !ev.which) {
        should_detect = false;
      }


      // we are in a touch event, set the touch triggered bool to true,
      // this for the conflicts that may occur on ios and android
      if(Utils.inStr(srcEventType, 'touch') || Utils.inStr(srcEventType, 'pointer')) {
        touch_triggered = true;
      }

      // count the total touches on the screen
      var count_touches = 0;

      // when touch has been triggered in this detection session
      // and we are now handling a mouse event, we stop that to prevent conflicts
      if(should_detect) {
        // update pointerevent
        if(Hammer.HAS_POINTEREVENTS && eventType != EVENT_END) {
          count_touches = PointerEvent.updatePointer(eventType, ev);
        }
        // touch
        else if(Utils.inStr(srcEventType, 'touch')) {
          count_touches = ev.touches.length;
        }
        // mouse
        else if(!touch_triggered) {
          count_touches = Utils.inStr(srcEventType, 'up') ? 0 : 1;
        }


        // if we are in a end event, but when we remove one touch and
        // we still have enough, set eventType to move
        if(count_touches > 0 && eventType == EVENT_END) {
          eventType = EVENT_MOVE;
        }
        // no touches, force the end event
        else if(!count_touches) {
          eventType = EVENT_END;
        }

        // store the last move event
        if(count_touches || last_move_event === null) {
          last_move_event = ev;
        }


        // trigger the handler
        handler.call(Detection, self.collectEventData(element, eventType,
                                  self.getTouchList(last_move_event, eventType),
                                  ev) );

        // remove pointerevent from list
        if(Hammer.HAS_POINTEREVENTS && eventType == EVENT_END) {
          count_touches = PointerEvent.updatePointer(eventType, ev);
        }
      }

      // on the end we reset everything
      if(!count_touches) {
        last_move_event = null;
        should_detect = false;
        touch_triggered = false;
        PointerEvent.reset();
      }
    };

    this.bindDom(element, Hammer.EVENT_TYPES[eventType], bindDomOnTouch);

    // return the bound function to be able to unbind it later
    return bindDomOnTouch;
  },


  /**
   * we have different events for each device/browser
   * determine what we need and set them in the Hammer.EVENT_TYPES constant
   */
  determineEventTypes: function determineEventTypes() {
    // determine the eventtype we want to set
    var types;

    // pointerEvents magic
    if(Hammer.HAS_POINTEREVENTS) {
      types = PointerEvent.getEvents();
    }
    // on Android, iOS, blackberry, windows mobile we dont want any mouseevents
    else if(Hammer.NO_MOUSEEVENTS) {
      types = [
        'touchstart',
        'touchmove',
        'touchend touchcancel'];
    }
    // for non pointer events browsers and mixed browsers,
    // like chrome on windows8 touch laptop
    else {
      types = [
        'touchstart mousedown',
        'touchmove mousemove',
        'touchend touchcancel mouseup'];
    }

    Hammer.EVENT_TYPES[EVENT_START] = types[0];
    Hammer.EVENT_TYPES[EVENT_MOVE] = types[1];
    Hammer.EVENT_TYPES[EVENT_END] = types[2];
  },


  /**
   * create touchlist depending on the event
   * @param   {Object}    ev
   * @param   {String}    eventType   used by the fakemultitouch plugin
   */
  getTouchList: function getTouchList(ev/*, eventType*/) {
    // get the fake pointerEvent touchlist
    if(Hammer.HAS_POINTEREVENTS) {
      return PointerEvent.getTouchList();
    }

    // get the touchlist
    if(ev.touches) {
      return ev.touches;
    }

    // make fake touchlist from mouse position
    ev.identifier = 1;
    return [ev];
  },


  /**
   * collect event data for Hammer js
   * @param   {HTMLElement}   element
   * @param   {String}        eventType        like EVENT_MOVE
   * @param   {Object}        eventData
   */
  collectEventData: function collectEventData(element, eventType, touches, ev) {
    // find out pointerType
    var pointerType = POINTER_TOUCH;
    if(Utils.inStr(ev.type, 'mouse') || PointerEvent.matchType(POINTER_MOUSE, ev)) {
      pointerType = POINTER_MOUSE;
    }

    return {
      center     : Utils.getCenter(touches),
      timeStamp  : Date.now(),
      target     : ev.target,
      touches    : touches,
      eventType  : eventType,
      pointerType: pointerType,
      srcEvent   : ev,

      /**
       * prevent the browser default actions
       * mostly used to disable scrolling of the browser
       */
      preventDefault: function() {
        var srcEvent = this.srcEvent;
        srcEvent.preventManipulation && srcEvent.preventManipulation();
        srcEvent.preventDefault && srcEvent.preventDefault();
      },

      /**
       * stop bubbling the event up to its parents
       */
      stopPropagation: function() {
        this.srcEvent.stopPropagation();
      },

      /**
       * immediately stop gesture detection
       * might be useful after a swipe was detected
       * @return {*}
       */
      stopDetect: function() {
        return Detection.stopDetect();
      }
    };
  }
};

var PointerEvent = Hammer.PointerEvent = {
  /**
   * holds all pointers
   * @type {Object}
   */
  pointers: {},

  /**
   * get a list of pointers
   * @returns {Array}     touchlist
   */
  getTouchList: function getTouchList() {
    var touchlist = [];
    // we can use forEach since pointerEvents only is in IE10
    Utils.each(this.pointers, function(pointer){
      touchlist.push(pointer);
    });

    return touchlist;
  },

  /**
   * update the position of a pointer
   * @param   {String}   type             EVENT_END
   * @param   {Object}   pointerEvent
   */
  updatePointer: function updatePointer(type, pointerEvent) {
    if(type == EVENT_END) {
      delete this.pointers[pointerEvent.pointerId];
    }
    else {
      pointerEvent.identifier = pointerEvent.pointerId;
      this.pointers[pointerEvent.pointerId] = pointerEvent;
    }

    // it's save to use Object.keys, since pointerEvents are only in newer browsers
    return Object.keys(this.pointers).length;
  },

  /**
   * check if ev matches pointertype
   * @param   {String}        pointerType     POINTER_MOUSE
   * @param   {PointerEvent}  ev
   */
  matchType: function matchType(pointerType, ev) {
    if(!ev.pointerType) {
      return false;
    }

    var pt = ev.pointerType
      , types = {};

    types[POINTER_MOUSE] = (pt === POINTER_MOUSE);
    types[POINTER_TOUCH] = (pt === POINTER_TOUCH);
    types[POINTER_PEN] = (pt === POINTER_PEN);
    return types[pointerType];
  },


  /**
   * get events
   */
  getEvents: function getEvents() {
    return [
      'pointerdown MSPointerDown',
      'pointermove MSPointerMove',
      'pointerup pointercancel MSPointerUp MSPointerCancel'
    ];
  },

  /**
   * reset the list
   */
  reset: function resetList() {
    this.pointers = {};
  }
};


var Detection = Hammer.detection = {
  // contains all registred Hammer.gestures in the correct order
  gestures: [],

  // data of the current Hammer.gesture detection session
  current : null,

  // the previous Hammer.gesture session data
  // is a full clone of the previous gesture.current object
  previous: null,

  // when this becomes true, no gestures are fired
  stopped : false,


  /**
   * start Hammer.gesture detection
   * @param   {Hammer.Instance}   inst
   * @param   {Object}            eventData
   */
  startDetect: function startDetect(inst, eventData) {
    // already busy with a Hammer.gesture detection on an element
    if(this.current) {
      return;
    }

    this.stopped = false;

    // holds current session
    this.current = {
      inst              : inst, // reference to HammerInstance we're working for
      startEvent        : Utils.extend({}, eventData), // start eventData for distances, timing etc
      lastEvent         : false, // last eventData
      lastVelocityEvent : false, // last eventData for velocity.
      velocity          : false, // current velocity
      name              : '' // current gesture we're in/detected, can be 'tap', 'hold' etc
    };

    this.detect(eventData);
  },


  /**
   * Hammer.gesture detection
   * @param   {Object}    eventData
   */
  detect: function detect(eventData) {
    if(!this.current || this.stopped) {
      return;
    }

    // extend event data with calculations about scale, distance etc
    eventData = this.extendEventData(eventData);

    // hammer instance and instance options
    var inst = this.current.inst,
        inst_options = inst.options;

    // call Hammer.gesture handlers
    Utils.each(this.gestures, function triggerGesture(gesture) {
      // only when the instance options have enabled this gesture
      if(!this.stopped && inst_options[gesture.name] !== false && inst.enabled !== false ) {
        // if a handler returns false, we stop with the detection
        if(gesture.handler.call(gesture, eventData, inst) === false) {
          this.stopDetect();
          return false;
        }
      }
    }, this);

    // store as previous event event
    if(this.current) {
      this.current.lastEvent = eventData;
    }

    // end event, but not the last touch, so dont stop
    if(eventData.eventType == EVENT_END && !eventData.touches.length - 1) {
      this.stopDetect();
    }

    return eventData;
  },


  /**
   * clear the Hammer.gesture vars
   * this is called on endDetect, but can also be used when a final Hammer.gesture has been detected
   * to stop other Hammer.gestures from being fired
   */
  stopDetect: function stopDetect() {
    // clone current data to the store as the previous gesture
    // used for the double tap gesture, since this is an other gesture detect session
    this.previous = Utils.extend({}, this.current);

    // reset the current
    this.current = null;

    // stopped!
    this.stopped = true;
  },


  /**
   * calculate velocity
   * @param   {Object}  ev
   * @param   {Number}  delta_time
   * @param   {Number}  delta_x
   * @param   {Number}  delta_y
   */
  getVelocityData: function getVelocityData(ev, delta_time, delta_x, delta_y) {
    var cur = this.current
      , velocityEv = cur.lastVelocityEvent
      , velocity = cur.velocity;

    // calculate velocity every x ms
    if (velocityEv && ev.timeStamp - velocityEv.timeStamp > Hammer.UPDATE_VELOCITY_INTERVAL) {
      velocity = Utils.getVelocity(ev.timeStamp - velocityEv.timeStamp,
                                   ev.center.clientX - velocityEv.center.clientX,
                                  ev.center.clientY - velocityEv.center.clientY);
      cur.lastVelocityEvent = ev;
    }
    else if(!cur.velocity) {
      velocity = Utils.getVelocity(delta_time, delta_x, delta_y);
      cur.lastVelocityEvent = ev;
    }

    cur.velocity = velocity;

    ev.velocityX = velocity.x;
    ev.velocityY = velocity.y;
  },


  /**
   * calculate interim angle and direction
   * @param   {Object}  ev
   */
  getInterimData: function getInterimData(ev) {
    var lastEvent = this.current.lastEvent
      , angle
      , direction;

    // end events (e.g. dragend) don't have useful values for interimDirection & interimAngle
    // because the previous event has exactly the same coordinates
    // so for end events, take the previous values of interimDirection & interimAngle
    // instead of recalculating them and getting a spurious '0'
    if(ev.eventType == EVENT_END) {
      angle = lastEvent && lastEvent.interimAngle;
      direction = lastEvent && lastEvent.interimDirection;
    }
    else {
      angle = lastEvent && Utils.getAngle(lastEvent.center, ev.center);
      direction = lastEvent && Utils.getDirection(lastEvent.center, ev.center);
    }

    ev.interimAngle = angle;
    ev.interimDirection = direction;
  },


  /**
   * extend eventData for Hammer.gestures
   * @param   {Object}   evData
   * @returns {Object}   evData
   */
  extendEventData: function extendEventData(ev) {
    var cur = this.current
      , startEv = cur.startEvent;

    // if the touches change, set the new touches over the startEvent touches
    // this because touchevents don't have all the touches on touchstart, or the
    // user must place his fingers at the EXACT same time on the screen, which is not realistic
    // but, sometimes it happens that both fingers are touching at the EXACT same time
    if(ev.touches.length != startEv.touches.length || ev.touches === startEv.touches) {
      // extend 1 level deep to get the touchlist with the touch objects
      startEv.touches = [];
      Utils.each(ev.touches, function(touch) {
        startEv.touches.push(Utils.extend({}, touch));
      });
    }

    var delta_time = ev.timeStamp - startEv.timeStamp
      , delta_x = ev.center.clientX - startEv.center.clientX
      , delta_y = ev.center.clientY - startEv.center.clientY;

    this.getVelocityData(ev, delta_time, delta_x, delta_y);
    this.getInterimData(ev);

    Utils.extend(ev, {
      startEvent: startEv,

      deltaTime : delta_time,
      deltaX    : delta_x,
      deltaY    : delta_y,

      distance  : Utils.getDistance(startEv.center, ev.center),
      angle     : Utils.getAngle(startEv.center, ev.center),
      direction : Utils.getDirection(startEv.center, ev.center),

      scale     : Utils.getScale(startEv.touches, ev.touches),
      rotation  : Utils.getRotation(startEv.touches, ev.touches)
    });

    return ev;
  },


  /**
   * register new gesture
   * @param   {Object}    gesture object, see gestures.js for documentation
   * @returns {Array}     gestures
   */
  register: function register(gesture) {
    // add an enable gesture options if there is no given
    var options = gesture.defaults || {};
    if(options[gesture.name] === undefined) {
      options[gesture.name] = true;
    }

    // extend Hammer default options with the Hammer.gesture options
    Utils.extend(Hammer.defaults, options, true);

    // set its index
    gesture.index = gesture.index || 1000;

    // add Hammer.gesture to the list
    this.gestures.push(gesture);

    // sort the list by index
    this.gestures.sort(function(a, b) {
      if(a.index < b.index) { return -1; }
      if(a.index > b.index) { return 1; }
      return 0;
    });

    return this.gestures;
  }
};


/**
 * Drag
 * Move with x fingers (default 1) around on the page. Blocking the scrolling when
 * moving left and right is a good practice. When all the drag events are blocking
 * you disable scrolling on that area.
 * @events  drag, drapleft, dragright, dragup, dragdown
 */
Hammer.gestures.Drag = {
  name     : 'drag',
  index    : 50,
  defaults : {
    drag_min_distance            : 10,

    // Set correct_for_drag_min_distance to true to make the starting point of the drag
    // be calculated from where the drag was triggered, not from where the touch started.
    // Useful to avoid a jerk-starting drag, which can make fine-adjustments
    // through dragging difficult, and be visually unappealing.
    correct_for_drag_min_distance: true,

    // set 0 for unlimited, but this can conflict with transform
    drag_max_touches             : 1,

    // prevent default browser behavior when dragging occurs
    // be careful with it, it makes the element a blocking element
    // when you are using the drag gesture, it is a good practice to set this true
    drag_block_horizontal        : false,
    drag_block_vertical          : false,

    // drag_lock_to_axis keeps the drag gesture on the axis that it started on,
    // It disallows vertical directions if the initial direction was horizontal, and vice versa.
    drag_lock_to_axis            : false,

    // drag lock only kicks in when distance > drag_lock_min_distance
    // This way, locking occurs only when the distance has become large enough to reliably determine the direction
    drag_lock_min_distance       : 25
  },

  triggered: false,
  handler  : function dragGesture(ev, inst) {
    var cur = Detection.current;

    // current gesture isnt drag, but dragged is true
    // this means an other gesture is busy. now call dragend
    if(cur.name != this.name && this.triggered) {
      inst.trigger(this.name + 'end', ev);
      this.triggered = false;
      return;
    }

    // max touches
    if(inst.options.drag_max_touches > 0 &&
      ev.touches.length > inst.options.drag_max_touches) {
      return;
    }

    switch(ev.eventType) {
      case EVENT_START:
        this.triggered = false;
        break;

      case EVENT_MOVE:
        // when the distance we moved is too small we skip this gesture
        // or we can be already in dragging
        if(ev.distance < inst.options.drag_min_distance &&
          cur.name != this.name) {
          return;
        }

        var startCenter = cur.startEvent.center;

        // we are dragging!
        if(cur.name != this.name) {
          cur.name = this.name;
          if(inst.options.correct_for_drag_min_distance && ev.distance > 0) {
            // When a drag is triggered, set the event center to drag_min_distance pixels from the original event center.
            // Without this correction, the dragged distance would jumpstart at drag_min_distance pixels instead of at 0.
            // It might be useful to save the original start point somewhere
            var factor = Math.abs(inst.options.drag_min_distance / ev.distance);
            startCenter.pageX += ev.deltaX * factor;
            startCenter.pageY += ev.deltaY * factor;
            startCenter.clientX += ev.deltaX * factor;
            startCenter.clientY += ev.deltaY * factor;

            // recalculate event data using new start point
            ev = Detection.extendEventData(ev);
          }
        }

        // lock drag to axis?
        if(cur.lastEvent.drag_locked_to_axis ||
            ( inst.options.drag_lock_to_axis &&
              inst.options.drag_lock_min_distance <= ev.distance
            )) {
          ev.drag_locked_to_axis = true;
        }
        var last_direction = cur.lastEvent.direction;
        if(ev.drag_locked_to_axis && last_direction !== ev.direction) {
          // keep direction on the axis that the drag gesture started on
          if(Utils.isVertical(last_direction)) {
            ev.direction = (ev.deltaY < 0) ? DIRECTION_UP : DIRECTION_DOWN;
          }
          else {
            ev.direction = (ev.deltaX < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
          }
        }

        // first time, trigger dragstart event
        if(!this.triggered) {
          inst.trigger(this.name + 'start', ev);
          this.triggered = true;
        }

        // trigger events
        inst.trigger(this.name, ev);
        inst.trigger(this.name + ev.direction, ev);

        var is_vertical = Utils.isVertical(ev.direction);

        // block the browser events
        if((inst.options.drag_block_vertical && is_vertical) ||
          (inst.options.drag_block_horizontal && !is_vertical)) {
          ev.preventDefault();
        }
        break;

      case EVENT_END:
        // trigger dragend
        if(this.triggered) {
          inst.trigger(this.name + 'end', ev);
        }

        this.triggered = false;
        break;
    }
  }
};

/**
 * Hold
 * Touch stays at the same place for x time
 * @events  hold
 */
Hammer.gestures.Hold = {
  name    : 'hold',
  index   : 10,
  defaults: {
    hold_timeout  : 500,
    hold_threshold: 2
  },
  timer   : null,

  handler : function holdGesture(ev, inst) {
    switch(ev.eventType) {
      case EVENT_START:
        // clear any running timers
        clearTimeout(this.timer);

        // set the gesture so we can check in the timeout if it still is
        Detection.current.name = this.name;

        // set timer and if after the timeout it still is hold,
        // we trigger the hold event
        this.timer = setTimeout(function() {
          if(Detection.current.name == 'hold') {
            inst.trigger('hold', ev);
          }
        }, inst.options.hold_timeout);
        break;

      // when you move or end we clear the timer
      case EVENT_MOVE:
        if(ev.distance > inst.options.hold_threshold) {
          clearTimeout(this.timer);
        }
        break;

      case EVENT_END:
        clearTimeout(this.timer);
        break;
    }
  }
};

/**
 * Release
 * Called as last, tells the user has released the screen
 * @events  release
 */
Hammer.gestures.Release = {
  name   : 'release',
  index  : Infinity,
  handler: function releaseGesture(ev, inst) {
    if(ev.eventType == EVENT_END) {
      inst.trigger(this.name, ev);
    }
  }
};

/**
 * Swipe
 * triggers swipe events when the end velocity is above the threshold
 * for best usage, set prevent_default (on the drag gesture) to true
 * @events  swipe, swipeleft, swiperight, swipeup, swipedown
 */
Hammer.gestures.Swipe = {
  name    : 'swipe',
  index   : 40,
  defaults: {
    swipe_min_touches: 1,
    swipe_max_touches: 1,
    swipe_velocity   : 0.7
  },
  handler : function swipeGesture(ev, inst) {
    if(ev.eventType == EVENT_END) {
      // max touches
      if(ev.touches.length < inst.options.swipe_min_touches ||
        ev.touches.length > inst.options.swipe_max_touches) {
        return;
      }

      // when the distance we moved is too small we skip this gesture
      // or we can be already in dragging
      if(ev.velocityX > inst.options.swipe_velocity ||
        ev.velocityY > inst.options.swipe_velocity) {
        // trigger swipe events
        inst.trigger(this.name, ev);
        inst.trigger(this.name + ev.direction, ev);
      }
    }
  }
};

/**
 * Tap/DoubleTap
 * Quick touch at a place or double at the same place
 * @events  tap, doubletap
 */
Hammer.gestures.Tap = {
  name    : 'tap',
  index   : 100,
  defaults: {
    tap_max_touchtime : 250,
    tap_max_distance  : 10,
    tap_always        : true,
    doubletap_distance: 20,
    doubletap_interval: 300
  },

  has_moved: false,

  handler : function tapGesture(ev, inst) {
    var prev, since_prev, did_doubletap;

    // reset moved state
    if(ev.eventType == EVENT_START) {
      this.has_moved = false;
    }

    // Track the distance we've moved. If it's above the max ONCE, remember that (fixes #406).
    else if(ev.eventType == EVENT_MOVE && !this.moved) {
      this.has_moved = (ev.distance > inst.options.tap_max_distance);
    }

    else if(ev.eventType == EVENT_END &&
        ev.srcEvent.type != 'touchcancel' &&
        ev.deltaTime < inst.options.tap_max_touchtime && !this.has_moved) {

      // previous gesture, for the double tap since these are two different gesture detections
      prev = Detection.previous;
      since_prev = prev && prev.lastEvent && ev.timeStamp - prev.lastEvent.timeStamp;
      did_doubletap = false;

      // check if double tap
      if(prev && prev.name == 'tap' &&
          (since_prev && since_prev < inst.options.doubletap_interval) &&
          ev.distance < inst.options.doubletap_distance) {
        inst.trigger('doubletap', ev);
        did_doubletap = true;
      }

      // do a single tap
      if(!did_doubletap || inst.options.tap_always) {
        Detection.current.name = 'tap';
        inst.trigger(Detection.current.name, ev);
      }
    }
  }
};

/**
 * Touch
 * Called as first, tells the user has touched the screen
 * @events  touch
 */
Hammer.gestures.Touch = {
  name    : 'touch',
  index   : -Infinity,
  defaults: {
    // call preventDefault at touchstart, and makes the element blocking by
    // disabling the scrolling of the page, but it improves gestures like
    // transforming and dragging.
    // be careful with using this, it can be very annoying for users to be stuck
    // on the page
    prevent_default    : false,

    // disable mouse events, so only touch (or pen!) input triggers events
    prevent_mouseevents: false
  },
  handler : function touchGesture(ev, inst) {
    if(inst.options.prevent_mouseevents &&
        ev.pointerType == POINTER_MOUSE) {
      ev.stopDetect();
      return;
    }

    if(inst.options.prevent_default) {
      ev.preventDefault();
    }

    if(ev.eventType == EVENT_START) {
      inst.trigger(this.name, ev);
    }
  }
};


/**
 * Transform
 * User want to scale or rotate with 2 fingers
 * @events  transform, pinch, pinchin, pinchout, rotate
 */
Hammer.gestures.Transform = {
  name     : 'transform',
  index    : 45,
  defaults : {
    // factor, no scale is 1, zoomin is to 0 and zoomout until higher then 1
    transform_min_scale      : 0.01,
    // rotation in degrees
    transform_min_rotation   : 1,
    // prevent default browser behavior when two touches are on the screen
    // but it makes the element a blocking element
    // when you are using the transform gesture, it is a good practice to set this true
    transform_always_block   : false,
    // ensures that all touches occurred within the instance element
    transform_within_instance: false
  },

  triggered: false,

  handler  : function transformGesture(ev, inst) {
    // current gesture isnt drag, but dragged is true
    // this means an other gesture is busy. now call dragend
    if(Detection.current.name != this.name && this.triggered) {
      inst.trigger(this.name + 'end', ev);
      this.triggered = false;
      return;
    }

    // at least multitouch
    if(ev.touches.length < 2) {
      return;
    }

    // prevent default when two fingers are on the screen
    if(inst.options.transform_always_block) {
      ev.preventDefault();
    }

    // check if all touches occurred within the instance element
    if(inst.options.transform_within_instance) {
      for(var i=-1; ev.touches[++i];) {
        if(!Utils.hasParent(ev.touches[i].target, inst.element)) {
          return;
        }
      }
    }

    switch(ev.eventType) {
      case EVENT_START:
        this.triggered = false;
        break;

      case EVENT_MOVE:
        var scale_threshold = Math.abs(1 - ev.scale);
        var rotation_threshold = Math.abs(ev.rotation);

        // when the distance we moved is too small we skip this gesture
        // or we can be already in dragging
        if(scale_threshold < inst.options.transform_min_scale &&
          rotation_threshold < inst.options.transform_min_rotation) {
          return;
        }

        // we are transforming!
        Detection.current.name = this.name;

        // first time, trigger dragstart event
        if(!this.triggered) {
          inst.trigger(this.name + 'start', ev);
          this.triggered = true;
        }

        inst.trigger(this.name, ev); // basic transform event

        // trigger rotate event
        if(rotation_threshold > inst.options.transform_min_rotation) {
          inst.trigger('rotate', ev);
        }

        // trigger pinch event
        if(scale_threshold > inst.options.transform_min_scale) {
          inst.trigger('pinch', ev);
          inst.trigger('pinch' + (ev.scale<1 ? 'in' : 'out'), ev);
        }
        break;

      case EVENT_END:
        // trigger dragend
        if(this.triggered) {
          inst.trigger(this.name + 'end', ev);
        }

        this.triggered = false;
        break;
    }
  }
};

// AMD export
if(typeof define == 'function' && define.amd) {
  define(function(){
    return Hammer;
  });
}
// commonjs export
else if(typeof module == 'object' && module.exports) {
  module.exports = Hammer;
}
// browser export
else {
  window.Hammer = Hammer;
}

})(window);
},{}],4:[function(_dereq_,module,exports){
'use strict';

var EventEmitter = _dereq_('../bower_components/eventEmitter/EventEmitter.js');
var hammer = _dereq_('../bower_components/hammerjs/hammer.js');

var isTouchDevice = 'ontouchstart' in document.documentElement;

var utils = _dereq_('./utils.js'),
	tween = _dereq_('../bower_components/easy-tween/dist/easyTween.js');

var Surface = module.exports = function(container){
	this.container = container;
	this.element = document.createElement('div');
	this.element.style.position = 'absolute';
	container.appendChild(this.element);

	this.refit();
	this.emitter = new EventEmitter();

	this.horizontalPosition = 0;
	this.verticalPosition = 0;
	
	this.horizontalVelocity = 0;
	this.verticalVelocity = 0;

	this.cssTransitions = {};
	this.cssFilters = {};
	this.cssTransforms = {};

	this.pointerEventHandler = this.pointerEventHandler.bind(this);
	this.dragEventHandler = this.dragEventHandler.bind(this);
	this.transformStep = this.transformStep.bind(this);
};

Surface.create = function(container){
	var surface = new Surface(container);

	return Surface.getApi(surface);
};

Surface.getApi = function(surface){
	var api = {};

	api.on = surface.emitter.on.bind(surface.emitter);
	api.removeListener = surface.emitter.removeListener.bind(surface.emitter);

	api.refit = surface.refit.bind(surface);
	api.element = surface.element;
	api.container = surface.container;

	api.css = surface.setCssStyle.bind(surface);
	api.cssTransform = surface.setCssTransform.bind(surface);
	api.cssFilter = surface.setCssFilter.bind(surface);
	api.cssTransition = surface.setCssTransition.bind(surface);

	api.speed = surface.setVelocityScalar.bind(surface);
	api.horizontalSpeed = surface.setHorizontalVelocityScalar.bind(surface);
	api.verticalSpeed = surface.setVerticalVelocityScalar.bind(surface);

	api.horizontalWind = surface.setBaseHorizontalVelocity.bind(surface);
	api.verticalWind = surface.setBaseVerticalVelocity.bind(surface);
	
	Object.defineProperty(api, 'speedGradient', {
		get: function(){
			return (surface.horizontalVelocityGradient === surface.verticalVelocityGradient)? 
						surface.horizontalVelocityGradient : 
						void 0;
		},
		set: function(value){
			surface.horizontalVelocityGradient = value;
			surface.verticalVelocityGradient = value;
		}
	});

	Object.defineProperty(api, 'horizontalVelocityGradient', {
		get: function(){ return surface.horizontalVelocityGradient;},
		set: function(value){ surface.horizontalVelocityGradient = value;}
	});

	Object.defineProperty(api, 'verticalVelocityGradient', {
		get: function(){ return surface.verticalVelocityGradient;},
		set: function(value){ surface.verticalVelocityGradient = value;}
	});

	Object.defineProperty(api, 'width', {
		get: function(){return surface.width;}
	});

	Object.defineProperty(api, 'height', {
		get: function(){return surface.height;}
	});

	Object.defineProperty(api, 'top', {
		get: function(){return surface.top;}
	});

	Object.defineProperty(api, 'left', {
		get: function(){return surface.left;}
	});

	return api;
};

Surface.prototype.horizontalVelocityScalar = 0;
Surface.prototype.verticalVelocityScalar = 0;

Surface.prototype.baseHorizontalVelocity = 0;
Surface.prototype.baseVerticalVelocity = 0;

Surface.prototype.msPerStep = 16; // Milliseconds per step

// These functions take current position relative to the center and return a number between -1 and 1
Surface.prototype.horizontalVelocityGradient = tween.easing.quadraticIn;
Surface.prototype.verticalVelocityGradient = tween.easing.quadraticIn;

Surface.prototype.pointerTrackingEvents = ['mousemove'];//, 'touchstart', 'touchend', 'touchmove'];

Surface.prototype.refit = function(){
	var rect = this.container.getBoundingClientRect();

	this.width = rect.width;
	this.halfWidth = this.width / 2;

	this.height = rect.height;
	this.halfHeight = this.height / 2;

	this.top = rect.top;
	this.left = rect.left;
};

Surface.prototype.startTransformLoop = function(){
	if(this.transforming) return;

	this.transforming = true;
	this.lastStepTime = Date.now();
	this.animationRequestId = requestAnimationFrame(this.transformStep);
	this.attachPointerListeners();
	this.emitter.emit('move start');
};

Surface.prototype.stopTransformLoop = function(){
	if(!this.transforming) return;

	this.transforming = false;
	cancelAnimationFrame(this.animationRequestId);
	this.emitter.emit('move stop');
};

Surface.prototype.transformStep = function(){
	var currentTime = Date.now(),
		lagScalar = (currentTime - this.lastStepTime) / this.msPerStep;
	
	this.lastHorizontalDisplacement = lagScalar * (this.baseHorizontalVelocity + 
		(this.horizontalVelocity * this.horizontalVelocityScalar));
	this.lastVerticalDisplacement = lagScalar * (this.baseVerticalVelocity + 
		(this.verticalVelocity * this.verticalVelocityScalar));
	this.lastStepTime = currentTime;
	
	if(this.lastHorizontalDisplacement || this.lastVerticalDisplacement){
		this.horizontalPosition += this.lastHorizontalDisplacement;
		this.verticalPosition += this.lastVerticalDisplacement;
		this.setCssTransform('translate', this.horizontalPosition + 'px, ' + this.verticalPosition + 'px');
		this.animationRequestId = requestAnimationFrame(this.transformStep);
	} else if(this.trackingPointer || this.baseHorizontalVelocity || this.baseVerticalVelocity){
		this.animationRequestId = requestAnimationFrame(this.transformStep);
	}
};

Surface.prototype.setBaseHorizontalVelocity = function(target, duration, easingFunc){
	if(target === void 0) return this.baseHorizontalVelocity;

	if(this.horizontalWindTween) this.horizontalWindTween.pause();

	if(duration){
		duration *= 1000; // Tweening occurs in milliseconds
		easingFunc = easingFunc || (this.baseHorizontalVelocity < target)? 
			tween.easing.quadraticIn : tween.easing.quadraticOut;
		this.horizontalWindTween = tween(easingFunc, this, 'baseHorizontalVelocity', target, duration);
	} else {
		this.baseHorizontalVelocity = target;
	}
};

Surface.prototype.setBaseVerticalVelocity = function(target, duration, easingFunc){
	if(target === void 0) return this.baseVerticalVelocity;
	
	if(this.verticalWindTween) this.verticalWindTween.pause();

	if(duration){
		duration *= 1000; // Tweening occurs in milliseconds
		easingFunc = easingFunc || (this.baseVerticalVelocity < target)? 
			tween.easing.quadraticIn : tween.easing.quadraticOut;
		this.verticalWindTween = tween(easingFunc, this, 'baseVerticalVelocity', target, duration);
	} else {
		this.baseVerticalVelocity = target;
	}
};

Surface.prototype.setVelocityScalar = function(target, duration, easingFunc, callback){
	if(target === void 0){
		if(this.horizontalVelocityScalar === this.verticalVelocityScalar){
			return this.horizontalVelocityScalar;
		}

		return void 0;
	}
	
	this.setHorizontalVelocityScalar(target, duration, easingFunc, callback);
	this.setVerticalVelocityScalar(target, duration, easingFunc);
};

Surface.prototype.setHorizontalVelocityScalar = function(target, duration, easingFunc, callback){
	if(target === void 0) return this.horizontalVelocityScalar;

	if(this.horizontalSpeedTween) this.horizontalSpeedTween.pause();

	if(duration){
		duration *= 1000; // Tweening occurs in milliseconds
		easingFunc = easingFunc || (this.horizontalVelocityScalar < target)? 
			tween.easing.quadraticIn : tween.easing.quadraticOut;
		this.horizontalSpeedTween = tween(easingFunc, this, 'horizontalVelocityScalar', target, duration, callback);
	} else {
		this.horizontalVelocityScalar = target;
	}
};

Surface.prototype.setVerticalVelocityScalar = function(target, duration, easingFunc, callback){
	if(target === void 0) return this.verticalVelocityScalar;

	if(this.verticalSpeedTween) this.verticalSpeedTween.pause();

	if(duration){
		duration *= 1000; // Tweening occurs in milliseconds
		easingFunc = easingFunc || (this.verticalVelocityScalar < target)? 
			tween.easing.quadraticIn : tween.easing.quadraticOut;
		this.verticalSpeedTween = tween(easingFunc, this, 'verticalVelocityScalar', target, duration, callback);
	} else {
		this.verticalVelocityScalar = target;
	}
};

function preventDefault(e){
	e.preventDefault();
}

Surface.prototype.attachPointerListeners = function(){
	if(this.trackingPointer) return;
	this.trackingPointer = true;

	if(isTouchDevice){
		hammer(this.container).on('drag', this.dragEventHandler);	
		this.container.addEventListener('touchmove', preventDefault);
	} else {
		this.container.addEventListener('mousemove', this.pointerEventHandler);
	}
	
	this.emitter.emit('pointer tracking start');
};

Surface.prototype.detachPointerListeners = function(){
	if(!this.trackingPointer) return;
	this.trackingPointer = false;
	
	if(isTouchDevice){
		hammer(this.container).off('drag', this.dragEventHandler);	
		this.container.removeEventListener('touchmove', preventDefault);
	} else {
		this.container.removeEventListener('mousemove', this.pointerEventHandler);
	}
	

	this.emitter.emit('pointer tracking stop');
};

Surface.prototype.dragEventHandler = function(e){
	this.horizontalVelocity = e.gesture.velocityX;
	this.verticalVelocity = e.gesture.velocityY;
	
	if(this.horizontalVelocity < 0.1) this.horizontalVelocity = 0;
	if(this.verticalVelocity < 0.1) this.verticalVelocity = 0;

	if(this.horizontalVelocity > 1) this.horizontalVelocity = 1;
	if(this.verticalVelocity > 1) this.verticalVelocity = 1;

	if(e.gesture.deltaX < 0) this.horizontalVelocity *= -1;
	if(e.gesture.deltaY < 0) this.verticalVelocity *= -1;

};

// This updates the x and y speed multipliers based on the pointers relative position to the
// center of the container element
Surface.prototype.pointerEventHandler = function(e){
	// If touch event, find first touch
	var pointer = (e.changedTouches && e.changedTouches[0] || e),
		x = pointer.clientX - this.left,
		y = pointer.clientY - this.top;

	this.horizontalVelocity = this.horizontalVelocityGradient(
		x - this.halfWidth, 
		0, 
		(x > this.halfWidth? -1 : 1), 
		this.halfWidth
	);
	this.verticalVelocity = this.verticalVelocityGradient(
		y - this.halfHeight, 
		0, 
		(y > this.halfHeight? -1 : 1), 
		this.halfHeight
	);
};

Surface.prototype.setCssStyle = function(name, value, duration){
	if(value === void 0) return this.element.style[name];

	if(duration !== void 0) this.setCssTransition(name, duration + 's');
	
	this.element.style[name] = value;
};

Surface.prototype.setCssTransform = function(name, value){
	if(value === void 0) return this.cssTransforms[name];

	this.cssTransforms[name] = value;
	this.updateMultiAttributeStyle(utils.transformAttribute, this.cssTransforms);
};

Surface.prototype.setCssFilter = function(name, value, duration){
	if(value === void 0) return this.cssFilters[name];
	
	if(duration !== void 0) this.setCssTransition(utils.cssFilterAttribute, duration + 's');
	
	this.cssFilters[name] = value;
	this.updateMultiAttributeStyle(utils.filterAttribute, this.cssFilters);
};

Surface.prototype.setCssTransition = function(name, value){
	if(value === void 0) return this.cssTransitions[name];
	
	this.cssTransitions[name] = value;
	this.updateMultiAttributeStyle(utils.transitionAttribute, this.cssTransitions, true);
};

Surface.prototype.updateMultiAttributeStyle = function(styleName, attributes, withComma){
	var name,
		style = '',
		first = true;

	for(name in attributes){
		if(attributes.hasOwnProperty(name)){
			if(first) first = false;
			else style += withComma?', ': ' ';

			if(withComma){
				style += name + ' ' + attributes[name];
			} else {
				style += name + '(' + attributes[name] + ')';
			}
		}
	}

	this.element.style[styleName] = style;
};

},{"../bower_components/easy-tween/dist/easyTween.js":1,"../bower_components/eventEmitter/EventEmitter.js":2,"../bower_components/hammerjs/hammer.js":3,"./utils.js":5}],5:[function(_dereq_,module,exports){
'use strict';

var noop = exports.noop = function(){};

exports.requestFullscreen = document.documentElement.requestFullscreen ||
							document.documentElement.mozRequestFullScreen ||
							document.documentElement.webkitRequestFullscreen ||
							noop;

var bodyStyle = document.body.style;
exports.transformAttribute = 	(bodyStyle.msTransform !== void 0) && 'msTransform' ||
								(bodyStyle.webkitTransform !== void 0) && 'webkitTransform' ||
								(bodyStyle.MozTransform !== void 0) && 'MozTransform' ||
								'transform';
								
exports.transitionAttribute =	(bodyStyle.msTransition !== void 0) && 'msTransition' ||
								(bodyStyle.webkitTransition !== void 0) && 'webkitTransition' ||
								(bodyStyle.MozTransition !== void 0) && 'MozTransition' || 
								'transition';

exports.filterAttribute = 		(bodyStyle.msFilter !== void 0) && 'msFilter' ||
								(bodyStyle.webkitFilter !== void 0) && 'webkitFilter' ||
								(bodyStyle.MozFilter !== void 0) && 'MozFilter' ||
								'filter';

exports.cssFilterAttribute = 	(bodyStyle.msFilter !== void 0) && '-ms-filter' ||
								(bodyStyle.webkitFilter !== void 0) && '-webkit-filter' ||
								(bodyStyle.MozFilter !== void 0) && '-moz-filter' ||
								'filter';

exports.cssTransformAttribute = (bodyStyle.msTransform !== void 0) && '-ms-transform' ||
								(bodyStyle.webkitTransform !== void 0) && '-webkit-transform' ||
								(bodyStyle.MozTransform !== void 0) && '-moz-transform' ||
								'filter';
},{}]},{},[4])

(4)
});


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(_dereq_,module,exports){
/**
 * EventEmitter v4.0.5 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

;(function(exports) {
    // JSHint config - http://www.jshint.com/
    /*jshint laxcomma:true*/
    /*global define:true*/

    // Place the script in strict mode
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class Manages event registering and emitting.
     */
    function EventEmitter(){}

    // Shortcuts to improve speed and size

        // Easy access to the prototype
    var proto = EventEmitter.prototype

      // Existence of a native indexOf
      , nativeIndexOf = Array.prototype.indexOf ? true : false;

    /**
     * Finds the index of the listener for the event in it's storage array
     *
     * @param {Function} listener Method to look for.
     * @param {Function[]} listeners Array of listeners to search through.
     * @return {Number} Index of the specified listener, -1 if not found
     */
    function indexOfListener(listener, listeners) {
        // Return the index via the native method if possible
        if(nativeIndexOf) {
            return listeners.indexOf(listener);
        }

        // There is no native method
        // Use a manual loop to find the index
        var i = listeners.length;
        while(i--) {
            // If the listener matches, return it's index
            if(listeners[i] === listener) {
                return i;
            }
        }

        // Default to returning -1
        return -1;
    }

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     */
    proto._getEvents = function() {
        return this._events || (this._events = {});
    };

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     *
     * @param {String} evt Name of the event to return the listeners from.
     * @return {Function[]} All listener functions for the event.
     * @doc
     */
    proto.getListeners = function(evt) {
        // Create a shortcut to the storage object
        // Initialise it if it does not exists yet
        var events = this._getEvents();

        // Return the listener array
        // Initialise it if it does not exist
        return events[evt] || (events[evt] = []);
    };

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     *
     * @param {String} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     * @doc
     */
    proto.addListener = function(evt, listener) {
        // Fetch the listeners
        var listeners = this.getListeners(evt);

        // Push the listener into the array if it is not already there
        if(indexOfListener(listener, listeners) === -1) {
            listeners.push(listener);
        }

        // Return the instance of EventEmitter to allow chaining
        return this;
    };

    /**
     * Alias of addListener
     * @doc
     */
    proto.on = proto.addListener;

    /**
     * Removes a listener function from the specified event.
     *
     * @param {String} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     * @doc
     */
    proto.removeListener = function(evt, listener) {
        // Fetch the listeners
        // And get the index of the listener in the array
        var listeners = this.getListeners(evt)
          , index = indexOfListener(listener, listeners);

        // If the listener was found then remove it
        if(index !== -1) {
            listeners.splice(index, 1);

            // If there are no more listeners in this array then remove it
            if(listeners.length === 0) {
                this.removeEvent(evt);
            }
        }

        // Return the instance of EventEmitter to allow chaining
        return this;
    };

    /**
     * Alias of removeListener
     * @doc
     */
    proto.off = proto.removeListener;

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added.
     *
     * @param {String|Object} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     * @doc
     */
    proto.addListeners = function(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     *
     * @param {String|Object} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     * @doc
     */
    proto.removeListeners = function(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     * @doc
     */
    proto.manipulateListeners = function(remove, evt, listeners) {
        // Initialise any required variables
        var i
          , value
          , single = remove ? this.removeListener : this.addListener
          , multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of it's properties to this method
        if(typeof evt === 'object') {
            for(i in evt) {
                if(evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if(typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while(i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        // Return the instance of EventEmitter to allow chaining
        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     *
     * @param {String} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     * @doc
     */
    proto.removeEvent = function(evt) {
        // Remove different things depending on the state of evt
        if(evt) {
            // Remove all listeners for the specified event
            delete this._getEvents()[evt];
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        // Return the instance of EventEmitter to allow chaining
        return this;
    };

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     *
     * @param {String} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     * @doc
     */
    proto.emitEvent = function(evt, args) {
        // Get the listeners for the event
        // Also initialise any other required variables
        var listeners = this.getListeners(evt)
          , i = listeners.length
          , response;

        // Loop over all listeners assigned to the event
        // Apply the arguments array to each listener function
        while(i--) {
            // If the listener returns true then it shall be removed from the event
            // The function is executed either with a basic call or an apply if there is an args array
            response = args ? listeners[i].apply(null, args) : listeners[i]();
            if(response === true) {
                this.removeListener(evt, listeners[i]);
            }
        }

        // Return the instance of EventEmitter to allow chaining
        return this;
    };

    /**
     * Alias of emitEvent
     * @doc
     */
    proto.trigger = proto.emitEvent;

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as
     * opposed to taking a single array of arguments to pass on.
     *
     * @param {String} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     * @doc
     */
    proto.emit = function(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    // Expose the class either via AMD or the global object
    if(typeof define === 'function' && define.amd) {
        define(function() {
            return EventEmitter;
        });
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}(this));
},{}],4:[function(_dereq_,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.GiantQuadtree=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

module.exports = Node;

function Node(left, top, width, height, parent){
	this.objects = [];

	this.left = left;
	this.top = top;
	this.width = width;
	this.height = height;
	this.right = this.left + this.width;
	this.bottom = this.top + this.height;
	this.isBase = (this.width / 2) < this.minimumSize;

	this.parent = parent;
}

Node.prototype.tl = void 0;
Node.prototype.tr = void 0;
Node.prototype.br = void 0;
Node.prototype.bl = void 0;

Node.prototype.objectLimit = 200;
Node.prototype.minimumSize = 3000;

Node.prototype.clear = function(){
	this.objects = [];

	if(this.tl){
		this.tl.clear();
		this.tr.clear();
		this.br.clear();
		this.bl.clear();
	}
};

Node.prototype.getObjects = function(){
	if(this.tl){
		return this.objects.concat(this.tl.getObjects(), this.tr.getObjects(), this.br.getObjects(), this.bl.getObjects());
	} else {
		return this.objects.slice();
	}
};

Node.prototype.split = function(){
	var childWidth = this.width / 2,
		childHeight = this.height / 2,
		left = this.left,
		top = this.top;

	this.tl = new Node(left, top, childWidth, childHeight, this);
	this.tr = new Node(left + childWidth, top, childWidth, childHeight, this);
	this.br = new Node(left + childWidth, top + childHeight, childWidth, childHeight, this);
	this.bl = new Node(left, top + childHeight, childWidth, childHeight, this);
};

// This can be called from ANY node in the tree, it'll return the top most node of the tree
// that can contain the element (it will grow the tree if nescessary)
Node.prototype.parentNode = function(obj){
	var node = this,
		parent;

	// If object is left of this node
	if(obj.left < node.left){
		// If object is to the top of this node
		if(obj.top < node.top){
			// Grow towards top left
			parent = node.grow(node.width, node.height);
		} else {
			// Grow towards bottom left
			parent = node.grow(node.width, 0);
		}
	// If object is right of this node
	} else if(obj.left + obj.width > node.left + node.width){
		// If object is to the top of this node
		if(obj.top < node.top){
			// Grow towards top right
			parent = node.grow(0, node.height);
		} else {
			// Grow towards bottom right
			parent = node.grow(0, 0);
		} 

	// If object is within x-axis but top of node
	} else if(obj.top < node.top){
		// Grow towards top right (top left is just as valid though)
		parent = node.grow(0, node.height);
	// If object is within x-axis but bottom of node
	} else if(obj.top + obj.height > node.top + node.height){
		// Grow towards bottom right (bottom left is just as valid though)
		parent = node.grow(0, 0);
	}
	
	// If we had to grow, find the quadrant in the parent
	if(parent){
		return parent.parentNode(obj);
	}

	return node;
};

// Helper function which gets the quadrant node at a given x/y position
// caller function has to check to see if this node is split before calling this
Node.prototype.getQuadrantAt = function(x, y){
	if(!this.tl) return this;

	var xMid = this.left + this.width / 2,
		yMid = this.top + this.height / 2;

	if(x < xMid){
		if(y < yMid){
			return this.tl.tl && this.tl.getQuadrantAt(x, y) || this.tl;
		} else {
			return this.bl.tl && this.bl.getQuadrantAt(x, y) || this.bl;
		}
	} else {
		if(y < yMid){
			return this.tr.tl && this.tr.getQuadrantAt(x, y) || this.tr;
		} else {
			return this.br.tl && this.br.getQuadrantAt(x, y) || this.br;
		}
	}
};

// Gets all the objects in quadrants within the given dimensions. 
// This assumes that the given dimensions can't be larger than a quadrant, 
// meaning it can at most touch 4 quadrants
Node.prototype.getInteractableObjects = function(left, top, width, height){
	if(!this.tl) return this.objects.slice();	

	var node = this.getQuadrant(left, top, width, height),
		objectsList = [node.objects],
		quadrants = [node], // Keeps track to prevent dupes
		parent = node.parent;

	while(parent){
		objectsList.push(parent.objects);
		quadrants.push(parent);
		parent = parent.parent;
	}

	if(node.tl){
		// top left corner
		var quadrant = node.getQuadrantAt(left, top);
		if(!~quadrants.indexOf(quadrant)){
			quadrants.push(quadrant);
			objectsList.push(quadrant.objects);

			if(quadrant.parent && !~quadrants.indexOf(quadrant.parent)){
				quadrants.push(quadrant.parent);
				objectsList.push(quadrant.parent.objects);	
			}
		}
		
		// top right corner
		quadrant = node.getQuadrantAt(left + width, top);
		if(!~quadrants.indexOf(quadrant)){
			quadrants.push(quadrant);
			objectsList.push(quadrant.objects);

			if(quadrant.parent && !~quadrants.indexOf(quadrant.parent)){
				quadrants.push(quadrant.parent);
				objectsList.push(quadrant.parent.objects);	
			}
		}

		// bottom right corner
		quadrant = node.getQuadrantAt(left + width, top + height);
		if(!~quadrants.indexOf(quadrant)){
			quadrants.push(quadrant);
			objectsList.push(quadrant.objects);

			if(quadrant.parent && !~quadrants.indexOf(quadrant.parent)){
				quadrants.push(quadrant.parent);
				objectsList.push(quadrant.parent.objects);	
			}
		}

		// bottom left corner
		quadrant = node.getQuadrantAt(left, top + height);
		if(!~quadrants.indexOf(quadrant)){
			quadrants.push(quadrant);
			objectsList.push(quadrant.objects);
			if(quadrant.parent && !~quadrants.indexOf(quadrant.parent)) objectsList.push(quadrant.parent.objects);
		}
	}

	return Array.prototype.concat.apply([], objectsList);
};

// Gets the quadrant a given bounding box dimensions would be inserted into
Node.prototype.getQuadrant = function(left, top, width, height){
	if(!this.tl) return this;

	var	xMid = this.left + this.width / 2,
		yMid = this.top + this.height / 2,
		topQuadrant = (top < yMid) && ((top + height) < yMid),
		bottomQuadrand = top > yMid;

	if((left < xMid) && ((left + width) < xMid)){
		if(topQuadrant){
			return this.tl.tl && this.tl.getQuadrant(left, top, width, height) || this.tl;
		} else if(bottomQuadrand){
			return this.bl.tl && this.bl.getQuadrant(left, top, width, height) || this.bl;
		}
	} else if(left > xMid){
		if(topQuadrant){
			return this.tr.tl && this.tr.getQuadrant(left, top, width, height) || this.tr;
		} else if(bottomQuadrand) {
			return this.br.tl && this.br.getQuadrant(left, top, width, height) || this.br;
		}
	}

	return this;
};

// Inserts the object to the Node, spliting or growing the tree if nescessary
// Returns the top-most node of this tree
Node.prototype.insert = function(obj){
	var quadrant,
		index,
		length,
		remainingObjects,
		objects,
		node;

	// This call will grow the tree if nescessary and return the parent node
	// if the tree doesn't need to grow, `node` will be `this`.
	node = this.parentNode(obj);
	quadrant = node.getQuadrant(obj.left, obj.top, obj.width, obj.height);

	if(quadrant !== node){
		quadrant.insert(obj);
	} else {
		objects = node.objects;
		objects.push(obj);

		index = 0;
		length = objects.length;
		if(!this.isBase && length > node.objectLimit){
			// Split if not already split
			if(!node.tl) node.split();

			// For objects that don't fit to quadrants
			remainingObjects = [];
		
			// Iterate through all object and try to put them in a
			// Quadrant node, if that doesn't work, retain them	
			for(; index < length; index++){

				// Reusing the obj var
				obj = node.objects[index];
				quadrant = node.getQuadrant(obj.left, obj.top, obj.width, obj.height);
				if(quadrant !== node){
					quadrant.insert(obj);
				} else {
					remainingObjects.push(obj);
				}
			}

			node.objects = remainingObjects;
		}
	}

	return node;
};

// Creates a pre-split parent Node and attaches this Node as a
// node at the given x/y offset (so 0,0 would make this Node the top left node)
Node.prototype.grow = function(xOffset, yOffset){
	var left = this.left - xOffset,
		top = this.top - yOffset,
		parent = new Node(left, top, this.width * 2, this.height * 2);
	
	this.parent = parent;

	if(xOffset){
		if(yOffset){
			parent.br = this;
		} else {
			parent.tr = this;
		}
	} else if(yOffset) {
		parent.bl = this;
	} else {
		parent.tl = this;
	}

	parent.tl = parent.tl || new Node(left, top, this.width, this.height, this);
	parent.tr = parent.tr || new Node(left + this.width, top, this.width, this.height, this);
	parent.br = parent.br || new Node(left + this.width, top + this.height, this.width, this.height, this);
	parent.bl = parent.bl || new Node(left, top + this.height, this.width, this.height, this);

	return parent;
};


},{}],2:[function(_dereq_,module,exports){
'use strict';

var TreeNode = _dereq_('./node');

/* Quadtree by Ozan Turgut (ozanturgut@gmail.com)

   A Quadtree is a structure for managing many nodes interacting in space by
   organizing them within a tree, where each node contains elements which may
   interact with other elements within the node. This is particularly useful in
   collision detection, in which a brute-force algorithm requires the checking of
   every element against every other element, regardless of their distance in space.

   This quadtree handles object in 2d space by their bounding boxes. It splits
   a node once it exceeds the object limit per-node. When a node is split, it's
   contents are divied up in to 4 smaller nodes to fulfill the per-node object limit.
   Nodes are infinitely divisible.

   If an object is inserted which exceeds the bounds of this quadtree, the quadtree
   will grow in the direction the object was inserted in order to encapsulate it. This is
   similar to a node split, except in this case we create a parent node and assign the existing
   quadtree as a quadrant within it. This allows the quadtree to contain any object, regardless of
   its position in space.

   One function is exported which creates a quadtree given a width and height.

   The quadtree api has two methods:

   insert(bounds)
   		Inserts a bounding box (it should contain an left, top, width, and height property).

   	retrieve(bounds)
   		Retrieves a list of bounding boxes that share a node with the given bounds object.
*/

var Quadtree = module.exports = function(width, height){
	if(width){
		this.width = width;
		this.height = height? height : width;
	}
	
	this.reset();
};

Quadtree.create = function(width, height){
	var quadtree = new Quadtree(width, height);
	return Quadtree.getApi(quadtree);
};

Quadtree.getApi = function(quadtree){
	var api = {};
	api.insert = quadtree.insert.bind(quadtree);
	api.reset = quadtree.reset.bind(quadtree);
	api.getObjects = quadtree.getObjects.bind(quadtree);
	api.get = api.getObjects; // alias
	api.prune = quadtree.prune.bind(quadtree);

	return api;
};

Quadtree.prototype.width = 10000;
Quadtree.prototype.height = 10000;

Quadtree.prototype.reset = function(x, y){
	x = x || 0;
	y = y || 0;

	this.top = new TreeNode(x, y, this.width, this.height);
};

Quadtree.prototype.insert = function(obj){
	this.top = this.top.insert(obj);
};

/*
function isInNode(node, left, top, right, bottom){
	return node.left <= left && node.top <= top && node.right >= right && node.bottom >= bottom;
}
*/

function getContainingNodeHelper(left, top, right, bottom, node){
	if(!node.tl) return node;

	if(left < node.tr.left){
		if(right < node.tr.left){
			if(bottom < node.bl.top){
				return getContainingNodeHelper(left, top, right, bottom, node.tl);
			} else if(top > node.bl.top) {
				return getContainingNodeHelper(left, top, right, bottom, node.bl);
			}
		}
	} else {
		if(bottom < node.br.top){
			return getContainingNodeHelper(left, top, right, bottom, node.tr);
		} else if(top > node.br.top) {
			return getContainingNodeHelper(left, top, right, bottom, node.br);
		}
	}

	return node;
}

Quadtree.prototype.getContainingNode = function(left, top, right, bottom){
	if(left < this.top.left || 
		top < this.top.top || 
		right > this.top.right || 
		bottom > this.top.bottom){
		return;	
	}

	return getContainingNodeHelper(left, top, right, bottom, this.top);
};

Quadtree.prototype.minimumSize = 3000;
Quadtree.prototype.getInteractableObjects = function(left, top, right, bottom){
	var self = this,
		minimumSize = this.minimumSize,
		tl = this.getContainingNode(left, top, left + 1, top + 1),
		tr,
		bl,
		br,
		objectsList = tl ? [tl.getObjects()] : [];

	function addAncestorElements(left, top, right, bottom){
		var ancestor = self.getContainingNode(left, top, right, bottom);
		if(ancestor && !~objectsList.indexOf(ancestor.objects)) objectsList.push(ancestor.objects);
	}

	if(!tl || tl.right < right){
		tr = this.getContainingNode(right - 1, top, right, top + 1);
		if(tr) objectsList.push(tr.getObjects());
		else tr = tl;
	} else {
		tr = tl;
	}

	if(!tl || tl.bottom < bottom){
		bl = this.getContainingNode(left, bottom - 1, left + 1, bottom);
		if(bl) objectsList.push(bl.getObjects());
		else bl = tl;
	} else {
		bl = tl;
	}

	if(!tr || tr.bottom < bottom){
		if(!bl || bl.right < right){
			br = this.getContainingNode(right - 1, bottom - 1, right, bottom);
			if(br) objectsList.push(br.getObjects());
			else br = bl;
		} else {
			br = bl;
		}
	} else {
		br = tr;
	}
	
	if(tl !== tr) addAncestorElements(left, top, right, top + 1);
	if(tr !== br) addAncestorElements(right - 1, top, right, bottom);
	if(br !== bl) addAncestorElements(left, bottom - 1, right, bottom);
	if(bl !== tl) addAncestorElements(left, top, left + 1, bottom);
		
	// Intersections towards top left
	if(tl){
		if((left - minimumSize) < tl.left){
			addAncestorElements(left - minimumSize, top, left + 1, top + 1);
		}

		if((top - minimumSize) < tl.top){
			addAncestorElements(left, top - minimumSize, left + 1, top + 1);
		}
	}
	
	// Intersections towards top right
	if(tr){
		if(tr !== tl && (top - minimumSize) < tr.top){
			addAncestorElements(right - 1, top - minimumSize, right, top + 1);
		}

		if((right + minimumSize) > tr.right){
			addAncestorElements(right - 1, top, right + minimumSize, top + 1);
		}
	}

	// Intersections towards bottom right
	if(br){
		if(br !== tr && (right + minimumSize) > br.right){
			addAncestorElements(right - 1, bottom - 1, right + minimumSize, bottom);
		}

		if((bottom + minimumSize) > br.bottom){
			addAncestorElements(right - 1, bottom - 1, right, bottom + minimumSize);
		}
	}

	// Intersections towards bottom left
	if(bl){
		if(bl !== br && (bottom + minimumSize) > bl.bottom){
			addAncestorElements(left, bottom - 1, left + 1, bottom + minimumSize);
		}

		if(bl !== tl && (left - minimumSize) < bl.left){
			addAncestorElements(left - minimumSize, bottom - 1, left + 1, bottom);
		}
	}

	return Array.prototype.concat.apply([], objectsList);
};

Quadtree.prototype.getObjects = function(left, top, width, height){
	if(left !== void 0){
		var bottom = top + height,
			right = left + width,
			rectangles = this.getInteractableObjects(left, top, right, bottom),
			rectangleIndex = rectangles.length,
			result = [],
			rectangle;

		while(rectangleIndex--){
			rectangle = rectangles[rectangleIndex];
			
			// If there is intersection along the y-axis
			if(	(top <= rectangle.top ?
					(bottom >= rectangle.top) :
					(rectangle.bottom >= top)) && 
				// And if there is intersection along the x-axis
				(left <= rectangle.left ? 
					(right >= rectangle.left) :
					(rectangle.right >= left))){

				
				result.push(rectangle);
			}
		}
		
		return result;
	}

	return this.top.getObjects();
};

Quadtree.prototype.prune = function(left, top, width, height){
	var right = left + width,
		bottom = top + height,
		candidate,
		rejectedObjects = [],
		keptObjects = [];

	var objects = this.top.getObjects(),
		index = 0,
		length = objects.length;

	for(; index < length; index++){
		candidate = objects[index];

		if(	candidate.left < left || 
			candidate.top < top || 
			(candidate.left + candidate.width) > right ||
			(candidate.top + candidate.height) > bottom){
			rejectedObjects.push(candidate);
		} else {
			keptObjects.push(candidate);
		}
	}
	if(keptObjects.length){
		this.reset(keptObjects[0].left, keptObjects[0].top);
		index = 0;
		length = keptObjects.length;
		for(; index < length; index++){
			this.insert(keptObjects[index]);
		}
	} else {
		this.reset();
	}
	
	return rejectedObjects;
};

},{"./node":1}]},{},[2])

(2)
});


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(_dereq_,module,exports){
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function (root, factory) {
  if (typeof exports === "object" && exports) {
    factory(exports); // CommonJS
  } else {
    var mustache = {};
    factory(mustache);
    if (typeof define === "function" && define.amd) {
      define(mustache); // AMD
    } else {
      root.Mustache = mustache; // <script>
    }
  }
}(this, function (mustache) {

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var nonSpaceRe = /\S/;
  var eqRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var RegExp_test = RegExp.prototype.test;
  function testRegExp(re, string) {
    return RegExp_test.call(re, string);
  }

  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var Object_toString = Object.prototype.toString;
  var isArray = Array.isArray || function (object) {
    return Object_toString.call(object) === '[object Array]';
  };

  function isFunction(object) {
    return typeof object === 'function';
  }

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      var string = match[0];
      this.tail = this.tail.substring(string.length);
      this.pos += string.length;
      return string;
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var index = this.tail.search(re), match;

    switch (index) {
    case -1:
      match = this.tail;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  function Context(view, parent) {
    this.view = view == null ? {} : view;
    this.parent = parent;
    this._cache = { '.': this.view };
  }

  Context.make = function (view) {
    return (view instanceof Context) ? view : new Context(view);
  };

  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  Context.prototype.lookup = function (name) {
    var value;
    if (name in this._cache) {
      value = this._cache[name];
    } else {
      var context = this;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;

          var names = name.split('.'), i = 0;
          while (value != null && i < names.length) {
            value = value[names[i++]];
          }
        } else {
          value = context.view[name];
        }

        if (value != null) break;

        context = context.parent;
      }

      this._cache[name] = value;
    }

    if (isFunction(value)) {
      value = value.call(this.view);
    }

    return value;
  };

  function Writer() {
    this.clearCache();
  }

  Writer.prototype.clearCache = function () {
    this._cache = {};
    this._partialCache = {};
  };

  Writer.prototype.compile = function (template, tags) {
    var fn = this._cache[template];

    if (!fn) {
      var tokens = mustache.parse(template, tags);
      fn = this._cache[template] = this.compileTokens(tokens, template);
    }

    return fn;
  };

  Writer.prototype.compilePartial = function (name, template, tags) {
    var fn = this.compile(template, tags);
    this._partialCache[name] = fn;
    return fn;
  };

  Writer.prototype.getPartial = function (name) {
    if (!(name in this._partialCache) && this._loadPartial) {
      this.compilePartial(name, this._loadPartial(name));
    }

    return this._partialCache[name];
  };

  Writer.prototype.compileTokens = function (tokens, template) {
    var self = this;
    return function (view, partials) {
      if (partials) {
        if (isFunction(partials)) {
          self._loadPartial = partials;
        } else {
          for (var name in partials) {
            self.compilePartial(name, partials[name]);
          }
        }
      }

      return renderTokens(tokens, self, Context.make(view), template);
    };
  };

  Writer.prototype.render = function (template, view, partials) {
    return this.compile(template)(view, partials);
  };

  /**
   * Low-level function that renders the given `tokens` using the given `writer`
   * and `context`. The `template` string is only needed for templates that use
   * higher-order sections to extract the portion of the original template that
   * was contained in that section.
   */
  function renderTokens(tokens, writer, context, template) {
    var buffer = '';

    // This function is used to render an artbitrary template
    // in the current context by higher-order functions.
    function subRender(template) {
      return writer.render(template, context);
    }

    var token, tokenValue, value;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];
      tokenValue = token[1];

      switch (token[0]) {
      case '#':
        value = context.lookup(tokenValue);

        if (typeof value === 'object' || typeof value === 'string') {
          if (isArray(value)) {
            for (var j = 0, jlen = value.length; j < jlen; ++j) {
              buffer += renderTokens(token[4], writer, context.push(value[j]), template);
            }
          } else if (value) {
            buffer += renderTokens(token[4], writer, context.push(value), template);
          }
        } else if (isFunction(value)) {
          var text = template == null ? null : template.slice(token[3], token[5]);
          value = value.call(context.view, text, subRender);
          if (value != null) buffer += value;
        } else if (value) {
          buffer += renderTokens(token[4], writer, context, template);
        }

        break;
      case '^':
        value = context.lookup(tokenValue);

        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || (isArray(value) && value.length === 0)) {
          buffer += renderTokens(token[4], writer, context, template);
        }

        break;
      case '>':
        value = writer.getPartial(tokenValue);
        if (isFunction(value)) buffer += value(context);
        break;
      case '&':
        value = context.lookup(tokenValue);
        if (value != null) buffer += value;
        break;
      case 'name':
        value = context.lookup(tokenValue);
        if (value != null) buffer += mustache.escape(value);
        break;
      case 'text':
        buffer += tokenValue;
        break;
      }
    }

    return buffer;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var tree = [];
    var collector = tree;
    var sections = [];

    var token;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];
      switch (token[0]) {
      case '#':
      case '^':
        sections.push(token);
        collector.push(token);
        collector = token[4] = [];
        break;
      case '/':
        var section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : tree;
        break;
      default:
        collector.push(token);
      }
    }

    return tree;
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];
      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          lastToken = token;
          squashedTokens.push(token);
        }
      }
    }

    return squashedTokens;
  }

  function escapeTags(tags) {
    return [
      new RegExp(escapeRegExp(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRegExp(tags[1]))
    ];
  }

  /**
   * Breaks up the given `template` string into a tree of token objects. If
   * `tags` is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. ["<%", "%>"]). Of
   * course, the default is to use mustaches (i.e. Mustache.tags).
   */
  function parseTemplate(template, tags) {
    template = template || '';
    tags = tags || mustache.tags;

    if (typeof tags === 'string') tags = tags.split(spaceRe);
    if (tags.length !== 2) throw new Error('Invalid tags: ' + tags.join(', '));

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          delete tokens[spaces.pop()];
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(tagRes[0]);
      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(['text', chr, start, start + 1]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr == '\n') stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) break;
      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(eqRe);
        scanner.scan(eqRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === '{') {
        value = scanner.scanUntil(new RegExp('\\s*' + escapeRegExp('}' + tags[1])));
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = '&';
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) throw new Error('Unclosed tag at ' + scanner.pos);

      token = [type, value, start, scanner.pos];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();
        if (!openSection) {
          throw new Error('Unopened section "' + value + '" at ' + start);
        }
        if (openSection[1] !== value) {
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
        }
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        tags = value.split(spaceRe);
        if (tags.length !== 2) {
          throw new Error('Invalid tags at ' + start + ': ' + tags.join(', '));
        }
        tagRes = escapeTags(tags);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();
    if (openSection) {
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
    }

    return nestTokens(squashTokens(tokens));
  }

  mustache.name = "mustache.js";
  mustache.version = "0.7.3";
  mustache.tags = ["{{", "}}"];

  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

  mustache.parse = parseTemplate;

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // All Mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates and partials in the default writer.
   */
  mustache.clearCache = function () {
    return defaultWriter.clearCache();
  };

  /**
   * Compiles the given `template` to a reusable function using the default
   * writer.
   */
  mustache.compile = function (template, tags) {
    return defaultWriter.compile(template, tags);
  };

  /**
   * Compiles the partial with the given `name` and `template` to a reusable
   * function using the default writer.
   */
  mustache.compilePartial = function (name, template, tags) {
    return defaultWriter.compilePartial(name, template, tags);
  };

  /**
   * Compiles the given array of tokens (the output of a parse) to a reusable
   * function using the default writer.
   */
  mustache.compileTokens = function (tokens, template) {
    return defaultWriter.compileTokens(tokens, template);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function (template, view, partials) {
    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  mustache.to_html = function (template, view, partials, send) {
    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

}));

},{}],6:[function(_dereq_,module,exports){
(function (process){
// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (definition) {
    // Turn off strict mode for this function so we can assign to global.Q
    /*jshint strict: false*/

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if (typeof exports === "object") {
        definition(void 0, exports);

    // RequireJS
    } else if (typeof define === "function") {
        define(definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeQ = function () {
                var Q = {};
                return definition(void 0, Q);
            };
        }

    // <script>
    } else {
        definition(void 0, Q = {});
    }

})(function (_dereq_, exports) {
"use strict";

// All code after this point will be filtered from stack traces reported
// by Q.
var qStartingLine = captureLine();
var qFileName;

// shims

// used for fallback "defend" and in "allResolved"
var noop = function () {};

// for the security conscious, defend may be a deep freeze as provided
// by cajaVM.  Otherwise we try to provide a shallow freeze just to
// discourage promise changes that are not compatible with secure
// usage.  If Object.freeze does not exist, fall back to doing nothing
// (no op).
var defend = Object.freeze || noop;
if (typeof cajaVM !== "undefined") {
    defend = cajaVM.def;
}

// use the fastest possible means to execute a task in a future turn
// of the event loop.
var nextTick;
if (typeof process !== "undefined") {
    // node
    nextTick = process.nextTick;
} else if (typeof setImmediate === "function") {
    // In IE10, or use https://github.com/NobleJS/setImmediate
    nextTick = setImmediate;
} else if (typeof MessageChannel !== "undefined") {
    // modern browsers
    // http://www.nonblocking.io/2011/06/windownexttick.html
    var channel = new MessageChannel();
    // linked list of tasks (single, with head node)
    var head = {}, tail = head;
    channel.port1.onmessage = function () {
        head = head.next;
        var task = head.task;
        delete head.task;
        task();
    };
    nextTick = function (task) {
        tail = tail.next = {task: task};
        channel.port2.postMessage(0);
    };
} else {
    // old browsers
    nextTick = function (task) {
        setTimeout(task, 0);
    };
}

// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this does have the nice side-effect of reducing the size
// of the code by reducing x.call() to merely x(), eliminating many
// hard-to-minify characters.
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var uncurryThis;
// I have kept both variations because the first is theoretically
// faster, if bind is available.
if (Function.prototype.bind) {
    var Function_bind = Function.prototype.bind;
    uncurryThis = Function_bind.bind(Function_bind.call);
} else {
    uncurryThis = function (f) {
        return function () {
            return f.call.apply(f, arguments);
        };
    };
}

var array_slice = uncurryThis(Array.prototype.slice);

var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    }
);

var array_indexOf = uncurryThis(
    Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    }
);

var array_map = uncurryThis(
    Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    }
);

var object_create = Object.create || function (prototype) {
    function Type() { }
    Type.prototype = prototype;
    return new Type();
};

var object_keys = Object.keys || function (object) {
    var keys = [];
    for (var key in object) {
        keys.push(key);
    }
    return keys;
};

var object_toString = Object.prototype.toString;

// generator related shims

function isStopIteration(exception) {
    return (
        object_toString(exception) === "[object StopIteration]" ||
        exception instanceof QReturnValue
    );
}

var QReturnValue;
if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
} else {
    QReturnValue = function (value) {
        this.value = value;
    };
}

// long stack traces

var STACK_JUMP_SEPARATOR = "From previous event:";

function makeStackTraceLong(error, promise) {
    // If possible (that is, if in V8), transform the error stack
    // trace by removing Node and Q cruft, then concatenating with
    // the stack trace of the promise we are ``done``ing. See #57.
    if (promise.stack &&
        typeof error === "object" &&
        error !== null &&
        error.stack &&
        error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
    ) {
        error.stack = filterStackString(error.stack) +
            "\n" + STACK_JUMP_SEPARATOR + "\n" +
            filterStackString(promise.stack);
    }
}

function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (!isInternalFrame(line) && !isNodeFrame(line)) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function isInternalFrame(stackLine) {
    var pieces = /at .+ \((.*):(\d+):\d+\)/.exec(stackLine);

    if (!pieces) {
        return false;
    }

    var fileName = pieces[1];
    var lineNumber = pieces[2];

    return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
}

// discover own file name and line number range for filtering stack
// traces
function captureLine() {
    if (Error.captureStackTrace) {
        var fileName, lineNumber;

        var oldPrepareStackTrace = Error.prepareStackTrace;

        Error.prepareStackTrace = function (error, frames) {
            fileName = frames[1].getFileName();
            lineNumber = frames[1].getLineNumber();
        };

        // teases call of temporary prepareStackTrace
        // JSHint and Closure Compiler generate known warnings here
        /*jshint expr: true */
        new Error().stack;

        Error.prepareStackTrace = oldPrepareStackTrace;
        qFileName = fileName;
        return lineNumber;
    }
}

function deprecate(callback, name, alternative) {
    return function () {
        if (typeof console !== "undefined" && typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
    };
}

// end of shims
// beginning of real work

/**
 * Performs a task in a future turn of the event loop.
 * @param {Function} task
 */
exports.nextTick = nextTick;

/**
 * Constructs a {promise, resolve} object.
 *
 * The resolver is a callback to invoke with a more resolved value for the
 * promise. To fulfill the promise, invoke the resolver with any value that is
 * not a function. To reject the promise, invoke the resolver with a rejection
 * object. To put the promise in the same state as another promise, invoke the
 * resolver with that other promise.
 */
exports.defer = defer;
function defer() {
    // if "pending" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the pending array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the ref promise because it handles both fully
    // resolved values and other promises gracefully.
    var pending = [], progressListeners = [], value;

    var deferred = object_create(defer.prototype);
    var promise = object_create(makePromise.prototype);

    promise.promiseSend = function (op, _, __, progress) {
        var args = array_slice(arguments);
        if (pending) {
            pending.push(args);
            if (op === "when" && progress) {
                progressListeners.push(progress);
            }
        } else {
            nextTick(function () {
                value.promiseSend.apply(value, args);
            });
        }
    };

    promise.valueOf = function () {
        if (pending) {
            return promise;
        }
        return value.valueOf();
    };

    if (Error.captureStackTrace) {
        Error.captureStackTrace(promise, defer);

        // Reify the stack into a string by using the accessor; this prevents
        // memory leaks as per GH-111. At the same time, cut off the first line;
        // it's always just "[object Promise]\n", as per the `toString`.
        promise.stack = promise.stack.substring(promise.stack.indexOf("\n") + 1);
    }

    function become(resolvedValue) {
        if (!pending) {
            return;
        }
        value = resolve(resolvedValue);
        array_reduce(pending, function (undefined, pending) {
            nextTick(function () {
                value.promiseSend.apply(value, pending);
            });
        }, void 0);
        pending = void 0;
        progressListeners = void 0;
    }

    defend(promise);

    deferred.promise = promise;
    deferred.resolve = become;
    deferred.reject = function (exception) {
        become(reject(exception));
    };
    deferred.notify = function (progress) {
        if (pending) {
            array_reduce(progressListeners, function (undefined, progressListener) {
                nextTick(function () {
                    progressListener(progress);
                });
            }, void 0);
        }
    };

    return deferred;
}

/**
 * Creates a Node-style callback that will resolve or reject the deferred
 * promise.
 * @returns a nodeback
 */
defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    };
};
// XXX deprecated
defer.prototype.node = deprecate(defer.prototype.makeNodeResolver, "node", "makeNodeResolver");

/**
 * @param makePromise {Function} a function that returns nothing and accepts
 * the resolve, reject, and notify functions for a deferred.
 * @returns a promise that may be resolved with the given resolve and reject
 * functions, or rejected by a thrown exception in makePromise
 */
exports.promise = promise;
function promise(makePromise) {
    var deferred = defer();
    fcall(
        makePromise,
        deferred.resolve,
        deferred.reject,
        deferred.notify
    ).fail(deferred.reject);
    return deferred.promise;
}

/**
 * Constructs a Promise with a promise descriptor object and optional fallback
 * function.  The descriptor contains methods like when(rejected), get(name),
 * put(name, value), post(name, args), and delete(name), which all
 * return either a value, a promise for a value, or a rejection.  The fallback
 * accepts the operation name, a resolver, and any further arguments that would
 * have been forwarded to the appropriate method above had a method been
 * provided with the proper name.  The API makes no guarantees about the nature
 * of the returned object, apart from that it is usable whereever promises are
 * bought and sold.
 */
exports.makePromise = makePromise;
function makePromise(descriptor, fallback, valueOf, exception) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error("Promise does not support operation: " + op));
        };
    }

    var promise = object_create(makePromise.prototype);

    promise.promiseSend = function (op, resolved /* ...args */) {
        var args = array_slice(arguments, 2);
        var result;
        try {
            if (descriptor[op]) {
                result = descriptor[op].apply(promise, args);
            } else {
                result = fallback.apply(promise, [op].concat(args));
            }
        } catch (exception) {
            result = reject(exception);
        }
        if (resolved) {
            resolved(result);
        }
    };

    if (valueOf) {
        promise.valueOf = valueOf;
    }

    if (exception) {
        promise.exception = exception;
    }

    defend(promise);

    return promise;
}

// provide thenables, CommonJS/Promises/A
makePromise.prototype.then = function (fulfilled, rejected, progressed) {
    return when(this, fulfilled, rejected, progressed);
};

makePromise.prototype.thenResolve = function (value) {
    return when(this, function () { return value; });
};

// Chainable methods
array_reduce(
    [
        "isResolved", "isFulfilled", "isRejected",
        "when", "spread", "send",
        "get", "put", "del",
        "post", "invoke",
        "keys",
        "apply", "call", "bind",
        "fapply", "fcall", "fbind",
        "all", "allResolved",
        "view", "viewInfo",
        "timeout", "delay",
        "catch", "finally", "fail", "fin", "progress", "end", "done",
        "nfcall", "nfapply", "nfbind",
        "ncall", "napply", "nbind",
        "npost", "ninvoke",
        "nend", "nodeify"
    ],
    function (undefined, name) {
        makePromise.prototype[name] = function () {
            return exports[name].apply(
                exports,
                [this].concat(array_slice(arguments))
            );
        };
    },
    void 0
);

makePromise.prototype.toSource = function () {
    return this.toString();
};

makePromise.prototype.toString = function () {
    return "[object Promise]";
};

defend(makePromise.prototype);

/**
 * If an object is not a promise, it is as "near" as possible.
 * If a promise is rejected, it is as "near" as possible too.
 * If it’s a fulfilled promise, the fulfillment value is nearer.
 * If it’s a deferred promise and the deferred has been resolved, the
 * resolution is "nearer".
 * @param object
 * @returns most resolved (nearest) form of the object
 */
exports.nearer = valueOf;
function valueOf(value) {
    if (isPromise(value)) {
        return value.valueOf();
    }
    return value;
}

/**
 * @returns whether the given object is a promise.
 * Otherwise it is a fulfilled value.
 */
exports.isPromise = isPromise;
function isPromise(object) {
    return object && typeof object.promiseSend === "function";
}

/**
 * @returns whether the given object can be coerced to a promise.
 * Otherwise it is a fulfilled value.
 */
exports.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
    return object && typeof object.then === "function";
}

/**
 * @returns whether the given object is a resolved promise.
 */
exports.isResolved = isResolved;
function isResolved(object) {
    return isFulfilled(object) || isRejected(object);
}

/**
 * @returns whether the given object is a value or fulfilled
 * promise.
 */
exports.isFulfilled = isFulfilled;
function isFulfilled(object) {
    return !isPromiseAlike(valueOf(object));
}

/**
 * @returns whether the given object is a rejected promise.
 */
exports.isRejected = isRejected;
function isRejected(object) {
    object = valueOf(object);
    return isPromise(object) && 'exception' in object;
}

var rejections = [];
var errors = [];
var errorsDisplayed;
function displayErrors() {
    if (
        !errorsDisplayed &&
        typeof window !== "undefined" &&
        !window.Touch &&
        window.console
    ) {
        // This promise library consumes exceptions thrown in handlers so
        // they can be handled by a subsequent promise.  The rejected
        // promises get added to this array when they are created, and
        // removed when they are handled.
        console.log("Should be empty:", errors);
    }
    errorsDisplayed = true;
}

/**
 * Constructs a rejected promise.
 * @param exception value describing the failure
 */
exports.reject = reject;
function reject(exception) {
    var rejection = makePromise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                var at = array_indexOf(rejections, this);
                if (at !== -1) {
                    errors.splice(at, 1);
                    rejections.splice(at, 1);
                }
            }
            return rejected ? rejected(exception) : reject(exception);
        }
    }, function fallback() {
        return reject(exception);
    }, function valueOf() {
        return this;
    }, exception);
    // note that the error has not been handled
    displayErrors();
    rejections.push(rejection);
    errors.push(exception);
    return rejection;
}

/**
 * Constructs a promise for an immediate reference.
 * @param value immediate reference
 */
exports.begin = resolve; // XXX experimental
exports.resolve = resolve;
exports.ref = deprecate(resolve, "ref", "resolve"); // XXX deprecated, use resolve
function resolve(object) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (isPromise(object)) {
        return object;
    }
    // In order to break infinite recursion or loops between `then` and
    // `resolve`, it is necessary to attempt to extract fulfilled values
    // out of foreign promise implementations before attempting to wrap
    // them as unresolved promises.  It is my hope that other
    // implementations will implement `valueOf` to synchronously extract
    // the fulfillment value from their fulfilled promises.  If the
    // other promise library does not implement `valueOf`, the
    // implementations on primordial prototypes are harmless.
    object = valueOf(object);
    // assimilate thenables, CommonJS/Promises/A
    if (isPromiseAlike(object)) {
        var deferred = defer();
        object.then(deferred.resolve, deferred.reject, deferred.notify);
        return deferred.promise;
    }
    return makePromise({
        "when": function () {
            return object;
        },
        "get": function (name) {
            return object[name];
        },
        "put": function (name, value) {
            object[name] = value;
            return object;
        },
        "del": function (name) {
            delete object[name];
            return object;
        },
        "post": function (name, value) {
            return object[name].apply(object, value);
        },
        "apply": function (self, args) {
            return object.apply(self, args);
        },
        "fapply": function (args) {
            return object.apply(void 0, args);
        },
        "viewInfo": function () {
            var on = object;
            var properties = {};

            function fixFalsyProperty(name) {
                if (!properties[name]) {
                    properties[name] = typeof on[name];
                }
            }

            while (on) {
                Object.getOwnPropertyNames(on).forEach(fixFalsyProperty);
                on = Object.getPrototypeOf(on);
            }
            return {
                "type": typeof object,
                "properties": properties
            };
        },
        "keys": function () {
            return object_keys(object);
        }
    }, void 0, function valueOf() {
        return object;
    });
}

/**
 * Annotates an object such that it will never be
 * transferred away from this process over any promise
 * communication channel.
 * @param object
 * @returns promise a wrapping of that object that
 * additionally responds to the "isDef" message
 * without a rejection.
 */
exports.master = master;
function master(object) {
    return makePromise({
        "isDef": function () {}
    }, function fallback() {
        var args = array_slice(arguments);
        return send.apply(void 0, [object].concat(args));
    }, function () {
        return valueOf(object);
    });
}

exports.viewInfo = viewInfo;
function viewInfo(object, info) {
    object = resolve(object);
    if (info) {
        return makePromise({
            "viewInfo": function () {
                return info;
            }
        }, function fallback() {
            var args = array_slice(arguments);
            return send.apply(void 0, [object].concat(args));
        }, function () {
            return valueOf(object);
        });
    } else {
        return send(object, "viewInfo");
    }
}

exports.view = view;
function view(object) {
    return viewInfo(object).when(function (info) {
        var view;
        if (info.type === "function") {
            view = function () {
                return apply(object, void 0, arguments);
            };
        } else {
            view = {};
        }
        var properties = info.properties || {};
        object_keys(properties).forEach(function (name) {
            if (properties[name] === "function") {
                view[name] = function () {
                    return post(object, name, arguments);
                };
            }
        });
        return resolve(view);
    });
}

/**
 * Registers an observer on a promise.
 *
 * Guarantees:
 *
 * 1. that fulfilled and rejected will be called only once.
 * 2. that either the fulfilled callback or the rejected callback will be
 *    called, but not both.
 * 3. that fulfilled and rejected will not be called in this turn.
 *
 * @param value      promise or immediate reference to observe
 * @param fulfilled  function to be called with the fulfilled value
 * @param rejected   function to be called with the rejection exception
 * @param progressed function to be called on any progress notifications
 * @return promise for the return value from the invoked callback
 */
exports.when = when;
function when(value, fulfilled, rejected, progressed) {
    var deferred = defer();
    var done = false;   // ensure the untrusted promise makes at most a
                        // single call to one of the callbacks

    function _fulfilled(value) {
        try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
        } catch (exception) {
            return reject(exception);
        }
    }

    function _rejected(exception) {
        if (typeof rejected === "function") {
            makeStackTraceLong(exception, resolvedValue);
            try {
                return rejected(exception);
            } catch (newException) {
                return reject(newException);
            }
        }
        return reject(exception);
    }

    function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }

    var resolvedValue = resolve(value);
    nextTick(function () {
        resolvedValue.promiseSend("when", function (value) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_fulfilled(value));
        }, function (exception) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_rejected(exception));
        });
    });

    // Progress propagator need to be attached in the current tick.
    resolvedValue.promiseSend("when", void 0, void 0, function (value) {
        deferred.notify(_progressed(value));
    });

    return deferred.promise;
}

/**
 * Spreads the values of a promised array of arguments into the
 * fulfillment callback.
 * @param fulfilled callback that receives variadic arguments from the
 * promised array
 * @param rejected callback that receives the exception if the promise
 * is rejected.
 * @returns a promise for the return value or thrown exception of
 * either callback.
 */
exports.spread = spread;
function spread(promise, fulfilled, rejected) {
    return when(promise, function (valuesOrPromises) {
        return all(valuesOrPromises).then(function (values) {
            return fulfilled.apply(void 0, values);
        }, rejected);
    }, rejected);
}

/**
 * The async function is a decorator for generator functions, turning
 * them into asynchronous generators.  This presently only works in
 * Firefox/Spidermonkey, however, this code does not cause syntax
 * errors in older engines.  This code should continue to work and
 * will in fact improve over time as the language improves.
 *
 * Decorates a generator function such that:
 *  - it may yield promises
 *  - execution will continue when that promise is fulfilled
 *  - the value of the yield expression will be the fulfilled value
 *  - it returns a promise for the return value (when the generator
 *    stops iterating)
 *  - the decorated function returns a promise for the return value
 *    of the generator or the first rejected promise among those
 *    yielded.
 *  - if an error is thrown in the generator, it propagates through
 *    every following yield until it is caught, or until it escapes
 *    the generator function altogether, and is translated into a
 *    rejection for the promise returned by the decorated generator.
 *  - in present implementations of generators, when a generator
 *    function is complete, it throws ``StopIteration``, ``return`` is
 *    a syntax error in the presence of ``yield``, so there is no
 *    observable return value. There is a proposal[1] to add support
 *    for ``return``, which would permit the value to be carried by a
 *    ``StopIteration`` instance, in which case it would fulfill the
 *    promise returned by the asynchronous generator.  This can be
 *    emulated today by throwing StopIteration explicitly with a value
 *    property.
 *
 *  [1]: http://wiki.ecmascript.org/doku.php?id=strawman:async_functions#reference_implementation
 *
 */
exports.async = async;
function async(makeGenerator) {
    return function () {
        // when verb is "send", arg is a value
        // when verb is "throw", arg is an exception
        function continuer(verb, arg) {
            var result;
            try {
                result = generator[verb](arg);
            } catch (exception) {
                if (isStopIteration(exception)) {
                    return exception.value;
                } else {
                    return reject(exception);
                }
            }
            return when(result, callback, errback);
        }
        var generator = makeGenerator.apply(this, arguments);
        var callback = continuer.bind(continuer, "send");
        var errback = continuer.bind(continuer, "throw");
        return callback();
    };
}

/**
 * Throws a ReturnValue exception to stop an asynchronous generator.
 * Only useful presently in Firefox/SpiderMonkey since generators are
 * implemented.
 * @param value the return value for the surrounding generator
 * @throws ReturnValue exception with the value.
 * @example
 * Q.async(function () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      Q.return(foo + bar);
 * })
 */
exports['return'] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

/**
 * The promised function decorator ensures that any promise arguments
 * are resolved and passed as values (`this` is also resolved and passed
 * as a value).  It will also ensure that the result of a function is
 * always a promise.
 *
 * @example
 * var add = Q.promised(function (a, b) {
 *     return a + b;
 * });
 * add(Q.resolve(a), Q.resolve(B));
 *
 * @param {function} callback The function to decorate
 * @returns {function} a function that has been decorated.
 */
exports.promised = promised;
function promised(callback) {
    return function () {
        return all([this, all(arguments)]).spread(function (self, args) {
          return callback.apply(self, args);
        });
    };
}

/**
 * Constructs a promise method that can be used to safely observe resolution of
 * a promise for an arbitrarily named method like "propfind" in a future turn.
 */
exports.sender = deprecate(sender, "sender", "dispatcher"); // XXX deprecated, use dispatcher
exports.Method = deprecate(sender, "Method", "dispatcher"); // XXX deprecated, use dispatcher
function sender(op) {
    return function (object) {
        var args = array_slice(arguments, 1);
        return send.apply(void 0, [object, op].concat(args));
    };
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param ...args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
exports.send = deprecate(send, "send", "dispatch"); // XXX deprecated, use dispatch
function send(object, op) {
    var deferred = defer();
    var args = array_slice(arguments, 2);
    object = resolve(object);
    nextTick(function () {
        object.promiseSend.apply(
            object,
            [op, deferred.resolve].concat(args)
        );
    });
    return deferred.promise;
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
exports.dispatch = dispatch;
function dispatch(object, op, args) {
    var deferred = defer();
    object = resolve(object);
    nextTick(function () {
        object.promiseSend.apply(
            object,
            [op, deferred.resolve].concat(args)
        );
    });
    return deferred.promise;
}

/**
 * Constructs a promise method that can be used to safely observe resolution of
 * a promise for an arbitrarily named method like "propfind" in a future turn.
 *
 * "dispatcher" constructs methods like "get(promise, name)" and "put(promise)".
 */
exports.dispatcher = dispatcher;
function dispatcher(op) {
    return function (object) {
        var args = array_slice(arguments, 1);
        return dispatch(object, op, args);
    };
}

/**
 * Gets the value of a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to get
 * @return promise for the property value
 */
exports.get = dispatcher("get");

/**
 * Sets the value of a property in a future turn.
 * @param object    promise or immediate reference for object object
 * @param name      name of property to set
 * @param value     new value of property
 * @return promise for the return value
 */
exports.put = dispatcher("put");

/**
 * Deletes a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to delete
 * @return promise for the return value
 */
exports["delete"] = // XXX experimental
exports.del = dispatcher("del");

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param value     a value to post, typically an array of
 *                  invocation arguments for promises that
 *                  are ultimately backed with `resolve` values,
 *                  as opposed to those backed with URLs
 *                  wherein the posted value can be any
 *                  JSON serializable object.
 * @return promise for the return value
 */
// bound locally because it is used by other methods
var post = exports.post = dispatcher("post");

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param ...args   array of invocation arguments
 * @return promise for the return value
 */
exports.invoke = function (value, name) {
    var args = array_slice(arguments, 2);
    return post(value, name, args);
};

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param thisp     the `this` object for the call
 * @param args      array of application arguments
 */
// XXX deprecated, use fapply
var apply = exports.apply = deprecate(dispatcher("apply"), "apply", "fapply");

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param args      array of application arguments
 */
var fapply = exports.fapply = dispatcher("fapply");

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param thisp     the `this` object for the call
 * @param ...args   array of application arguments
 */
// XXX deprecated, use fcall
exports.call = deprecate(call, "call", "fcall");
function call(value, thisp) {
    var args = array_slice(arguments, 2);
    return apply(value, thisp, args);
}

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
exports["try"] = fcall; // XXX experimental
exports.fcall = fcall;
function fcall(value) {
    var args = array_slice(arguments, 1);
    return fapply(value, args);
}

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param thisp   the `this` object for the call
 * @param ...args   array of application arguments
 */
exports.bind = deprecate(bind, "bind", "fbind"); // XXX deprecated, use fbind
function bind(value, thisp) {
    var args = array_slice(arguments, 2);
    return function bound() {
        var allArgs = args.concat(array_slice(arguments));
        return apply(value, thisp, allArgs);
    };
}

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
exports.fbind = fbind;
function fbind(value) {
    var args = array_slice(arguments, 1);
    return function fbound() {
        var allArgs = args.concat(array_slice(arguments));
        return fapply(value, allArgs);
    };
}

/**
 * Requests the names of the owned properties of a promised
 * object in a future turn.
 * @param object    promise or immediate reference for target object
 * @return promise for the keys of the eventually resolved object
 */
exports.keys = dispatcher("keys");

/**
 * Turns an array of promises into a promise for an array.  If any of
 * the promises gets rejected, the whole array is rejected immediately.
 * @param {Array*} an array (or promise for an array) of values (or
 * promises for values)
 * @returns a promise for an array of the corresponding values
 */
// By Mark Miller
// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
exports.all = all;
function all(promises) {
    return when(promises, function (promises) {
        var countDown = promises.length;
        if (countDown === 0) {
            return resolve(promises);
        }
        var deferred = defer();
        array_reduce(promises, function (undefined, promise, index) {
            if (isFulfilled(promise)) {
                promises[index] = valueOf(promise);
                if (--countDown === 0) {
                    deferred.resolve(promises);
                }
            } else {
                when(promise, function (value) {
                    promises[index] = value;
                    if (--countDown === 0) {
                        deferred.resolve(promises);
                    }
                })
                .fail(deferred.reject);
            }
        }, void 0);
        return deferred.promise;
    });
}

/**
 * Waits for all promises to be resolved, either fulfilled or
 * rejected.  This is distinct from `all` since that would stop
 * waiting at the first rejection.  The promise returned by
 * `allResolved` will never be rejected.
 * @param promises a promise for an array (or an array) of promises
 * (or values)
 * @return a promise for an array of promises
 */
exports.allResolved = allResolved;
function allResolved(promises) {
    return when(promises, function (promises) {
        return when(all(array_map(promises, function (promise) {
            return when(promise, noop, noop);
        })), function () {
            return array_map(promises, resolve);
        });
    });
}

/**
 * Captures the failure of a promise, giving an oportunity to recover
 * with a callback.  If the given promise is fulfilled, the returned
 * promise is fulfilled.
 * @param {Any*} promise for something
 * @param {Function} callback to fulfill the returned promise if the
 * given promise is rejected
 * @returns a promise for the return value of the callback
 */
exports["catch"] = // XXX experimental
exports.fail = fail;
function fail(promise, rejected) {
    return when(promise, void 0, rejected);
}

/**
 * Attaches a listener that can respond to progress notifications from a
 * promise's originating deferred. This listener receives the exact arguments
 * passed to ``deferred.notify``.
 * @param {Any*} promise for something
 * @param {Function} callback to receive any progress notifications
 * @returns the given promise, unchanged
 */
exports.progress = progress;
function progress(promise, progressed) {
    return when(promise, void 0, void 0, progressed);
}

/**
 * Provides an opportunity to observe the rejection of a promise,
 * regardless of whether the promise is fulfilled or rejected.  Forwards
 * the resolution to the returned promise when the callback is done.
 * The callback can return a promise to defer completion.
 * @param {Any*} promise
 * @param {Function} callback to observe the resolution of the given
 * promise, takes no arguments.
 * @returns a promise for the resolution of the given promise when
 * ``fin`` is done.
 */
exports["finally"] = // XXX experimental
exports.fin = fin;
function fin(promise, callback) {
    return when(promise, function (value) {
        return when(callback(), function () {
            return value;
        });
    }, function (exception) {
        return when(callback(), function () {
            return reject(exception);
        });
    });
}

/**
 * Terminates a chain of promises, forcing rejections to be
 * thrown as exceptions.
 * @param {Any*} promise at the end of a chain of promises
 * @returns nothing
 */
exports.end = deprecate(done, "end", "done"); // XXX deprecated, use done
exports.done = done;
function done(promise, fulfilled, rejected, progress) {
    function onUnhandledError(error) {
        // forward to a future turn so that ``when``
        // does not catch it and turn it into a rejection.
        nextTick(function () {
            makeStackTraceLong(error, promise);

            if (exports.onerror) {
                exports.onerror(error);
            } else {
                throw error;
            }
        });
    }

    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
    var promiseToHandle = fulfilled || rejected || progress ?
        when(promise, fulfilled, rejected, progress) :
        promise;

    fail(promiseToHandle, onUnhandledError);
}

/**
 * Causes a promise to be rejected if it does not get fulfilled before
 * some milliseconds time out.
 * @param {Any*} promise
 * @param {Number} milliseconds timeout
 * @returns a promise for the resolution of the given promise if it is
 * fulfilled before the timeout, otherwise rejected.
 */
exports.timeout = timeout;
function timeout(promise, ms) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
        deferred.reject(new Error("Timed out after " + ms + " ms"));
    }, ms);

    when(promise, function (value) {
        clearTimeout(timeoutId);
        deferred.resolve(value);
    }, function (exception) {
        clearTimeout(timeoutId);
        deferred.reject(exception);
    });

    return deferred.promise;
}

/**
 * Returns a promise for the given value (or promised value) after some
 * milliseconds.
 * @param {Any*} promise
 * @param {Number} milliseconds
 * @returns a promise for the resolution of the given promise after some
 * time has elapsed.
 */
exports.delay = delay;
function delay(promise, timeout) {
    if (timeout === void 0) {
        timeout = promise;
        promise = void 0;
    }
    var deferred = defer();
    setTimeout(function () {
        deferred.resolve(promise);
    }, timeout);
    return deferred.promise;
}

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided as an array, and returns a promise.
 *
 *      Q.nfapply(FS.readFile, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
exports.nfapply = nfapply;
function nfapply(callback, args) {
    var nodeArgs = array_slice(args);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());

    fapply(callback, nodeArgs).fail(deferred.reject);
    return deferred.promise;
}

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided individually, and returns a promise.
 *
 *      Q.nfcall(FS.readFile, __filename)
 *      .then(function (content) {
 *      })
 *
 */
exports.nfcall = nfcall;
function nfcall(callback/*, ...args */) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());

    fapply(callback, nodeArgs).fail(deferred.reject);
    return deferred.promise;
}

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 *
 *      Q.nfbind(FS.readFile, __filename)("utf-8")
 *      .then(console.log)
 *      .done()
 *
 */
exports.nfbind = nfbind;
function nfbind(callback/*, ...args */) {
    var baseArgs = array_slice(arguments, 1);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());

        fapply(callback, nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
}

/**
 * Passes a continuation to a Node function, which is called with a given
 * `this` value and arguments provided as an array, and returns a promise.
 *
 *      Q.napply(FS.readFile, FS, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
exports.napply = deprecate(napply, "napply", "npost");
function napply(callback, thisp, args) {
    return nbind(callback, thisp).apply(void 0, args);
}

/**
 * Passes a continuation to a Node function, which is called with a given
 * `this` value and arguments provided individually, and returns a promise.
 *
 *      Q.ncall(FS.readFile, FS, __filename)
 *      .then(function (content) {
 *      })
 *
 */
exports.ncall = deprecate(ncall, "ncall", "ninvoke");
function ncall(callback, thisp /*, ...args*/) {
    var args = array_slice(arguments, 2);
    return napply(callback, thisp, args);
}

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 *
 *      Q.nbind(FS.readFile, FS)(__filename)
 *      .then(console.log)
 *      .done()
 *
 */
exports.nbind = deprecate(nbind, "nbind", "nfbind");
function nbind(callback /* thisp, ...args*/) {
    if (arguments.length > 1) {
        var thisp = arguments[1];
        var args = array_slice(arguments, 2);

        var originalCallback = callback;
        callback = function () {
            var combinedArgs = args.concat(array_slice(arguments));
            return originalCallback.apply(thisp, combinedArgs);
        };
    }
    return function () {
        var deferred = defer();
        var args = array_slice(arguments);
        // add a continuation that resolves the promise
        args.push(deferred.makeNodeResolver());
        // trap exceptions thrown by the callback
        fapply(callback, args)
        .fail(deferred.reject);
        return deferred.promise;
    };
}

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback with a given array of arguments, plus a provided callback.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param {Array} args arguments to pass to the method; the callback
 * will be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
exports.npost = npost;
function npost(object, name, args) {
    var nodeArgs = array_slice(args);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());

    post(object, name, nodeArgs).fail(deferred.reject);
    return deferred.promise;
}

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback, forwarding the given variadic arguments, plus a provided
 * callback argument.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param ...args arguments to pass to the method; the callback will
 * be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
exports.ninvoke = ninvoke;
function ninvoke(object, name /*, ...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());

    post(object, name, nodeArgs).fail(deferred.reject);
    return deferred.promise;
}

exports.nend = deprecate(nodeify, "nend", "nodeify"); // XXX deprecated, use nodeify
exports.nodeify = nodeify;
function nodeify(promise, nodeback) {
    if (nodeback) {
        promise.then(function (value) {
            nextTick(function () {
                nodeback(null, value);
            });
        }, function (error) {
            nextTick(function () {
                nodeback(error);
            });
        });
    } else {
        return promise;
    }
}

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

});

}).call(this,_dereq_("Mk2NyG"))
},{"Mk2NyG":1}],7:[function(_dereq_,module,exports){
'use strict';

var BoundingBox = module.exports = function(element, left, top){
	this.element = element;
	this.top = top || 0;
	this.left = left || 0;
	this.width = this.element.width;
	this.height = this.element.height;
	this.bottom = this.top + this.height;
	this.right = this.left + this.width;

	element.locations.push(this);
};

BoundingBox.prototype.show = function(container){
	if(this.visible) return;
	
	this.visible = true;
	this.element.show(this.left, this.top, container);
};

BoundingBox.prototype.hide = function(container){
	if(!this.visible) return;

	this.visible = false;
	this.element.hide(container);
};
},{}],8:[function(_dereq_,module,exports){
'use strict';

module.exports = Tag;

function Tag(){
	this.elements = [];
}

Tag.create = function(options){
	options = options || {};
	var tag = new Tag();
	
	if('skipProbability' in options) tag.skipProbability = options.skipProbability;
	if('tryLimit' in options) tag.tryLimit = options.tryLimit;

	return tag;
};

Tag.prototype.chanceMultiplier = 1;
Tag.prototype.skipProbability = 0;

Tag.prototype.add = function(element){
	var chanceMultiplier = element.chanceMultiplier;
	while(chanceMultiplier--) this.elements.push(element);
};

Tag.prototype.remove = function(element){
	var	index;

	// Remove all instances of the element
	while(~(index =  this.elements.indexOf(element))){
		this.elements.splice(index, 1);
	}
};

Tag.prototype.getElements = function(){
	return this.elements.slice();
};

Tag.prototype.getRandomElement = function(){
	return this.elements[(Math.random() * this.elements.length)|0];
};



},{}],9:[function(_dereq_,module,exports){
'use strict';

var Q = _dereq_('../bower_components/q/q.js');
var createQuadtree = _dereq_('../bower_components/giant-quadtree/dist/GiantQuadtree.js').create,
	Surface = _dereq_('../bower_components/big-surface/dist/BigSurface.js');

var BoundingBox = _dereq_('./BoundingBox.js'),
	Tag = _dereq_('./Tag.js');

var Collage = module.exports = function(container){
	Surface.call(this, container);
	this.quadtree = createQuadtree(15000);

	this.tags = {};
	this.activeTags = [];

	this.updateCanvasDimensions();
};

Collage.prototype = Object.create(Surface.prototype);

Collage.create = function(container){
	var collage = new Collage(container);
	return Collage.getApi(collage);
};

Collage.getApi = function(collage){
	var api = Surface.getApi(collage);

	api.createTag = collage.createTag.bind(collage);
	api.configureTag = collage.configureTag.bind(collage);
	
	api.setActiveTags = collage.setActiveTags.bind(collage);
	
	api.pause = collage.pause.bind(collage);
	api.resume = collage.resume.bind(collage);

	api.load = collage.loadElements.bind(collage);
	api.add = collage.addElements.bind(collage);
	api.remove = collage.removeElement.bind(collage);
	api.get = collage.getElements.bind(collage);
	api.showElement = collage.showElement.bind(collage);
	api.loader = collage.loader;

	api.fill = function(){
		collage.updateCanvasDimensions();
		collage.pickNextElement();

		if(collage.nextElement){
			return collage.fillCenter();	
		}

		return [];
	};

	api.start = collage.start.bind(collage);
	
	return api;
};

Collage.loader = _dereq_('./loader/index.js');
Collage.element = _dereq_('./element/index.js');

// How many random spot will be checked to place elements per frame
Collage.prototype.scanTryLimit = 20;

// Max number of frames an element has to find a place before another is picked
// this prevents large gaps due to large elements
Collage.prototype.missLimit = 4;

// Minimum pixel spacing between elements
Collage.prototype.elementMargin = 25;

// How much beyond the window to scan for places to put objects when filling
Collage.prototype.overScan = 0;

Collage.prototype.hidingArea =  document.createDocumentFragment();
Collage.prototype.minElementSize = 50;

Collage.prototype.createTag = function(name, options){
	this.tags[name] = Tag.create(options);
	return this.tags[name];
};

Collage.prototype.configureTag = function(name, options){
	var tag = this.tags[name];
	if(!tag){
		this.createTag(options);
		return;
	}

	if('skipProbability' in options) tag.skipProbability = options.skipProbability;
	if('tryLimit' in options) tag.tryLimit = options.tryLimit;
};

Collage.prototype.loadElements = function(tagNames, arg2, arg3){
	var addElements = this.addElements.bind(this, tagNames),
		loaderMap,
		loaderName,
		loader,
		loaderConfig,
		loaderConfigs,
		loaderConfigIndex,
		promise,
		promises = [];

	if(typeof arg2 === 'string'){
		// Handle the .load([tag name], [loader name], [loader config]) case
		loaderMap = {};
		loaderMap[arg2] = arg3;	
	} else {
		// Handle the .load([tag name], [loader map]) case
		loaderMap = arg2;
	} 

	for(loaderName in loaderMap){
		if(loaderMap.hasOwnProperty(loaderName)){
			loader = Collage.loader[loaderName];
			loaderConfigs = loaderMap[loaderName];
			if(!Array.isArray(loaderConfigs)) loaderConfigs = [loaderConfigs];		
			loaderConfigIndex = loaderConfigs.length;

			loaderConfig = loaderConfigs[--loaderConfigIndex];
			while(loaderConfig){
				promise = loader(this, loaderConfig).then(addElements);
				promises.push(promise);	
				loaderConfig = loaderConfigs[--loaderConfigIndex];
			}
		}
	}

	return Q.allResolved(promises);
};

Collage.prototype.addElements = function(tagNames, elements){
	if(!Array.isArray(tagNames)) tagNames = [tagNames];
	if(!Array.isArray(elements)) elements = [elements];
	
	var tagNameIndex = tagNames.length,
		tagName,
		tag,
		elementIndex;

	// For each tag...
	tagName = tagNames[--tagNameIndex];
	while(tagName){
		tag = this.tags[tagName] || this.createTag(tagName);
		elementIndex = elements.length;
		while(elementIndex--) tag.add(elements[elementIndex]);
		tagName = tagNames[--tagNameIndex];
	}
};

Collage.prototype.fadeInToCenter = function(){};

Collage.prototype.removeElement = function(tagNames, element){
	if(!Array.isArray(tagNames)) tagNames = [tagNames];
	
	var tagNameIndex = tagNames.length,
		tagName,
		tag;

	tagName = tagNames[tagNameIndex--];
	while(tagName){
		tag = this.tags[tagName];
		if(!tag) continue;
		tag.remove(element);
		tagName = tagNames[tagNameIndex--];
	}
};

Collage.prototype.getElements = function(){
	var tagNames = (arguments.length > 0)? arguments : Object.keys(this.tags),
		tagNameIndex = tagNames.length,
		tagName,
		tag,
		elements = [];

	tagName = tagNames[--tagNameIndex];
	while(tagName){
		tag = this.tags[tagName];
		if(tag){
			elements = elements.concat(tag.getElements());
		}
		tagName = tagNames[--tagNameIndex];
	}

	return elements;
};

Collage.prototype.setActiveTags = function(){
	var index = arguments.length,
		tagName,
		tag,
		chanceMultiplier,
		activeTags = [];

	tagName = arguments[--index];
	while(tagName){
		tag = this.tags[tagName];
		if(tag){
			chanceMultiplier = tag.chanceMultiplier;
			while(chanceMultiplier--) activeTags.push(tag);
		}
		tagName = arguments[--index];
	}

	this.activeTags = activeTags;
};

Collage.prototype.getRandomActiveTag = function(){
	var tag,
		failSafe = this.getRandomActiveTagFailSafe;

	while(failSafe--){
		tag = this.activeTags[(Math.random() * this.activeTags.length)|0];
		if(tag.skipProbability < Math.random()) break;
	}
	
	return tag;
};

Collage.prototype.pause = function(duration){
	if(this.savedHorizontalVelocityScalar !== void 0) return;
	this.savedHorizontalVelocityScalar = this.horizontalVelocityScalar;
	this.savedVerticalVelocityScalar = this.verticalVelocityScalar;
	this.setVelocityScalar(0, duration || 0.4);
};

Collage.prototype.resume = function(duration){
	if(this.savedHorizontalVelocityScalar === void 0) return;

	this.setHorizontalVelocityScalar(this.savedHorizontalVelocityScalar, (duration || 0.4));
	this.setVerticalVelocityScalar(this.savedVerticalVelocityScalar, (duration || 0.4));
	this.savedHorizontalVelocityScalar = void 0;
};

Collage.prototype.savedHorizontalVelocityScalar = void 0;
Collage.prototype.savedVerticalVelocityScalar = void 0;

Collage.prototype.getRandomActiveTagFailSafe = 20;
Collage.prototype.getRandomElementFailSafe = 20;
Collage.prototype.getRandomElementTryLimit = 20;
Collage.prototype.maxElementWidth = 2000;
Collage.prototype.maxElementHeight = 1000;

Collage.prototype.getRandomElement = function(){
	var failSafe = this.getRandomElementFailSafe,
		inCanvasRange = true,
		left = this.viewportLeft - this.maxElementWidth,
		top = this.viewportTop - this.maxElementHeight,
		right = this.viewportRight + this.maxElementWidth,
		bottom = this.viewportBottom + this.maxElementHeight,
		element,
		tag,
		tryLimit;

	while(inCanvasRange && failSafe--){
		tag = this.getRandomActiveTag();
		tryLimit = tag.tryLimit || this.getRandomElementTryLimit;

		while(tryLimit--){
			element = tag.getRandomElement();

			if(!element.isIn(left, top, right, bottom)){
				return element;
			}
		}
	}
};

Collage.prototype.transformStep = function(){
	Surface.prototype.transformStep.call(this);
	this.updateCanvasDimensions();
	this.updateElementVisibility();
	this.maxCheckHeight = 0;
	this.maxCheckWidth = 0;

	this.pickNextElement();
	if(this.nextElement) this.fill();
};

Collage.prototype.start = function(){
	if(arguments.length > 0) this.setActiveTags.apply(this, arguments);
	
	if(this.activeTags.length === 0){
		throw new Error('Unable to start without active tags');
	}
	this.startTransformLoop();
	this.updateCanvasDimensions();
	this.pickNextElement();

	if(this.nextElement){
		this.fillCenter();	
	}
};

Collage.prototype.pickNextElement = function(){
	this.nextElement = this.getRandomElement();
	this.missCount = 0;

	if(this.nextElement){
		this.updateBounds();
	}
};

Collage.prototype.insertNextElement = function(left, top, show){
	var box = this.showElement(this.nextElement, left, top, show);
	this.pickNextElement();
	return box;
};

Collage.prototype.showElement = function(element, left, top, show){
	var boundingBox = new BoundingBox(element, left, top);
	this.quadtree.insert(boundingBox);
	
	if(show){
		boundingBox.show(this.element);
	} else {
		boundingBox.hide(this.hidingArea);
	}

	return boundingBox;
};

Collage.prototype.getViewportBoundingBoxes = function(){
	return this.quadtree.getObjects(this.viewportLeft, this.viewportTop, this.viewportWidth, this.viewportHeight);
};


Collage.prototype.getViewportElements = function(){
	var boundingBoxes = this.getViewportBoundingBoxes(),
		index = boundingBoxes.length,
		result = [];

	// boundingBoxes.map would be proper but is less proc efficient
	while(index--) result.push(boundingBoxes[index].element);

	return result;
};

Collage.prototype.updateElementVisibility = function(){
	var oldBoxes = this.visibleBoxes || [],
		newBoxes = this.quadtree.getObjects(this.viewportLeft, this.viewportTop, this.viewportWidth, this.viewportHeight),
		index,
		box;

	// Mark old visible to hide
	index = oldBoxes.length;
	while(index--) oldBoxes[index].hidePending = true;

	index = newBoxes.length;
	while(index--){
		box = newBoxes[index];
		if(!box.visible) box.show(this.element);

		// Clear hide flags for things that are still visible
		box.hidePending = false;
	}

	// Hide elements no longer in view
	index = oldBoxes.length;
	while(index--){
		box = oldBoxes[index];
		if(box.hidePending) box.hide(this.hidingArea);
	}

	this.visibleBoxes = newBoxes;
};

Collage.prototype.updateCanvasDimensions = function(){
	this.viewportLeft = -1 * this.horizontalPosition - this.overScan;
	this.viewportTop = -1 * this.verticalPosition - this.overScan;
	this.viewportWidth = this.width + this.overScan * 2;
	this.viewportHeight = this.height + this.overScan * 2;
	this.viewportRight = this.viewportLeft + this.viewportWidth;
	this.viewportBottom = this.viewportTop + this.viewportHeight;
	
	this.movingUp = this.lastVerticalDisplacement > 0;
	this.movingLeft = this.lastHorizontalDisplacement > 0;
};

Collage.prototype.fillCenter = function(){
	var boxes = this.quadtree.getObjects(
		this.viewportLeft - this.checkWidth,
		this.viewportTop - this.checkHeight,
		this.viewportWidth + this.checkWidth * 2,
		this.viewportHeight + this.checkHeight * 2
	);

	var	boundingBoxes = [],
		scanCheckLeft,
		scanCheckTop,
		scanCheckRight,
		scanCheckBottom,

		tryCount = 0,
		tryLimit = this.scanTryLimit * 10,
		missCount = 0,
		missLimit = tryLimit / 20;

	for(;tryCount < tryLimit; tryCount++){
		missCount++;

		if(missCount > missLimit){
			missCount = 0;
			this.pickNextElement();
			if(!this.nextElement) break;
		}

		scanCheckLeft = (this.viewportLeft - this.checkWidth) + 
			Math.floor((this.viewportWidth + this.checkWidth) * Math.random());
		scanCheckTop = (this.viewportTop - this.checkHeight) + 
			Math.floor((this.viewportHeight + this.checkHeight) * Math.random());
		scanCheckRight = scanCheckLeft + this.checkWidth;
		scanCheckBottom = scanCheckTop + this.checkHeight;
	
		if(!hasCollision(boxes, scanCheckLeft, scanCheckTop, scanCheckRight, scanCheckBottom)){
			boundingBoxes.push(this.insertNextElement(scanCheckLeft + this.elementMargin, scanCheckTop + this.elementMargin));
			if(!this.nextElement) break;

			missCount = 0;
			boxes = this.quadtree.getObjects(
				this.viewportLeft - this.checkWidth,
				this.viewportTop - this.checkHeight,
				this.viewportWidth + this.checkWidth * 2,
				this.viewportHeight + this.checkHeight * 2
			);
		}
	}

	this.updateElementVisibility();
	return boundingBoxes;
};

Collage.prototype.updateBounds = function(){
	this.checkHeight = this.nextElement.height + this.elementMargin * 2;
	this.checkWidth = this.nextElement.width + this.elementMargin * 2;

	this.checkLeft = this.movingLeft ? (this.viewportLeft - this.checkWidth) : this.viewportRight;
	this.checkTop = this.movingUp ? this.viewportTop - this.checkHeight : this.viewportBottom;
	this.checkRight = this.checkLeft + this.checkWidth;
	this.checkBottom = this.checkTop + this.checkHeight;
		
	this.scanLeft = this.viewportLeft - this.checkWidth;
	this.scanTop = this.viewportTop - this.checkHeight;
	this.scanWidth = this.viewportWidth + this.checkWidth;
	this.scanHeight = this.viewportHeight + this.checkHeight;

	this.horizontalBoxes = this.quadtree.getObjects(
		(this.movingLeft ?  this.viewportLeft - this.checkWidth : this.viewportRight),
		this.scanTop,
		this.checkWidth,
		this.scanHeight + this.checkHeight
	);

	this.verticalBoxes = this.quadtree.getObjects(
		this.scanLeft,
		(this.movingUp ? (this.viewportTop - this.checkHeight) : this.viewportBottom),
		this.scanWidth + this.checkWidth,
		this.checkHeight
	);
};

function hasCollision(boxList, left, top, right, bottom){
	var index = boxList.length,
		box;

	while(index--){
		box = boxList[index];

		// If there is a y-axis intersection
		if ((top <= box.top ?
						(bottom >= box.top) :
						(box.bottom >= top)) && 
							// And if there is intersection along the x-axis
							(left <= box.left ?
								(right >= box.left) :
								(box.right >= left))){
			return true;
		}
	}

	return false;
}

Collage.prototype.fill = function(){
	var tryCount = 0,
		tryLimit = this.scanTryLimit,
		scanCheckLeft,
		scanCheckTop,
		scanCheckRight,
		scanCheckBottom;

	this.missCount++;
	if(this.missCount > this.missLimit){
		this.pickNextElement();
		if(!this.nextElement) return;
	}

	for(;tryCount < tryLimit; tryCount++){
		// VERTICAL
		scanCheckLeft = this.scanLeft + Math.floor(this.scanWidth * Math.random());
		scanCheckRight = scanCheckLeft + this.checkWidth;
		
		if(!hasCollision(this.verticalBoxes, scanCheckLeft, this.checkTop, scanCheckRight, this.checkBottom)){
			this.insertNextElement(scanCheckLeft + this.elementMargin, this.checkTop + this.elementMargin);
			if(!this.nextElement) break;
		}

		// HORIZONTAL
		scanCheckTop = this.scanTop + Math.floor(this.scanHeight * Math.random());
		scanCheckBottom = scanCheckTop + this.checkHeight;

		if(!hasCollision(this.horizontalBoxes, this.checkLeft, scanCheckTop, this.checkRight, scanCheckBottom)){
			var box = this.insertNextElement(this.checkLeft + this.elementMargin, scanCheckTop + this.elementMargin);
			this.horizontalBoxes.push(box);

			if(!this.nextElement) break;
		}
	}
};

},{"../bower_components/big-surface/dist/BigSurface.js":2,"../bower_components/giant-quadtree/dist/GiantQuadtree.js":4,"../bower_components/q/q.js":6,"./BoundingBox.js":7,"./Tag.js":8,"./element/index.js":14,"./loader/index.js":22}],10:[function(_dereq_,module,exports){
'use strict';

module.exports = BaseElement;

function BaseElement(domElement, width, height){
	this.element = domElement;
	this.width = width || domElement.width || parseInt(domElement.clientWidth);
	this.height = height || domElement.height || parseInt(domElement.clientHeight);
	this.locations = [];
	this.isVisible = undefined;
	
	this.element.style.position = 'absolute';
}

BaseElement.create = function(domElement, width, height){
	var element = new BaseElement(domElement, width, height);
	return BaseElement.getApi(element);
};

BaseElement.getApi = function(element){
	var api = {};
	api.element = element.element;
	api.isIn = element.isIn.bind(element);
	api.reposition = element.reposition.bind(element);
	api.show = element.show.bind(element);
	api.hide = element.hide.bind(element);

	Object.defineProperty(api, 'width', {
		get: function(){return element.width;}
	});

	Object.defineProperty(api, 'visible', {
		get: function(){return element.isVisible;}
	});

	Object.defineProperty(api, 'height', {
		get: function(){return element.height;}
	});

	Object.defineProperty(api, 'chanceMultiplier', {
		get: function(){return element.chanceMultiplier;},
		set: function(value){ element.chanceMultiplier = value;}
	});

	Object.defineProperty(api, 'locations', {
		get: function(){return element.locations; }
	});

	return api;
};

BaseElement.prototype.chanceMultiplier = 1;

BaseElement.prototype.isIn = function(left, top, right, bottom){
	var locationIndex = this.locations.length,
		boundingBox = this.locations[--locationIndex];

	while(boundingBox){
		if((((left < boundingBox.left && boundingBox.left < right) ||
				(boundingBox.right < right && left < boundingBox.right)) &&
			((top < boundingBox.top && boundingBox.top < bottom) || 
				(boundingBox.bottom < bottom && top < boundingBox.bottom)))){
			return true;
		}
		boundingBox = this.locations[--locationIndex];
	}

	return false;
};

BaseElement.prototype.reposition = function(left, top){
	this.element.style.left = left + 'px';
	this.element.style.top = top + 'px';
};

BaseElement.prototype.hide = function(){
	this.isVisible = false;
};

BaseElement.prototype.show = function(left, top){
	this.reposition(left, top);
	this.isVisible = true;
};
},{}],11:[function(_dereq_,module,exports){
'use strict';

var BaseElement = _dereq_('./Element.js');

module.exports = IframeElement;

// iOS has a rendering bug related to iframes,
var isiOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

function IframeElement (element){
	BaseElement.call(this, element, parseInt(element.width), parseInt(element.height));

	this.iframe = this.element.querySelector('iframe') || this.element;
	this.isLocal = this.iframe.contentDocument && this.iframe.contentDocument.body && 
		this.iframe.contentDocument.body.innerHTML !== '';
	
	// Hack to fix for iOS's failure to render the inside of a iframe 
	// when using css transforms. If we have permission to edit the iframe,
	// this method is much more performant that the hack in .show
	if(isiOS && this.isLocal){
		this.iframe.contentDocument.body.style.webkitTransform = 'translate3d(0, 0, 0)';
	}
	
	this.hide();
}
IframeElement.prototype = Object.create(BaseElement.prototype);

IframeElement.create = function(element){
	element = new IframeElement(element);
	return IframeElement.getApi(element);
};

IframeElement.getApi = function(element){
	return BaseElement.getApi(element);
};

IframeElement.prototype.hide = function(){
	BaseElement.prototype.hide.call(this);
	this.element.style.opacity = 0;
	
	if(this.fidget){
		clearInterval(this.fidget);
		this.fidget = void 0;
	}
};

IframeElement.prototype.show = function(left, top){
	BaseElement.prototype.show.call(this, left, top);
	this.element.style.opacity = 1;

	// Hack to fix for iOS's failure to render the 
	// inside of a iframe when using css transforms.
	if(isiOS && !this.isLocal && !this.fidget){
		var iframe = this.iframe,
			flipper = 0.001;

		this.fidget = setInterval(function(){
			iframe.style.opacity = 1 + flipper;
			flipper *= -1;
		}, 200);
	}
};

},{"./Element.js":10}],12:[function(_dereq_,module,exports){
'use strict';

var BaseElement = _dereq_('./Element.js');

module.exports = SimpleElement;

function SimpleElement (element){
	BaseElement.call(this, element, parseInt(element.width), parseInt(element.height));
	this.appended = undefined;
}
SimpleElement.prototype = Object.create(BaseElement.prototype);

SimpleElement.create = function(element){
	element = new SimpleElement(element);
	return SimpleElement.getApi(element);
};

SimpleElement.getApi = function(element){
	return BaseElement.getApi(element);
};

//var hidingArea = document.createDocumentFragment();
SimpleElement.prototype.hide = function(){	
	BaseElement.prototype.hide.call(this);
	this.element.style.display = 'none';
	//hidingArea.appendChild(this.element);
};

SimpleElement.prototype.show = function(left, top, container){
	BaseElement.prototype.show.call(this, left, top);
	this.element.style.display = 'block';
	if(!this.appended){
		container.appendChild(this.element);
		this.appended = true;
	}
};
},{"./Element.js":10}],13:[function(_dereq_,module,exports){
'use strict';

var EventEmitter = _dereq_('../../bower_components/eventEmitter/EventEmitter.js');
var BaseElement = _dereq_('./Element.js');

module.exports = VideoElement;

// Manages global tasks, such as periodic polling of players
// to gather time information
var timeManager = (function(){
	var ACTIVE_ELEMENTS = [],
		PERIODIC_LISTENER,
		api = {};

	api.add = function(element){
		ACTIVE_ELEMENTS.push(element);
		if(ACTIVE_ELEMENTS.length === 1){
			PERIODIC_LISTENER = setInterval(function(){
				ACTIVE_ELEMENTS.forEach(function(element){
					var time = Math.round(element.player.getCurrentTime()),
						elapsed = time - element.lastReportedTime;
					
					if(elapsed === 0) return;
					if(elapsed === 1){
						element.lastReportedTime = time;
						element.emitter.emit('time', time);
						element.emitter.emit('time:' + time);
					} else { // In case we missed some ticks, make up for them
						var start = element.lastReportedTime + 1;
						for(; start < time; start++){
							element.lastReportedTime = start;
							element.emitter.emit('time', start);
							element.emitter.emit('time:' + start);
						}
					}
				});
			}, 500); 	// 500 ms ensures that we account for fluctuations in 
					// timing so we report the time accurate to the second
		}
	};

	api.remove = function(element){
		var index = ACTIVE_ELEMENTS.indexOf(element);
		if(~index){
			ACTIVE_ELEMENTS.splice(index, 1);
			if(ACTIVE_ELEMENTS.length === 0){
				clearInterval(PERIODIC_LISTENER);  
			}	
		}
	};

	return api;
}());

function VideoElement (element, player){
	BaseElement.call(this, element);
	this.player = player;
	this.emitter = new EventEmitter();
	this.lastReportedTime = 0;
	player.addEventListener('onStateChange', this.statusChangeHandler.bind(this));
	player.addEventListener('onError', this.errorHandler.bind(this));
	this.hide();
}
VideoElement.prototype = Object.create(BaseElement.prototype);

VideoElement.create = function(element, player, options){
	var videoElement = new VideoElement(element, player);

	if(options.continuousPlay) videoElement.continuousPlay = true;
	if(options.autoplay) videoElement.autoplay = true;
	if(options.loop) videoElement.loop = true;
	
	return VideoElement.getApi(videoElement);
};

VideoElement.getApi = function(element){
	var api = BaseElement.getApi(element);
	api.player = element.player;
	api.element = element.element;
	api.on = element.emitter.on.bind(element.emitter);
	api.removeListener = element.emitter.removeListener.bind(element.emitter);
	api.destroy = element.destroy.bind(element);
	return api;
};

VideoElement.prototype.continuousPlay = false;
VideoElement.prototype.autoplay = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? false : true );
VideoElement.prototype.loop = false;
VideoElement.prototype.playing = false;

VideoElement.prototype.errorHandler = function(e){
	if(e.data === 150){
		console.log(this);
		this.destroy();
	}
};

VideoElement.prototype.destroy = function(){
	this.height = 0;
	this.width = 0;
	this.bottom = this.top;
	this.left = this.right;
	this.element.parentNode.removeChild(this.element);
};

VideoElement.prototype.hide = function(){
	BaseElement.prototype.hide.call(this);
	this.element.style.opacity = 0;
	
	if(!this.continuousPlay){
		this.player.pauseVideo();
	}
};

VideoElement.prototype.show = function(left, top){
	this.element.style.opacity = 1;
	BaseElement.prototype.show.call(this, left, top);
	
	if(this.playing && !this.continuousPlay){
		this.player.playVideo();
	} else if(!this.playing && this.autoplay) {
		this.playing = true;
		this.player.playVideo();
	}
};

VideoElement.prototype.statusChangeHandler = function(status){
	switch(status.data){
		case -1:
			this.emitter.emit('unstarted');
		break;
		case 0:
			this.emitter.emit('ended');
			timeManager.remove(this);
			if(this.loop){
				this.player.seekTo(0);
				this.player.playVideo();
			}
		break;
		case 1:
			this.emitter.emit('playing');
			timeManager.add(this);
		break;
		case 2:
			this.emitter.emit('paused');
			timeManager.remove(this);
		break;
		case 3:
			this.emitter.emit('buffering');
		break;
		case 5:
			this.emitter.emit('video cued');
		break;
	}
};
},{"../../bower_components/eventEmitter/EventEmitter.js":3,"./Element.js":10}],14:[function(_dereq_,module,exports){
'use strict';

exports.Iframe = _dereq_('./Iframe.js');
exports.Simple = _dereq_('./Simple.js');
exports.Video = _dereq_('./Video.js');
},{"./Iframe.js":11,"./Simple.js":12,"./Video.js":13}],15:[function(_dereq_,module,exports){
'use strict';
/* globals FB */

var Q = _dereq_('../../bower_components/q/q.js'),
	getFromApi = _dereq_('./getFromCommonApi.js'),
	IframeElement = _dereq_('../element/Iframe.js'),
	utils = _dereq_('../utils.js');

var endpoint = 'https://graph.facebook.com/search';
//var endpoint = '/search';

window.credits = window.credits || {};
var credits = window.credits.facebook = {};

module.exports = function(collage, options){
	if(!options.type) options.type = 'pages';
	
	switch(options.type){
		case 'pages':
			return createPages(collage, options);
	}
};
/*
var ACTIVITY_BOX_TEMPLATE = '<div class="fb-activity" data-site="www.hrc.org" ' + 
	'data-width="{{width}}" data-height="{{height}}" data-header="false" ' + 
	'data-recommendations="false"></div>';
var LIKE_BOX_TEMPLATE = '<div class="fb-like-box" ' + 
	'data-href="http://www.facebook.com/{{id}}" data-width="{{width}}" ' + 
	'data-height="{{height}}" data-show-faces="true" data-stream="false" ' + 
	'data-header="false"></div>';
*/
var defaults = {
	limit: 3,
	width: 400,
	height: 600,
	minLikes: 0,
	showFaces: true,
	showStream: true,
	showHeader: false,
	ids: []
};

function createPages(collage, options){
	utils.extend(options, defaults);
	var ids = options.ids;
	
	if(options.query){
		return getFromApi(endpoint, [
			'type=page',
			'fields=name,link,likes,category',
			'limit=' + options.limit,
			'q=' + encodeURIComponent(options.query)
		]).then(function(response){
			response.data.forEach(function(item){
				if(item.likes < options.minLikes) return;
			
				credits[item.name] = item.link;
				ids.push(item.id);
			});

			return loadLikeBoxes(collage, ids, options);
		});
	} else {
		return Q.when(loadLikeBoxes(collage, ids, options));
	}
}

function loadLikeBoxes(collage, ids, options){
	var elements = [];

	ids.forEach(function(id){
		var element = document.createElement('div');
		element.className='fb-like-box';
		element.setAttribute('data-href', 'http://www.facebook.com/' + id);
		element.setAttribute('data-width', options.width);
		element.setAttribute('data-height', options.height);
		element.setAttribute('data-show-faces', options.showFaces);
		element.setAttribute('data-stream', options.showStream);
		element.setAttribute('data-header', options.showHeader);

		var iframeElement = utils.attachIframeToCollage(collage, element, options.width, options.height);
		
		FB.XFBML.parse(iframeElement);

		elements.push(new IframeElement(iframeElement));
	});
	
	return elements;
}

},{"../../bower_components/q/q.js":6,"../element/Iframe.js":11,"../utils.js":27,"./getFromCommonApi.js":17}],16:[function(_dereq_,module,exports){
'use strict';
/* jslint camelcase:false */
var Q = _dereq_('../../bower_components/q/q.js'),
	SimpleElement = _dereq_('../element/Simple.js'),
	utils = _dereq_('../utils.js'),
	getFromApi = _dereq_('./getFromCommonApi.js');

window.credits = window.credits || {};
var credits = window.credits.flickr = {};

var endpoint = 'http://api.flickr.com/services/rest/';
//var endpoint = '/services/rest/';

module.exports = getPhotos;

var defaults = {
	sort: 'relevance',
	count: '20',
	license: '1,2,3,4,5,6,7,8', // http://www.flickr.com/services/api/flickr.photos.licenses.getInfo.html
	apiKey: '06960d3c3c8affd01e65ec032513557b',
	media: 'photos',
	tagMode: 'all',
	isCommons: false,
	contentType: '1' // Photos only (not screenshots or drawings)
};

function getPhotos(collage, options){
	var deferred = Q.defer(),
		params;
	
	if(typeof options === 'string') options = {tags: options};
	utils.extend(options, defaults);

	params = [
		'format=json',
		'method=flickr.photos.search',
		'extras=url_z,url_m,path_alias',
		'api_key=' + options.apiKey,
		'license=' + options.license, 
		'sort=' + options.sort,
		'tag_mode=' + options.tagMode,
		'per_page=' + options.count,
		'content_type=' + options.contentType,
		'media=' + options.media,
		'tags=' + options.tags
	];

	if(options.isCommons){
		params.push('is_commons=' + options.isCommons);
	}

	getFromApi(endpoint, 'jsoncallback', params).then(function(response){
		var elements = [],
			photos = response.photos && response.photos.photo || [],
			waiting = photos.length;

		photos.forEach(function(item){
			var url = item.url_z || item.url_m;

			if(!url){
				waiting--;
				return;
			}

			loadImage(item.url_z || item.url_m).then(function(element){
				var anchor = document.createElement('a');
				anchor.href = 'http://www.flickr.com/photos/' + item.pathalias + '/' + item.id + '/';
				anchor.width = element.width;
				anchor.height = element.height;
				anchor.target = '_blank';
				anchor.style.display = 'block';
				anchor.appendChild(element);
				
				credits[item.pathalias] = anchor.href;
				
				elements.push(SimpleElement.create(anchor));
				if(--waiting === 0) deferred.resolve(elements);
			}, function(){
				if(--waiting === 0) deferred.resolve(elements);
			});
		});
	});

	return deferred.promise;
}

var documentFragment = document.createDocumentFragment();
function loadImage(src){
	var	deferred = Q.defer(),
		img = new Image();
	
	img.src = src;

	img.onload = function(){
		// This forces FF to set the width/height
		documentFragment.appendChild(img);
		deferred.resolve(img);
	};

	img.onerror = deferred.reject.bind(deferred);

	return deferred.promise;
}
},{"../../bower_components/q/q.js":6,"../element/Simple.js":12,"../utils.js":27,"./getFromCommonApi.js":17}],17:[function(_dereq_,module,exports){
'use strict';

var Q = _dereq_('../../bower_components/q/q.js');

window.API_CALLBACKS = {};

module.exports = (function(){
	var callbackCounter = 0,
		callbacks = window.API_CALLBACKS,
		defaultTimeout = 10 * 1000;

	return function(endpoint, callbackParam, params, timeout){
		var callbackId = 'c' + callbackCounter++,
			deferred = Q.defer(),
			script = document.createElement('script'),
			timeoutId;
		
		if(typeof callbackParam !== 'string'){
			timeout = params;
			params = callbackParam;
			callbackParam = 'callback';
		}

		timeout = timeout || defaultTimeout;
		params = params || [];
		params.push(callbackParam + '=API_CALLBACKS.' + callbackId);

		timeoutId = setTimeout(function(){
			deferred.reject('timeout');
		}, timeout);
		
		callbacks[callbackId] = function(response){
			clearTimeout(timeoutId);
			delete callbacks[callbackId];
			deferred.resolve(response);
		};

		script.async = true;
		script.src = endpoint + '?' + params.join('&'); 
		document.body.appendChild(script);

		return deferred.promise;
	};
}());
},{"../../bower_components/q/q.js":6}],18:[function(_dereq_,module,exports){
'use strict';

// This one is a bit questionable since it's deprecated, and the TOS for use in
// collages is unclear.

var mustache = _dereq_('../../bower_components/mustache/mustache.js');
var getFromApi = _dereq_('./getFromCommonApi.js');
var SimpleElement = _dereq_('../element/Simple.js');
	
window.credits = window.credits || {};
var credits = window.credits.googleNews = {};

module.exports = function(collage, query){
	return search(query);
};

var ARTICLE_TEMPLATE = '' +
'<div class="article-wrapper">' +
	'{{#image}}' +
		'<a href="{{image.contextUrl}}">' +
			'<img title="Image by {{image.publisher}}" class="article-image" ' + 
			'src="{{image.src}}" width="{{image.width}}" height="{{image.height}}"/>' + 
		'</a>' +
	'{{/image}}' +
	'<a class="article-title" href="{{sourceUrl}}">{{{title}}}</a>' + 
	'<p class="article-attribution">' +
		'<span class="article-publisher">{{{publisher}}}</span>' +
		' &ndash; <span class="article-date">{{date}}</span>' +
		' via {{#gnewsUrl}}<a class="article-via" href="{{gnewsUrl}}">{{/gnewsUrl}}' + 
		'Google News{{#gnewsUrl}}</a>{{/gnewsUrl}}' +
	'</p>' +
	'<p class="article-body">{{{body}}}</p>' +
'</div>';

var documentFragment = document.createDocumentFragment();

var search = (function(){
	var endpoint = 'https://ajax.googleapis.com/ajax/services/search/news';
	//var endpoint = '/ajax/services/search/news';

	return function(query){
		var params = [
				'v=1.0',
				'rsz=8',
				'q=' + encodeURIComponent(query)
			];
		
		return getFromApi(endpoint, params).then(function(response){
			var elements = [];
			response.responseData.results.forEach(function(item){
				credits[item.publisher] = item.unescapedUrl;

				var templateParams = {
					title: item.titleNoFormatting,
					sourceUrl: item.unescapedUrl,
					publisher: item.publisher,
					date: (new Date(item.publishedDate)).toLocaleDateString(),
					gnewsUrl: item.clusterUrl,
					body: item.content
				};
								
				if(item.image){
					templateParams.image = {
						src: item.image.tbUrl,
						width: item.image.tbWidth,
						height: item.image.tbHeight,
						publisher: item.image.publisher,
						contextUrl: item.image.originalContextUrl
					};
				}

				var element = document.createElement('div');
				element.className = 'gnews-article';
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


},{"../../bower_components/mustache/mustache.js":5,"../element/Simple.js":12,"./getFromCommonApi.js":17}],19:[function(_dereq_,module,exports){
'use strict';

var mustache = _dereq_('../../bower_components/mustache/mustache.js');
var getFromApi = _dereq_('./getFromCommonApi.js');
var SimpleElement = _dereq_('../element/Simple.js');
	
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

},{"../../bower_components/mustache/mustache.js":5,"../element/Simple.js":12,"./getFromCommonApi.js":17}],20:[function(_dereq_,module,exports){
'use strict';

var Q = _dereq_('../../bower_components/q/q.js'),
	IframeElement = _dereq_('../element/Iframe.js'),
	utils = _dereq_('../utils.js');

module.exports = function(collage, options){
	var width = options.width || 500,
		height = options.height || 500;

	var iframe = document.createElement('iframe');
	iframe.src = options.url;

	var element = utils.attachIframeToCollage(collage, iframe, width, height);

	return Q.when(new IframeElement(element));
};

},{"../../bower_components/q/q.js":6,"../element/Iframe.js":11,"../utils.js":27}],21:[function(_dereq_,module,exports){
'use strict';

var Q = _dereq_('../../bower_components/q/q.js');
var SimpleElement = _dereq_('../element/Simple.js');

var documentFragment = document.createDocumentFragment();

module.exports = function(collage, src){
	var	deferred = Q.defer(),
		img = new Image();
	
	img.src = src;

	img.onload = function(){
		// This forces FF to set the width/height
		documentFragment.appendChild(img);
		deferred.resolve(new SimpleElement(img));
	};

	img.onerror = deferred.reject.bind(deferred);

	return deferred.promise;
};
},{"../../bower_components/q/q.js":6,"../element/Simple.js":12}],22:[function(_dereq_,module,exports){
'use strict';

exports.flickr = _dereq_('./flickr.js');
exports.image = _dereq_('./image.js');
exports.youtube = _dereq_('./youtube.js');
exports.googlePlus = _dereq_('./googlePlus.js');
exports.googleNews = _dereq_('./googleNews.js');
exports.nyTimes = _dereq_('./nyTimes.js');
exports.twitter = _dereq_('./twitter.js');
exports.facebook = _dereq_('./facebook.js');
exports.iframe = _dereq_('./iframe.js');
exports.reddit = _dereq_('./reddit.js');
},{"./facebook.js":15,"./flickr.js":16,"./googleNews.js":18,"./googlePlus.js":19,"./iframe.js":20,"./image.js":21,"./nyTimes.js":23,"./reddit.js":24,"./twitter.js":25,"./youtube.js":26}],23:[function(_dereq_,module,exports){
'use strict';

/* jshint camelcase:false */

var Q = _dereq_('../../bower_components/q/q.js'),
	SimpleElement = _dereq_('../element/Simple.js'),
	mustache = _dereq_('../../bower_components/mustache/mustache.js');

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

},{"../../bower_components/mustache/mustache.js":5,"../../bower_components/q/q.js":6,"../element/Simple.js":12}],24:[function(_dereq_,module,exports){
'use strict';

/* jshint camelcase:false */

var Q = _dereq_('../../bower_components/q/q.js'),
	SimpleElement = _dereq_('../element/Simple.js'),
	IframeElement = _dereq_('../element/Iframe.js'),
	utils = _dereq_('../utils.js'),
	getFromApi = _dereq_('./getFromCommonApi.js');

window.credits = window.credits || {};
var credits = window.credits.reddit = {};

var endpoint = 'http://www.reddit.com/r/all/search.json';
//var endpoint = '/r/all/search.json';

module.exports = function(collage, options){
	if(options.type === 'embed'){
		return getEmbed(collage, options);
	} else {
		return getPhotos(collage, options);
	}
};

function getEmbed(collage, options){
	utils.extend(options, defaults);
	var params = [
		'limit=' + options.limit,
		'restrict_sr=' + options.restrict_sr, 
		'sort=' + options.sort,
		't=' + options.time,
		'q=' + options.query
	];

	var iframe = document.createElement('IFRAME'),
		iframeDoc,
		iframeContent;

	var element = utils.attachIframeToCollage(collage, iframe, options.width, options.height);

	iframeDoc = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
	iframeContent = '<html><head><title></title></head><body>';
	iframeContent += '<script type="text/javascript" src="http://www.reddit.com/r/' + 
		options.subreddit + '/search.embed?' + params.join('&').replace(' ', '%20') + '"></script>';
	iframeContent += '</body></html>';
	
	iframeDoc.open();
	iframeDoc.write(iframeContent);
	iframeDoc.close();
	
	return Q.when(new IframeElement(element));
}

var defaults = {
	limit: '20',
	subreddit: 'all',
	restrict_sr: 'false',
	sort: 'top',
	time: 'all',
	nsfw: 'false',
	minComments: 0,
	width: 500,
	height:600,
	minScore: 0
};

function getPhotos(collage, options){
	var deferred = Q.defer(),
		params;
	
	if(typeof options === 'string') options = {tags: options};
	utils.extend(options, defaults);

	params = [
		'limit=' + options.limit,
		'restrict_sr=' + options.restrict_sr, 
		'sort=' + options.sort,
		't=' + options.time,
		'q=' + options.query
	];
	
	getFromApi(endpoint, 'jsonp', params).then(function(response){
		var elements = [],
			photos = response.data && response.data.children || [],
			waiting;

		photos = photos.filter(function(item){
			item = item.data;

			if(	item.score < options.minScore || 
				item.num_comments < options.minComments ||
				(!~item.url.indexOf('.jpg'))){
				return false;	
			}

			return true;
		});

		waiting = photos.length;
		photos.forEach(function(item){
			item = item.data;
			
			credits[item.author] = 'http://www.reddit.com' + item.permalink;
			
			loadImage(item.url).then(function(element){
				var anchor = document.createElement('a');
				anchor.href = 'http://www.reddit.com' + item.permalink;
				anchor.width = element.width;
				anchor.height = element.height;
				anchor.target = '_blank';
				anchor.style.display = 'block';
				anchor.appendChild(element);
				
				elements.push(SimpleElement.create(anchor));

				if(--waiting === 0) deferred.resolve(elements);
			}, function(){
				if(--waiting === 0) deferred.resolve(elements);
			});
		});
	});

	return deferred.promise;
}

var documentFragment = document.createDocumentFragment();
function loadImage(src){
	var	deferred = Q.defer(),
		img = new Image();
	
	img.src = src;

	img.onload = function(){
		// This forces FF to set the width/height
		documentFragment.appendChild(img);
		deferred.resolve(img);
	};

	img.onerror = deferred.reject.bind(deferred);

	return deferred.promise;
}
},{"../../bower_components/q/q.js":6,"../element/Iframe.js":11,"../element/Simple.js":12,"../utils.js":27,"./getFromCommonApi.js":17}],25:[function(_dereq_,module,exports){
'use strict';
/* globals twttr */
/* jshint camelcase:false */

// This uses an undocumented twitter api (twttr.widget.createTweet) so it might break

var Q = _dereq_('../../bower_components/q/q.js'),
	getFromApi = _dereq_('./getFromCommonApi.js'),	
	IframeElement = _dereq_('../element/Iframe.js');

var TIMEOUT = 1000 * 10;

window.credits = window.credits || {};
var credits = window.credits.twitter = {};

// options should have container and query
module.exports = function(collage, options){
	var container = collage.element;

	if(options.query){
		return queryTweets(options.query).then(function(tweetIds){
			return loadTweets(tweetIds, container, collage);
		});	
	} else if(options.ids) {
		return loadTweets(options.ids, container, collage);
	} else if(options.id){
		return loadTweets([options.id], container, collage).then(function(elements){
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
			waitingForResize = [],
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
				if(element.height !== '0'  && element.width !== '0'){
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

		function handleElement(element){
			if(timedOut) return;

			var iframeWindow =  'contentWindow' in element? element.contentWindow : element.contentDocument.defaultView;
			
			var onMouseMoveCallback = iframeWindow.onmousemove;
			
			// Iframes capture all events, this allows us to bubble the event
			// up to this window's scope
			iframeWindow.onmousemove = function(e){
				if(onMouseMoveCallback) onMouseMoveCallback(e);
				var evt = document.createEvent('MouseEvents'),
					boundingClientRect = element.getBoundingClientRect();

				evt.initMouseEvent(	'mousemove', 
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
		}

		while(index--){
			twttr.widgets.createTweet(ids[index], container, handleElement);
		}

		return deferred.promise;
	};
}());

var queryTweets = (function(){
	var endpoint = 'http://search.twitter.com/search.json';
	//var endpoint = '/search.json';

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

				credits[item.from_user] = 'http://twitter.com/' + item.from_user;

				tweetIds.push(item.id_str);
			});

			return tweetIds;
		});
	};
}());
},{"../../bower_components/q/q.js":6,"../element/Iframe.js":11,"./getFromCommonApi.js":17}],26:[function(_dereq_,module,exports){
'use strict';
/* globals YT */

var Q = _dereq_('../../bower_components/q/q.js');
var VideoElement = _dereq_('../element/Video.js');
var getFromApi = _dereq_('./getFromCommonApi.js');
var utils = _dereq_('../utils.js');
var TIMEOUT = 10 * 1000;

window.credits = window.credits || {};
var credits = window.credits.youtube = {};

module.exports = function(collage, options){
	if(options.query){
		return queryVideos(options).then(function(videoIds){
			options.videoIds = videoIds;
			return loadVideos(collage, options);
		});
	}

	if(options.videoId){
		options.videoIds = [options.videoId];

		return loadVideos(collage, options).then(function(elements){
			return elements[0];
		});
	} else if(options.videoIds){
		return loadVideos(collage, options);	
	}
};

var defaults = {
	duration: 'short',
	key: 'AIzaSyAZw0kviWeCOidthcZAYs5oCZ0k8DsOuUk'
};

var queryVideos = (function(){
	var endpoint = 'https://www.googleapis.com/youtube/v3/search';
	//var endpoint = 'https://d3ggoqbhpexke2.cloudfront.net/youtube/v3/search';

	return function(options){
		utils.extend(options, defaults);

		var params = [
				'part=id,snippet',
				'videoDuration=' + options.duration,
				'type=video',
				'videoEmbeddable=true',
				'videoSyndicated=true',
				'key=' + options.key,
				'q=' + encodeURIComponent(options.query)
			];
		
		return getFromApi(endpoint, params).then(function(response){
			var videoIds = [];

			response.items.forEach(function(item){
				credits[item.snippet.channelTitle] = 'http://youtube.com/' + item.snippet.channelTitle;
				videoIds.push(item.id.videoId);
			});

			return videoIds;
		});
	};
}());

var loadVideos = (function(){
	return function(collage, options){
		if(!Array.isArray(options.videoIds)) return;
		
		var index = options.videoIds.length,
			deferred = Q.defer(),
			elements = [],
			videoOptions,
			timedOut = false,
			timeout = setTimeout(function(){
				timedOut = true;
				deferred.resolve(elements);
			}, TIMEOUT);

		options.callback = function(element){
			if(timedOut || !element) return;
			elements.push(element);

			if(elements.length === options.videoIds.length){
				clearTimeout(timeout);
				deferred.resolve(elements);
			}
		};

		while(index--){
			videoOptions = Object.create(options);
			videoOptions.videoId = options.videoIds[index];
			loadVideo(collage, videoOptions);
		}

		return deferred.promise;
	};
}());

var isiOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

var loadVideo = (function(){
	var playerIdCounter = 0;
	return function(collage, options){
		var videoId = options.videoId,
			width = options.width || 1060,
			height = options.height || 650;

		var playerId = 'player' + (playerIdCounter++);

		var element = document.createElement('div');
		element.width = width;
		element.height = height;
		element.className = 'youtube-video';
		
		if(isiOS) element.className += ' hide-video-mask';

		element.innerHTML = '<div id="' + playerId + '"></div><div class="video-mask"></div>';
		collage.element.appendChild(element);
		
		var videoElement;

		new YT.Player(playerId, {
			height: height,
			width: width,
			playerVars: { 
				controls: 0, 
				html5: 1,
				start: (options.startTime || 0)
			},
			videoId: videoId,
			events: {
				onReady: function(e){
					var playerObj = e.target;
					videoElement = VideoElement.create(element, playerObj, {
						continuousPlay: options.continuousPlay,
						autoplay: options.autoplay,
						loop: options.loop
					});
					
					if(isiOS){
						videoElement.on('playing', function(){
							element.className = element.className.replace(' hide-video-mask', '');
						});

						videoElement.on('paused', function(){
							element.className += ' hide-video-mask';
						});
					}

					playerObj.pauseVideo();
					if(options.continuousPlay){
						playerObj.unMute();
						playerObj.setVolume(100);
					}

					if(options.mute){
						playerObj.mute();
						playerObj.setVolume(0);
					}
					
					if(options.callback) options.callback(videoElement);
				},
				onError: function(){
				}
			}
		});
	};
}());

},{"../../bower_components/q/q.js":6,"../element/Video.js":13,"../utils.js":27,"./getFromCommonApi.js":17}],27:[function(_dereq_,module,exports){
'use strict';

exports.extend = function(destination){
	var sources = arguments.length,
		index = 1,
		source,
		key;

	for(; index < sources; index++){
		source = arguments[index];
		for(key in source){
			if(source.hasOwnProperty(key) && !(key in destination)){
				destination[key] = source[key];
			}
		}
	}
};

exports.attachIframeToCollage = function(collage, iframe, width, height){
	var container = document.createElement('div');
	container.className='iframe-container';
	
	var overflowWrapper = document.createElement('div');
	overflowWrapper.className = 'iframe-overflow-wrapper';
	overflowWrapper.style.width = width + 'px';
	overflowWrapper.style.height = height + 'px';
	container.appendChild(overflowWrapper);

	iframe.style.width = width + 'px';
	iframe.style.height = height + 'px';
	overflowWrapper.appendChild(iframe);

	var mask = document.createElement('div');
	mask.className = 'iframe-mask';
	container.appendChild(mask);

	var hasFocus = false;
	mask.addEventListener('click', function(){
		hasFocus = true;
		container.className += ' in-focus';
		collage.pause(0.4);
	});

	mask.addEventListener('mouseover', function(){
		if(!hasFocus) return;
		hasFocus = false;
		container.className = container.className.replace(' in-focus', '');
		collage.resume(0.4);
	});

	collage.element.appendChild(container);
	
	return container;
};


exports.requestAnimationFrame = window.requestAnimationFrame || 
								window.mozRequestAnimationFrame ||
                              	window.webkitRequestAnimationFrame || 
                              	window.msRequestAnimationFrame || 
                              	function(cb){return setTimeout(cb, 15);};

exports.cancelAnimationFrame = 	window.cancelAnimationFrame || 
								window.mozCancelAnimationFrame ||
                              	window.webkitCancelAnimationFrame || 
                              	window.msCancelAnimationFrame || 
                              	function(timeout){return clearTimeout(timeout);};

exports.requestFullscreen = document.documentElement.requestFullscreen ||
							document.documentElement.mozRequestFullScreen ||
							document.documentElement.webkitRequestFullscreen ||
							function(){};

var bodyStyle = document.body.style;	
exports.transitionAttribute =	(bodyStyle.msTransition !== void 0) && 'msTransition' ||
								(bodyStyle.webkitTransition !== void 0) && 'webkitTransition' ||
								(bodyStyle.MozTransition !== void 0) && 'MozTransition' || 
								(bodyStyle.transition !== void 0) && 'transition';

},{}]},{},[9])

(9)
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9vemFuL2NvZGUvYm9pbGVycGxhdGUtZ3VscC9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL296YW4vY29kZS9ib2lsZXJwbGF0ZS1ndWxwL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCIvVXNlcnMvb3phbi9jb2RlL2NvbGxhZ2UvYm93ZXJfY29tcG9uZW50cy9ldmVudEVtaXR0ZXIvRXZlbnRFbWl0dGVyLmpzIiwiL1VzZXJzL296YW4vY29kZS9naWFudC1xdWFkdHJlZS9ub2RlX21vZHVsZXMvYm9pbGVycGxhdGUtZ3VscC9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL296YW4vY29kZS9jb2xsYWdlL2Jvd2VyX2NvbXBvbmVudHMvbXVzdGFjaGUvbXVzdGFjaGUuanMiLCIvVXNlcnMvb3phbi9jb2RlL2NvbGxhZ2UvYm93ZXJfY29tcG9uZW50cy9xL3EuanMiLCIvVXNlcnMvb3phbi9jb2RlL2NvbGxhZ2Uvc3JjL0JvdW5kaW5nQm94LmpzIiwiL1VzZXJzL296YW4vY29kZS9jb2xsYWdlL3NyYy9UYWcuanMiLCIvVXNlcnMvb3phbi9jb2RlL2NvbGxhZ2Uvc3JjL2NvbGxhZ2UuanMiLCIvVXNlcnMvb3phbi9jb2RlL2NvbGxhZ2Uvc3JjL2VsZW1lbnQvRWxlbWVudC5qcyIsIi9Vc2Vycy9vemFuL2NvZGUvY29sbGFnZS9zcmMvZWxlbWVudC9JZnJhbWUuanMiLCIvVXNlcnMvb3phbi9jb2RlL2NvbGxhZ2Uvc3JjL2VsZW1lbnQvU2ltcGxlLmpzIiwiL1VzZXJzL296YW4vY29kZS9jb2xsYWdlL3NyYy9lbGVtZW50L1ZpZGVvLmpzIiwiL1VzZXJzL296YW4vY29kZS9jb2xsYWdlL3NyYy9lbGVtZW50L2luZGV4LmpzIiwiL1VzZXJzL296YW4vY29kZS9jb2xsYWdlL3NyYy9sb2FkZXIvZmFjZWJvb2suanMiLCIvVXNlcnMvb3phbi9jb2RlL2NvbGxhZ2Uvc3JjL2xvYWRlci9mbGlja3IuanMiLCIvVXNlcnMvb3phbi9jb2RlL2NvbGxhZ2Uvc3JjL2xvYWRlci9nZXRGcm9tQ29tbW9uQXBpLmpzIiwiL1VzZXJzL296YW4vY29kZS9jb2xsYWdlL3NyYy9sb2FkZXIvZ29vZ2xlTmV3cy5qcyIsIi9Vc2Vycy9vemFuL2NvZGUvY29sbGFnZS9zcmMvbG9hZGVyL2dvb2dsZVBsdXMuanMiLCIvVXNlcnMvb3phbi9jb2RlL2NvbGxhZ2Uvc3JjL2xvYWRlci9pZnJhbWUuanMiLCIvVXNlcnMvb3phbi9jb2RlL2NvbGxhZ2Uvc3JjL2xvYWRlci9pbWFnZS5qcyIsIi9Vc2Vycy9vemFuL2NvZGUvY29sbGFnZS9zcmMvbG9hZGVyL2luZGV4LmpzIiwiL1VzZXJzL296YW4vY29kZS9jb2xsYWdlL3NyYy9sb2FkZXIvbnlUaW1lcy5qcyIsIi9Vc2Vycy9vemFuL2NvZGUvY29sbGFnZS9zcmMvbG9hZGVyL3JlZGRpdC5qcyIsIi9Vc2Vycy9vemFuL2NvZGUvY29sbGFnZS9zcmMvbG9hZGVyL3R3aXR0ZXIuanMiLCIvVXNlcnMvb3phbi9jb2RlL2NvbGxhZ2Uvc3JjL2xvYWRlci95b3V0dWJlLmpzIiwiL1VzZXJzL296YW4vY29kZS9jb2xsYWdlL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBRC9EQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUF6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FBM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBeGRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBMWdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBMVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FFakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDelRBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBelNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ25SQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbmlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNvbGxhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lclxuICAgIDtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KSgpO1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuIiwiLyoqXG4gKiBFdmVudEVtaXR0ZXIgdjQuMC41IC0gZ2l0LmlvL2VlXG4gKiBPbGl2ZXIgQ2FsZHdlbGxcbiAqIE1JVCBsaWNlbnNlXG4gKiBAcHJlc2VydmVcbiAqL1xuXG47KGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiAgICAvLyBKU0hpbnQgY29uZmlnIC0gaHR0cDovL3d3dy5qc2hpbnQuY29tL1xuICAgIC8qanNoaW50IGxheGNvbW1hOnRydWUqL1xuICAgIC8qZ2xvYmFsIGRlZmluZTp0cnVlKi9cblxuICAgIC8vIFBsYWNlIHRoZSBzY3JpcHQgaW4gc3RyaWN0IG1vZGVcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvKipcbiAgICAgKiBDbGFzcyBmb3IgbWFuYWdpbmcgZXZlbnRzLlxuICAgICAqIENhbiBiZSBleHRlbmRlZCB0byBwcm92aWRlIGV2ZW50IGZ1bmN0aW9uYWxpdHkgaW4gb3RoZXIgY2xhc3Nlcy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBNYW5hZ2VzIGV2ZW50IHJlZ2lzdGVyaW5nIGFuZCBlbWl0dGluZy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBFdmVudEVtaXR0ZXIoKXt9XG5cbiAgICAvLyBTaG9ydGN1dHMgdG8gaW1wcm92ZSBzcGVlZCBhbmQgc2l6ZVxuXG4gICAgICAgIC8vIEVhc3kgYWNjZXNzIHRvIHRoZSBwcm90b3R5cGVcbiAgICB2YXIgcHJvdG8gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlXG5cbiAgICAgIC8vIEV4aXN0ZW5jZSBvZiBhIG5hdGl2ZSBpbmRleE9mXG4gICAgICAsIG5hdGl2ZUluZGV4T2YgPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA/IHRydWUgOiBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEZpbmRzIHRoZSBpbmRleCBvZiB0aGUgbGlzdGVuZXIgZm9yIHRoZSBldmVudCBpbiBpdCdzIHN0b3JhZ2UgYXJyYXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIE1ldGhvZCB0byBsb29rIGZvci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IGxpc3RlbmVycyBBcnJheSBvZiBsaXN0ZW5lcnMgdG8gc2VhcmNoIHRocm91Z2guXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBJbmRleCBvZiB0aGUgc3BlY2lmaWVkIGxpc3RlbmVyLCAtMSBpZiBub3QgZm91bmRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbmRleE9mTGlzdGVuZXIobGlzdGVuZXIsIGxpc3RlbmVycykge1xuICAgICAgICAvLyBSZXR1cm4gdGhlIGluZGV4IHZpYSB0aGUgbmF0aXZlIG1ldGhvZCBpZiBwb3NzaWJsZVxuICAgICAgICBpZihuYXRpdmVJbmRleE9mKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlcmUgaXMgbm8gbmF0aXZlIG1ldGhvZFxuICAgICAgICAvLyBVc2UgYSBtYW51YWwgbG9vcCB0byBmaW5kIHRoZSBpbmRleFxuICAgICAgICB2YXIgaSA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgICAgIHdoaWxlKGktLSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGxpc3RlbmVyIG1hdGNoZXMsIHJldHVybiBpdCdzIGluZGV4XG4gICAgICAgICAgICBpZihsaXN0ZW5lcnNbaV0gPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZWZhdWx0IHRvIHJldHVybmluZyAtMVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmV0Y2hlcyB0aGUgZXZlbnRzIG9iamVjdCBhbmQgY3JlYXRlcyBvbmUgaWYgcmVxdWlyZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBldmVudHMgc3RvcmFnZSBvYmplY3QuXG4gICAgICovXG4gICAgcHJvdG8uX2dldEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzIHx8ICh0aGlzLl9ldmVudHMgPSB7fSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxpc3RlbmVyIGFycmF5IGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqIFdpbGwgaW5pdGlhbGlzZSB0aGUgZXZlbnQgb2JqZWN0IGFuZCBsaXN0ZW5lciBhcnJheXMgaWYgcmVxdWlyZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJldHVybiB0aGUgbGlzdGVuZXJzIGZyb20uXG4gICAgICogQHJldHVybiB7RnVuY3Rpb25bXX0gQWxsIGxpc3RlbmVyIGZ1bmN0aW9ucyBmb3IgdGhlIGV2ZW50LlxuICAgICAqIEBkb2NcbiAgICAgKi9cbiAgICBwcm90by5nZXRMaXN0ZW5lcnMgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgc2hvcnRjdXQgdG8gdGhlIHN0b3JhZ2Ugb2JqZWN0XG4gICAgICAgIC8vIEluaXRpYWxpc2UgaXQgaWYgaXQgZG9lcyBub3QgZXhpc3RzIHlldFxuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZ2V0RXZlbnRzKCk7XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBsaXN0ZW5lciBhcnJheVxuICAgICAgICAvLyBJbml0aWFsaXNlIGl0IGlmIGl0IGRvZXMgbm90IGV4aXN0XG4gICAgICAgIHJldHVybiBldmVudHNbZXZ0XSB8fCAoZXZlbnRzW2V2dF0gPSBbXSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciBmdW5jdGlvbiB0byB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqIFRoZSBsaXN0ZW5lciB3aWxsIG5vdCBiZSBhZGRlZCBpZiBpdCBpcyBhIGR1cGxpY2F0ZS5cbiAgICAgKiBJZiB0aGUgbGlzdGVuZXIgcmV0dXJucyB0cnVlIHRoZW4gaXQgd2lsbCBiZSByZW1vdmVkIGFmdGVyIGl0IGlzIGNhbGxlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gYXR0YWNoIHRoZSBsaXN0ZW5lciB0by5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgY2FsbGluZy5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKiBAZG9jXG4gICAgICovXG4gICAgcHJvdG8uYWRkTGlzdGVuZXIgPSBmdW5jdGlvbihldnQsIGxpc3RlbmVyKSB7XG4gICAgICAgIC8vIEZldGNoIHRoZSBsaXN0ZW5lcnNcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzKGV2dCk7XG5cbiAgICAgICAgLy8gUHVzaCB0aGUgbGlzdGVuZXIgaW50byB0aGUgYXJyYXkgaWYgaXQgaXMgbm90IGFscmVhZHkgdGhlcmVcbiAgICAgICAgaWYoaW5kZXhPZkxpc3RlbmVyKGxpc3RlbmVyLCBsaXN0ZW5lcnMpID09PSAtMSkge1xuICAgICAgICAgICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgdG8gYWxsb3cgY2hhaW5pbmdcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIGFkZExpc3RlbmVyXG4gICAgICogQGRvY1xuICAgICAqL1xuICAgIHByb3RvLm9uID0gcHJvdG8uYWRkTGlzdGVuZXI7XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgbGlzdGVuZXIgZnVuY3Rpb24gZnJvbSB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgTWV0aG9kIHRvIHJlbW92ZSBmcm9tIHRoZSBldmVudC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKiBAZG9jXG4gICAgICovXG4gICAgcHJvdG8ucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbihldnQsIGxpc3RlbmVyKSB7XG4gICAgICAgIC8vIEZldGNoIHRoZSBsaXN0ZW5lcnNcbiAgICAgICAgLy8gQW5kIGdldCB0aGUgaW5kZXggb2YgdGhlIGxpc3RlbmVyIGluIHRoZSBhcnJheVxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnMoZXZ0KVxuICAgICAgICAgICwgaW5kZXggPSBpbmRleE9mTGlzdGVuZXIobGlzdGVuZXIsIGxpc3RlbmVycyk7XG5cbiAgICAgICAgLy8gSWYgdGhlIGxpc3RlbmVyIHdhcyBmb3VuZCB0aGVuIHJlbW92ZSBpdFxuICAgICAgICBpZihpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gbW9yZSBsaXN0ZW5lcnMgaW4gdGhpcyBhcnJheSB0aGVuIHJlbW92ZSBpdFxuICAgICAgICAgICAgaWYobGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnQoZXZ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIHRvIGFsbG93IGNoYWluaW5nXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiByZW1vdmVMaXN0ZW5lclxuICAgICAqIEBkb2NcbiAgICAgKi9cbiAgICBwcm90by5vZmYgPSBwcm90by5yZW1vdmVMaXN0ZW5lcjtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgbGlzdGVuZXJzIGluIGJ1bGsgdXNpbmcgdGhlIG1hbmlwdWxhdGVMaXN0ZW5lcnMgbWV0aG9kLlxuICAgICAqIElmIHlvdSBwYXNzIGFuIG9iamVjdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHlvdSBjYW4gYWRkIHRvIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBUaGUgb2JqZWN0IHNob3VsZCBjb250YWluIGtleSB2YWx1ZSBwYWlycyBvZiBldmVudHMgYW5kIGxpc3RlbmVycyBvciBsaXN0ZW5lciBhcnJheXMuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYW4gZXZlbnQgbmFtZSBhbmQgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGJlIGFkZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBldnQgQW4gZXZlbnQgbmFtZSBpZiB5b3Ugd2lsbCBwYXNzIGFuIGFycmF5IG9mIGxpc3RlbmVycyBuZXh0LiBBbiBvYmplY3QgaWYgeW91IHdpc2ggdG8gYWRkIHRvIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gW2xpc3RlbmVyc10gQW4gb3B0aW9uYWwgYXJyYXkgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRvIGFkZC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKiBAZG9jXG4gICAgICovXG4gICAgcHJvdG8uYWRkTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZ0LCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgLy8gUGFzcyB0aHJvdWdoIHRvIG1hbmlwdWxhdGVMaXN0ZW5lcnNcbiAgICAgICAgcmV0dXJuIHRoaXMubWFuaXB1bGF0ZUxpc3RlbmVycyhmYWxzZSwgZXZ0LCBsaXN0ZW5lcnMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGxpc3RlbmVycyBpbiBidWxrIHVzaW5nIHRoZSBtYW5pcHVsYXRlTGlzdGVuZXJzIG1ldGhvZC5cbiAgICAgKiBJZiB5b3UgcGFzcyBhbiBvYmplY3QgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB5b3UgY2FuIHJlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBUaGUgb2JqZWN0IHNob3VsZCBjb250YWluIGtleSB2YWx1ZSBwYWlycyBvZiBldmVudHMgYW5kIGxpc3RlbmVycyBvciBsaXN0ZW5lciBhcnJheXMuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYW4gZXZlbnQgbmFtZSBhbmQgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGJlIHJlbW92ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGV2dCBBbiBldmVudCBuYW1lIGlmIHlvdSB3aWxsIHBhc3MgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIG5leHQuIEFuIG9iamVjdCBpZiB5b3Ugd2lzaCB0byByZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IFtsaXN0ZW5lcnNdIEFuIG9wdGlvbmFsIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0byByZW1vdmUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICogQGRvY1xuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2dCwgbGlzdGVuZXJzKSB7XG4gICAgICAgIC8vIFBhc3MgdGhyb3VnaCB0byBtYW5pcHVsYXRlTGlzdGVuZXJzXG4gICAgICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGVMaXN0ZW5lcnModHJ1ZSwgZXZ0LCBsaXN0ZW5lcnMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFZGl0cyBsaXN0ZW5lcnMgaW4gYnVsay4gVGhlIGFkZExpc3RlbmVycyBhbmQgcmVtb3ZlTGlzdGVuZXJzIG1ldGhvZHMgYm90aCB1c2UgdGhpcyB0byBkbyB0aGVpciBqb2IuIFlvdSBzaG91bGQgcmVhbGx5IHVzZSB0aG9zZSBpbnN0ZWFkLCB0aGlzIGlzIGEgbGl0dGxlIGxvd2VyIGxldmVsLlxuICAgICAqIFRoZSBmaXJzdCBhcmd1bWVudCB3aWxsIGRldGVybWluZSBpZiB0aGUgbGlzdGVuZXJzIGFyZSByZW1vdmVkICh0cnVlKSBvciBhZGRlZCAoZmFsc2UpLlxuICAgICAqIElmIHlvdSBwYXNzIGFuIG9iamVjdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHlvdSBjYW4gYWRkL3JlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBUaGUgb2JqZWN0IHNob3VsZCBjb250YWluIGtleSB2YWx1ZSBwYWlycyBvZiBldmVudHMgYW5kIGxpc3RlbmVycyBvciBsaXN0ZW5lciBhcnJheXMuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYW4gZXZlbnQgbmFtZSBhbmQgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGJlIGFkZGVkL3JlbW92ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlbW92ZSBUcnVlIGlmIHlvdSB3YW50IHRvIHJlbW92ZSBsaXN0ZW5lcnMsIGZhbHNlIGlmIHlvdSB3YW50IHRvIGFkZC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGV2dCBBbiBldmVudCBuYW1lIGlmIHlvdSB3aWxsIHBhc3MgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIG5leHQuIEFuIG9iamVjdCBpZiB5b3Ugd2lzaCB0byBhZGQvcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBbbGlzdGVuZXJzXSBBbiBvcHRpb25hbCBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdG8gYWRkL3JlbW92ZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKiBAZG9jXG4gICAgICovXG4gICAgcHJvdG8ubWFuaXB1bGF0ZUxpc3RlbmVycyA9IGZ1bmN0aW9uKHJlbW92ZSwgZXZ0LCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgLy8gSW5pdGlhbGlzZSBhbnkgcmVxdWlyZWQgdmFyaWFibGVzXG4gICAgICAgIHZhciBpXG4gICAgICAgICAgLCB2YWx1ZVxuICAgICAgICAgICwgc2luZ2xlID0gcmVtb3ZlID8gdGhpcy5yZW1vdmVMaXN0ZW5lciA6IHRoaXMuYWRkTGlzdGVuZXJcbiAgICAgICAgICAsIG11bHRpcGxlID0gcmVtb3ZlID8gdGhpcy5yZW1vdmVMaXN0ZW5lcnMgOiB0aGlzLmFkZExpc3RlbmVycztcblxuICAgICAgICAvLyBJZiBldnQgaXMgYW4gb2JqZWN0IHRoZW4gcGFzcyBlYWNoIG9mIGl0J3MgcHJvcGVydGllcyB0byB0aGlzIG1ldGhvZFxuICAgICAgICBpZih0eXBlb2YgZXZ0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZm9yKGkgaW4gZXZ0KSB7XG4gICAgICAgICAgICAgICAgaWYoZXZ0Lmhhc093blByb3BlcnR5KGkpICYmICh2YWx1ZSA9IGV2dFtpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGFzcyB0aGUgc2luZ2xlIGxpc3RlbmVyIHN0cmFpZ2h0IHRocm91Z2ggdG8gdGhlIHNpbmd1bGFyIG1ldGhvZFxuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpbmdsZS5jYWxsKHRoaXMsIGksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBwYXNzIGJhY2sgdG8gdGhlIG11bHRpcGxlIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXBsZS5jYWxsKHRoaXMsIGksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFNvIGV2dCBtdXN0IGJlIGEgc3RyaW5nXG4gICAgICAgICAgICAvLyBBbmQgbGlzdGVuZXJzIG11c3QgYmUgYW4gYXJyYXkgb2YgbGlzdGVuZXJzXG4gICAgICAgICAgICAvLyBMb29wIG92ZXIgaXQgYW5kIHBhc3MgZWFjaCBvbmUgdG8gdGhlIG11bHRpcGxlIG1ldGhvZFxuICAgICAgICAgICAgaSA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZShpLS0pIHtcbiAgICAgICAgICAgICAgICBzaW5nbGUuY2FsbCh0aGlzLCBldnQsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciB0byBhbGxvdyBjaGFpbmluZ1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGZyb20gYSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogSWYgeW91IGRvIG5vdCBzcGVjaWZ5IGFuIGV2ZW50IHRoZW4gYWxsIGxpc3RlbmVycyB3aWxsIGJlIHJlbW92ZWQuXG4gICAgICogVGhhdCBtZWFucyBldmVyeSBldmVudCB3aWxsIGJlIGVtcHRpZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2V2dF0gT3B0aW9uYWwgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yLiBXaWxsIHJlbW92ZSBmcm9tIGV2ZXJ5IGV2ZW50IGlmIG5vdCBwYXNzZWQuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICogQGRvY1xuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgIC8vIFJlbW92ZSBkaWZmZXJlbnQgdGhpbmdzIGRlcGVuZGluZyBvbiB0aGUgc3RhdGUgb2YgZXZ0XG4gICAgICAgIGlmKGV2dCkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnRcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9nZXRFdmVudHMoKVtldnRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgaW4gYWxsIGV2ZW50c1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50cztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIHRvIGFsbG93IGNoYWluaW5nXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyBhbiBldmVudCBvZiB5b3VyIGNob2ljZS5cbiAgICAgKiBXaGVuIGVtaXR0ZWQsIGV2ZXJ5IGxpc3RlbmVyIGF0dGFjaGVkIHRvIHRoYXQgZXZlbnQgd2lsbCBiZSBleGVjdXRlZC5cbiAgICAgKiBJZiB5b3UgcGFzcyB0aGUgb3B0aW9uYWwgYXJndW1lbnQgYXJyYXkgdGhlbiB0aG9zZSBhcmd1bWVudHMgd2lsbCBiZSBwYXNzZWQgdG8gZXZlcnkgbGlzdGVuZXIgdXBvbiBleGVjdXRpb24uXG4gICAgICogQmVjYXVzZSBpdCB1c2VzIGBhcHBseWAsIHlvdXIgYXJyYXkgb2YgYXJndW1lbnRzIHdpbGwgYmUgcGFzc2VkIGFzIGlmIHlvdSB3cm90ZSB0aGVtIG91dCBzZXBhcmF0ZWx5LlxuICAgICAqIFNvIHRoZXkgd2lsbCBub3QgYXJyaXZlIHdpdGhpbiB0aGUgYXJyYXkgb24gdGhlIG90aGVyIHNpZGUsIHRoZXkgd2lsbCBiZSBzZXBhcmF0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gZW1pdCBhbmQgZXhlY3V0ZSBsaXN0ZW5lcnMgZm9yLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFthcmdzXSBPcHRpb25hbCBhcnJheSBvZiBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIGVhY2ggbGlzdGVuZXIuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICogQGRvY1xuICAgICAqL1xuICAgIHByb3RvLmVtaXRFdmVudCA9IGZ1bmN0aW9uKGV2dCwgYXJncykge1xuICAgICAgICAvLyBHZXQgdGhlIGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50XG4gICAgICAgIC8vIEFsc28gaW5pdGlhbGlzZSBhbnkgb3RoZXIgcmVxdWlyZWQgdmFyaWFibGVzXG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVycyhldnQpXG4gICAgICAgICAgLCBpID0gbGlzdGVuZXJzLmxlbmd0aFxuICAgICAgICAgICwgcmVzcG9uc2U7XG5cbiAgICAgICAgLy8gTG9vcCBvdmVyIGFsbCBsaXN0ZW5lcnMgYXNzaWduZWQgdG8gdGhlIGV2ZW50XG4gICAgICAgIC8vIEFwcGx5IHRoZSBhcmd1bWVudHMgYXJyYXkgdG8gZWFjaCBsaXN0ZW5lciBmdW5jdGlvblxuICAgICAgICB3aGlsZShpLS0pIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBsaXN0ZW5lciByZXR1cm5zIHRydWUgdGhlbiBpdCBzaGFsbCBiZSByZW1vdmVkIGZyb20gdGhlIGV2ZW50XG4gICAgICAgICAgICAvLyBUaGUgZnVuY3Rpb24gaXMgZXhlY3V0ZWQgZWl0aGVyIHdpdGggYSBiYXNpYyBjYWxsIG9yIGFuIGFwcGx5IGlmIHRoZXJlIGlzIGFuIGFyZ3MgYXJyYXlcbiAgICAgICAgICAgIHJlc3BvbnNlID0gYXJncyA/IGxpc3RlbmVyc1tpXS5hcHBseShudWxsLCBhcmdzKSA6IGxpc3RlbmVyc1tpXSgpO1xuICAgICAgICAgICAgaWYocmVzcG9uc2UgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIHRvIGFsbG93IGNoYWluaW5nXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiBlbWl0RXZlbnRcbiAgICAgKiBAZG9jXG4gICAgICovXG4gICAgcHJvdG8udHJpZ2dlciA9IHByb3RvLmVtaXRFdmVudDtcblxuICAgIC8qKlxuICAgICAqIFN1YnRseSBkaWZmZXJlbnQgZnJvbSBlbWl0RXZlbnQgaW4gdGhhdCBpdCB3aWxsIHBhc3MgaXRzIGFyZ3VtZW50cyBvbiB0byB0aGUgbGlzdGVuZXJzLCBhc1xuICAgICAqIG9wcG9zZWQgdG8gdGFraW5nIGEgc2luZ2xlIGFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIG9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBlbWl0IGFuZCBleGVjdXRlIGxpc3RlbmVycyBmb3IuXG4gICAgICogQHBhcmFtIHsuLi4qfSBPcHRpb25hbCBhZGRpdGlvbmFsIGFyZ3VtZW50cyB0byBiZSBwYXNzZWQgdG8gZWFjaCBsaXN0ZW5lci5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKiBAZG9jXG4gICAgICovXG4gICAgcHJvdG8uZW1pdCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIHJldHVybiB0aGlzLmVtaXRFdmVudChldnQsIGFyZ3MpO1xuICAgIH07XG5cbiAgICAvLyBFeHBvc2UgdGhlIGNsYXNzIGVpdGhlciB2aWEgQU1EIG9yIHRoZSBnbG9iYWwgb2JqZWN0XG4gICAgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBFdmVudEVtaXR0ZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG4gICAgfVxufSh0aGlzKSk7IiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiFcbiAqIG11c3RhY2hlLmpzIC0gTG9naWMtbGVzcyB7e211c3RhY2hlfX0gdGVtcGxhdGVzIHdpdGggSmF2YVNjcmlwdFxuICogaHR0cDovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qc1xuICovXG5cbi8qZ2xvYmFsIGRlZmluZTogZmFsc2UqL1xuXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiICYmIGV4cG9ydHMpIHtcbiAgICBmYWN0b3J5KGV4cG9ydHMpOyAvLyBDb21tb25KU1xuICB9IGVsc2Uge1xuICAgIHZhciBtdXN0YWNoZSA9IHt9O1xuICAgIGZhY3RvcnkobXVzdGFjaGUpO1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgZGVmaW5lKG11c3RhY2hlKTsgLy8gQU1EXG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3QuTXVzdGFjaGUgPSBtdXN0YWNoZTsgLy8gPHNjcmlwdD5cbiAgICB9XG4gIH1cbn0odGhpcywgZnVuY3Rpb24gKG11c3RhY2hlKSB7XG5cbiAgdmFyIHdoaXRlUmUgPSAvXFxzKi87XG4gIHZhciBzcGFjZVJlID0gL1xccysvO1xuICB2YXIgbm9uU3BhY2VSZSA9IC9cXFMvO1xuICB2YXIgZXFSZSA9IC9cXHMqPS87XG4gIHZhciBjdXJseVJlID0gL1xccypcXH0vO1xuICB2YXIgdGFnUmUgPSAvI3xcXF58XFwvfD58XFx7fCZ8PXwhLztcblxuICAvLyBXb3JrYXJvdW5kIGZvciBodHRwczovL2lzc3Vlcy5hcGFjaGUub3JnL2ppcmEvYnJvd3NlL0NPVUNIREItNTc3XG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMTg5XG4gIHZhciBSZWdFeHBfdGVzdCA9IFJlZ0V4cC5wcm90b3R5cGUudGVzdDtcbiAgZnVuY3Rpb24gdGVzdFJlZ0V4cChyZSwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIFJlZ0V4cF90ZXN0LmNhbGwocmUsIHN0cmluZyk7XG4gIH1cblxuICBmdW5jdGlvbiBpc1doaXRlc3BhY2Uoc3RyaW5nKSB7XG4gICAgcmV0dXJuICF0ZXN0UmVnRXhwKG5vblNwYWNlUmUsIHN0cmluZyk7XG4gIH1cblxuICB2YXIgT2JqZWN0X3RvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0X3RvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnZnVuY3Rpb24nO1xuICB9XG5cbiAgZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvW1xcLVxcW1xcXXt9KCkqKz8uLFxcXFxcXF4kfCNcXHNdL2csIFwiXFxcXCQmXCIpO1xuICB9XG5cbiAgdmFyIGVudGl0eU1hcCA9IHtcbiAgICBcIiZcIjogXCImYW1wO1wiLFxuICAgIFwiPFwiOiBcIiZsdDtcIixcbiAgICBcIj5cIjogXCImZ3Q7XCIsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgXCInXCI6ICcmIzM5OycsXG4gICAgXCIvXCI6ICcmI3gyRjsnXG4gIH07XG5cbiAgZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpIHtcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvWyY8PlwiJ1xcL10vZywgZnVuY3Rpb24gKHMpIHtcbiAgICAgIHJldHVybiBlbnRpdHlNYXBbc107XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBTY2FubmVyKHN0cmluZykge1xuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xuICAgIHRoaXMudGFpbCA9IHN0cmluZztcbiAgICB0aGlzLnBvcyA9IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHRhaWwgaXMgZW1wdHkgKGVuZCBvZiBzdHJpbmcpLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuZW9zID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnRhaWwgPT09IFwiXCI7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRyaWVzIHRvIG1hdGNoIHRoZSBnaXZlbiByZWd1bGFyIGV4cHJlc3Npb24gYXQgdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAqIFJldHVybnMgdGhlIG1hdGNoZWQgdGV4dCBpZiBpdCBjYW4gbWF0Y2gsIHRoZSBlbXB0eSBzdHJpbmcgb3RoZXJ3aXNlLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuc2NhbiA9IGZ1bmN0aW9uIChyZSkge1xuICAgIHZhciBtYXRjaCA9IHRoaXMudGFpbC5tYXRjaChyZSk7XG5cbiAgICBpZiAobWF0Y2ggJiYgbWF0Y2guaW5kZXggPT09IDApIHtcbiAgICAgIHZhciBzdHJpbmcgPSBtYXRjaFswXTtcbiAgICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoc3RyaW5nLmxlbmd0aCk7XG4gICAgICB0aGlzLnBvcyArPSBzdHJpbmcubGVuZ3RoO1xuICAgICAgcmV0dXJuIHN0cmluZztcbiAgICB9XG5cbiAgICByZXR1cm4gXCJcIjtcbiAgfTtcblxuICAvKipcbiAgICogU2tpcHMgYWxsIHRleHQgdW50aWwgdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBjYW4gYmUgbWF0Y2hlZC4gUmV0dXJuc1xuICAgKiB0aGUgc2tpcHBlZCBzdHJpbmcsIHdoaWNoIGlzIHRoZSBlbnRpcmUgdGFpbCBpZiBubyBtYXRjaCBjYW4gYmUgbWFkZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW5VbnRpbCA9IGZ1bmN0aW9uIChyZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudGFpbC5zZWFyY2gocmUpLCBtYXRjaDtcblxuICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICBjYXNlIC0xOlxuICAgICAgbWF0Y2ggPSB0aGlzLnRhaWw7XG4gICAgICB0aGlzLnRhaWwgPSBcIlwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAwOlxuICAgICAgbWF0Y2ggPSBcIlwiO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIG1hdGNoID0gdGhpcy50YWlsLnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwuc3Vic3RyaW5nKGluZGV4KTtcbiAgICB9XG5cbiAgICB0aGlzLnBvcyArPSBtYXRjaC5sZW5ndGg7XG5cbiAgICByZXR1cm4gbWF0Y2g7XG4gIH07XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh2aWV3LCBwYXJlbnQpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3ID09IG51bGwgPyB7fSA6IHZpZXc7XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5fY2FjaGUgPSB7ICcuJzogdGhpcy52aWV3IH07XG4gIH1cblxuICBDb250ZXh0Lm1ha2UgPSBmdW5jdGlvbiAodmlldykge1xuICAgIHJldHVybiAodmlldyBpbnN0YW5jZW9mIENvbnRleHQpID8gdmlldyA6IG5ldyBDb250ZXh0KHZpZXcpO1xuICB9O1xuXG4gIENvbnRleHQucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAodmlldykge1xuICAgIHJldHVybiBuZXcgQ29udGV4dCh2aWV3LCB0aGlzKTtcbiAgfTtcblxuICBDb250ZXh0LnByb3RvdHlwZS5sb29rdXAgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciB2YWx1ZTtcbiAgICBpZiAobmFtZSBpbiB0aGlzLl9jYWNoZSkge1xuICAgICAgdmFsdWUgPSB0aGlzLl9jYWNoZVtuYW1lXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuXG4gICAgICB3aGlsZSAoY29udGV4dCkge1xuICAgICAgICBpZiAobmFtZS5pbmRleE9mKCcuJykgPiAwKSB7XG4gICAgICAgICAgdmFsdWUgPSBjb250ZXh0LnZpZXc7XG5cbiAgICAgICAgICB2YXIgbmFtZXMgPSBuYW1lLnNwbGl0KCcuJyksIGkgPSAwO1xuICAgICAgICAgIHdoaWxlICh2YWx1ZSAhPSBudWxsICYmIGkgPCBuYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWVbbmFtZXNbaSsrXV07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3W25hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIGJyZWFrO1xuXG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnBhcmVudDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fY2FjaGVbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUuY2FsbCh0aGlzLnZpZXcpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBmdW5jdGlvbiBXcml0ZXIoKSB7XG4gICAgdGhpcy5jbGVhckNhY2hlKCk7XG4gIH1cblxuICBXcml0ZXIucHJvdG90eXBlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fY2FjaGUgPSB7fTtcbiAgICB0aGlzLl9wYXJ0aWFsQ2FjaGUgPSB7fTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICB2YXIgZm4gPSB0aGlzLl9jYWNoZVt0ZW1wbGF0ZV07XG5cbiAgICBpZiAoIWZuKSB7XG4gICAgICB2YXIgdG9rZW5zID0gbXVzdGFjaGUucGFyc2UodGVtcGxhdGUsIHRhZ3MpO1xuICAgICAgZm4gPSB0aGlzLl9jYWNoZVt0ZW1wbGF0ZV0gPSB0aGlzLmNvbXBpbGVUb2tlbnModG9rZW5zLCB0ZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZuO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUuY29tcGlsZVBhcnRpYWwgPSBmdW5jdGlvbiAobmFtZSwgdGVtcGxhdGUsIHRhZ3MpIHtcbiAgICB2YXIgZm4gPSB0aGlzLmNvbXBpbGUodGVtcGxhdGUsIHRhZ3MpO1xuICAgIHRoaXMuX3BhcnRpYWxDYWNoZVtuYW1lXSA9IGZuO1xuICAgIHJldHVybiBmbjtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLmdldFBhcnRpYWwgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmICghKG5hbWUgaW4gdGhpcy5fcGFydGlhbENhY2hlKSAmJiB0aGlzLl9sb2FkUGFydGlhbCkge1xuICAgICAgdGhpcy5jb21waWxlUGFydGlhbChuYW1lLCB0aGlzLl9sb2FkUGFydGlhbChuYW1lKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3BhcnRpYWxDYWNoZVtuYW1lXTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLmNvbXBpbGVUb2tlbnMgPSBmdW5jdGlvbiAodG9rZW5zLCB0ZW1wbGF0ZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24gKHZpZXcsIHBhcnRpYWxzKSB7XG4gICAgICBpZiAocGFydGlhbHMpIHtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ocGFydGlhbHMpKSB7XG4gICAgICAgICAgc2VsZi5fbG9hZFBhcnRpYWwgPSBwYXJ0aWFscztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIHBhcnRpYWxzKSB7XG4gICAgICAgICAgICBzZWxmLmNvbXBpbGVQYXJ0aWFsKG5hbWUsIHBhcnRpYWxzW25hbWVdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlbmRlclRva2Vucyh0b2tlbnMsIHNlbGYsIENvbnRleHQubWFrZSh2aWV3KSwgdGVtcGxhdGUpO1xuICAgIH07XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKSB7XG4gICAgcmV0dXJuIHRoaXMuY29tcGlsZSh0ZW1wbGF0ZSkodmlldywgcGFydGlhbHMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBMb3ctbGV2ZWwgZnVuY3Rpb24gdGhhdCByZW5kZXJzIHRoZSBnaXZlbiBgdG9rZW5zYCB1c2luZyB0aGUgZ2l2ZW4gYHdyaXRlcmBcbiAgICogYW5kIGBjb250ZXh0YC4gVGhlIGB0ZW1wbGF0ZWAgc3RyaW5nIGlzIG9ubHkgbmVlZGVkIGZvciB0ZW1wbGF0ZXMgdGhhdCB1c2VcbiAgICogaGlnaGVyLW9yZGVyIHNlY3Rpb25zIHRvIGV4dHJhY3QgdGhlIHBvcnRpb24gb2YgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIHRoYXRcbiAgICogd2FzIGNvbnRhaW5lZCBpbiB0aGF0IHNlY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiByZW5kZXJUb2tlbnModG9rZW5zLCB3cml0ZXIsIGNvbnRleHQsIHRlbXBsYXRlKSB7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIHJlbmRlciBhbiBhcnRiaXRyYXJ5IHRlbXBsYXRlXG4gICAgLy8gaW4gdGhlIGN1cnJlbnQgY29udGV4dCBieSBoaWdoZXItb3JkZXIgZnVuY3Rpb25zLlxuICAgIGZ1bmN0aW9uIHN1YlJlbmRlcih0ZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIHdyaXRlci5yZW5kZXIodGVtcGxhdGUsIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHZhciB0b2tlbiwgdG9rZW5WYWx1ZSwgdmFsdWU7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRva2Vucy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICB0b2tlblZhbHVlID0gdG9rZW5bMV07XG5cbiAgICAgIHN3aXRjaCAodG9rZW5bMF0pIHtcbiAgICAgIGNhc2UgJyMnOlxuICAgICAgICB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuVmFsdWUpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBqbGVuID0gdmFsdWUubGVuZ3RoOyBqIDwgamxlbjsgKytqKSB7XG4gICAgICAgICAgICAgIGJ1ZmZlciArPSByZW5kZXJUb2tlbnModG9rZW5bNF0sIHdyaXRlciwgY29udGV4dC5wdXNoKHZhbHVlW2pdKSwgdGVtcGxhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGJ1ZmZlciArPSByZW5kZXJUb2tlbnModG9rZW5bNF0sIHdyaXRlciwgY29udGV4dC5wdXNoKHZhbHVlKSwgdGVtcGxhdGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgICAgIHZhciB0ZXh0ID0gdGVtcGxhdGUgPT0gbnVsbCA/IG51bGwgOiB0ZW1wbGF0ZS5zbGljZSh0b2tlblszXSwgdG9rZW5bNV0pO1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUuY2FsbChjb250ZXh0LnZpZXcsIHRleHQsIHN1YlJlbmRlcik7XG4gICAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICAgIGJ1ZmZlciArPSByZW5kZXJUb2tlbnModG9rZW5bNF0sIHdyaXRlciwgY29udGV4dCwgdGVtcGxhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdeJzpcbiAgICAgICAgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblZhbHVlKTtcblxuICAgICAgICAvLyBVc2UgSmF2YVNjcmlwdCdzIGRlZmluaXRpb24gb2YgZmFsc3kuIEluY2x1ZGUgZW1wdHkgYXJyYXlzLlxuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzE4NlxuICAgICAgICBpZiAoIXZhbHVlIHx8IChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgYnVmZmVyICs9IHJlbmRlclRva2Vucyh0b2tlbls0XSwgd3JpdGVyLCBjb250ZXh0LCB0ZW1wbGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJz4nOlxuICAgICAgICB2YWx1ZSA9IHdyaXRlci5nZXRQYXJ0aWFsKHRva2VuVmFsdWUpO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIGJ1ZmZlciArPSB2YWx1ZShjb250ZXh0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICcmJzpcbiAgICAgICAgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblZhbHVlKTtcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICduYW1lJzpcbiAgICAgICAgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblZhbHVlKTtcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIGJ1ZmZlciArPSBtdXN0YWNoZS5lc2NhcGUodmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICBidWZmZXIgKz0gdG9rZW5WYWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtcyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgaW50byBhIG5lc3RlZCB0cmVlIHN0cnVjdHVyZSB3aGVyZVxuICAgKiB0b2tlbnMgdGhhdCByZXByZXNlbnQgYSBzZWN0aW9uIGhhdmUgdHdvIGFkZGl0aW9uYWwgaXRlbXM6IDEpIGFuIGFycmF5IG9mXG4gICAqIGFsbCB0b2tlbnMgdGhhdCBhcHBlYXIgaW4gdGhhdCBzZWN0aW9uIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsXG4gICAqIHRlbXBsYXRlIHRoYXQgcmVwcmVzZW50cyB0aGUgZW5kIG9mIHRoYXQgc2VjdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIG5lc3RUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIHRyZWUgPSBbXTtcbiAgICB2YXIgY29sbGVjdG9yID0gdHJlZTtcbiAgICB2YXIgc2VjdGlvbnMgPSBbXTtcblxuICAgIHZhciB0b2tlbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdG9rZW5zLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgIHN3aXRjaCAodG9rZW5bMF0pIHtcbiAgICAgIGNhc2UgJyMnOlxuICAgICAgY2FzZSAnXic6XG4gICAgICAgIHNlY3Rpb25zLnB1c2godG9rZW4pO1xuICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICAgIGNvbGxlY3RvciA9IHRva2VuWzRdID0gW107XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnLyc6XG4gICAgICAgIHZhciBzZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG4gICAgICAgIHNlY3Rpb25bNV0gPSB0b2tlblsyXTtcbiAgICAgICAgY29sbGVjdG9yID0gc2VjdGlvbnMubGVuZ3RoID4gMCA/IHNlY3Rpb25zW3NlY3Rpb25zLmxlbmd0aCAtIDFdWzRdIDogdHJlZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyZWU7XG4gIH1cblxuICAvKipcbiAgICogQ29tYmluZXMgdGhlIHZhbHVlcyBvZiBjb25zZWN1dGl2ZSB0ZXh0IHRva2VucyBpbiB0aGUgZ2l2ZW4gYHRva2Vuc2AgYXJyYXlcbiAgICogdG8gYSBzaW5nbGUgdG9rZW4uXG4gICAqL1xuICBmdW5jdGlvbiBzcXVhc2hUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIHNxdWFzaGVkVG9rZW5zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIGxhc3RUb2tlbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdG9rZW5zLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICBpZiAodG9rZW5bMF0gPT09ICd0ZXh0JyAmJiBsYXN0VG9rZW4gJiYgbGFzdFRva2VuWzBdID09PSAndGV4dCcpIHtcbiAgICAgICAgICBsYXN0VG9rZW5bMV0gKz0gdG9rZW5bMV07XG4gICAgICAgICAgbGFzdFRva2VuWzNdID0gdG9rZW5bM107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGFzdFRva2VuID0gdG9rZW47XG4gICAgICAgICAgc3F1YXNoZWRUb2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3F1YXNoZWRUb2tlbnM7XG4gIH1cblxuICBmdW5jdGlvbiBlc2NhcGVUYWdzKHRhZ3MpIHtcbiAgICByZXR1cm4gW1xuICAgICAgbmV3IFJlZ0V4cChlc2NhcGVSZWdFeHAodGFnc1swXSkgKyBcIlxcXFxzKlwiKSxcbiAgICAgIG5ldyBSZWdFeHAoXCJcXFxccypcIiArIGVzY2FwZVJlZ0V4cCh0YWdzWzFdKSlcbiAgICBdO1xuICB9XG5cbiAgLyoqXG4gICAqIEJyZWFrcyB1cCB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCBzdHJpbmcgaW50byBhIHRyZWUgb2YgdG9rZW4gb2JqZWN0cy4gSWZcbiAgICogYHRhZ3NgIGlzIGdpdmVuIGhlcmUgaXQgbXVzdCBiZSBhbiBhcnJheSB3aXRoIHR3byBzdHJpbmcgdmFsdWVzOiB0aGVcbiAgICogb3BlbmluZyBhbmQgY2xvc2luZyB0YWdzIHVzZWQgaW4gdGhlIHRlbXBsYXRlIChlLmcuIFtcIjwlXCIsIFwiJT5cIl0pLiBPZlxuICAgKiBjb3Vyc2UsIHRoZSBkZWZhdWx0IGlzIHRvIHVzZSBtdXN0YWNoZXMgKGkuZS4gTXVzdGFjaGUudGFncykuXG4gICAqL1xuICBmdW5jdGlvbiBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZSB8fCAnJztcbiAgICB0YWdzID0gdGFncyB8fCBtdXN0YWNoZS50YWdzO1xuXG4gICAgaWYgKHR5cGVvZiB0YWdzID09PSAnc3RyaW5nJykgdGFncyA9IHRhZ3Muc3BsaXQoc3BhY2VSZSk7XG4gICAgaWYgKHRhZ3MubGVuZ3RoICE9PSAyKSB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdGFnczogJyArIHRhZ3Muam9pbignLCAnKSk7XG5cbiAgICB2YXIgdGFnUmVzID0gZXNjYXBlVGFncyh0YWdzKTtcbiAgICB2YXIgc2Nhbm5lciA9IG5ldyBTY2FubmVyKHRlbXBsYXRlKTtcblxuICAgIHZhciBzZWN0aW9ucyA9IFtdOyAgICAgLy8gU3RhY2sgdG8gaG9sZCBzZWN0aW9uIHRva2Vuc1xuICAgIHZhciB0b2tlbnMgPSBbXTsgICAgICAgLy8gQnVmZmVyIHRvIGhvbGQgdGhlIHRva2Vuc1xuICAgIHZhciBzcGFjZXMgPSBbXTsgICAgICAgLy8gSW5kaWNlcyBvZiB3aGl0ZXNwYWNlIHRva2VucyBvbiB0aGUgY3VycmVudCBsaW5lXG4gICAgdmFyIGhhc1RhZyA9IGZhbHNlOyAgICAvLyBJcyB0aGVyZSBhIHt7dGFnfX0gb24gdGhlIGN1cnJlbnQgbGluZT9cbiAgICB2YXIgbm9uU3BhY2UgPSBmYWxzZTsgIC8vIElzIHRoZXJlIGEgbm9uLXNwYWNlIGNoYXIgb24gdGhlIGN1cnJlbnQgbGluZT9cblxuICAgIC8vIFN0cmlwcyBhbGwgd2hpdGVzcGFjZSB0b2tlbnMgYXJyYXkgZm9yIHRoZSBjdXJyZW50IGxpbmVcbiAgICAvLyBpZiB0aGVyZSB3YXMgYSB7eyN0YWd9fSBvbiBpdCBhbmQgb3RoZXJ3aXNlIG9ubHkgc3BhY2UuXG4gICAgZnVuY3Rpb24gc3RyaXBTcGFjZSgpIHtcbiAgICAgIGlmIChoYXNUYWcgJiYgIW5vblNwYWNlKSB7XG4gICAgICAgIHdoaWxlIChzcGFjZXMubGVuZ3RoKSB7XG4gICAgICAgICAgZGVsZXRlIHRva2Vuc1tzcGFjZXMucG9wKCldO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcGFjZXMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgaGFzVGFnID0gZmFsc2U7XG4gICAgICBub25TcGFjZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBzdGFydCwgdHlwZSwgdmFsdWUsIGNociwgdG9rZW4sIG9wZW5TZWN0aW9uO1xuICAgIHdoaWxlICghc2Nhbm5lci5lb3MoKSkge1xuICAgICAgc3RhcnQgPSBzY2FubmVyLnBvcztcblxuICAgICAgLy8gTWF0Y2ggYW55IHRleHQgYmV0d2VlbiB0YWdzLlxuICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbCh0YWdSZXNbMF0pO1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB2YWx1ZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgIGNociA9IHZhbHVlLmNoYXJBdChpKTtcblxuICAgICAgICAgIGlmIChpc1doaXRlc3BhY2UoY2hyKSkge1xuICAgICAgICAgICAgc3BhY2VzLnB1c2godG9rZW5zLmxlbmd0aCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b2tlbnMucHVzaChbJ3RleHQnLCBjaHIsIHN0YXJ0LCBzdGFydCArIDFdKTtcbiAgICAgICAgICBzdGFydCArPSAxO1xuXG4gICAgICAgICAgLy8gQ2hlY2sgZm9yIHdoaXRlc3BhY2Ugb24gdGhlIGN1cnJlbnQgbGluZS5cbiAgICAgICAgICBpZiAoY2hyID09ICdcXG4nKSBzdHJpcFNwYWNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gTWF0Y2ggdGhlIG9wZW5pbmcgdGFnLlxuICAgICAgaWYgKCFzY2FubmVyLnNjYW4odGFnUmVzWzBdKSkgYnJlYWs7XG4gICAgICBoYXNUYWcgPSB0cnVlO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB0eXBlLlxuICAgICAgdHlwZSA9IHNjYW5uZXIuc2Nhbih0YWdSZSkgfHwgJ25hbWUnO1xuICAgICAgc2Nhbm5lci5zY2FuKHdoaXRlUmUpO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB2YWx1ZS5cbiAgICAgIGlmICh0eXBlID09PSAnPScpIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChlcVJlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuKGVxUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbCh0YWdSZXNbMV0pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAneycpIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChuZXcgUmVnRXhwKCdcXFxccyonICsgZXNjYXBlUmVnRXhwKCd9JyArIHRhZ3NbMV0pKSk7XG4gICAgICAgIHNjYW5uZXIuc2NhbihjdXJseVJlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuVW50aWwodGFnUmVzWzFdKTtcbiAgICAgICAgdHlwZSA9ICcmJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwodGFnUmVzWzFdKTtcbiAgICAgIH1cblxuICAgICAgLy8gTWF0Y2ggdGhlIGNsb3NpbmcgdGFnLlxuICAgICAgaWYgKCFzY2FubmVyLnNjYW4odGFnUmVzWzFdKSkgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCB0YWcgYXQgJyArIHNjYW5uZXIucG9zKTtcblxuICAgICAgdG9rZW4gPSBbdHlwZSwgdmFsdWUsIHN0YXJ0LCBzY2FubmVyLnBvc107XG4gICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG5cbiAgICAgIGlmICh0eXBlID09PSAnIycgfHwgdHlwZSA9PT0gJ14nKSB7XG4gICAgICAgIHNlY3Rpb25zLnB1c2godG9rZW4pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnLycpIHtcbiAgICAgICAgLy8gQ2hlY2sgc2VjdGlvbiBuZXN0aW5nLlxuICAgICAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuICAgICAgICBpZiAoIW9wZW5TZWN0aW9uKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbm9wZW5lZCBzZWN0aW9uIFwiJyArIHZhbHVlICsgJ1wiIGF0ICcgKyBzdGFydCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wZW5TZWN0aW9uWzFdICE9PSB2YWx1ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgc2VjdGlvbiBcIicgKyBvcGVuU2VjdGlvblsxXSArICdcIiBhdCAnICsgc3RhcnQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICduYW1lJyB8fCB0eXBlID09PSAneycgfHwgdHlwZSA9PT0gJyYnKSB7XG4gICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJz0nKSB7XG4gICAgICAgIC8vIFNldCB0aGUgdGFncyBmb3IgdGhlIG5leHQgdGltZSBhcm91bmQuXG4gICAgICAgIHRhZ3MgPSB2YWx1ZS5zcGxpdChzcGFjZVJlKTtcbiAgICAgICAgaWYgKHRhZ3MubGVuZ3RoICE9PSAyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRhZ3MgYXQgJyArIHN0YXJ0ICsgJzogJyArIHRhZ3Muam9pbignLCAnKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGFnUmVzID0gZXNjYXBlVGFncyh0YWdzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlcmUgYXJlIG5vIG9wZW4gc2VjdGlvbnMgd2hlbiB3ZSdyZSBkb25lLlxuICAgIG9wZW5TZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG4gICAgaWYgKG9wZW5TZWN0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHNjYW5uZXIucG9zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmVzdFRva2VucyhzcXVhc2hUb2tlbnModG9rZW5zKSk7XG4gIH1cblxuICBtdXN0YWNoZS5uYW1lID0gXCJtdXN0YWNoZS5qc1wiO1xuICBtdXN0YWNoZS52ZXJzaW9uID0gXCIwLjcuM1wiO1xuICBtdXN0YWNoZS50YWdzID0gW1wie3tcIiwgXCJ9fVwiXTtcblxuICBtdXN0YWNoZS5TY2FubmVyID0gU2Nhbm5lcjtcbiAgbXVzdGFjaGUuQ29udGV4dCA9IENvbnRleHQ7XG4gIG11c3RhY2hlLldyaXRlciA9IFdyaXRlcjtcblxuICBtdXN0YWNoZS5wYXJzZSA9IHBhcnNlVGVtcGxhdGU7XG5cbiAgLy8gRXhwb3J0IHRoZSBlc2NhcGluZyBmdW5jdGlvbiBzbyB0aGF0IHRoZSB1c2VyIG1heSBvdmVycmlkZSBpdC5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8yNDRcbiAgbXVzdGFjaGUuZXNjYXBlID0gZXNjYXBlSHRtbDtcblxuICAvLyBBbGwgTXVzdGFjaGUuKiBmdW5jdGlvbnMgdXNlIHRoaXMgd3JpdGVyLlxuICB2YXIgZGVmYXVsdFdyaXRlciA9IG5ldyBXcml0ZXIoKTtcblxuICAvKipcbiAgICogQ2xlYXJzIGFsbCBjYWNoZWQgdGVtcGxhdGVzIGFuZCBwYXJ0aWFscyBpbiB0aGUgZGVmYXVsdCB3cml0ZXIuXG4gICAqL1xuICBtdXN0YWNoZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLmNsZWFyQ2FjaGUoKTtcbiAgfTtcblxuICAvKipcbiAgICogQ29tcGlsZXMgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgdG8gYSByZXVzYWJsZSBmdW5jdGlvbiB1c2luZyB0aGUgZGVmYXVsdFxuICAgKiB3cml0ZXIuXG4gICAqL1xuICBtdXN0YWNoZS5jb21waWxlID0gZnVuY3Rpb24gKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIuY29tcGlsZSh0ZW1wbGF0ZSwgdGFncyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENvbXBpbGVzIHRoZSBwYXJ0aWFsIHdpdGggdGhlIGdpdmVuIGBuYW1lYCBhbmQgYHRlbXBsYXRlYCB0byBhIHJldXNhYmxlXG4gICAqIGZ1bmN0aW9uIHVzaW5nIHRoZSBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLmNvbXBpbGVQYXJ0aWFsID0gZnVuY3Rpb24gKG5hbWUsIHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIuY29tcGlsZVBhcnRpYWwobmFtZSwgdGVtcGxhdGUsIHRhZ3MpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDb21waWxlcyB0aGUgZ2l2ZW4gYXJyYXkgb2YgdG9rZW5zICh0aGUgb3V0cHV0IG9mIGEgcGFyc2UpIHRvIGEgcmV1c2FibGVcbiAgICogZnVuY3Rpb24gdXNpbmcgdGhlIGRlZmF1bHQgd3JpdGVyLlxuICAgKi9cbiAgbXVzdGFjaGUuY29tcGlsZVRva2VucyA9IGZ1bmN0aW9uICh0b2tlbnMsIHRlbXBsYXRlKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIuY29tcGlsZVRva2Vucyh0b2tlbnMsIHRlbXBsYXRlKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVuZGVycyB0aGUgYHRlbXBsYXRlYCB3aXRoIHRoZSBnaXZlbiBgdmlld2AgYW5kIGBwYXJ0aWFsc2AgdXNpbmcgdGhlXG4gICAqIGRlZmF1bHQgd3JpdGVyLlxuICAgKi9cbiAgbXVzdGFjaGUucmVuZGVyID0gZnVuY3Rpb24gKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscykge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuICB9O1xuXG4gIC8vIFRoaXMgaXMgaGVyZSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgd2l0aCAwLjQueC5cbiAgbXVzdGFjaGUudG9faHRtbCA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMsIHNlbmQpIHtcbiAgICB2YXIgcmVzdWx0ID0gbXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyk7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihzZW5kKSkge1xuICAgICAgc2VuZChyZXN1bHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfTtcblxufSkpO1xuIiwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcbi8vIHZpbTp0cz00OnN0cz00OnN3PTQ6XG4vKiFcbiAqXG4gKiBDb3B5cmlnaHQgMjAwOS0yMDEyIEtyaXMgS293YWwgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNSVRcbiAqIGxpY2Vuc2UgZm91bmQgYXQgaHR0cDovL2dpdGh1Yi5jb20va3Jpc2tvd2FsL3EvcmF3L21hc3Rlci9MSUNFTlNFXG4gKlxuICogV2l0aCBwYXJ0cyBieSBUeWxlciBDbG9zZVxuICogQ29weXJpZ2h0IDIwMDctMjAwOSBUeWxlciBDbG9zZSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1JVCBYIGxpY2Vuc2UgZm91bmRcbiAqIGF0IGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UuaHRtbFxuICogRm9ya2VkIGF0IHJlZl9zZW5kLmpzIHZlcnNpb246IDIwMDktMDUtMTFcbiAqXG4gKiBXaXRoIHBhcnRzIGJ5IE1hcmsgTWlsbGVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTEgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cblxuKGZ1bmN0aW9uIChkZWZpbml0aW9uKSB7XG4gICAgLy8gVHVybiBvZmYgc3RyaWN0IG1vZGUgZm9yIHRoaXMgZnVuY3Rpb24gc28gd2UgY2FuIGFzc2lnbiB0byBnbG9iYWwuUVxuICAgIC8qanNoaW50IHN0cmljdDogZmFsc2UqL1xuXG4gICAgLy8gVGhpcyBmaWxlIHdpbGwgZnVuY3Rpb24gcHJvcGVybHkgYXMgYSA8c2NyaXB0PiB0YWcsIG9yIGEgbW9kdWxlXG4gICAgLy8gdXNpbmcgQ29tbW9uSlMgYW5kIE5vZGVKUyBvciBSZXF1aXJlSlMgbW9kdWxlIGZvcm1hdHMuICBJblxuICAgIC8vIENvbW1vbi9Ob2RlL1JlcXVpcmVKUywgdGhlIG1vZHVsZSBleHBvcnRzIHRoZSBRIEFQSSBhbmQgd2hlblxuICAgIC8vIGV4ZWN1dGVkIGFzIGEgc2ltcGxlIDxzY3JpcHQ+LCBpdCBjcmVhdGVzIGEgUSBnbG9iYWwgaW5zdGVhZC5cblxuICAgIC8vIE1vbnRhZ2UgUmVxdWlyZVxuICAgIGlmICh0eXBlb2YgYm9vdHN0cmFwID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgYm9vdHN0cmFwKFwicHJvbWlzZVwiLCBkZWZpbml0aW9uKTtcblxuICAgIC8vIENvbW1vbkpTXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBkZWZpbml0aW9uKHZvaWQgMCwgZXhwb3J0cyk7XG5cbiAgICAvLyBSZXF1aXJlSlNcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBkZWZpbmUoZGVmaW5pdGlvbik7XG5cbiAgICAvLyBTRVMgKFNlY3VyZSBFY21hU2NyaXB0KVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlcyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAoIXNlcy5vaygpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXMubWFrZVEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIFEgPSB7fTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmaW5pdGlvbih2b2lkIDAsIFEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgLy8gPHNjcmlwdD5cbiAgICB9IGVsc2Uge1xuICAgICAgICBkZWZpbml0aW9uKHZvaWQgMCwgUSA9IHt9KTtcbiAgICB9XG5cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG5cInVzZSBzdHJpY3RcIjtcblxuLy8gQWxsIGNvZGUgYWZ0ZXIgdGhpcyBwb2ludCB3aWxsIGJlIGZpbHRlcmVkIGZyb20gc3RhY2sgdHJhY2VzIHJlcG9ydGVkXG4vLyBieSBRLlxudmFyIHFTdGFydGluZ0xpbmUgPSBjYXB0dXJlTGluZSgpO1xudmFyIHFGaWxlTmFtZTtcblxuLy8gc2hpbXNcblxuLy8gdXNlZCBmb3IgZmFsbGJhY2sgXCJkZWZlbmRcIiBhbmQgaW4gXCJhbGxSZXNvbHZlZFwiXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9O1xuXG4vLyBmb3IgdGhlIHNlY3VyaXR5IGNvbnNjaW91cywgZGVmZW5kIG1heSBiZSBhIGRlZXAgZnJlZXplIGFzIHByb3ZpZGVkXG4vLyBieSBjYWphVk0uICBPdGhlcndpc2Ugd2UgdHJ5IHRvIHByb3ZpZGUgYSBzaGFsbG93IGZyZWV6ZSBqdXN0IHRvXG4vLyBkaXNjb3VyYWdlIHByb21pc2UgY2hhbmdlcyB0aGF0IGFyZSBub3QgY29tcGF0aWJsZSB3aXRoIHNlY3VyZVxuLy8gdXNhZ2UuICBJZiBPYmplY3QuZnJlZXplIGRvZXMgbm90IGV4aXN0LCBmYWxsIGJhY2sgdG8gZG9pbmcgbm90aGluZ1xuLy8gKG5vIG9wKS5cbnZhciBkZWZlbmQgPSBPYmplY3QuZnJlZXplIHx8IG5vb3A7XG5pZiAodHlwZW9mIGNhamFWTSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGRlZmVuZCA9IGNhamFWTS5kZWY7XG59XG5cbi8vIHVzZSB0aGUgZmFzdGVzdCBwb3NzaWJsZSBtZWFucyB0byBleGVjdXRlIGEgdGFzayBpbiBhIGZ1dHVyZSB0dXJuXG4vLyBvZiB0aGUgZXZlbnQgbG9vcC5cbnZhciBuZXh0VGljaztcbmlmICh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIC8vIG5vZGVcbiAgICBuZXh0VGljayA9IHByb2Nlc3MubmV4dFRpY2s7XG59IGVsc2UgaWYgKHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIC8vIEluIElFMTAsIG9yIHVzZSBodHRwczovL2dpdGh1Yi5jb20vTm9ibGVKUy9zZXRJbW1lZGlhdGVcbiAgICBuZXh0VGljayA9IHNldEltbWVkaWF0ZTtcbn0gZWxzZSBpZiAodHlwZW9mIE1lc3NhZ2VDaGFubmVsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgLy8gbW9kZXJuIGJyb3dzZXJzXG4gICAgLy8gaHR0cDovL3d3dy5ub25ibG9ja2luZy5pby8yMDExLzA2L3dpbmRvd25leHR0aWNrLmh0bWxcbiAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIC8vIGxpbmtlZCBsaXN0IG9mIHRhc2tzIChzaW5nbGUsIHdpdGggaGVhZCBub2RlKVxuICAgIHZhciBoZWFkID0ge30sIHRhaWwgPSBoZWFkO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBoZWFkID0gaGVhZC5uZXh0O1xuICAgICAgICB2YXIgdGFzayA9IGhlYWQudGFzaztcbiAgICAgICAgZGVsZXRlIGhlYWQudGFzaztcbiAgICAgICAgdGFzaygpO1xuICAgIH07XG4gICAgbmV4dFRpY2sgPSBmdW5jdGlvbiAodGFzaykge1xuICAgICAgICB0YWlsID0gdGFpbC5uZXh0ID0ge3Rhc2s6IHRhc2t9O1xuICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKDApO1xuICAgIH07XG59IGVsc2Uge1xuICAgIC8vIG9sZCBicm93c2Vyc1xuICAgIG5leHRUaWNrID0gZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgc2V0VGltZW91dCh0YXNrLCAwKTtcbiAgICB9O1xufVxuXG4vLyBBdHRlbXB0IHRvIG1ha2UgZ2VuZXJpY3Mgc2FmZSBpbiB0aGUgZmFjZSBvZiBkb3duc3RyZWFtXG4vLyBtb2RpZmljYXRpb25zLlxuLy8gVGhlcmUgaXMgbm8gc2l0dWF0aW9uIHdoZXJlIHRoaXMgaXMgbmVjZXNzYXJ5LlxuLy8gSWYgeW91IG5lZWQgYSBzZWN1cml0eSBndWFyYW50ZWUsIHRoZXNlIHByaW1vcmRpYWxzIG5lZWQgdG8gYmVcbi8vIGRlZXBseSBmcm96ZW4gYW55d2F5LCBhbmQgaWYgeW91IGRvbuKAmXQgbmVlZCBhIHNlY3VyaXR5IGd1YXJhbnRlZSxcbi8vIHRoaXMgaXMganVzdCBwbGFpbiBwYXJhbm9pZC5cbi8vIEhvd2V2ZXIsIHRoaXMgZG9lcyBoYXZlIHRoZSBuaWNlIHNpZGUtZWZmZWN0IG9mIHJlZHVjaW5nIHRoZSBzaXplXG4vLyBvZiB0aGUgY29kZSBieSByZWR1Y2luZyB4LmNhbGwoKSB0byBtZXJlbHkgeCgpLCBlbGltaW5hdGluZyBtYW55XG4vLyBoYXJkLXRvLW1pbmlmeSBjaGFyYWN0ZXJzLlxuLy8gU2VlIE1hcmsgTWlsbGVy4oCZcyBleHBsYW5hdGlvbiBvZiB3aGF0IHRoaXMgZG9lcy5cbi8vIGh0dHA6Ly93aWtpLmVjbWFzY3JpcHQub3JnL2Rva3UucGhwP2lkPWNvbnZlbnRpb25zOnNhZmVfbWV0YV9wcm9ncmFtbWluZ1xudmFyIHVuY3VycnlUaGlzO1xuLy8gSSBoYXZlIGtlcHQgYm90aCB2YXJpYXRpb25zIGJlY2F1c2UgdGhlIGZpcnN0IGlzIHRoZW9yZXRpY2FsbHlcbi8vIGZhc3RlciwgaWYgYmluZCBpcyBhdmFpbGFibGUuXG5pZiAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQpIHtcbiAgICB2YXIgRnVuY3Rpb25fYmluZCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kO1xuICAgIHVuY3VycnlUaGlzID0gRnVuY3Rpb25fYmluZC5iaW5kKEZ1bmN0aW9uX2JpbmQuY2FsbCk7XG59IGVsc2Uge1xuICAgIHVuY3VycnlUaGlzID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmLmNhbGwuYXBwbHkoZiwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9O1xufVxuXG52YXIgYXJyYXlfc2xpY2UgPSB1bmN1cnJ5VGhpcyhBcnJheS5wcm90b3R5cGUuc2xpY2UpO1xuXG52YXIgYXJyYXlfcmVkdWNlID0gdW5jdXJyeVRoaXMoXG4gICAgQXJyYXkucHJvdG90eXBlLnJlZHVjZSB8fCBmdW5jdGlvbiAoY2FsbGJhY2ssIGJhc2lzKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDAsXG4gICAgICAgICAgICBsZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgLy8gY29uY2VybmluZyB0aGUgaW5pdGlhbCB2YWx1ZSwgaWYgb25lIGlzIG5vdCBwcm92aWRlZFxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgLy8gc2VlayB0byB0aGUgZmlyc3QgdmFsdWUgaW4gdGhlIGFycmF5LCBhY2NvdW50aW5nXG4gICAgICAgICAgICAvLyBmb3IgdGhlIHBvc3NpYmlsaXR5IHRoYXQgaXMgaXMgYSBzcGFyc2UgYXJyYXlcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggaW4gdGhpcykge1xuICAgICAgICAgICAgICAgICAgICBiYXNpcyA9IHRoaXNbaW5kZXgrK107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKytpbmRleCA+PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gd2hpbGUgKDEpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlZHVjZVxuICAgICAgICBmb3IgKDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIC8vIGFjY291bnQgZm9yIHRoZSBwb3NzaWJpbGl0eSB0aGF0IHRoZSBhcnJheSBpcyBzcGFyc2VcbiAgICAgICAgICAgIGlmIChpbmRleCBpbiB0aGlzKSB7XG4gICAgICAgICAgICAgICAgYmFzaXMgPSBjYWxsYmFjayhiYXNpcywgdGhpc1tpbmRleF0sIGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmFzaXM7XG4gICAgfVxuKTtcblxudmFyIGFycmF5X2luZGV4T2YgPSB1bmN1cnJ5VGhpcyhcbiAgICBBcnJheS5wcm90b3R5cGUuaW5kZXhPZiB8fCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgLy8gbm90IGEgdmVyeSBnb29kIHNoaW0sIGJ1dCBnb29kIGVub3VnaCBmb3Igb3VyIG9uZSB1c2Ugb2YgaXRcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpc1tpXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuKTtcblxudmFyIGFycmF5X21hcCA9IHVuY3VycnlUaGlzKFxuICAgIEFycmF5LnByb3RvdHlwZS5tYXAgfHwgZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzcCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjb2xsZWN0ID0gW107XG4gICAgICAgIGFycmF5X3JlZHVjZShzZWxmLCBmdW5jdGlvbiAodW5kZWZpbmVkLCB2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGNvbGxlY3QucHVzaChjYWxsYmFjay5jYWxsKHRoaXNwLCB2YWx1ZSwgaW5kZXgsIHNlbGYpKTtcbiAgICAgICAgfSwgdm9pZCAwKTtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Q7XG4gICAgfVxuKTtcblxudmFyIG9iamVjdF9jcmVhdGUgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIChwcm90b3R5cGUpIHtcbiAgICBmdW5jdGlvbiBUeXBlKCkgeyB9XG4gICAgVHlwZS5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gICAgcmV0dXJuIG5ldyBUeXBlKCk7XG59O1xuXG52YXIgb2JqZWN0X2tleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5cztcbn07XG5cbnZhciBvYmplY3RfdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vLyBnZW5lcmF0b3IgcmVsYXRlZCBzaGltc1xuXG5mdW5jdGlvbiBpc1N0b3BJdGVyYXRpb24oZXhjZXB0aW9uKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgb2JqZWN0X3RvU3RyaW5nKGV4Y2VwdGlvbikgPT09IFwiW29iamVjdCBTdG9wSXRlcmF0aW9uXVwiIHx8XG4gICAgICAgIGV4Y2VwdGlvbiBpbnN0YW5jZW9mIFFSZXR1cm5WYWx1ZVxuICAgICk7XG59XG5cbnZhciBRUmV0dXJuVmFsdWU7XG5pZiAodHlwZW9mIFJldHVyblZhbHVlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgUVJldHVyblZhbHVlID0gUmV0dXJuVmFsdWU7XG59IGVsc2Uge1xuICAgIFFSZXR1cm5WYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfTtcbn1cblxuLy8gbG9uZyBzdGFjayB0cmFjZXNcblxudmFyIFNUQUNLX0pVTVBfU0VQQVJBVE9SID0gXCJGcm9tIHByZXZpb3VzIGV2ZW50OlwiO1xuXG5mdW5jdGlvbiBtYWtlU3RhY2tUcmFjZUxvbmcoZXJyb3IsIHByb21pc2UpIHtcbiAgICAvLyBJZiBwb3NzaWJsZSAodGhhdCBpcywgaWYgaW4gVjgpLCB0cmFuc2Zvcm0gdGhlIGVycm9yIHN0YWNrXG4gICAgLy8gdHJhY2UgYnkgcmVtb3ZpbmcgTm9kZSBhbmQgUSBjcnVmdCwgdGhlbiBjb25jYXRlbmF0aW5nIHdpdGhcbiAgICAvLyB0aGUgc3RhY2sgdHJhY2Ugb2YgdGhlIHByb21pc2Ugd2UgYXJlIGBgZG9uZWBgaW5nLiBTZWUgIzU3LlxuICAgIGlmIChwcm9taXNlLnN0YWNrICYmXG4gICAgICAgIHR5cGVvZiBlcnJvciA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICBlcnJvciAhPT0gbnVsbCAmJlxuICAgICAgICBlcnJvci5zdGFjayAmJlxuICAgICAgICBlcnJvci5zdGFjay5pbmRleE9mKFNUQUNLX0pVTVBfU0VQQVJBVE9SKSA9PT0gLTFcbiAgICApIHtcbiAgICAgICAgZXJyb3Iuc3RhY2sgPSBmaWx0ZXJTdGFja1N0cmluZyhlcnJvci5zdGFjaykgK1xuICAgICAgICAgICAgXCJcXG5cIiArIFNUQUNLX0pVTVBfU0VQQVJBVE9SICsgXCJcXG5cIiArXG4gICAgICAgICAgICBmaWx0ZXJTdGFja1N0cmluZyhwcm9taXNlLnN0YWNrKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZpbHRlclN0YWNrU3RyaW5nKHN0YWNrU3RyaW5nKSB7XG4gICAgdmFyIGxpbmVzID0gc3RhY2tTdHJpbmcuc3BsaXQoXCJcXG5cIik7XG4gICAgdmFyIGRlc2lyZWRMaW5lcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcblxuICAgICAgICBpZiAoIWlzSW50ZXJuYWxGcmFtZShsaW5lKSAmJiAhaXNOb2RlRnJhbWUobGluZSkpIHtcbiAgICAgICAgICAgIGRlc2lyZWRMaW5lcy5wdXNoKGxpbmUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZXNpcmVkTGluZXMuam9pbihcIlxcblwiKTtcbn1cblxuZnVuY3Rpb24gaXNOb2RlRnJhbWUoc3RhY2tMaW5lKSB7XG4gICAgcmV0dXJuIHN0YWNrTGluZS5pbmRleE9mKFwiKG1vZHVsZS5qczpcIikgIT09IC0xIHx8XG4gICAgICAgICAgIHN0YWNrTGluZS5pbmRleE9mKFwiKG5vZGUuanM6XCIpICE9PSAtMTtcbn1cblxuZnVuY3Rpb24gaXNJbnRlcm5hbEZyYW1lKHN0YWNrTGluZSkge1xuICAgIHZhciBwaWVjZXMgPSAvYXQgLisgXFwoKC4qKTooXFxkKyk6XFxkK1xcKS8uZXhlYyhzdGFja0xpbmUpO1xuXG4gICAgaWYgKCFwaWVjZXMpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBmaWxlTmFtZSA9IHBpZWNlc1sxXTtcbiAgICB2YXIgbGluZU51bWJlciA9IHBpZWNlc1syXTtcblxuICAgIHJldHVybiBmaWxlTmFtZSA9PT0gcUZpbGVOYW1lICYmXG4gICAgICAgIGxpbmVOdW1iZXIgPj0gcVN0YXJ0aW5nTGluZSAmJlxuICAgICAgICBsaW5lTnVtYmVyIDw9IHFFbmRpbmdMaW5lO1xufVxuXG4vLyBkaXNjb3ZlciBvd24gZmlsZSBuYW1lIGFuZCBsaW5lIG51bWJlciByYW5nZSBmb3IgZmlsdGVyaW5nIHN0YWNrXG4vLyB0cmFjZXNcbmZ1bmN0aW9uIGNhcHR1cmVMaW5lKCkge1xuICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgICAgICB2YXIgZmlsZU5hbWUsIGxpbmVOdW1iZXI7XG5cbiAgICAgICAgdmFyIG9sZFByZXBhcmVTdGFja1RyYWNlID0gRXJyb3IucHJlcGFyZVN0YWNrVHJhY2U7XG5cbiAgICAgICAgRXJyb3IucHJlcGFyZVN0YWNrVHJhY2UgPSBmdW5jdGlvbiAoZXJyb3IsIGZyYW1lcykge1xuICAgICAgICAgICAgZmlsZU5hbWUgPSBmcmFtZXNbMV0uZ2V0RmlsZU5hbWUoKTtcbiAgICAgICAgICAgIGxpbmVOdW1iZXIgPSBmcmFtZXNbMV0uZ2V0TGluZU51bWJlcigpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHRlYXNlcyBjYWxsIG9mIHRlbXBvcmFyeSBwcmVwYXJlU3RhY2tUcmFjZVxuICAgICAgICAvLyBKU0hpbnQgYW5kIENsb3N1cmUgQ29tcGlsZXIgZ2VuZXJhdGUga25vd24gd2FybmluZ3MgaGVyZVxuICAgICAgICAvKmpzaGludCBleHByOiB0cnVlICovXG4gICAgICAgIG5ldyBFcnJvcigpLnN0YWNrO1xuXG4gICAgICAgIEVycm9yLnByZXBhcmVTdGFja1RyYWNlID0gb2xkUHJlcGFyZVN0YWNrVHJhY2U7XG4gICAgICAgIHFGaWxlTmFtZSA9IGZpbGVOYW1lO1xuICAgICAgICByZXR1cm4gbGluZU51bWJlcjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRlcHJlY2F0ZShjYWxsYmFjaywgbmFtZSwgYWx0ZXJuYXRpdmUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4obmFtZSArIFwiIGlzIGRlcHJlY2F0ZWQsIHVzZSBcIiArIGFsdGVybmF0aXZlICsgXCIgaW5zdGVhZC5cIiwgbmV3IEVycm9yKFwiXCIpLnN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkoY2FsbGJhY2ssIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cblxuLy8gZW5kIG9mIHNoaW1zXG4vLyBiZWdpbm5pbmcgb2YgcmVhbCB3b3JrXG5cbi8qKlxuICogUGVyZm9ybXMgYSB0YXNrIGluIGEgZnV0dXJlIHR1cm4gb2YgdGhlIGV2ZW50IGxvb3AuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0YXNrXG4gKi9cbmV4cG9ydHMubmV4dFRpY2sgPSBuZXh0VGljaztcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEge3Byb21pc2UsIHJlc29sdmV9IG9iamVjdC5cbiAqXG4gKiBUaGUgcmVzb2x2ZXIgaXMgYSBjYWxsYmFjayB0byBpbnZva2Ugd2l0aCBhIG1vcmUgcmVzb2x2ZWQgdmFsdWUgZm9yIHRoZVxuICogcHJvbWlzZS4gVG8gZnVsZmlsbCB0aGUgcHJvbWlzZSwgaW52b2tlIHRoZSByZXNvbHZlciB3aXRoIGFueSB2YWx1ZSB0aGF0IGlzXG4gKiBub3QgYSBmdW5jdGlvbi4gVG8gcmVqZWN0IHRoZSBwcm9taXNlLCBpbnZva2UgdGhlIHJlc29sdmVyIHdpdGggYSByZWplY3Rpb25cbiAqIG9iamVjdC4gVG8gcHV0IHRoZSBwcm9taXNlIGluIHRoZSBzYW1lIHN0YXRlIGFzIGFub3RoZXIgcHJvbWlzZSwgaW52b2tlIHRoZVxuICogcmVzb2x2ZXIgd2l0aCB0aGF0IG90aGVyIHByb21pc2UuXG4gKi9cbmV4cG9ydHMuZGVmZXIgPSBkZWZlcjtcbmZ1bmN0aW9uIGRlZmVyKCkge1xuICAgIC8vIGlmIFwicGVuZGluZ1wiIGlzIGFuIFwiQXJyYXlcIiwgdGhhdCBpbmRpY2F0ZXMgdGhhdCB0aGUgcHJvbWlzZSBoYXMgbm90IHlldFxuICAgIC8vIGJlZW4gcmVzb2x2ZWQuICBJZiBpdCBpcyBcInVuZGVmaW5lZFwiLCBpdCBoYXMgYmVlbiByZXNvbHZlZC4gIEVhY2hcbiAgICAvLyBlbGVtZW50IG9mIHRoZSBwZW5kaW5nIGFycmF5IGlzIGl0c2VsZiBhbiBhcnJheSBvZiBjb21wbGV0ZSBhcmd1bWVudHMgdG9cbiAgICAvLyBmb3J3YXJkIHRvIHRoZSByZXNvbHZlZCBwcm9taXNlLiAgV2UgY29lcmNlIHRoZSByZXNvbHV0aW9uIHZhbHVlIHRvIGFcbiAgICAvLyBwcm9taXNlIHVzaW5nIHRoZSByZWYgcHJvbWlzZSBiZWNhdXNlIGl0IGhhbmRsZXMgYm90aCBmdWxseVxuICAgIC8vIHJlc29sdmVkIHZhbHVlcyBhbmQgb3RoZXIgcHJvbWlzZXMgZ3JhY2VmdWxseS5cbiAgICB2YXIgcGVuZGluZyA9IFtdLCBwcm9ncmVzc0xpc3RlbmVycyA9IFtdLCB2YWx1ZTtcblxuICAgIHZhciBkZWZlcnJlZCA9IG9iamVjdF9jcmVhdGUoZGVmZXIucHJvdG90eXBlKTtcbiAgICB2YXIgcHJvbWlzZSA9IG9iamVjdF9jcmVhdGUobWFrZVByb21pc2UucHJvdG90eXBlKTtcblxuICAgIHByb21pc2UucHJvbWlzZVNlbmQgPSBmdW5jdGlvbiAob3AsIF8sIF9fLCBwcm9ncmVzcykge1xuICAgICAgICB2YXIgYXJncyA9IGFycmF5X3NsaWNlKGFyZ3VtZW50cyk7XG4gICAgICAgIGlmIChwZW5kaW5nKSB7XG4gICAgICAgICAgICBwZW5kaW5nLnB1c2goYXJncyk7XG4gICAgICAgICAgICBpZiAob3AgPT09IFwid2hlblwiICYmIHByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NMaXN0ZW5lcnMucHVzaChwcm9ncmVzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUucHJvbWlzZVNlbmQuYXBwbHkodmFsdWUsIGFyZ3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJvbWlzZS52YWx1ZU9mID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAocGVuZGluZykge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlLnZhbHVlT2YoKTtcbiAgICB9O1xuXG4gICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHByb21pc2UsIGRlZmVyKTtcblxuICAgICAgICAvLyBSZWlmeSB0aGUgc3RhY2sgaW50byBhIHN0cmluZyBieSB1c2luZyB0aGUgYWNjZXNzb3I7IHRoaXMgcHJldmVudHNcbiAgICAgICAgLy8gbWVtb3J5IGxlYWtzIGFzIHBlciBHSC0xMTEuIEF0IHRoZSBzYW1lIHRpbWUsIGN1dCBvZmYgdGhlIGZpcnN0IGxpbmU7XG4gICAgICAgIC8vIGl0J3MgYWx3YXlzIGp1c3QgXCJbb2JqZWN0IFByb21pc2VdXFxuXCIsIGFzIHBlciB0aGUgYHRvU3RyaW5nYC5cbiAgICAgICAgcHJvbWlzZS5zdGFjayA9IHByb21pc2Uuc3RhY2suc3Vic3RyaW5nKHByb21pc2Uuc3RhY2suaW5kZXhPZihcIlxcblwiKSArIDEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJlY29tZShyZXNvbHZlZFZhbHVlKSB7XG4gICAgICAgIGlmICghcGVuZGluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gcmVzb2x2ZShyZXNvbHZlZFZhbHVlKTtcbiAgICAgICAgYXJyYXlfcmVkdWNlKHBlbmRpbmcsIGZ1bmN0aW9uICh1bmRlZmluZWQsIHBlbmRpbmcpIHtcbiAgICAgICAgICAgIG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5wcm9taXNlU2VuZC5hcHBseSh2YWx1ZSwgcGVuZGluZyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgdm9pZCAwKTtcbiAgICAgICAgcGVuZGluZyA9IHZvaWQgMDtcbiAgICAgICAgcHJvZ3Jlc3NMaXN0ZW5lcnMgPSB2b2lkIDA7XG4gICAgfVxuXG4gICAgZGVmZW5kKHByb21pc2UpO1xuXG4gICAgZGVmZXJyZWQucHJvbWlzZSA9IHByb21pc2U7XG4gICAgZGVmZXJyZWQucmVzb2x2ZSA9IGJlY29tZTtcbiAgICBkZWZlcnJlZC5yZWplY3QgPSBmdW5jdGlvbiAoZXhjZXB0aW9uKSB7XG4gICAgICAgIGJlY29tZShyZWplY3QoZXhjZXB0aW9uKSk7XG4gICAgfTtcbiAgICBkZWZlcnJlZC5ub3RpZnkgPSBmdW5jdGlvbiAocHJvZ3Jlc3MpIHtcbiAgICAgICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgICAgICAgIGFycmF5X3JlZHVjZShwcm9ncmVzc0xpc3RlbmVycywgZnVuY3Rpb24gKHVuZGVmaW5lZCwgcHJvZ3Jlc3NMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NMaXN0ZW5lcihwcm9ncmVzcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCB2b2lkIDApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBkZWZlcnJlZDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgTm9kZS1zdHlsZSBjYWxsYmFjayB0aGF0IHdpbGwgcmVzb2x2ZSBvciByZWplY3QgdGhlIGRlZmVycmVkXG4gKiBwcm9taXNlLlxuICogQHJldHVybnMgYSBub2RlYmFja1xuICovXG5kZWZlci5wcm90b3R5cGUubWFrZU5vZGVSZXNvbHZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChlcnJvciwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBzZWxmLnJlamVjdChlcnJvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIHNlbGYucmVzb2x2ZShhcnJheV9zbGljZShhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYucmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbi8vIFhYWCBkZXByZWNhdGVkXG5kZWZlci5wcm90b3R5cGUubm9kZSA9IGRlcHJlY2F0ZShkZWZlci5wcm90b3R5cGUubWFrZU5vZGVSZXNvbHZlciwgXCJub2RlXCIsIFwibWFrZU5vZGVSZXNvbHZlclwiKTtcblxuLyoqXG4gKiBAcGFyYW0gbWFrZVByb21pc2Uge0Z1bmN0aW9ufSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBub3RoaW5nIGFuZCBhY2NlcHRzXG4gKiB0aGUgcmVzb2x2ZSwgcmVqZWN0LCBhbmQgbm90aWZ5IGZ1bmN0aW9ucyBmb3IgYSBkZWZlcnJlZC5cbiAqIEByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IG1heSBiZSByZXNvbHZlZCB3aXRoIHRoZSBnaXZlbiByZXNvbHZlIGFuZCByZWplY3RcbiAqIGZ1bmN0aW9ucywgb3IgcmVqZWN0ZWQgYnkgYSB0aHJvd24gZXhjZXB0aW9uIGluIG1ha2VQcm9taXNlXG4gKi9cbmV4cG9ydHMucHJvbWlzZSA9IHByb21pc2U7XG5mdW5jdGlvbiBwcm9taXNlKG1ha2VQcm9taXNlKSB7XG4gICAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICBmY2FsbChcbiAgICAgICAgbWFrZVByb21pc2UsXG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUsXG4gICAgICAgIGRlZmVycmVkLnJlamVjdCxcbiAgICAgICAgZGVmZXJyZWQubm90aWZ5XG4gICAgKS5mYWlsKGRlZmVycmVkLnJlamVjdCk7XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIFByb21pc2Ugd2l0aCBhIHByb21pc2UgZGVzY3JpcHRvciBvYmplY3QgYW5kIG9wdGlvbmFsIGZhbGxiYWNrXG4gKiBmdW5jdGlvbi4gIFRoZSBkZXNjcmlwdG9yIGNvbnRhaW5zIG1ldGhvZHMgbGlrZSB3aGVuKHJlamVjdGVkKSwgZ2V0KG5hbWUpLFxuICogcHV0KG5hbWUsIHZhbHVlKSwgcG9zdChuYW1lLCBhcmdzKSwgYW5kIGRlbGV0ZShuYW1lKSwgd2hpY2ggYWxsXG4gKiByZXR1cm4gZWl0aGVyIGEgdmFsdWUsIGEgcHJvbWlzZSBmb3IgYSB2YWx1ZSwgb3IgYSByZWplY3Rpb24uICBUaGUgZmFsbGJhY2tcbiAqIGFjY2VwdHMgdGhlIG9wZXJhdGlvbiBuYW1lLCBhIHJlc29sdmVyLCBhbmQgYW55IGZ1cnRoZXIgYXJndW1lbnRzIHRoYXQgd291bGRcbiAqIGhhdmUgYmVlbiBmb3J3YXJkZWQgdG8gdGhlIGFwcHJvcHJpYXRlIG1ldGhvZCBhYm92ZSBoYWQgYSBtZXRob2QgYmVlblxuICogcHJvdmlkZWQgd2l0aCB0aGUgcHJvcGVyIG5hbWUuICBUaGUgQVBJIG1ha2VzIG5vIGd1YXJhbnRlZXMgYWJvdXQgdGhlIG5hdHVyZVxuICogb2YgdGhlIHJldHVybmVkIG9iamVjdCwgYXBhcnQgZnJvbSB0aGF0IGl0IGlzIHVzYWJsZSB3aGVyZWV2ZXIgcHJvbWlzZXMgYXJlXG4gKiBib3VnaHQgYW5kIHNvbGQuXG4gKi9cbmV4cG9ydHMubWFrZVByb21pc2UgPSBtYWtlUHJvbWlzZTtcbmZ1bmN0aW9uIG1ha2VQcm9taXNlKGRlc2NyaXB0b3IsIGZhbGxiYWNrLCB2YWx1ZU9mLCBleGNlcHRpb24pIHtcbiAgICBpZiAoZmFsbGJhY2sgPT09IHZvaWQgMCkge1xuICAgICAgICBmYWxsYmFjayA9IGZ1bmN0aW9uIChvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJQcm9taXNlIGRvZXMgbm90IHN1cHBvcnQgb3BlcmF0aW9uOiBcIiArIG9wKSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIHByb21pc2UgPSBvYmplY3RfY3JlYXRlKG1ha2VQcm9taXNlLnByb3RvdHlwZSk7XG5cbiAgICBwcm9taXNlLnByb21pc2VTZW5kID0gZnVuY3Rpb24gKG9wLCByZXNvbHZlZCAvKiAuLi5hcmdzICovKSB7XG4gICAgICAgIHZhciBhcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzLCAyKTtcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yW29wXSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRlc2NyaXB0b3Jbb3BdLmFwcGx5KHByb21pc2UsIGFyZ3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmYWxsYmFjay5hcHBseShwcm9taXNlLCBbb3BdLmNvbmNhdChhcmdzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgcmVzdWx0ID0gcmVqZWN0KGV4Y2VwdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc29sdmVkKSB7XG4gICAgICAgICAgICByZXNvbHZlZChyZXN1bHQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGlmICh2YWx1ZU9mKSB7XG4gICAgICAgIHByb21pc2UudmFsdWVPZiA9IHZhbHVlT2Y7XG4gICAgfVxuXG4gICAgaWYgKGV4Y2VwdGlvbikge1xuICAgICAgICBwcm9taXNlLmV4Y2VwdGlvbiA9IGV4Y2VwdGlvbjtcbiAgICB9XG5cbiAgICBkZWZlbmQocHJvbWlzZSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuLy8gcHJvdmlkZSB0aGVuYWJsZXMsIENvbW1vbkpTL1Byb21pc2VzL0Fcbm1ha2VQcm9taXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIHByb2dyZXNzZWQpIHtcbiAgICByZXR1cm4gd2hlbih0aGlzLCBmdWxmaWxsZWQsIHJlamVjdGVkLCBwcm9ncmVzc2VkKTtcbn07XG5cbm1ha2VQcm9taXNlLnByb3RvdHlwZS50aGVuUmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiB3aGVuKHRoaXMsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhbHVlOyB9KTtcbn07XG5cbi8vIENoYWluYWJsZSBtZXRob2RzXG5hcnJheV9yZWR1Y2UoXG4gICAgW1xuICAgICAgICBcImlzUmVzb2x2ZWRcIiwgXCJpc0Z1bGZpbGxlZFwiLCBcImlzUmVqZWN0ZWRcIixcbiAgICAgICAgXCJ3aGVuXCIsIFwic3ByZWFkXCIsIFwic2VuZFwiLFxuICAgICAgICBcImdldFwiLCBcInB1dFwiLCBcImRlbFwiLFxuICAgICAgICBcInBvc3RcIiwgXCJpbnZva2VcIixcbiAgICAgICAgXCJrZXlzXCIsXG4gICAgICAgIFwiYXBwbHlcIiwgXCJjYWxsXCIsIFwiYmluZFwiLFxuICAgICAgICBcImZhcHBseVwiLCBcImZjYWxsXCIsIFwiZmJpbmRcIixcbiAgICAgICAgXCJhbGxcIiwgXCJhbGxSZXNvbHZlZFwiLFxuICAgICAgICBcInZpZXdcIiwgXCJ2aWV3SW5mb1wiLFxuICAgICAgICBcInRpbWVvdXRcIiwgXCJkZWxheVwiLFxuICAgICAgICBcImNhdGNoXCIsIFwiZmluYWxseVwiLCBcImZhaWxcIiwgXCJmaW5cIiwgXCJwcm9ncmVzc1wiLCBcImVuZFwiLCBcImRvbmVcIixcbiAgICAgICAgXCJuZmNhbGxcIiwgXCJuZmFwcGx5XCIsIFwibmZiaW5kXCIsXG4gICAgICAgIFwibmNhbGxcIiwgXCJuYXBwbHlcIiwgXCJuYmluZFwiLFxuICAgICAgICBcIm5wb3N0XCIsIFwibmludm9rZVwiLFxuICAgICAgICBcIm5lbmRcIiwgXCJub2RlaWZ5XCJcbiAgICBdLFxuICAgIGZ1bmN0aW9uICh1bmRlZmluZWQsIG5hbWUpIHtcbiAgICAgICAgbWFrZVByb21pc2UucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGV4cG9ydHNbbmFtZV0uYXBwbHkoXG4gICAgICAgICAgICAgICAgZXhwb3J0cyxcbiAgICAgICAgICAgICAgICBbdGhpc10uY29uY2F0KGFycmF5X3NsaWNlKGFyZ3VtZW50cykpXG4gICAgICAgICAgICApO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgdm9pZCAwXG4pO1xuXG5tYWtlUHJvbWlzZS5wcm90b3R5cGUudG9Tb3VyY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbn07XG5cbm1ha2VQcm9taXNlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IFByb21pc2VdXCI7XG59O1xuXG5kZWZlbmQobWFrZVByb21pc2UucHJvdG90eXBlKTtcblxuLyoqXG4gKiBJZiBhbiBvYmplY3QgaXMgbm90IGEgcHJvbWlzZSwgaXQgaXMgYXMgXCJuZWFyXCIgYXMgcG9zc2libGUuXG4gKiBJZiBhIHByb21pc2UgaXMgcmVqZWN0ZWQsIGl0IGlzIGFzIFwibmVhclwiIGFzIHBvc3NpYmxlIHRvby5cbiAqIElmIGl04oCZcyBhIGZ1bGZpbGxlZCBwcm9taXNlLCB0aGUgZnVsZmlsbG1lbnQgdmFsdWUgaXMgbmVhcmVyLlxuICogSWYgaXTigJlzIGEgZGVmZXJyZWQgcHJvbWlzZSBhbmQgdGhlIGRlZmVycmVkIGhhcyBiZWVuIHJlc29sdmVkLCB0aGVcbiAqIHJlc29sdXRpb24gaXMgXCJuZWFyZXJcIi5cbiAqIEBwYXJhbSBvYmplY3RcbiAqIEByZXR1cm5zIG1vc3QgcmVzb2x2ZWQgKG5lYXJlc3QpIGZvcm0gb2YgdGhlIG9iamVjdFxuICovXG5leHBvcnRzLm5lYXJlciA9IHZhbHVlT2Y7XG5mdW5jdGlvbiB2YWx1ZU9mKHZhbHVlKSB7XG4gICAgaWYgKGlzUHJvbWlzZSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnZhbHVlT2YoKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBpcyBhIHByb21pc2UuXG4gKiBPdGhlcndpc2UgaXQgaXMgYSBmdWxmaWxsZWQgdmFsdWUuXG4gKi9cbmV4cG9ydHMuaXNQcm9taXNlID0gaXNQcm9taXNlO1xuZnVuY3Rpb24gaXNQcm9taXNlKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgJiYgdHlwZW9mIG9iamVjdC5wcm9taXNlU2VuZCA9PT0gXCJmdW5jdGlvblwiO1xufVxuXG4vKipcbiAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBjYW4gYmUgY29lcmNlZCB0byBhIHByb21pc2UuXG4gKiBPdGhlcndpc2UgaXQgaXMgYSBmdWxmaWxsZWQgdmFsdWUuXG4gKi9cbmV4cG9ydHMuaXNQcm9taXNlQWxpa2UgPSBpc1Byb21pc2VBbGlrZTtcbmZ1bmN0aW9uIGlzUHJvbWlzZUFsaWtlKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgJiYgdHlwZW9mIG9iamVjdC50aGVuID09PSBcImZ1bmN0aW9uXCI7XG59XG5cbi8qKlxuICogQHJldHVybnMgd2hldGhlciB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGEgcmVzb2x2ZWQgcHJvbWlzZS5cbiAqL1xuZXhwb3J0cy5pc1Jlc29sdmVkID0gaXNSZXNvbHZlZDtcbmZ1bmN0aW9uIGlzUmVzb2x2ZWQob2JqZWN0KSB7XG4gICAgcmV0dXJuIGlzRnVsZmlsbGVkKG9iamVjdCkgfHwgaXNSZWplY3RlZChvYmplY3QpO1xufVxuXG4vKipcbiAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBpcyBhIHZhbHVlIG9yIGZ1bGZpbGxlZFxuICogcHJvbWlzZS5cbiAqL1xuZXhwb3J0cy5pc0Z1bGZpbGxlZCA9IGlzRnVsZmlsbGVkO1xuZnVuY3Rpb24gaXNGdWxmaWxsZWQob2JqZWN0KSB7XG4gICAgcmV0dXJuICFpc1Byb21pc2VBbGlrZSh2YWx1ZU9mKG9iamVjdCkpO1xufVxuXG4vKipcbiAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBpcyBhIHJlamVjdGVkIHByb21pc2UuXG4gKi9cbmV4cG9ydHMuaXNSZWplY3RlZCA9IGlzUmVqZWN0ZWQ7XG5mdW5jdGlvbiBpc1JlamVjdGVkKG9iamVjdCkge1xuICAgIG9iamVjdCA9IHZhbHVlT2Yob2JqZWN0KTtcbiAgICByZXR1cm4gaXNQcm9taXNlKG9iamVjdCkgJiYgJ2V4Y2VwdGlvbicgaW4gb2JqZWN0O1xufVxuXG52YXIgcmVqZWN0aW9ucyA9IFtdO1xudmFyIGVycm9ycyA9IFtdO1xudmFyIGVycm9yc0Rpc3BsYXllZDtcbmZ1bmN0aW9uIGRpc3BsYXlFcnJvcnMoKSB7XG4gICAgaWYgKFxuICAgICAgICAhZXJyb3JzRGlzcGxheWVkICYmXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgIXdpbmRvdy5Ub3VjaCAmJlxuICAgICAgICB3aW5kb3cuY29uc29sZVxuICAgICkge1xuICAgICAgICAvLyBUaGlzIHByb21pc2UgbGlicmFyeSBjb25zdW1lcyBleGNlcHRpb25zIHRocm93biBpbiBoYW5kbGVycyBzb1xuICAgICAgICAvLyB0aGV5IGNhbiBiZSBoYW5kbGVkIGJ5IGEgc3Vic2VxdWVudCBwcm9taXNlLiAgVGhlIHJlamVjdGVkXG4gICAgICAgIC8vIHByb21pc2VzIGdldCBhZGRlZCB0byB0aGlzIGFycmF5IHdoZW4gdGhleSBhcmUgY3JlYXRlZCwgYW5kXG4gICAgICAgIC8vIHJlbW92ZWQgd2hlbiB0aGV5IGFyZSBoYW5kbGVkLlxuICAgICAgICBjb25zb2xlLmxvZyhcIlNob3VsZCBiZSBlbXB0eTpcIiwgZXJyb3JzKTtcbiAgICB9XG4gICAgZXJyb3JzRGlzcGxheWVkID0gdHJ1ZTtcbn1cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgcmVqZWN0ZWQgcHJvbWlzZS5cbiAqIEBwYXJhbSBleGNlcHRpb24gdmFsdWUgZGVzY3JpYmluZyB0aGUgZmFpbHVyZVxuICovXG5leHBvcnRzLnJlamVjdCA9IHJlamVjdDtcbmZ1bmN0aW9uIHJlamVjdChleGNlcHRpb24pIHtcbiAgICB2YXIgcmVqZWN0aW9uID0gbWFrZVByb21pc2Uoe1xuICAgICAgICBcIndoZW5cIjogZnVuY3Rpb24gKHJlamVjdGVkKSB7XG4gICAgICAgICAgICAvLyBub3RlIHRoYXQgdGhlIGVycm9yIGhhcyBiZWVuIGhhbmRsZWRcbiAgICAgICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgICAgICAgIHZhciBhdCA9IGFycmF5X2luZGV4T2YocmVqZWN0aW9ucywgdGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKGF0ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcnMuc3BsaWNlKGF0LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0aW9ucy5zcGxpY2UoYXQsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZWplY3RlZCA/IHJlamVjdGVkKGV4Y2VwdGlvbikgOiByZWplY3QoZXhjZXB0aW9uKTtcbiAgICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIGZhbGxiYWNrKCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KGV4Y2VwdGlvbik7XG4gICAgfSwgZnVuY3Rpb24gdmFsdWVPZigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSwgZXhjZXB0aW9uKTtcbiAgICAvLyBub3RlIHRoYXQgdGhlIGVycm9yIGhhcyBub3QgYmVlbiBoYW5kbGVkXG4gICAgZGlzcGxheUVycm9ycygpO1xuICAgIHJlamVjdGlvbnMucHVzaChyZWplY3Rpb24pO1xuICAgIGVycm9ycy5wdXNoKGV4Y2VwdGlvbik7XG4gICAgcmV0dXJuIHJlamVjdGlvbjtcbn1cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgcHJvbWlzZSBmb3IgYW4gaW1tZWRpYXRlIHJlZmVyZW5jZS5cbiAqIEBwYXJhbSB2YWx1ZSBpbW1lZGlhdGUgcmVmZXJlbmNlXG4gKi9cbmV4cG9ydHMuYmVnaW4gPSByZXNvbHZlOyAvLyBYWFggZXhwZXJpbWVudGFsXG5leHBvcnRzLnJlc29sdmUgPSByZXNvbHZlO1xuZXhwb3J0cy5yZWYgPSBkZXByZWNhdGUocmVzb2x2ZSwgXCJyZWZcIiwgXCJyZXNvbHZlXCIpOyAvLyBYWFggZGVwcmVjYXRlZCwgdXNlIHJlc29sdmVcbmZ1bmN0aW9uIHJlc29sdmUob2JqZWN0KSB7XG4gICAgLy8gSWYgdGhlIG9iamVjdCBpcyBhbHJlYWR5IGEgUHJvbWlzZSwgcmV0dXJuIGl0IGRpcmVjdGx5LiAgVGhpcyBlbmFibGVzXG4gICAgLy8gdGhlIHJlc29sdmUgZnVuY3Rpb24gdG8gYm90aCBiZSB1c2VkIHRvIGNyZWF0ZWQgcmVmZXJlbmNlcyBmcm9tIG9iamVjdHMsXG4gICAgLy8gYnV0IHRvIHRvbGVyYWJseSBjb2VyY2Ugbm9uLXByb21pc2VzIHRvIHByb21pc2VzLlxuICAgIGlmIChpc1Byb21pc2Uob2JqZWN0KSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgICAvLyBJbiBvcmRlciB0byBicmVhayBpbmZpbml0ZSByZWN1cnNpb24gb3IgbG9vcHMgYmV0d2VlbiBgdGhlbmAgYW5kXG4gICAgLy8gYHJlc29sdmVgLCBpdCBpcyBuZWNlc3NhcnkgdG8gYXR0ZW1wdCB0byBleHRyYWN0IGZ1bGZpbGxlZCB2YWx1ZXNcbiAgICAvLyBvdXQgb2YgZm9yZWlnbiBwcm9taXNlIGltcGxlbWVudGF0aW9ucyBiZWZvcmUgYXR0ZW1wdGluZyB0byB3cmFwXG4gICAgLy8gdGhlbSBhcyB1bnJlc29sdmVkIHByb21pc2VzLiAgSXQgaXMgbXkgaG9wZSB0aGF0IG90aGVyXG4gICAgLy8gaW1wbGVtZW50YXRpb25zIHdpbGwgaW1wbGVtZW50IGB2YWx1ZU9mYCB0byBzeW5jaHJvbm91c2x5IGV4dHJhY3RcbiAgICAvLyB0aGUgZnVsZmlsbG1lbnQgdmFsdWUgZnJvbSB0aGVpciBmdWxmaWxsZWQgcHJvbWlzZXMuICBJZiB0aGVcbiAgICAvLyBvdGhlciBwcm9taXNlIGxpYnJhcnkgZG9lcyBub3QgaW1wbGVtZW50IGB2YWx1ZU9mYCwgdGhlXG4gICAgLy8gaW1wbGVtZW50YXRpb25zIG9uIHByaW1vcmRpYWwgcHJvdG90eXBlcyBhcmUgaGFybWxlc3MuXG4gICAgb2JqZWN0ID0gdmFsdWVPZihvYmplY3QpO1xuICAgIC8vIGFzc2ltaWxhdGUgdGhlbmFibGVzLCBDb21tb25KUy9Qcm9taXNlcy9BXG4gICAgaWYgKGlzUHJvbWlzZUFsaWtlKG9iamVjdCkpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICAgICAgb2JqZWN0LnRoZW4oZGVmZXJyZWQucmVzb2x2ZSwgZGVmZXJyZWQucmVqZWN0LCBkZWZlcnJlZC5ub3RpZnkpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9XG4gICAgcmV0dXJuIG1ha2VQcm9taXNlKHtcbiAgICAgICAgXCJ3aGVuXCI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0XCI6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0W25hbWVdO1xuICAgICAgICB9LFxuICAgICAgICBcInB1dFwiOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgICAgIG9iamVjdFtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfSxcbiAgICAgICAgXCJkZWxcIjogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmplY3RbbmFtZV07XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9LFxuICAgICAgICBcInBvc3RcIjogZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0W25hbWVdLmFwcGx5KG9iamVjdCwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBcImFwcGx5XCI6IGZ1bmN0aW9uIChzZWxmLCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0LmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgICB9LFxuICAgICAgICBcImZhcHBseVwiOiBmdW5jdGlvbiAoYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdC5hcHBseSh2b2lkIDAsIGFyZ3MpO1xuICAgICAgICB9LFxuICAgICAgICBcInZpZXdJbmZvXCI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvbiA9IG9iamVjdDtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0aWVzID0ge307XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGZpeEZhbHN5UHJvcGVydHkobmFtZSkge1xuICAgICAgICAgICAgICAgIGlmICghcHJvcGVydGllc1tuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW25hbWVdID0gdHlwZW9mIG9uW25hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2hpbGUgKG9uKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob24pLmZvckVhY2goZml4RmFsc3lQcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgb24gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogdHlwZW9mIG9iamVjdCxcbiAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjogcHJvcGVydGllc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJrZXlzXCI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Rfa2V5cyhvYmplY3QpO1xuICAgICAgICB9XG4gICAgfSwgdm9pZCAwLCBmdW5jdGlvbiB2YWx1ZU9mKCkge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH0pO1xufVxuXG4vKipcbiAqIEFubm90YXRlcyBhbiBvYmplY3Qgc3VjaCB0aGF0IGl0IHdpbGwgbmV2ZXIgYmVcbiAqIHRyYW5zZmVycmVkIGF3YXkgZnJvbSB0aGlzIHByb2Nlc3Mgb3ZlciBhbnkgcHJvbWlzZVxuICogY29tbXVuaWNhdGlvbiBjaGFubmVsLlxuICogQHBhcmFtIG9iamVjdFxuICogQHJldHVybnMgcHJvbWlzZSBhIHdyYXBwaW5nIG9mIHRoYXQgb2JqZWN0IHRoYXRcbiAqIGFkZGl0aW9uYWxseSByZXNwb25kcyB0byB0aGUgXCJpc0RlZlwiIG1lc3NhZ2VcbiAqIHdpdGhvdXQgYSByZWplY3Rpb24uXG4gKi9cbmV4cG9ydHMubWFzdGVyID0gbWFzdGVyO1xuZnVuY3Rpb24gbWFzdGVyKG9iamVjdCkge1xuICAgIHJldHVybiBtYWtlUHJvbWlzZSh7XG4gICAgICAgIFwiaXNEZWZcIjogZnVuY3Rpb24gKCkge31cbiAgICB9LCBmdW5jdGlvbiBmYWxsYmFjaygpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBhcnJheV9zbGljZShhcmd1bWVudHMpO1xuICAgICAgICByZXR1cm4gc2VuZC5hcHBseSh2b2lkIDAsIFtvYmplY3RdLmNvbmNhdChhcmdzKSk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsdWVPZihvYmplY3QpO1xuICAgIH0pO1xufVxuXG5leHBvcnRzLnZpZXdJbmZvID0gdmlld0luZm87XG5mdW5jdGlvbiB2aWV3SW5mbyhvYmplY3QsIGluZm8pIHtcbiAgICBvYmplY3QgPSByZXNvbHZlKG9iamVjdCk7XG4gICAgaWYgKGluZm8pIHtcbiAgICAgICAgcmV0dXJuIG1ha2VQcm9taXNlKHtcbiAgICAgICAgICAgIFwidmlld0luZm9cIjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiBmYWxsYmFjaygpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBzZW5kLmFwcGx5KHZvaWQgMCwgW29iamVjdF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlT2Yob2JqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNlbmQob2JqZWN0LCBcInZpZXdJbmZvXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0cy52aWV3ID0gdmlldztcbmZ1bmN0aW9uIHZpZXcob2JqZWN0KSB7XG4gICAgcmV0dXJuIHZpZXdJbmZvKG9iamVjdCkud2hlbihmdW5jdGlvbiAoaW5mbykge1xuICAgICAgICB2YXIgdmlldztcbiAgICAgICAgaWYgKGluZm8udHlwZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB2aWV3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcHBseShvYmplY3QsIHZvaWQgMCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2aWV3ID0ge307XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBpbmZvLnByb3BlcnRpZXMgfHwge307XG4gICAgICAgIG9iamVjdF9rZXlzKHByb3BlcnRpZXMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW25hbWVdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICB2aWV3W25hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9zdChvYmplY3QsIG5hbWUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXNvbHZlKHZpZXcpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIFJlZ2lzdGVycyBhbiBvYnNlcnZlciBvbiBhIHByb21pc2UuXG4gKlxuICogR3VhcmFudGVlczpcbiAqXG4gKiAxLiB0aGF0IGZ1bGZpbGxlZCBhbmQgcmVqZWN0ZWQgd2lsbCBiZSBjYWxsZWQgb25seSBvbmNlLlxuICogMi4gdGhhdCBlaXRoZXIgdGhlIGZ1bGZpbGxlZCBjYWxsYmFjayBvciB0aGUgcmVqZWN0ZWQgY2FsbGJhY2sgd2lsbCBiZVxuICogICAgY2FsbGVkLCBidXQgbm90IGJvdGguXG4gKiAzLiB0aGF0IGZ1bGZpbGxlZCBhbmQgcmVqZWN0ZWQgd2lsbCBub3QgYmUgY2FsbGVkIGluIHRoaXMgdHVybi5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgICAgICBwcm9taXNlIG9yIGltbWVkaWF0ZSByZWZlcmVuY2UgdG8gb2JzZXJ2ZVxuICogQHBhcmFtIGZ1bGZpbGxlZCAgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdpdGggdGhlIGZ1bGZpbGxlZCB2YWx1ZVxuICogQHBhcmFtIHJlamVjdGVkICAgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdpdGggdGhlIHJlamVjdGlvbiBleGNlcHRpb25cbiAqIEBwYXJhbSBwcm9ncmVzc2VkIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBhbnkgcHJvZ3Jlc3Mgbm90aWZpY2F0aW9uc1xuICogQHJldHVybiBwcm9taXNlIGZvciB0aGUgcmV0dXJuIHZhbHVlIGZyb20gdGhlIGludm9rZWQgY2FsbGJhY2tcbiAqL1xuZXhwb3J0cy53aGVuID0gd2hlbjtcbmZ1bmN0aW9uIHdoZW4odmFsdWUsIGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIHByb2dyZXNzZWQpIHtcbiAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgIHZhciBkb25lID0gZmFsc2U7ICAgLy8gZW5zdXJlIHRoZSB1bnRydXN0ZWQgcHJvbWlzZSBtYWtlcyBhdCBtb3N0IGFcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbmdsZSBjYWxsIHRvIG9uZSBvZiB0aGUgY2FsbGJhY2tzXG5cbiAgICBmdW5jdGlvbiBfZnVsZmlsbGVkKHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIGZ1bGZpbGxlZCA9PT0gXCJmdW5jdGlvblwiID8gZnVsZmlsbGVkKHZhbHVlKSA6IHZhbHVlO1xuICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXhjZXB0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9yZWplY3RlZChleGNlcHRpb24pIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZWplY3RlZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBtYWtlU3RhY2tUcmFjZUxvbmcoZXhjZXB0aW9uLCByZXNvbHZlZFZhbHVlKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdGVkKGV4Y2VwdGlvbik7XG4gICAgICAgICAgICB9IGNhdGNoIChuZXdFeGNlcHRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ld0V4Y2VwdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlamVjdChleGNlcHRpb24pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9wcm9ncmVzc2VkKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgcHJvZ3Jlc3NlZCA9PT0gXCJmdW5jdGlvblwiID8gcHJvZ3Jlc3NlZCh2YWx1ZSkgOiB2YWx1ZTtcbiAgICB9XG5cbiAgICB2YXIgcmVzb2x2ZWRWYWx1ZSA9IHJlc29sdmUodmFsdWUpO1xuICAgIG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzb2x2ZWRWYWx1ZS5wcm9taXNlU2VuZChcIndoZW5cIiwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKF9mdWxmaWxsZWQodmFsdWUpKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb25lID0gdHJ1ZTtcblxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShfcmVqZWN0ZWQoZXhjZXB0aW9uKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gUHJvZ3Jlc3MgcHJvcGFnYXRvciBuZWVkIHRvIGJlIGF0dGFjaGVkIGluIHRoZSBjdXJyZW50IHRpY2suXG4gICAgcmVzb2x2ZWRWYWx1ZS5wcm9taXNlU2VuZChcIndoZW5cIiwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBkZWZlcnJlZC5ub3RpZnkoX3Byb2dyZXNzZWQodmFsdWUpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xufVxuXG4vKipcbiAqIFNwcmVhZHMgdGhlIHZhbHVlcyBvZiBhIHByb21pc2VkIGFycmF5IG9mIGFyZ3VtZW50cyBpbnRvIHRoZVxuICogZnVsZmlsbG1lbnQgY2FsbGJhY2suXG4gKiBAcGFyYW0gZnVsZmlsbGVkIGNhbGxiYWNrIHRoYXQgcmVjZWl2ZXMgdmFyaWFkaWMgYXJndW1lbnRzIGZyb20gdGhlXG4gKiBwcm9taXNlZCBhcnJheVxuICogQHBhcmFtIHJlamVjdGVkIGNhbGxiYWNrIHRoYXQgcmVjZWl2ZXMgdGhlIGV4Y2VwdGlvbiBpZiB0aGUgcHJvbWlzZVxuICogaXMgcmVqZWN0ZWQuXG4gKiBAcmV0dXJucyBhIHByb21pc2UgZm9yIHRoZSByZXR1cm4gdmFsdWUgb3IgdGhyb3duIGV4Y2VwdGlvbiBvZlxuICogZWl0aGVyIGNhbGxiYWNrLlxuICovXG5leHBvcnRzLnNwcmVhZCA9IHNwcmVhZDtcbmZ1bmN0aW9uIHNwcmVhZChwcm9taXNlLCBmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gICAgcmV0dXJuIHdoZW4ocHJvbWlzZSwgZnVuY3Rpb24gKHZhbHVlc09yUHJvbWlzZXMpIHtcbiAgICAgICAgcmV0dXJuIGFsbCh2YWx1ZXNPclByb21pc2VzKS50aGVuKGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBmdWxmaWxsZWQuYXBwbHkodm9pZCAwLCB2YWx1ZXMpO1xuICAgICAgICB9LCByZWplY3RlZCk7XG4gICAgfSwgcmVqZWN0ZWQpO1xufVxuXG4vKipcbiAqIFRoZSBhc3luYyBmdW5jdGlvbiBpcyBhIGRlY29yYXRvciBmb3IgZ2VuZXJhdG9yIGZ1bmN0aW9ucywgdHVybmluZ1xuICogdGhlbSBpbnRvIGFzeW5jaHJvbm91cyBnZW5lcmF0b3JzLiAgVGhpcyBwcmVzZW50bHkgb25seSB3b3JrcyBpblxuICogRmlyZWZveC9TcGlkZXJtb25rZXksIGhvd2V2ZXIsIHRoaXMgY29kZSBkb2VzIG5vdCBjYXVzZSBzeW50YXhcbiAqIGVycm9ycyBpbiBvbGRlciBlbmdpbmVzLiAgVGhpcyBjb2RlIHNob3VsZCBjb250aW51ZSB0byB3b3JrIGFuZFxuICogd2lsbCBpbiBmYWN0IGltcHJvdmUgb3ZlciB0aW1lIGFzIHRoZSBsYW5ndWFnZSBpbXByb3Zlcy5cbiAqXG4gKiBEZWNvcmF0ZXMgYSBnZW5lcmF0b3IgZnVuY3Rpb24gc3VjaCB0aGF0OlxuICogIC0gaXQgbWF5IHlpZWxkIHByb21pc2VzXG4gKiAgLSBleGVjdXRpb24gd2lsbCBjb250aW51ZSB3aGVuIHRoYXQgcHJvbWlzZSBpcyBmdWxmaWxsZWRcbiAqICAtIHRoZSB2YWx1ZSBvZiB0aGUgeWllbGQgZXhwcmVzc2lvbiB3aWxsIGJlIHRoZSBmdWxmaWxsZWQgdmFsdWVcbiAqICAtIGl0IHJldHVybnMgYSBwcm9taXNlIGZvciB0aGUgcmV0dXJuIHZhbHVlICh3aGVuIHRoZSBnZW5lcmF0b3JcbiAqICAgIHN0b3BzIGl0ZXJhdGluZylcbiAqICAtIHRoZSBkZWNvcmF0ZWQgZnVuY3Rpb24gcmV0dXJucyBhIHByb21pc2UgZm9yIHRoZSByZXR1cm4gdmFsdWVcbiAqICAgIG9mIHRoZSBnZW5lcmF0b3Igb3IgdGhlIGZpcnN0IHJlamVjdGVkIHByb21pc2UgYW1vbmcgdGhvc2VcbiAqICAgIHlpZWxkZWQuXG4gKiAgLSBpZiBhbiBlcnJvciBpcyB0aHJvd24gaW4gdGhlIGdlbmVyYXRvciwgaXQgcHJvcGFnYXRlcyB0aHJvdWdoXG4gKiAgICBldmVyeSBmb2xsb3dpbmcgeWllbGQgdW50aWwgaXQgaXMgY2F1Z2h0LCBvciB1bnRpbCBpdCBlc2NhcGVzXG4gKiAgICB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uIGFsdG9nZXRoZXIsIGFuZCBpcyB0cmFuc2xhdGVkIGludG8gYVxuICogICAgcmVqZWN0aW9uIGZvciB0aGUgcHJvbWlzZSByZXR1cm5lZCBieSB0aGUgZGVjb3JhdGVkIGdlbmVyYXRvci5cbiAqICAtIGluIHByZXNlbnQgaW1wbGVtZW50YXRpb25zIG9mIGdlbmVyYXRvcnMsIHdoZW4gYSBnZW5lcmF0b3JcbiAqICAgIGZ1bmN0aW9uIGlzIGNvbXBsZXRlLCBpdCB0aHJvd3MgYGBTdG9wSXRlcmF0aW9uYGAsIGBgcmV0dXJuYGAgaXNcbiAqICAgIGEgc3ludGF4IGVycm9yIGluIHRoZSBwcmVzZW5jZSBvZiBgYHlpZWxkYGAsIHNvIHRoZXJlIGlzIG5vXG4gKiAgICBvYnNlcnZhYmxlIHJldHVybiB2YWx1ZS4gVGhlcmUgaXMgYSBwcm9wb3NhbFsxXSB0byBhZGQgc3VwcG9ydFxuICogICAgZm9yIGBgcmV0dXJuYGAsIHdoaWNoIHdvdWxkIHBlcm1pdCB0aGUgdmFsdWUgdG8gYmUgY2FycmllZCBieSBhXG4gKiAgICBgYFN0b3BJdGVyYXRpb25gYCBpbnN0YW5jZSwgaW4gd2hpY2ggY2FzZSBpdCB3b3VsZCBmdWxmaWxsIHRoZVxuICogICAgcHJvbWlzZSByZXR1cm5lZCBieSB0aGUgYXN5bmNocm9ub3VzIGdlbmVyYXRvci4gIFRoaXMgY2FuIGJlXG4gKiAgICBlbXVsYXRlZCB0b2RheSBieSB0aHJvd2luZyBTdG9wSXRlcmF0aW9uIGV4cGxpY2l0bHkgd2l0aCBhIHZhbHVlXG4gKiAgICBwcm9wZXJ0eS5cbiAqXG4gKiAgWzFdOiBodHRwOi8vd2lraS5lY21hc2NyaXB0Lm9yZy9kb2t1LnBocD9pZD1zdHJhd21hbjphc3luY19mdW5jdGlvbnMjcmVmZXJlbmNlX2ltcGxlbWVudGF0aW9uXG4gKlxuICovXG5leHBvcnRzLmFzeW5jID0gYXN5bmM7XG5mdW5jdGlvbiBhc3luYyhtYWtlR2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gd2hlbiB2ZXJiIGlzIFwic2VuZFwiLCBhcmcgaXMgYSB2YWx1ZVxuICAgICAgICAvLyB3aGVuIHZlcmIgaXMgXCJ0aHJvd1wiLCBhcmcgaXMgYW4gZXhjZXB0aW9uXG4gICAgICAgIGZ1bmN0aW9uIGNvbnRpbnVlcih2ZXJiLCBhcmcpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGdlbmVyYXRvclt2ZXJiXShhcmcpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcEl0ZXJhdGlvbihleGNlcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBleGNlcHRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChleGNlcHRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB3aGVuKHJlc3VsdCwgY2FsbGJhY2ssIGVycmJhY2spO1xuICAgICAgICB9XG4gICAgICAgIHZhciBnZW5lcmF0b3IgPSBtYWtlR2VuZXJhdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGNvbnRpbnVlci5iaW5kKGNvbnRpbnVlciwgXCJzZW5kXCIpO1xuICAgICAgICB2YXIgZXJyYmFjayA9IGNvbnRpbnVlci5iaW5kKGNvbnRpbnVlciwgXCJ0aHJvd1wiKTtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBSZXR1cm5WYWx1ZSBleGNlcHRpb24gdG8gc3RvcCBhbiBhc3luY2hyb25vdXMgZ2VuZXJhdG9yLlxuICogT25seSB1c2VmdWwgcHJlc2VudGx5IGluIEZpcmVmb3gvU3BpZGVyTW9ua2V5IHNpbmNlIGdlbmVyYXRvcnMgYXJlXG4gKiBpbXBsZW1lbnRlZC5cbiAqIEBwYXJhbSB2YWx1ZSB0aGUgcmV0dXJuIHZhbHVlIGZvciB0aGUgc3Vycm91bmRpbmcgZ2VuZXJhdG9yXG4gKiBAdGhyb3dzIFJldHVyblZhbHVlIGV4Y2VwdGlvbiB3aXRoIHRoZSB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKiBRLmFzeW5jKGZ1bmN0aW9uICgpIHtcbiAqICAgICAgdmFyIGZvbyA9IHlpZWxkIGdldEZvb1Byb21pc2UoKTtcbiAqICAgICAgdmFyIGJhciA9IHlpZWxkIGdldEJhclByb21pc2UoKTtcbiAqICAgICAgUS5yZXR1cm4oZm9vICsgYmFyKTtcbiAqIH0pXG4gKi9cbmV4cG9ydHNbJ3JldHVybiddID0gX3JldHVybjtcbmZ1bmN0aW9uIF9yZXR1cm4odmFsdWUpIHtcbiAgICB0aHJvdyBuZXcgUVJldHVyblZhbHVlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGUgcHJvbWlzZWQgZnVuY3Rpb24gZGVjb3JhdG9yIGVuc3VyZXMgdGhhdCBhbnkgcHJvbWlzZSBhcmd1bWVudHNcbiAqIGFyZSByZXNvbHZlZCBhbmQgcGFzc2VkIGFzIHZhbHVlcyAoYHRoaXNgIGlzIGFsc28gcmVzb2x2ZWQgYW5kIHBhc3NlZFxuICogYXMgYSB2YWx1ZSkuICBJdCB3aWxsIGFsc28gZW5zdXJlIHRoYXQgdGhlIHJlc3VsdCBvZiBhIGZ1bmN0aW9uIGlzXG4gKiBhbHdheXMgYSBwcm9taXNlLlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgYWRkID0gUS5wcm9taXNlZChmdW5jdGlvbiAoYSwgYikge1xuICogICAgIHJldHVybiBhICsgYjtcbiAqIH0pO1xuICogYWRkKFEucmVzb2x2ZShhKSwgUS5yZXNvbHZlKEIpKTtcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gZGVjb3JhdGVcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn0gYSBmdW5jdGlvbiB0aGF0IGhhcyBiZWVuIGRlY29yYXRlZC5cbiAqL1xuZXhwb3J0cy5wcm9taXNlZCA9IHByb21pc2VkO1xuZnVuY3Rpb24gcHJvbWlzZWQoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYWxsKFt0aGlzLCBhbGwoYXJndW1lbnRzKV0pLnNwcmVhZChmdW5jdGlvbiAoc2VsZiwgYXJncykge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjay5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgcHJvbWlzZSBtZXRob2QgdGhhdCBjYW4gYmUgdXNlZCB0byBzYWZlbHkgb2JzZXJ2ZSByZXNvbHV0aW9uIG9mXG4gKiBhIHByb21pc2UgZm9yIGFuIGFyYml0cmFyaWx5IG5hbWVkIG1ldGhvZCBsaWtlIFwicHJvcGZpbmRcIiBpbiBhIGZ1dHVyZSB0dXJuLlxuICovXG5leHBvcnRzLnNlbmRlciA9IGRlcHJlY2F0ZShzZW5kZXIsIFwic2VuZGVyXCIsIFwiZGlzcGF0Y2hlclwiKTsgLy8gWFhYIGRlcHJlY2F0ZWQsIHVzZSBkaXNwYXRjaGVyXG5leHBvcnRzLk1ldGhvZCA9IGRlcHJlY2F0ZShzZW5kZXIsIFwiTWV0aG9kXCIsIFwiZGlzcGF0Y2hlclwiKTsgLy8gWFhYIGRlcHJlY2F0ZWQsIHVzZSBkaXNwYXRjaGVyXG5mdW5jdGlvbiBzZW5kZXIob3ApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgICB2YXIgYXJncyA9IGFycmF5X3NsaWNlKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIHJldHVybiBzZW5kLmFwcGx5KHZvaWQgMCwgW29iamVjdCwgb3BdLmNvbmNhdChhcmdzKSk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBzZW5kcyBhIG1lc3NhZ2UgdG8gYSB2YWx1ZSBpbiBhIGZ1dHVyZSB0dXJuXG4gKiBAcGFyYW0gb2JqZWN0KiB0aGUgcmVjaXBpZW50XG4gKiBAcGFyYW0gb3AgdGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2Ugb3BlcmF0aW9uLCBlLmcuLCBcIndoZW5cIixcbiAqIEBwYXJhbSAuLi5hcmdzIGZ1cnRoZXIgYXJndW1lbnRzIHRvIGJlIGZvcndhcmRlZCB0byB0aGUgb3BlcmF0aW9uXG4gKiBAcmV0dXJucyByZXN1bHQge1Byb21pc2V9IGEgcHJvbWlzZSBmb3IgdGhlIHJlc3VsdCBvZiB0aGUgb3BlcmF0aW9uXG4gKi9cbmV4cG9ydHMuc2VuZCA9IGRlcHJlY2F0ZShzZW5kLCBcInNlbmRcIiwgXCJkaXNwYXRjaFwiKTsgLy8gWFhYIGRlcHJlY2F0ZWQsIHVzZSBkaXNwYXRjaFxuZnVuY3Rpb24gc2VuZChvYmplY3QsIG9wKSB7XG4gICAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICB2YXIgYXJncyA9IGFycmF5X3NsaWNlKGFyZ3VtZW50cywgMik7XG4gICAgb2JqZWN0ID0gcmVzb2x2ZShvYmplY3QpO1xuICAgIG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb2JqZWN0LnByb21pc2VTZW5kLmFwcGx5KFxuICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgW29wLCBkZWZlcnJlZC5yZXNvbHZlXS5jb25jYXQoYXJncylcbiAgICAgICAgKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn1cblxuLyoqXG4gKiBzZW5kcyBhIG1lc3NhZ2UgdG8gYSB2YWx1ZSBpbiBhIGZ1dHVyZSB0dXJuXG4gKiBAcGFyYW0gb2JqZWN0KiB0aGUgcmVjaXBpZW50XG4gKiBAcGFyYW0gb3AgdGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2Ugb3BlcmF0aW9uLCBlLmcuLCBcIndoZW5cIixcbiAqIEBwYXJhbSBhcmdzIGZ1cnRoZXIgYXJndW1lbnRzIHRvIGJlIGZvcndhcmRlZCB0byB0aGUgb3BlcmF0aW9uXG4gKiBAcmV0dXJucyByZXN1bHQge1Byb21pc2V9IGEgcHJvbWlzZSBmb3IgdGhlIHJlc3VsdCBvZiB0aGUgb3BlcmF0aW9uXG4gKi9cbmV4cG9ydHMuZGlzcGF0Y2ggPSBkaXNwYXRjaDtcbmZ1bmN0aW9uIGRpc3BhdGNoKG9iamVjdCwgb3AsIGFyZ3MpIHtcbiAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgIG9iamVjdCA9IHJlc29sdmUob2JqZWN0KTtcbiAgICBuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9iamVjdC5wcm9taXNlU2VuZC5hcHBseShcbiAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgIFtvcCwgZGVmZXJyZWQucmVzb2x2ZV0uY29uY2F0KGFyZ3MpXG4gICAgICAgICk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIHByb21pc2UgbWV0aG9kIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2FmZWx5IG9ic2VydmUgcmVzb2x1dGlvbiBvZlxuICogYSBwcm9taXNlIGZvciBhbiBhcmJpdHJhcmlseSBuYW1lZCBtZXRob2QgbGlrZSBcInByb3BmaW5kXCIgaW4gYSBmdXR1cmUgdHVybi5cbiAqXG4gKiBcImRpc3BhdGNoZXJcIiBjb25zdHJ1Y3RzIG1ldGhvZHMgbGlrZSBcImdldChwcm9taXNlLCBuYW1lKVwiIGFuZCBcInB1dChwcm9taXNlKVwiLlxuICovXG5leHBvcnRzLmRpc3BhdGNoZXIgPSBkaXNwYXRjaGVyO1xuZnVuY3Rpb24gZGlzcGF0Y2hlcihvcCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICAgIHZhciBhcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgcmV0dXJuIGRpc3BhdGNoKG9iamVjdCwgb3AsIGFyZ3MpO1xuICAgIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgb2YgYSBwcm9wZXJ0eSBpbiBhIGZ1dHVyZSB0dXJuLlxuICogQHBhcmFtIG9iamVjdCAgICBwcm9taXNlIG9yIGltbWVkaWF0ZSByZWZlcmVuY2UgZm9yIHRhcmdldCBvYmplY3RcbiAqIEBwYXJhbSBuYW1lICAgICAgbmFtZSBvZiBwcm9wZXJ0eSB0byBnZXRcbiAqIEByZXR1cm4gcHJvbWlzZSBmb3IgdGhlIHByb3BlcnR5IHZhbHVlXG4gKi9cbmV4cG9ydHMuZ2V0ID0gZGlzcGF0Y2hlcihcImdldFwiKTtcblxuLyoqXG4gKiBTZXRzIHRoZSB2YWx1ZSBvZiBhIHByb3BlcnR5IGluIGEgZnV0dXJlIHR1cm4uXG4gKiBAcGFyYW0gb2JqZWN0ICAgIHByb21pc2Ugb3IgaW1tZWRpYXRlIHJlZmVyZW5jZSBmb3Igb2JqZWN0IG9iamVjdFxuICogQHBhcmFtIG5hbWUgICAgICBuYW1lIG9mIHByb3BlcnR5IHRvIHNldFxuICogQHBhcmFtIHZhbHVlICAgICBuZXcgdmFsdWUgb2YgcHJvcGVydHlcbiAqIEByZXR1cm4gcHJvbWlzZSBmb3IgdGhlIHJldHVybiB2YWx1ZVxuICovXG5leHBvcnRzLnB1dCA9IGRpc3BhdGNoZXIoXCJwdXRcIik7XG5cbi8qKlxuICogRGVsZXRlcyBhIHByb3BlcnR5IGluIGEgZnV0dXJlIHR1cm4uXG4gKiBAcGFyYW0gb2JqZWN0ICAgIHByb21pc2Ugb3IgaW1tZWRpYXRlIHJlZmVyZW5jZSBmb3IgdGFyZ2V0IG9iamVjdFxuICogQHBhcmFtIG5hbWUgICAgICBuYW1lIG9mIHByb3BlcnR5IHRvIGRlbGV0ZVxuICogQHJldHVybiBwcm9taXNlIGZvciB0aGUgcmV0dXJuIHZhbHVlXG4gKi9cbmV4cG9ydHNbXCJkZWxldGVcIl0gPSAvLyBYWFggZXhwZXJpbWVudGFsXG5leHBvcnRzLmRlbCA9IGRpc3BhdGNoZXIoXCJkZWxcIik7XG5cbi8qKlxuICogSW52b2tlcyBhIG1ldGhvZCBpbiBhIGZ1dHVyZSB0dXJuLlxuICogQHBhcmFtIG9iamVjdCAgICBwcm9taXNlIG9yIGltbWVkaWF0ZSByZWZlcmVuY2UgZm9yIHRhcmdldCBvYmplY3RcbiAqIEBwYXJhbSBuYW1lICAgICAgbmFtZSBvZiBtZXRob2QgdG8gaW52b2tlXG4gKiBAcGFyYW0gdmFsdWUgICAgIGEgdmFsdWUgdG8gcG9zdCwgdHlwaWNhbGx5IGFuIGFycmF5IG9mXG4gKiAgICAgICAgICAgICAgICAgIGludm9jYXRpb24gYXJndW1lbnRzIGZvciBwcm9taXNlcyB0aGF0XG4gKiAgICAgICAgICAgICAgICAgIGFyZSB1bHRpbWF0ZWx5IGJhY2tlZCB3aXRoIGByZXNvbHZlYCB2YWx1ZXMsXG4gKiAgICAgICAgICAgICAgICAgIGFzIG9wcG9zZWQgdG8gdGhvc2UgYmFja2VkIHdpdGggVVJMc1xuICogICAgICAgICAgICAgICAgICB3aGVyZWluIHRoZSBwb3N0ZWQgdmFsdWUgY2FuIGJlIGFueVxuICogICAgICAgICAgICAgICAgICBKU09OIHNlcmlhbGl6YWJsZSBvYmplY3QuXG4gKiBAcmV0dXJuIHByb21pc2UgZm9yIHRoZSByZXR1cm4gdmFsdWVcbiAqL1xuLy8gYm91bmQgbG9jYWxseSBiZWNhdXNlIGl0IGlzIHVzZWQgYnkgb3RoZXIgbWV0aG9kc1xudmFyIHBvc3QgPSBleHBvcnRzLnBvc3QgPSBkaXNwYXRjaGVyKFwicG9zdFwiKTtcblxuLyoqXG4gKiBJbnZva2VzIGEgbWV0aG9kIGluIGEgZnV0dXJlIHR1cm4uXG4gKiBAcGFyYW0gb2JqZWN0ICAgIHByb21pc2Ugb3IgaW1tZWRpYXRlIHJlZmVyZW5jZSBmb3IgdGFyZ2V0IG9iamVjdFxuICogQHBhcmFtIG5hbWUgICAgICBuYW1lIG9mIG1ldGhvZCB0byBpbnZva2VcbiAqIEBwYXJhbSAuLi5hcmdzICAgYXJyYXkgb2YgaW52b2NhdGlvbiBhcmd1bWVudHNcbiAqIEByZXR1cm4gcHJvbWlzZSBmb3IgdGhlIHJldHVybiB2YWx1ZVxuICovXG5leHBvcnRzLmludm9rZSA9IGZ1bmN0aW9uICh2YWx1ZSwgbmFtZSkge1xuICAgIHZhciBhcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzLCAyKTtcbiAgICByZXR1cm4gcG9zdCh2YWx1ZSwgbmFtZSwgYXJncyk7XG59O1xuXG4vKipcbiAqIEFwcGxpZXMgdGhlIHByb21pc2VkIGZ1bmN0aW9uIGluIGEgZnV0dXJlIHR1cm4uXG4gKiBAcGFyYW0gb2JqZWN0ICAgIHByb21pc2Ugb3IgaW1tZWRpYXRlIHJlZmVyZW5jZSBmb3IgdGFyZ2V0IGZ1bmN0aW9uXG4gKiBAcGFyYW0gdGhpc3AgICAgIHRoZSBgdGhpc2Agb2JqZWN0IGZvciB0aGUgY2FsbFxuICogQHBhcmFtIGFyZ3MgICAgICBhcnJheSBvZiBhcHBsaWNhdGlvbiBhcmd1bWVudHNcbiAqL1xuLy8gWFhYIGRlcHJlY2F0ZWQsIHVzZSBmYXBwbHlcbnZhciBhcHBseSA9IGV4cG9ydHMuYXBwbHkgPSBkZXByZWNhdGUoZGlzcGF0Y2hlcihcImFwcGx5XCIpLCBcImFwcGx5XCIsIFwiZmFwcGx5XCIpO1xuXG4vKipcbiAqIEFwcGxpZXMgdGhlIHByb21pc2VkIGZ1bmN0aW9uIGluIGEgZnV0dXJlIHR1cm4uXG4gKiBAcGFyYW0gb2JqZWN0ICAgIHByb21pc2Ugb3IgaW1tZWRpYXRlIHJlZmVyZW5jZSBmb3IgdGFyZ2V0IGZ1bmN0aW9uXG4gKiBAcGFyYW0gYXJncyAgICAgIGFycmF5IG9mIGFwcGxpY2F0aW9uIGFyZ3VtZW50c1xuICovXG52YXIgZmFwcGx5ID0gZXhwb3J0cy5mYXBwbHkgPSBkaXNwYXRjaGVyKFwiZmFwcGx5XCIpO1xuXG4vKipcbiAqIENhbGxzIHRoZSBwcm9taXNlZCBmdW5jdGlvbiBpbiBhIGZ1dHVyZSB0dXJuLlxuICogQHBhcmFtIG9iamVjdCAgICBwcm9taXNlIG9yIGltbWVkaWF0ZSByZWZlcmVuY2UgZm9yIHRhcmdldCBmdW5jdGlvblxuICogQHBhcmFtIHRoaXNwICAgICB0aGUgYHRoaXNgIG9iamVjdCBmb3IgdGhlIGNhbGxcbiAqIEBwYXJhbSAuLi5hcmdzICAgYXJyYXkgb2YgYXBwbGljYXRpb24gYXJndW1lbnRzXG4gKi9cbi8vIFhYWCBkZXByZWNhdGVkLCB1c2UgZmNhbGxcbmV4cG9ydHMuY2FsbCA9IGRlcHJlY2F0ZShjYWxsLCBcImNhbGxcIiwgXCJmY2FsbFwiKTtcbmZ1bmN0aW9uIGNhbGwodmFsdWUsIHRoaXNwKSB7XG4gICAgdmFyIGFyZ3MgPSBhcnJheV9zbGljZShhcmd1bWVudHMsIDIpO1xuICAgIHJldHVybiBhcHBseSh2YWx1ZSwgdGhpc3AsIGFyZ3MpO1xufVxuXG4vKipcbiAqIENhbGxzIHRoZSBwcm9taXNlZCBmdW5jdGlvbiBpbiBhIGZ1dHVyZSB0dXJuLlxuICogQHBhcmFtIG9iamVjdCAgICBwcm9taXNlIG9yIGltbWVkaWF0ZSByZWZlcmVuY2UgZm9yIHRhcmdldCBmdW5jdGlvblxuICogQHBhcmFtIC4uLmFyZ3MgICBhcnJheSBvZiBhcHBsaWNhdGlvbiBhcmd1bWVudHNcbiAqL1xuZXhwb3J0c1tcInRyeVwiXSA9IGZjYWxsOyAvLyBYWFggZXhwZXJpbWVudGFsXG5leHBvcnRzLmZjYWxsID0gZmNhbGw7XG5mdW5jdGlvbiBmY2FsbCh2YWx1ZSkge1xuICAgIHZhciBhcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzLCAxKTtcbiAgICByZXR1cm4gZmFwcGx5KHZhbHVlLCBhcmdzKTtcbn1cblxuLyoqXG4gKiBCaW5kcyB0aGUgcHJvbWlzZWQgZnVuY3Rpb24sIHRyYW5zZm9ybWluZyByZXR1cm4gdmFsdWVzIGludG8gYSBmdWxmaWxsZWRcbiAqIHByb21pc2UgYW5kIHRocm93biBlcnJvcnMgaW50byBhIHJlamVjdGVkIG9uZS5cbiAqIEBwYXJhbSBvYmplY3QgICAgcHJvbWlzZSBvciBpbW1lZGlhdGUgcmVmZXJlbmNlIGZvciB0YXJnZXQgZnVuY3Rpb25cbiAqIEBwYXJhbSB0aGlzcCAgIHRoZSBgdGhpc2Agb2JqZWN0IGZvciB0aGUgY2FsbFxuICogQHBhcmFtIC4uLmFyZ3MgICBhcnJheSBvZiBhcHBsaWNhdGlvbiBhcmd1bWVudHNcbiAqL1xuZXhwb3J0cy5iaW5kID0gZGVwcmVjYXRlKGJpbmQsIFwiYmluZFwiLCBcImZiaW5kXCIpOyAvLyBYWFggZGVwcmVjYXRlZCwgdXNlIGZiaW5kXG5mdW5jdGlvbiBiaW5kKHZhbHVlLCB0aGlzcCkge1xuICAgIHZhciBhcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzLCAyKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gYm91bmQoKSB7XG4gICAgICAgIHZhciBhbGxBcmdzID0gYXJncy5jb25jYXQoYXJyYXlfc2xpY2UoYXJndW1lbnRzKSk7XG4gICAgICAgIHJldHVybiBhcHBseSh2YWx1ZSwgdGhpc3AsIGFsbEFyZ3MpO1xuICAgIH07XG59XG5cbi8qKlxuICogQmluZHMgdGhlIHByb21pc2VkIGZ1bmN0aW9uLCB0cmFuc2Zvcm1pbmcgcmV0dXJuIHZhbHVlcyBpbnRvIGEgZnVsZmlsbGVkXG4gKiBwcm9taXNlIGFuZCB0aHJvd24gZXJyb3JzIGludG8gYSByZWplY3RlZCBvbmUuXG4gKiBAcGFyYW0gb2JqZWN0ICAgIHByb21pc2Ugb3IgaW1tZWRpYXRlIHJlZmVyZW5jZSBmb3IgdGFyZ2V0IGZ1bmN0aW9uXG4gKiBAcGFyYW0gLi4uYXJncyAgIGFycmF5IG9mIGFwcGxpY2F0aW9uIGFyZ3VtZW50c1xuICovXG5leHBvcnRzLmZiaW5kID0gZmJpbmQ7XG5mdW5jdGlvbiBmYmluZCh2YWx1ZSkge1xuICAgIHZhciBhcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzLCAxKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gZmJvdW5kKCkge1xuICAgICAgICB2YXIgYWxsQXJncyA9IGFyZ3MuY29uY2F0KGFycmF5X3NsaWNlKGFyZ3VtZW50cykpO1xuICAgICAgICByZXR1cm4gZmFwcGx5KHZhbHVlLCBhbGxBcmdzKTtcbiAgICB9O1xufVxuXG4vKipcbiAqIFJlcXVlc3RzIHRoZSBuYW1lcyBvZiB0aGUgb3duZWQgcHJvcGVydGllcyBvZiBhIHByb21pc2VkXG4gKiBvYmplY3QgaW4gYSBmdXR1cmUgdHVybi5cbiAqIEBwYXJhbSBvYmplY3QgICAgcHJvbWlzZSBvciBpbW1lZGlhdGUgcmVmZXJlbmNlIGZvciB0YXJnZXQgb2JqZWN0XG4gKiBAcmV0dXJuIHByb21pc2UgZm9yIHRoZSBrZXlzIG9mIHRoZSBldmVudHVhbGx5IHJlc29sdmVkIG9iamVjdFxuICovXG5leHBvcnRzLmtleXMgPSBkaXNwYXRjaGVyKFwia2V5c1wiKTtcblxuLyoqXG4gKiBUdXJucyBhbiBhcnJheSBvZiBwcm9taXNlcyBpbnRvIGEgcHJvbWlzZSBmb3IgYW4gYXJyYXkuICBJZiBhbnkgb2ZcbiAqIHRoZSBwcm9taXNlcyBnZXRzIHJlamVjdGVkLCB0aGUgd2hvbGUgYXJyYXkgaXMgcmVqZWN0ZWQgaW1tZWRpYXRlbHkuXG4gKiBAcGFyYW0ge0FycmF5Kn0gYW4gYXJyYXkgKG9yIHByb21pc2UgZm9yIGFuIGFycmF5KSBvZiB2YWx1ZXMgKG9yXG4gKiBwcm9taXNlcyBmb3IgdmFsdWVzKVxuICogQHJldHVybnMgYSBwcm9taXNlIGZvciBhbiBhcnJheSBvZiB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZXNcbiAqL1xuLy8gQnkgTWFyayBNaWxsZXJcbi8vIGh0dHA6Ly93aWtpLmVjbWFzY3JpcHQub3JnL2Rva3UucGhwP2lkPXN0cmF3bWFuOmNvbmN1cnJlbmN5JnJldj0xMzA4Nzc2NTIxI2FsbGZ1bGZpbGxlZFxuZXhwb3J0cy5hbGwgPSBhbGw7XG5mdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgICByZXR1cm4gd2hlbihwcm9taXNlcywgZnVuY3Rpb24gKHByb21pc2VzKSB7XG4gICAgICAgIHZhciBjb3VudERvd24gPSBwcm9taXNlcy5sZW5ndGg7XG4gICAgICAgIGlmIChjb3VudERvd24gPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHByb21pc2VzKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgICAgICBhcnJheV9yZWR1Y2UocHJvbWlzZXMsIGZ1bmN0aW9uICh1bmRlZmluZWQsIHByb21pc2UsIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoaXNGdWxmaWxsZWQocHJvbWlzZSkpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlc1tpbmRleF0gPSB2YWx1ZU9mKHByb21pc2UpO1xuICAgICAgICAgICAgICAgIGlmICgtLWNvdW50RG93biA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHByb21pc2VzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdoZW4ocHJvbWlzZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2VzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoLS1jb3VudERvd24gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocHJvbWlzZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmFpbChkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB2b2lkIDApO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBXYWl0cyBmb3IgYWxsIHByb21pc2VzIHRvIGJlIHJlc29sdmVkLCBlaXRoZXIgZnVsZmlsbGVkIG9yXG4gKiByZWplY3RlZC4gIFRoaXMgaXMgZGlzdGluY3QgZnJvbSBgYWxsYCBzaW5jZSB0aGF0IHdvdWxkIHN0b3BcbiAqIHdhaXRpbmcgYXQgdGhlIGZpcnN0IHJlamVjdGlvbi4gIFRoZSBwcm9taXNlIHJldHVybmVkIGJ5XG4gKiBgYWxsUmVzb2x2ZWRgIHdpbGwgbmV2ZXIgYmUgcmVqZWN0ZWQuXG4gKiBAcGFyYW0gcHJvbWlzZXMgYSBwcm9taXNlIGZvciBhbiBhcnJheSAob3IgYW4gYXJyYXkpIG9mIHByb21pc2VzXG4gKiAob3IgdmFsdWVzKVxuICogQHJldHVybiBhIHByb21pc2UgZm9yIGFuIGFycmF5IG9mIHByb21pc2VzXG4gKi9cbmV4cG9ydHMuYWxsUmVzb2x2ZWQgPSBhbGxSZXNvbHZlZDtcbmZ1bmN0aW9uIGFsbFJlc29sdmVkKHByb21pc2VzKSB7XG4gICAgcmV0dXJuIHdoZW4ocHJvbWlzZXMsIGZ1bmN0aW9uIChwcm9taXNlcykge1xuICAgICAgICByZXR1cm4gd2hlbihhbGwoYXJyYXlfbWFwKHByb21pc2VzLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHdoZW4ocHJvbWlzZSwgbm9vcCwgbm9vcCk7XG4gICAgICAgIH0pKSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGFycmF5X21hcChwcm9taXNlcywgcmVzb2x2ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIENhcHR1cmVzIHRoZSBmYWlsdXJlIG9mIGEgcHJvbWlzZSwgZ2l2aW5nIGFuIG9wb3J0dW5pdHkgdG8gcmVjb3ZlclxuICogd2l0aCBhIGNhbGxiYWNrLiAgSWYgdGhlIGdpdmVuIHByb21pc2UgaXMgZnVsZmlsbGVkLCB0aGUgcmV0dXJuZWRcbiAqIHByb21pc2UgaXMgZnVsZmlsbGVkLlxuICogQHBhcmFtIHtBbnkqfSBwcm9taXNlIGZvciBzb21ldGhpbmdcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIHRvIGZ1bGZpbGwgdGhlIHJldHVybmVkIHByb21pc2UgaWYgdGhlXG4gKiBnaXZlbiBwcm9taXNlIGlzIHJlamVjdGVkXG4gKiBAcmV0dXJucyBhIHByb21pc2UgZm9yIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGNhbGxiYWNrXG4gKi9cbmV4cG9ydHNbXCJjYXRjaFwiXSA9IC8vIFhYWCBleHBlcmltZW50YWxcbmV4cG9ydHMuZmFpbCA9IGZhaWw7XG5mdW5jdGlvbiBmYWlsKHByb21pc2UsIHJlamVjdGVkKSB7XG4gICAgcmV0dXJuIHdoZW4ocHJvbWlzZSwgdm9pZCAwLCByZWplY3RlZCk7XG59XG5cbi8qKlxuICogQXR0YWNoZXMgYSBsaXN0ZW5lciB0aGF0IGNhbiByZXNwb25kIHRvIHByb2dyZXNzIG5vdGlmaWNhdGlvbnMgZnJvbSBhXG4gKiBwcm9taXNlJ3Mgb3JpZ2luYXRpbmcgZGVmZXJyZWQuIFRoaXMgbGlzdGVuZXIgcmVjZWl2ZXMgdGhlIGV4YWN0IGFyZ3VtZW50c1xuICogcGFzc2VkIHRvIGBgZGVmZXJyZWQubm90aWZ5YGAuXG4gKiBAcGFyYW0ge0FueSp9IHByb21pc2UgZm9yIHNvbWV0aGluZ1xuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgdG8gcmVjZWl2ZSBhbnkgcHJvZ3Jlc3Mgbm90aWZpY2F0aW9uc1xuICogQHJldHVybnMgdGhlIGdpdmVuIHByb21pc2UsIHVuY2hhbmdlZFxuICovXG5leHBvcnRzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XG5mdW5jdGlvbiBwcm9ncmVzcyhwcm9taXNlLCBwcm9ncmVzc2VkKSB7XG4gICAgcmV0dXJuIHdoZW4ocHJvbWlzZSwgdm9pZCAwLCB2b2lkIDAsIHByb2dyZXNzZWQpO1xufVxuXG4vKipcbiAqIFByb3ZpZGVzIGFuIG9wcG9ydHVuaXR5IHRvIG9ic2VydmUgdGhlIHJlamVjdGlvbiBvZiBhIHByb21pc2UsXG4gKiByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhlIHByb21pc2UgaXMgZnVsZmlsbGVkIG9yIHJlamVjdGVkLiAgRm9yd2FyZHNcbiAqIHRoZSByZXNvbHV0aW9uIHRvIHRoZSByZXR1cm5lZCBwcm9taXNlIHdoZW4gdGhlIGNhbGxiYWNrIGlzIGRvbmUuXG4gKiBUaGUgY2FsbGJhY2sgY2FuIHJldHVybiBhIHByb21pc2UgdG8gZGVmZXIgY29tcGxldGlvbi5cbiAqIEBwYXJhbSB7QW55Kn0gcHJvbWlzZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgdG8gb2JzZXJ2ZSB0aGUgcmVzb2x1dGlvbiBvZiB0aGUgZ2l2ZW5cbiAqIHByb21pc2UsIHRha2VzIG5vIGFyZ3VtZW50cy5cbiAqIEByZXR1cm5zIGEgcHJvbWlzZSBmb3IgdGhlIHJlc29sdXRpb24gb2YgdGhlIGdpdmVuIHByb21pc2Ugd2hlblxuICogYGBmaW5gYCBpcyBkb25lLlxuICovXG5leHBvcnRzW1wiZmluYWxseVwiXSA9IC8vIFhYWCBleHBlcmltZW50YWxcbmV4cG9ydHMuZmluID0gZmluO1xuZnVuY3Rpb24gZmluKHByb21pc2UsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHdoZW4ocHJvbWlzZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB3aGVuKGNhbGxiYWNrKCksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfSwgZnVuY3Rpb24gKGV4Y2VwdGlvbikge1xuICAgICAgICByZXR1cm4gd2hlbihjYWxsYmFjaygpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGV4Y2VwdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIFRlcm1pbmF0ZXMgYSBjaGFpbiBvZiBwcm9taXNlcywgZm9yY2luZyByZWplY3Rpb25zIHRvIGJlXG4gKiB0aHJvd24gYXMgZXhjZXB0aW9ucy5cbiAqIEBwYXJhbSB7QW55Kn0gcHJvbWlzZSBhdCB0aGUgZW5kIG9mIGEgY2hhaW4gb2YgcHJvbWlzZXNcbiAqIEByZXR1cm5zIG5vdGhpbmdcbiAqL1xuZXhwb3J0cy5lbmQgPSBkZXByZWNhdGUoZG9uZSwgXCJlbmRcIiwgXCJkb25lXCIpOyAvLyBYWFggZGVwcmVjYXRlZCwgdXNlIGRvbmVcbmV4cG9ydHMuZG9uZSA9IGRvbmU7XG5mdW5jdGlvbiBkb25lKHByb21pc2UsIGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIHByb2dyZXNzKSB7XG4gICAgZnVuY3Rpb24gb25VbmhhbmRsZWRFcnJvcihlcnJvcikge1xuICAgICAgICAvLyBmb3J3YXJkIHRvIGEgZnV0dXJlIHR1cm4gc28gdGhhdCBgYHdoZW5gYFxuICAgICAgICAvLyBkb2VzIG5vdCBjYXRjaCBpdCBhbmQgdHVybiBpdCBpbnRvIGEgcmVqZWN0aW9uLlxuICAgICAgICBuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBtYWtlU3RhY2tUcmFjZUxvbmcoZXJyb3IsIHByb21pc2UpO1xuXG4gICAgICAgICAgICBpZiAoZXhwb3J0cy5vbmVycm9yKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0cy5vbmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEF2b2lkIHVubmVjZXNzYXJ5IGBuZXh0VGlja2BpbmcgdmlhIGFuIHVubmVjZXNzYXJ5IGB3aGVuYC5cbiAgICB2YXIgcHJvbWlzZVRvSGFuZGxlID0gZnVsZmlsbGVkIHx8IHJlamVjdGVkIHx8IHByb2dyZXNzID9cbiAgICAgICAgd2hlbihwcm9taXNlLCBmdWxmaWxsZWQsIHJlamVjdGVkLCBwcm9ncmVzcykgOlxuICAgICAgICBwcm9taXNlO1xuXG4gICAgZmFpbChwcm9taXNlVG9IYW5kbGUsIG9uVW5oYW5kbGVkRXJyb3IpO1xufVxuXG4vKipcbiAqIENhdXNlcyBhIHByb21pc2UgdG8gYmUgcmVqZWN0ZWQgaWYgaXQgZG9lcyBub3QgZ2V0IGZ1bGZpbGxlZCBiZWZvcmVcbiAqIHNvbWUgbWlsbGlzZWNvbmRzIHRpbWUgb3V0LlxuICogQHBhcmFtIHtBbnkqfSBwcm9taXNlXG4gKiBAcGFyYW0ge051bWJlcn0gbWlsbGlzZWNvbmRzIHRpbWVvdXRcbiAqIEByZXR1cm5zIGEgcHJvbWlzZSBmb3IgdGhlIHJlc29sdXRpb24gb2YgdGhlIGdpdmVuIHByb21pc2UgaWYgaXQgaXNcbiAqIGZ1bGZpbGxlZCBiZWZvcmUgdGhlIHRpbWVvdXQsIG90aGVyd2lzZSByZWplY3RlZC5cbiAqL1xuZXhwb3J0cy50aW1lb3V0ID0gdGltZW91dDtcbmZ1bmN0aW9uIHRpbWVvdXQocHJvbWlzZSwgbXMpIHtcbiAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgIHZhciB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0KG5ldyBFcnJvcihcIlRpbWVkIG91dCBhZnRlciBcIiArIG1zICsgXCIgbXNcIikpO1xuICAgIH0sIG1zKTtcblxuICAgIHdoZW4ocHJvbWlzZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHZhbHVlKTtcbiAgICB9LCBmdW5jdGlvbiAoZXhjZXB0aW9uKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXhjZXB0aW9uKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBwcm9taXNlIGZvciB0aGUgZ2l2ZW4gdmFsdWUgKG9yIHByb21pc2VkIHZhbHVlKSBhZnRlciBzb21lXG4gKiBtaWxsaXNlY29uZHMuXG4gKiBAcGFyYW0ge0FueSp9IHByb21pc2VcbiAqIEBwYXJhbSB7TnVtYmVyfSBtaWxsaXNlY29uZHNcbiAqIEByZXR1cm5zIGEgcHJvbWlzZSBmb3IgdGhlIHJlc29sdXRpb24gb2YgdGhlIGdpdmVuIHByb21pc2UgYWZ0ZXIgc29tZVxuICogdGltZSBoYXMgZWxhcHNlZC5cbiAqL1xuZXhwb3J0cy5kZWxheSA9IGRlbGF5O1xuZnVuY3Rpb24gZGVsYXkocHJvbWlzZSwgdGltZW91dCkge1xuICAgIGlmICh0aW1lb3V0ID09PSB2b2lkIDApIHtcbiAgICAgICAgdGltZW91dCA9IHByb21pc2U7XG4gICAgICAgIHByb21pc2UgPSB2b2lkIDA7XG4gICAgfVxuICAgIHZhciBkZWZlcnJlZCA9IGRlZmVyKCk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUocHJvbWlzZSk7XG4gICAgfSwgdGltZW91dCk7XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59XG5cbi8qKlxuICogUGFzc2VzIGEgY29udGludWF0aW9uIHRvIGEgTm9kZSBmdW5jdGlvbiwgd2hpY2ggaXMgY2FsbGVkIHdpdGggdGhlIGdpdmVuXG4gKiBhcmd1bWVudHMgcHJvdmlkZWQgYXMgYW4gYXJyYXksIGFuZCByZXR1cm5zIGEgcHJvbWlzZS5cbiAqXG4gKiAgICAgIFEubmZhcHBseShGUy5yZWFkRmlsZSwgW19fZmlsZW5hbWVdKVxuICogICAgICAudGhlbihmdW5jdGlvbiAoY29udGVudCkge1xuICogICAgICB9KVxuICpcbiAqL1xuZXhwb3J0cy5uZmFwcGx5ID0gbmZhcHBseTtcbmZ1bmN0aW9uIG5mYXBwbHkoY2FsbGJhY2ssIGFyZ3MpIHtcbiAgICB2YXIgbm9kZUFyZ3MgPSBhcnJheV9zbGljZShhcmdzKTtcbiAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgIG5vZGVBcmdzLnB1c2goZGVmZXJyZWQubWFrZU5vZGVSZXNvbHZlcigpKTtcblxuICAgIGZhcHBseShjYWxsYmFjaywgbm9kZUFyZ3MpLmZhaWwoZGVmZXJyZWQucmVqZWN0KTtcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn1cblxuLyoqXG4gKiBQYXNzZXMgYSBjb250aW51YXRpb24gdG8gYSBOb2RlIGZ1bmN0aW9uLCB3aGljaCBpcyBjYWxsZWQgd2l0aCB0aGUgZ2l2ZW5cbiAqIGFyZ3VtZW50cyBwcm92aWRlZCBpbmRpdmlkdWFsbHksIGFuZCByZXR1cm5zIGEgcHJvbWlzZS5cbiAqXG4gKiAgICAgIFEubmZjYWxsKEZTLnJlYWRGaWxlLCBfX2ZpbGVuYW1lKVxuICogICAgICAudGhlbihmdW5jdGlvbiAoY29udGVudCkge1xuICogICAgICB9KVxuICpcbiAqL1xuZXhwb3J0cy5uZmNhbGwgPSBuZmNhbGw7XG5mdW5jdGlvbiBuZmNhbGwoY2FsbGJhY2svKiwgLi4uYXJncyAqLykge1xuICAgIHZhciBub2RlQXJncyA9IGFycmF5X3NsaWNlKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICBub2RlQXJncy5wdXNoKGRlZmVycmVkLm1ha2VOb2RlUmVzb2x2ZXIoKSk7XG5cbiAgICBmYXBwbHkoY2FsbGJhY2ssIG5vZGVBcmdzKS5mYWlsKGRlZmVycmVkLnJlamVjdCk7XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59XG5cbi8qKlxuICogV3JhcHMgYSBOb2RlSlMgY29udGludWF0aW9uIHBhc3NpbmcgZnVuY3Rpb24gYW5kIHJldHVybnMgYW4gZXF1aXZhbGVudFxuICogdmVyc2lvbiB0aGF0IHJldHVybnMgYSBwcm9taXNlLlxuICpcbiAqICAgICAgUS5uZmJpbmQoRlMucmVhZEZpbGUsIF9fZmlsZW5hbWUpKFwidXRmLThcIilcbiAqICAgICAgLnRoZW4oY29uc29sZS5sb2cpXG4gKiAgICAgIC5kb25lKClcbiAqXG4gKi9cbmV4cG9ydHMubmZiaW5kID0gbmZiaW5kO1xuZnVuY3Rpb24gbmZiaW5kKGNhbGxiYWNrLyosIC4uLmFyZ3MgKi8pIHtcbiAgICB2YXIgYmFzZUFyZ3MgPSBhcnJheV9zbGljZShhcmd1bWVudHMsIDEpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBub2RlQXJncyA9IGJhc2VBcmdzLmNvbmNhdChhcnJheV9zbGljZShhcmd1bWVudHMpKTtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICAgICAgbm9kZUFyZ3MucHVzaChkZWZlcnJlZC5tYWtlTm9kZVJlc29sdmVyKCkpO1xuXG4gICAgICAgIGZhcHBseShjYWxsYmFjaywgbm9kZUFyZ3MpLmZhaWwoZGVmZXJyZWQucmVqZWN0KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBQYXNzZXMgYSBjb250aW51YXRpb24gdG8gYSBOb2RlIGZ1bmN0aW9uLCB3aGljaCBpcyBjYWxsZWQgd2l0aCBhIGdpdmVuXG4gKiBgdGhpc2AgdmFsdWUgYW5kIGFyZ3VtZW50cyBwcm92aWRlZCBhcyBhbiBhcnJheSwgYW5kIHJldHVybnMgYSBwcm9taXNlLlxuICpcbiAqICAgICAgUS5uYXBwbHkoRlMucmVhZEZpbGUsIEZTLCBbX19maWxlbmFtZV0pXG4gKiAgICAgIC50aGVuKGZ1bmN0aW9uIChjb250ZW50KSB7XG4gKiAgICAgIH0pXG4gKlxuICovXG5leHBvcnRzLm5hcHBseSA9IGRlcHJlY2F0ZShuYXBwbHksIFwibmFwcGx5XCIsIFwibnBvc3RcIik7XG5mdW5jdGlvbiBuYXBwbHkoY2FsbGJhY2ssIHRoaXNwLCBhcmdzKSB7XG4gICAgcmV0dXJuIG5iaW5kKGNhbGxiYWNrLCB0aGlzcCkuYXBwbHkodm9pZCAwLCBhcmdzKTtcbn1cblxuLyoqXG4gKiBQYXNzZXMgYSBjb250aW51YXRpb24gdG8gYSBOb2RlIGZ1bmN0aW9uLCB3aGljaCBpcyBjYWxsZWQgd2l0aCBhIGdpdmVuXG4gKiBgdGhpc2AgdmFsdWUgYW5kIGFyZ3VtZW50cyBwcm92aWRlZCBpbmRpdmlkdWFsbHksIGFuZCByZXR1cm5zIGEgcHJvbWlzZS5cbiAqXG4gKiAgICAgIFEubmNhbGwoRlMucmVhZEZpbGUsIEZTLCBfX2ZpbGVuYW1lKVxuICogICAgICAudGhlbihmdW5jdGlvbiAoY29udGVudCkge1xuICogICAgICB9KVxuICpcbiAqL1xuZXhwb3J0cy5uY2FsbCA9IGRlcHJlY2F0ZShuY2FsbCwgXCJuY2FsbFwiLCBcIm5pbnZva2VcIik7XG5mdW5jdGlvbiBuY2FsbChjYWxsYmFjaywgdGhpc3AgLyosIC4uLmFyZ3MqLykge1xuICAgIHZhciBhcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzLCAyKTtcbiAgICByZXR1cm4gbmFwcGx5KGNhbGxiYWNrLCB0aGlzcCwgYXJncyk7XG59XG5cbi8qKlxuICogV3JhcHMgYSBOb2RlSlMgY29udGludWF0aW9uIHBhc3NpbmcgZnVuY3Rpb24gYW5kIHJldHVybnMgYW4gZXF1aXZhbGVudFxuICogdmVyc2lvbiB0aGF0IHJldHVybnMgYSBwcm9taXNlLlxuICpcbiAqICAgICAgUS5uYmluZChGUy5yZWFkRmlsZSwgRlMpKF9fZmlsZW5hbWUpXG4gKiAgICAgIC50aGVuKGNvbnNvbGUubG9nKVxuICogICAgICAuZG9uZSgpXG4gKlxuICovXG5leHBvcnRzLm5iaW5kID0gZGVwcmVjYXRlKG5iaW5kLCBcIm5iaW5kXCIsIFwibmZiaW5kXCIpO1xuZnVuY3Rpb24gbmJpbmQoY2FsbGJhY2sgLyogdGhpc3AsIC4uLmFyZ3MqLykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICB2YXIgdGhpc3AgPSBhcmd1bWVudHNbMV07XG4gICAgICAgIHZhciBhcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzLCAyKTtcblxuICAgICAgICB2YXIgb3JpZ2luYWxDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjb21iaW5lZEFyZ3MgPSBhcmdzLmNvbmNhdChhcnJheV9zbGljZShhcmd1bWVudHMpKTtcbiAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbENhbGxiYWNrLmFwcGx5KHRoaXNwLCBjb21iaW5lZEFyZ3MpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgICAgICB2YXIgYXJncyA9IGFycmF5X3NsaWNlKGFyZ3VtZW50cyk7XG4gICAgICAgIC8vIGFkZCBhIGNvbnRpbnVhdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlXG4gICAgICAgIGFyZ3MucHVzaChkZWZlcnJlZC5tYWtlTm9kZVJlc29sdmVyKCkpO1xuICAgICAgICAvLyB0cmFwIGV4Y2VwdGlvbnMgdGhyb3duIGJ5IHRoZSBjYWxsYmFja1xuICAgICAgICBmYXBwbHkoY2FsbGJhY2ssIGFyZ3MpXG4gICAgICAgIC5mYWlsKGRlZmVycmVkLnJlamVjdCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH07XG59XG5cbi8qKlxuICogQ2FsbHMgYSBtZXRob2Qgb2YgYSBOb2RlLXN0eWxlIG9iamVjdCB0aGF0IGFjY2VwdHMgYSBOb2RlLXN0eWxlXG4gKiBjYWxsYmFjayB3aXRoIGEgZ2l2ZW4gYXJyYXkgb2YgYXJndW1lbnRzLCBwbHVzIGEgcHJvdmlkZWQgY2FsbGJhY2suXG4gKiBAcGFyYW0gb2JqZWN0IGFuIG9iamVjdCB0aGF0IGhhcyB0aGUgbmFtZWQgbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBuYW1lIG9mIHRoZSBtZXRob2Qgb2Ygb2JqZWN0XG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBtZXRob2Q7IHRoZSBjYWxsYmFja1xuICogd2lsbCBiZSBwcm92aWRlZCBieSBRIGFuZCBhcHBlbmRlZCB0byB0aGVzZSBhcmd1bWVudHMuXG4gKiBAcmV0dXJucyBhIHByb21pc2UgZm9yIHRoZSB2YWx1ZSBvciBlcnJvclxuICovXG5leHBvcnRzLm5wb3N0ID0gbnBvc3Q7XG5mdW5jdGlvbiBucG9zdChvYmplY3QsIG5hbWUsIGFyZ3MpIHtcbiAgICB2YXIgbm9kZUFyZ3MgPSBhcnJheV9zbGljZShhcmdzKTtcbiAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgIG5vZGVBcmdzLnB1c2goZGVmZXJyZWQubWFrZU5vZGVSZXNvbHZlcigpKTtcblxuICAgIHBvc3Qob2JqZWN0LCBuYW1lLCBub2RlQXJncykuZmFpbChkZWZlcnJlZC5yZWplY3QpO1xuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xufVxuXG4vKipcbiAqIENhbGxzIGEgbWV0aG9kIG9mIGEgTm9kZS1zdHlsZSBvYmplY3QgdGhhdCBhY2NlcHRzIGEgTm9kZS1zdHlsZVxuICogY2FsbGJhY2ssIGZvcndhcmRpbmcgdGhlIGdpdmVuIHZhcmlhZGljIGFyZ3VtZW50cywgcGx1cyBhIHByb3ZpZGVkXG4gKiBjYWxsYmFjayBhcmd1bWVudC5cbiAqIEBwYXJhbSBvYmplY3QgYW4gb2JqZWN0IHRoYXQgaGFzIHRoZSBuYW1lZCBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIG5hbWUgb2YgdGhlIG1ldGhvZCBvZiBvYmplY3RcbiAqIEBwYXJhbSAuLi5hcmdzIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBtZXRob2Q7IHRoZSBjYWxsYmFjayB3aWxsXG4gKiBiZSBwcm92aWRlZCBieSBRIGFuZCBhcHBlbmRlZCB0byB0aGVzZSBhcmd1bWVudHMuXG4gKiBAcmV0dXJucyBhIHByb21pc2UgZm9yIHRoZSB2YWx1ZSBvciBlcnJvclxuICovXG5leHBvcnRzLm5pbnZva2UgPSBuaW52b2tlO1xuZnVuY3Rpb24gbmludm9rZShvYmplY3QsIG5hbWUgLyosIC4uLmFyZ3MqLykge1xuICAgIHZhciBub2RlQXJncyA9IGFycmF5X3NsaWNlKGFyZ3VtZW50cywgMik7XG4gICAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICBub2RlQXJncy5wdXNoKGRlZmVycmVkLm1ha2VOb2RlUmVzb2x2ZXIoKSk7XG5cbiAgICBwb3N0KG9iamVjdCwgbmFtZSwgbm9kZUFyZ3MpLmZhaWwoZGVmZXJyZWQucmVqZWN0KTtcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn1cblxuZXhwb3J0cy5uZW5kID0gZGVwcmVjYXRlKG5vZGVpZnksIFwibmVuZFwiLCBcIm5vZGVpZnlcIik7IC8vIFhYWCBkZXByZWNhdGVkLCB1c2Ugbm9kZWlmeVxuZXhwb3J0cy5ub2RlaWZ5ID0gbm9kZWlmeTtcbmZ1bmN0aW9uIG5vZGVpZnkocHJvbWlzZSwgbm9kZWJhY2spIHtcbiAgICBpZiAobm9kZWJhY2spIHtcbiAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5vZGViYWNrKG51bGwsIHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBub2RlYmFjayhlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxufVxuXG4vLyBBbGwgY29kZSBiZWZvcmUgdGhpcyBwb2ludCB3aWxsIGJlIGZpbHRlcmVkIGZyb20gc3RhY2sgdHJhY2VzLlxudmFyIHFFbmRpbmdMaW5lID0gY2FwdHVyZUxpbmUoKTtcblxufSk7XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiTWsyTnlHXCIpKSIsIid1c2Ugc3RyaWN0JztcblxudmFyIEJvdW5kaW5nQm94ID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlbGVtZW50LCBsZWZ0LCB0b3Ape1xuXHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXHR0aGlzLnRvcCA9IHRvcCB8fCAwO1xuXHR0aGlzLmxlZnQgPSBsZWZ0IHx8IDA7XG5cdHRoaXMud2lkdGggPSB0aGlzLmVsZW1lbnQud2lkdGg7XG5cdHRoaXMuaGVpZ2h0ID0gdGhpcy5lbGVtZW50LmhlaWdodDtcblx0dGhpcy5ib3R0b20gPSB0aGlzLnRvcCArIHRoaXMuaGVpZ2h0O1xuXHR0aGlzLnJpZ2h0ID0gdGhpcy5sZWZ0ICsgdGhpcy53aWR0aDtcblxuXHRlbGVtZW50LmxvY2F0aW9ucy5wdXNoKHRoaXMpO1xufTtcblxuQm91bmRpbmdCb3gucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbihjb250YWluZXIpe1xuXHRpZih0aGlzLnZpc2libGUpIHJldHVybjtcblx0XG5cdHRoaXMudmlzaWJsZSA9IHRydWU7XG5cdHRoaXMuZWxlbWVudC5zaG93KHRoaXMubGVmdCwgdGhpcy50b3AsIGNvbnRhaW5lcik7XG59O1xuXG5Cb3VuZGluZ0JveC5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKGNvbnRhaW5lcil7XG5cdGlmKCF0aGlzLnZpc2libGUpIHJldHVybjtcblxuXHR0aGlzLnZpc2libGUgPSBmYWxzZTtcblx0dGhpcy5lbGVtZW50LmhpZGUoY29udGFpbmVyKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRhZztcblxuZnVuY3Rpb24gVGFnKCl7XG5cdHRoaXMuZWxlbWVudHMgPSBbXTtcbn1cblxuVGFnLmNyZWF0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0dmFyIHRhZyA9IG5ldyBUYWcoKTtcblx0XG5cdGlmKCdza2lwUHJvYmFiaWxpdHknIGluIG9wdGlvbnMpIHRhZy5za2lwUHJvYmFiaWxpdHkgPSBvcHRpb25zLnNraXBQcm9iYWJpbGl0eTtcblx0aWYoJ3RyeUxpbWl0JyBpbiBvcHRpb25zKSB0YWcudHJ5TGltaXQgPSBvcHRpb25zLnRyeUxpbWl0O1xuXG5cdHJldHVybiB0YWc7XG59O1xuXG5UYWcucHJvdG90eXBlLmNoYW5jZU11bHRpcGxpZXIgPSAxO1xuVGFnLnByb3RvdHlwZS5za2lwUHJvYmFiaWxpdHkgPSAwO1xuXG5UYWcucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGVsZW1lbnQpe1xuXHR2YXIgY2hhbmNlTXVsdGlwbGllciA9IGVsZW1lbnQuY2hhbmNlTXVsdGlwbGllcjtcblx0d2hpbGUoY2hhbmNlTXVsdGlwbGllci0tKSB0aGlzLmVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG59O1xuXG5UYWcucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGVsZW1lbnQpe1xuXHR2YXJcdGluZGV4O1xuXG5cdC8vIFJlbW92ZSBhbGwgaW5zdGFuY2VzIG9mIHRoZSBlbGVtZW50XG5cdHdoaWxlKH4oaW5kZXggPSAgdGhpcy5lbGVtZW50cy5pbmRleE9mKGVsZW1lbnQpKSl7XG5cdFx0dGhpcy5lbGVtZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuXHR9XG59O1xuXG5UYWcucHJvdG90eXBlLmdldEVsZW1lbnRzID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMuZWxlbWVudHMuc2xpY2UoKTtcbn07XG5cblRhZy5wcm90b3R5cGUuZ2V0UmFuZG9tRWxlbWVudCA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLmVsZW1lbnRzWyhNYXRoLnJhbmRvbSgpICogdGhpcy5lbGVtZW50cy5sZW5ndGgpfDBdO1xufTtcblxuXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBRID0gcmVxdWlyZSgnLi4vYm93ZXJfY29tcG9uZW50cy9xL3EuanMnKTtcbnZhciBjcmVhdGVRdWFkdHJlZSA9IHJlcXVpcmUoJy4uL2Jvd2VyX2NvbXBvbmVudHMvZ2lhbnQtcXVhZHRyZWUvZGlzdC9HaWFudFF1YWR0cmVlLmpzJykuY3JlYXRlLFxuXHRTdXJmYWNlID0gcmVxdWlyZSgnLi4vYm93ZXJfY29tcG9uZW50cy9iaWctc3VyZmFjZS9kaXN0L0JpZ1N1cmZhY2UuanMnKTtcblxudmFyIEJvdW5kaW5nQm94ID0gcmVxdWlyZSgnLi9Cb3VuZGluZ0JveC5qcycpLFxuXHRUYWcgPSByZXF1aXJlKCcuL1RhZy5qcycpO1xuXG52YXIgQ29sbGFnZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29udGFpbmVyKXtcblx0U3VyZmFjZS5jYWxsKHRoaXMsIGNvbnRhaW5lcik7XG5cdHRoaXMucXVhZHRyZWUgPSBjcmVhdGVRdWFkdHJlZSgxNTAwMCk7XG5cblx0dGhpcy50YWdzID0ge307XG5cdHRoaXMuYWN0aXZlVGFncyA9IFtdO1xuXG5cdHRoaXMudXBkYXRlQ2FudmFzRGltZW5zaW9ucygpO1xufTtcblxuQ29sbGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFN1cmZhY2UucHJvdG90eXBlKTtcblxuQ29sbGFnZS5jcmVhdGUgPSBmdW5jdGlvbihjb250YWluZXIpe1xuXHR2YXIgY29sbGFnZSA9IG5ldyBDb2xsYWdlKGNvbnRhaW5lcik7XG5cdHJldHVybiBDb2xsYWdlLmdldEFwaShjb2xsYWdlKTtcbn07XG5cbkNvbGxhZ2UuZ2V0QXBpID0gZnVuY3Rpb24oY29sbGFnZSl7XG5cdHZhciBhcGkgPSBTdXJmYWNlLmdldEFwaShjb2xsYWdlKTtcblxuXHRhcGkuY3JlYXRlVGFnID0gY29sbGFnZS5jcmVhdGVUYWcuYmluZChjb2xsYWdlKTtcblx0YXBpLmNvbmZpZ3VyZVRhZyA9IGNvbGxhZ2UuY29uZmlndXJlVGFnLmJpbmQoY29sbGFnZSk7XG5cdFxuXHRhcGkuc2V0QWN0aXZlVGFncyA9IGNvbGxhZ2Uuc2V0QWN0aXZlVGFncy5iaW5kKGNvbGxhZ2UpO1xuXHRcblx0YXBpLnBhdXNlID0gY29sbGFnZS5wYXVzZS5iaW5kKGNvbGxhZ2UpO1xuXHRhcGkucmVzdW1lID0gY29sbGFnZS5yZXN1bWUuYmluZChjb2xsYWdlKTtcblxuXHRhcGkubG9hZCA9IGNvbGxhZ2UubG9hZEVsZW1lbnRzLmJpbmQoY29sbGFnZSk7XG5cdGFwaS5hZGQgPSBjb2xsYWdlLmFkZEVsZW1lbnRzLmJpbmQoY29sbGFnZSk7XG5cdGFwaS5yZW1vdmUgPSBjb2xsYWdlLnJlbW92ZUVsZW1lbnQuYmluZChjb2xsYWdlKTtcblx0YXBpLmdldCA9IGNvbGxhZ2UuZ2V0RWxlbWVudHMuYmluZChjb2xsYWdlKTtcblx0YXBpLnNob3dFbGVtZW50ID0gY29sbGFnZS5zaG93RWxlbWVudC5iaW5kKGNvbGxhZ2UpO1xuXHRhcGkubG9hZGVyID0gY29sbGFnZS5sb2FkZXI7XG5cblx0YXBpLmZpbGwgPSBmdW5jdGlvbigpe1xuXHRcdGNvbGxhZ2UudXBkYXRlQ2FudmFzRGltZW5zaW9ucygpO1xuXHRcdGNvbGxhZ2UucGlja05leHRFbGVtZW50KCk7XG5cblx0XHRpZihjb2xsYWdlLm5leHRFbGVtZW50KXtcblx0XHRcdHJldHVybiBjb2xsYWdlLmZpbGxDZW50ZXIoKTtcdFxuXHRcdH1cblxuXHRcdHJldHVybiBbXTtcblx0fTtcblxuXHRhcGkuc3RhcnQgPSBjb2xsYWdlLnN0YXJ0LmJpbmQoY29sbGFnZSk7XG5cdFxuXHRyZXR1cm4gYXBpO1xufTtcblxuQ29sbGFnZS5sb2FkZXIgPSByZXF1aXJlKCcuL2xvYWRlci9pbmRleC5qcycpO1xuQ29sbGFnZS5lbGVtZW50ID0gcmVxdWlyZSgnLi9lbGVtZW50L2luZGV4LmpzJyk7XG5cbi8vIEhvdyBtYW55IHJhbmRvbSBzcG90IHdpbGwgYmUgY2hlY2tlZCB0byBwbGFjZSBlbGVtZW50cyBwZXIgZnJhbWVcbkNvbGxhZ2UucHJvdG90eXBlLnNjYW5UcnlMaW1pdCA9IDIwO1xuXG4vLyBNYXggbnVtYmVyIG9mIGZyYW1lcyBhbiBlbGVtZW50IGhhcyB0byBmaW5kIGEgcGxhY2UgYmVmb3JlIGFub3RoZXIgaXMgcGlja2VkXG4vLyB0aGlzIHByZXZlbnRzIGxhcmdlIGdhcHMgZHVlIHRvIGxhcmdlIGVsZW1lbnRzXG5Db2xsYWdlLnByb3RvdHlwZS5taXNzTGltaXQgPSA0O1xuXG4vLyBNaW5pbXVtIHBpeGVsIHNwYWNpbmcgYmV0d2VlbiBlbGVtZW50c1xuQ29sbGFnZS5wcm90b3R5cGUuZWxlbWVudE1hcmdpbiA9IDI1O1xuXG4vLyBIb3cgbXVjaCBiZXlvbmQgdGhlIHdpbmRvdyB0byBzY2FuIGZvciBwbGFjZXMgdG8gcHV0IG9iamVjdHMgd2hlbiBmaWxsaW5nXG5Db2xsYWdlLnByb3RvdHlwZS5vdmVyU2NhbiA9IDA7XG5cbkNvbGxhZ2UucHJvdG90eXBlLmhpZGluZ0FyZWEgPSAgZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuQ29sbGFnZS5wcm90b3R5cGUubWluRWxlbWVudFNpemUgPSA1MDtcblxuQ29sbGFnZS5wcm90b3R5cGUuY3JlYXRlVGFnID0gZnVuY3Rpb24obmFtZSwgb3B0aW9ucyl7XG5cdHRoaXMudGFnc1tuYW1lXSA9IFRhZy5jcmVhdGUob3B0aW9ucyk7XG5cdHJldHVybiB0aGlzLnRhZ3NbbmFtZV07XG59O1xuXG5Db2xsYWdlLnByb3RvdHlwZS5jb25maWd1cmVUYWcgPSBmdW5jdGlvbihuYW1lLCBvcHRpb25zKXtcblx0dmFyIHRhZyA9IHRoaXMudGFnc1tuYW1lXTtcblx0aWYoIXRhZyl7XG5cdFx0dGhpcy5jcmVhdGVUYWcob3B0aW9ucyk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYoJ3NraXBQcm9iYWJpbGl0eScgaW4gb3B0aW9ucykgdGFnLnNraXBQcm9iYWJpbGl0eSA9IG9wdGlvbnMuc2tpcFByb2JhYmlsaXR5O1xuXHRpZigndHJ5TGltaXQnIGluIG9wdGlvbnMpIHRhZy50cnlMaW1pdCA9IG9wdGlvbnMudHJ5TGltaXQ7XG59O1xuXG5Db2xsYWdlLnByb3RvdHlwZS5sb2FkRWxlbWVudHMgPSBmdW5jdGlvbih0YWdOYW1lcywgYXJnMiwgYXJnMyl7XG5cdHZhciBhZGRFbGVtZW50cyA9IHRoaXMuYWRkRWxlbWVudHMuYmluZCh0aGlzLCB0YWdOYW1lcyksXG5cdFx0bG9hZGVyTWFwLFxuXHRcdGxvYWRlck5hbWUsXG5cdFx0bG9hZGVyLFxuXHRcdGxvYWRlckNvbmZpZyxcblx0XHRsb2FkZXJDb25maWdzLFxuXHRcdGxvYWRlckNvbmZpZ0luZGV4LFxuXHRcdHByb21pc2UsXG5cdFx0cHJvbWlzZXMgPSBbXTtcblxuXHRpZih0eXBlb2YgYXJnMiA9PT0gJ3N0cmluZycpe1xuXHRcdC8vIEhhbmRsZSB0aGUgLmxvYWQoW3RhZyBuYW1lXSwgW2xvYWRlciBuYW1lXSwgW2xvYWRlciBjb25maWddKSBjYXNlXG5cdFx0bG9hZGVyTWFwID0ge307XG5cdFx0bG9hZGVyTWFwW2FyZzJdID0gYXJnMztcdFxuXHR9IGVsc2Uge1xuXHRcdC8vIEhhbmRsZSB0aGUgLmxvYWQoW3RhZyBuYW1lXSwgW2xvYWRlciBtYXBdKSBjYXNlXG5cdFx0bG9hZGVyTWFwID0gYXJnMjtcblx0fSBcblxuXHRmb3IobG9hZGVyTmFtZSBpbiBsb2FkZXJNYXApe1xuXHRcdGlmKGxvYWRlck1hcC5oYXNPd25Qcm9wZXJ0eShsb2FkZXJOYW1lKSl7XG5cdFx0XHRsb2FkZXIgPSBDb2xsYWdlLmxvYWRlcltsb2FkZXJOYW1lXTtcblx0XHRcdGxvYWRlckNvbmZpZ3MgPSBsb2FkZXJNYXBbbG9hZGVyTmFtZV07XG5cdFx0XHRpZighQXJyYXkuaXNBcnJheShsb2FkZXJDb25maWdzKSkgbG9hZGVyQ29uZmlncyA9IFtsb2FkZXJDb25maWdzXTtcdFx0XG5cdFx0XHRsb2FkZXJDb25maWdJbmRleCA9IGxvYWRlckNvbmZpZ3MubGVuZ3RoO1xuXG5cdFx0XHRsb2FkZXJDb25maWcgPSBsb2FkZXJDb25maWdzWy0tbG9hZGVyQ29uZmlnSW5kZXhdO1xuXHRcdFx0d2hpbGUobG9hZGVyQ29uZmlnKXtcblx0XHRcdFx0cHJvbWlzZSA9IGxvYWRlcih0aGlzLCBsb2FkZXJDb25maWcpLnRoZW4oYWRkRWxlbWVudHMpO1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKHByb21pc2UpO1x0XG5cdFx0XHRcdGxvYWRlckNvbmZpZyA9IGxvYWRlckNvbmZpZ3NbLS1sb2FkZXJDb25maWdJbmRleF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIFEuYWxsUmVzb2x2ZWQocHJvbWlzZXMpO1xufTtcblxuQ29sbGFnZS5wcm90b3R5cGUuYWRkRWxlbWVudHMgPSBmdW5jdGlvbih0YWdOYW1lcywgZWxlbWVudHMpe1xuXHRpZighQXJyYXkuaXNBcnJheSh0YWdOYW1lcykpIHRhZ05hbWVzID0gW3RhZ05hbWVzXTtcblx0aWYoIUFycmF5LmlzQXJyYXkoZWxlbWVudHMpKSBlbGVtZW50cyA9IFtlbGVtZW50c107XG5cdFxuXHR2YXIgdGFnTmFtZUluZGV4ID0gdGFnTmFtZXMubGVuZ3RoLFxuXHRcdHRhZ05hbWUsXG5cdFx0dGFnLFxuXHRcdGVsZW1lbnRJbmRleDtcblxuXHQvLyBGb3IgZWFjaCB0YWcuLi5cblx0dGFnTmFtZSA9IHRhZ05hbWVzWy0tdGFnTmFtZUluZGV4XTtcblx0d2hpbGUodGFnTmFtZSl7XG5cdFx0dGFnID0gdGhpcy50YWdzW3RhZ05hbWVdIHx8IHRoaXMuY3JlYXRlVGFnKHRhZ05hbWUpO1xuXHRcdGVsZW1lbnRJbmRleCA9IGVsZW1lbnRzLmxlbmd0aDtcblx0XHR3aGlsZShlbGVtZW50SW5kZXgtLSkgdGFnLmFkZChlbGVtZW50c1tlbGVtZW50SW5kZXhdKTtcblx0XHR0YWdOYW1lID0gdGFnTmFtZXNbLS10YWdOYW1lSW5kZXhdO1xuXHR9XG59O1xuXG5Db2xsYWdlLnByb3RvdHlwZS5mYWRlSW5Ub0NlbnRlciA9IGZ1bmN0aW9uKCl7fTtcblxuQ29sbGFnZS5wcm90b3R5cGUucmVtb3ZlRWxlbWVudCA9IGZ1bmN0aW9uKHRhZ05hbWVzLCBlbGVtZW50KXtcblx0aWYoIUFycmF5LmlzQXJyYXkodGFnTmFtZXMpKSB0YWdOYW1lcyA9IFt0YWdOYW1lc107XG5cdFxuXHR2YXIgdGFnTmFtZUluZGV4ID0gdGFnTmFtZXMubGVuZ3RoLFxuXHRcdHRhZ05hbWUsXG5cdFx0dGFnO1xuXG5cdHRhZ05hbWUgPSB0YWdOYW1lc1t0YWdOYW1lSW5kZXgtLV07XG5cdHdoaWxlKHRhZ05hbWUpe1xuXHRcdHRhZyA9IHRoaXMudGFnc1t0YWdOYW1lXTtcblx0XHRpZighdGFnKSBjb250aW51ZTtcblx0XHR0YWcucmVtb3ZlKGVsZW1lbnQpO1xuXHRcdHRhZ05hbWUgPSB0YWdOYW1lc1t0YWdOYW1lSW5kZXgtLV07XG5cdH1cbn07XG5cbkNvbGxhZ2UucHJvdG90eXBlLmdldEVsZW1lbnRzID0gZnVuY3Rpb24oKXtcblx0dmFyIHRhZ05hbWVzID0gKGFyZ3VtZW50cy5sZW5ndGggPiAwKT8gYXJndW1lbnRzIDogT2JqZWN0LmtleXModGhpcy50YWdzKSxcblx0XHR0YWdOYW1lSW5kZXggPSB0YWdOYW1lcy5sZW5ndGgsXG5cdFx0dGFnTmFtZSxcblx0XHR0YWcsXG5cdFx0ZWxlbWVudHMgPSBbXTtcblxuXHR0YWdOYW1lID0gdGFnTmFtZXNbLS10YWdOYW1lSW5kZXhdO1xuXHR3aGlsZSh0YWdOYW1lKXtcblx0XHR0YWcgPSB0aGlzLnRhZ3NbdGFnTmFtZV07XG5cdFx0aWYodGFnKXtcblx0XHRcdGVsZW1lbnRzID0gZWxlbWVudHMuY29uY2F0KHRhZy5nZXRFbGVtZW50cygpKTtcblx0XHR9XG5cdFx0dGFnTmFtZSA9IHRhZ05hbWVzWy0tdGFnTmFtZUluZGV4XTtcblx0fVxuXG5cdHJldHVybiBlbGVtZW50cztcbn07XG5cbkNvbGxhZ2UucHJvdG90eXBlLnNldEFjdGl2ZVRhZ3MgPSBmdW5jdGlvbigpe1xuXHR2YXIgaW5kZXggPSBhcmd1bWVudHMubGVuZ3RoLFxuXHRcdHRhZ05hbWUsXG5cdFx0dGFnLFxuXHRcdGNoYW5jZU11bHRpcGxpZXIsXG5cdFx0YWN0aXZlVGFncyA9IFtdO1xuXG5cdHRhZ05hbWUgPSBhcmd1bWVudHNbLS1pbmRleF07XG5cdHdoaWxlKHRhZ05hbWUpe1xuXHRcdHRhZyA9IHRoaXMudGFnc1t0YWdOYW1lXTtcblx0XHRpZih0YWcpe1xuXHRcdFx0Y2hhbmNlTXVsdGlwbGllciA9IHRhZy5jaGFuY2VNdWx0aXBsaWVyO1xuXHRcdFx0d2hpbGUoY2hhbmNlTXVsdGlwbGllci0tKSBhY3RpdmVUYWdzLnB1c2godGFnKTtcblx0XHR9XG5cdFx0dGFnTmFtZSA9IGFyZ3VtZW50c1stLWluZGV4XTtcblx0fVxuXG5cdHRoaXMuYWN0aXZlVGFncyA9IGFjdGl2ZVRhZ3M7XG59O1xuXG5Db2xsYWdlLnByb3RvdHlwZS5nZXRSYW5kb21BY3RpdmVUYWcgPSBmdW5jdGlvbigpe1xuXHR2YXIgdGFnLFxuXHRcdGZhaWxTYWZlID0gdGhpcy5nZXRSYW5kb21BY3RpdmVUYWdGYWlsU2FmZTtcblxuXHR3aGlsZShmYWlsU2FmZS0tKXtcblx0XHR0YWcgPSB0aGlzLmFjdGl2ZVRhZ3NbKE1hdGgucmFuZG9tKCkgKiB0aGlzLmFjdGl2ZVRhZ3MubGVuZ3RoKXwwXTtcblx0XHRpZih0YWcuc2tpcFByb2JhYmlsaXR5IDwgTWF0aC5yYW5kb20oKSkgYnJlYWs7XG5cdH1cblx0XG5cdHJldHVybiB0YWc7XG59O1xuXG5Db2xsYWdlLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKGR1cmF0aW9uKXtcblx0aWYodGhpcy5zYXZlZEhvcml6b250YWxWZWxvY2l0eVNjYWxhciAhPT0gdm9pZCAwKSByZXR1cm47XG5cdHRoaXMuc2F2ZWRIb3Jpem9udGFsVmVsb2NpdHlTY2FsYXIgPSB0aGlzLmhvcml6b250YWxWZWxvY2l0eVNjYWxhcjtcblx0dGhpcy5zYXZlZFZlcnRpY2FsVmVsb2NpdHlTY2FsYXIgPSB0aGlzLnZlcnRpY2FsVmVsb2NpdHlTY2FsYXI7XG5cdHRoaXMuc2V0VmVsb2NpdHlTY2FsYXIoMCwgZHVyYXRpb24gfHwgMC40KTtcbn07XG5cbkNvbGxhZ2UucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uKGR1cmF0aW9uKXtcblx0aWYodGhpcy5zYXZlZEhvcml6b250YWxWZWxvY2l0eVNjYWxhciA9PT0gdm9pZCAwKSByZXR1cm47XG5cblx0dGhpcy5zZXRIb3Jpem9udGFsVmVsb2NpdHlTY2FsYXIodGhpcy5zYXZlZEhvcml6b250YWxWZWxvY2l0eVNjYWxhciwgKGR1cmF0aW9uIHx8IDAuNCkpO1xuXHR0aGlzLnNldFZlcnRpY2FsVmVsb2NpdHlTY2FsYXIodGhpcy5zYXZlZFZlcnRpY2FsVmVsb2NpdHlTY2FsYXIsIChkdXJhdGlvbiB8fCAwLjQpKTtcblx0dGhpcy5zYXZlZEhvcml6b250YWxWZWxvY2l0eVNjYWxhciA9IHZvaWQgMDtcbn07XG5cbkNvbGxhZ2UucHJvdG90eXBlLnNhdmVkSG9yaXpvbnRhbFZlbG9jaXR5U2NhbGFyID0gdm9pZCAwO1xuQ29sbGFnZS5wcm90b3R5cGUuc2F2ZWRWZXJ0aWNhbFZlbG9jaXR5U2NhbGFyID0gdm9pZCAwO1xuXG5Db2xsYWdlLnByb3RvdHlwZS5nZXRSYW5kb21BY3RpdmVUYWdGYWlsU2FmZSA9IDIwO1xuQ29sbGFnZS5wcm90b3R5cGUuZ2V0UmFuZG9tRWxlbWVudEZhaWxTYWZlID0gMjA7XG5Db2xsYWdlLnByb3RvdHlwZS5nZXRSYW5kb21FbGVtZW50VHJ5TGltaXQgPSAyMDtcbkNvbGxhZ2UucHJvdG90eXBlLm1heEVsZW1lbnRXaWR0aCA9IDIwMDA7XG5Db2xsYWdlLnByb3RvdHlwZS5tYXhFbGVtZW50SGVpZ2h0ID0gMTAwMDtcblxuQ29sbGFnZS5wcm90b3R5cGUuZ2V0UmFuZG9tRWxlbWVudCA9IGZ1bmN0aW9uKCl7XG5cdHZhciBmYWlsU2FmZSA9IHRoaXMuZ2V0UmFuZG9tRWxlbWVudEZhaWxTYWZlLFxuXHRcdGluQ2FudmFzUmFuZ2UgPSB0cnVlLFxuXHRcdGxlZnQgPSB0aGlzLnZpZXdwb3J0TGVmdCAtIHRoaXMubWF4RWxlbWVudFdpZHRoLFxuXHRcdHRvcCA9IHRoaXMudmlld3BvcnRUb3AgLSB0aGlzLm1heEVsZW1lbnRIZWlnaHQsXG5cdFx0cmlnaHQgPSB0aGlzLnZpZXdwb3J0UmlnaHQgKyB0aGlzLm1heEVsZW1lbnRXaWR0aCxcblx0XHRib3R0b20gPSB0aGlzLnZpZXdwb3J0Qm90dG9tICsgdGhpcy5tYXhFbGVtZW50SGVpZ2h0LFxuXHRcdGVsZW1lbnQsXG5cdFx0dGFnLFxuXHRcdHRyeUxpbWl0O1xuXG5cdHdoaWxlKGluQ2FudmFzUmFuZ2UgJiYgZmFpbFNhZmUtLSl7XG5cdFx0dGFnID0gdGhpcy5nZXRSYW5kb21BY3RpdmVUYWcoKTtcblx0XHR0cnlMaW1pdCA9IHRhZy50cnlMaW1pdCB8fCB0aGlzLmdldFJhbmRvbUVsZW1lbnRUcnlMaW1pdDtcblxuXHRcdHdoaWxlKHRyeUxpbWl0LS0pe1xuXHRcdFx0ZWxlbWVudCA9IHRhZy5nZXRSYW5kb21FbGVtZW50KCk7XG5cblx0XHRcdGlmKCFlbGVtZW50LmlzSW4obGVmdCwgdG9wLCByaWdodCwgYm90dG9tKSl7XG5cdFx0XHRcdHJldHVybiBlbGVtZW50O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblxuQ29sbGFnZS5wcm90b3R5cGUudHJhbnNmb3JtU3RlcCA9IGZ1bmN0aW9uKCl7XG5cdFN1cmZhY2UucHJvdG90eXBlLnRyYW5zZm9ybVN0ZXAuY2FsbCh0aGlzKTtcblx0dGhpcy51cGRhdGVDYW52YXNEaW1lbnNpb25zKCk7XG5cdHRoaXMudXBkYXRlRWxlbWVudFZpc2liaWxpdHkoKTtcblx0dGhpcy5tYXhDaGVja0hlaWdodCA9IDA7XG5cdHRoaXMubWF4Q2hlY2tXaWR0aCA9IDA7XG5cblx0dGhpcy5waWNrTmV4dEVsZW1lbnQoKTtcblx0aWYodGhpcy5uZXh0RWxlbWVudCkgdGhpcy5maWxsKCk7XG59O1xuXG5Db2xsYWdlLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uKCl7XG5cdGlmKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB0aGlzLnNldEFjdGl2ZVRhZ3MuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XG5cdGlmKHRoaXMuYWN0aXZlVGFncy5sZW5ndGggPT09IDApe1xuXHRcdHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHN0YXJ0IHdpdGhvdXQgYWN0aXZlIHRhZ3MnKTtcblx0fVxuXHR0aGlzLnN0YXJ0VHJhbnNmb3JtTG9vcCgpO1xuXHR0aGlzLnVwZGF0ZUNhbnZhc0RpbWVuc2lvbnMoKTtcblx0dGhpcy5waWNrTmV4dEVsZW1lbnQoKTtcblxuXHRpZih0aGlzLm5leHRFbGVtZW50KXtcblx0XHR0aGlzLmZpbGxDZW50ZXIoKTtcdFxuXHR9XG59O1xuXG5Db2xsYWdlLnByb3RvdHlwZS5waWNrTmV4dEVsZW1lbnQgPSBmdW5jdGlvbigpe1xuXHR0aGlzLm5leHRFbGVtZW50ID0gdGhpcy5nZXRSYW5kb21FbGVtZW50KCk7XG5cdHRoaXMubWlzc0NvdW50ID0gMDtcblxuXHRpZih0aGlzLm5leHRFbGVtZW50KXtcblx0XHR0aGlzLnVwZGF0ZUJvdW5kcygpO1xuXHR9XG59O1xuXG5Db2xsYWdlLnByb3RvdHlwZS5pbnNlcnROZXh0RWxlbWVudCA9IGZ1bmN0aW9uKGxlZnQsIHRvcCwgc2hvdyl7XG5cdHZhciBib3ggPSB0aGlzLnNob3dFbGVtZW50KHRoaXMubmV4dEVsZW1lbnQsIGxlZnQsIHRvcCwgc2hvdyk7XG5cdHRoaXMucGlja05leHRFbGVtZW50KCk7XG5cdHJldHVybiBib3g7XG59O1xuXG5Db2xsYWdlLnByb3RvdHlwZS5zaG93RWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnQsIGxlZnQsIHRvcCwgc2hvdyl7XG5cdHZhciBib3VuZGluZ0JveCA9IG5ldyBCb3VuZGluZ0JveChlbGVtZW50LCBsZWZ0LCB0b3ApO1xuXHR0aGlzLnF1YWR0cmVlLmluc2VydChib3VuZGluZ0JveCk7XG5cdFxuXHRpZihzaG93KXtcblx0XHRib3VuZGluZ0JveC5zaG93KHRoaXMuZWxlbWVudCk7XG5cdH0gZWxzZSB7XG5cdFx0Ym91bmRpbmdCb3guaGlkZSh0aGlzLmhpZGluZ0FyZWEpO1xuXHR9XG5cblx0cmV0dXJuIGJvdW5kaW5nQm94O1xufTtcblxuQ29sbGFnZS5wcm90b3R5cGUuZ2V0Vmlld3BvcnRCb3VuZGluZ0JveGVzID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMucXVhZHRyZWUuZ2V0T2JqZWN0cyh0aGlzLnZpZXdwb3J0TGVmdCwgdGhpcy52aWV3cG9ydFRvcCwgdGhpcy52aWV3cG9ydFdpZHRoLCB0aGlzLnZpZXdwb3J0SGVpZ2h0KTtcbn07XG5cblxuQ29sbGFnZS5wcm90b3R5cGUuZ2V0Vmlld3BvcnRFbGVtZW50cyA9IGZ1bmN0aW9uKCl7XG5cdHZhciBib3VuZGluZ0JveGVzID0gdGhpcy5nZXRWaWV3cG9ydEJvdW5kaW5nQm94ZXMoKSxcblx0XHRpbmRleCA9IGJvdW5kaW5nQm94ZXMubGVuZ3RoLFxuXHRcdHJlc3VsdCA9IFtdO1xuXG5cdC8vIGJvdW5kaW5nQm94ZXMubWFwIHdvdWxkIGJlIHByb3BlciBidXQgaXMgbGVzcyBwcm9jIGVmZmljaWVudFxuXHR3aGlsZShpbmRleC0tKSByZXN1bHQucHVzaChib3VuZGluZ0JveGVzW2luZGV4XS5lbGVtZW50KTtcblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxuQ29sbGFnZS5wcm90b3R5cGUudXBkYXRlRWxlbWVudFZpc2liaWxpdHkgPSBmdW5jdGlvbigpe1xuXHR2YXIgb2xkQm94ZXMgPSB0aGlzLnZpc2libGVCb3hlcyB8fCBbXSxcblx0XHRuZXdCb3hlcyA9IHRoaXMucXVhZHRyZWUuZ2V0T2JqZWN0cyh0aGlzLnZpZXdwb3J0TGVmdCwgdGhpcy52aWV3cG9ydFRvcCwgdGhpcy52aWV3cG9ydFdpZHRoLCB0aGlzLnZpZXdwb3J0SGVpZ2h0KSxcblx0XHRpbmRleCxcblx0XHRib3g7XG5cblx0Ly8gTWFyayBvbGQgdmlzaWJsZSB0byBoaWRlXG5cdGluZGV4ID0gb2xkQm94ZXMubGVuZ3RoO1xuXHR3aGlsZShpbmRleC0tKSBvbGRCb3hlc1tpbmRleF0uaGlkZVBlbmRpbmcgPSB0cnVlO1xuXG5cdGluZGV4ID0gbmV3Qm94ZXMubGVuZ3RoO1xuXHR3aGlsZShpbmRleC0tKXtcblx0XHRib3ggPSBuZXdCb3hlc1tpbmRleF07XG5cdFx0aWYoIWJveC52aXNpYmxlKSBib3guc2hvdyh0aGlzLmVsZW1lbnQpO1xuXG5cdFx0Ly8gQ2xlYXIgaGlkZSBmbGFncyBmb3IgdGhpbmdzIHRoYXQgYXJlIHN0aWxsIHZpc2libGVcblx0XHRib3guaGlkZVBlbmRpbmcgPSBmYWxzZTtcblx0fVxuXG5cdC8vIEhpZGUgZWxlbWVudHMgbm8gbG9uZ2VyIGluIHZpZXdcblx0aW5kZXggPSBvbGRCb3hlcy5sZW5ndGg7XG5cdHdoaWxlKGluZGV4LS0pe1xuXHRcdGJveCA9IG9sZEJveGVzW2luZGV4XTtcblx0XHRpZihib3guaGlkZVBlbmRpbmcpIGJveC5oaWRlKHRoaXMuaGlkaW5nQXJlYSk7XG5cdH1cblxuXHR0aGlzLnZpc2libGVCb3hlcyA9IG5ld0JveGVzO1xufTtcblxuQ29sbGFnZS5wcm90b3R5cGUudXBkYXRlQ2FudmFzRGltZW5zaW9ucyA9IGZ1bmN0aW9uKCl7XG5cdHRoaXMudmlld3BvcnRMZWZ0ID0gLTEgKiB0aGlzLmhvcml6b250YWxQb3NpdGlvbiAtIHRoaXMub3ZlclNjYW47XG5cdHRoaXMudmlld3BvcnRUb3AgPSAtMSAqIHRoaXMudmVydGljYWxQb3NpdGlvbiAtIHRoaXMub3ZlclNjYW47XG5cdHRoaXMudmlld3BvcnRXaWR0aCA9IHRoaXMud2lkdGggKyB0aGlzLm92ZXJTY2FuICogMjtcblx0dGhpcy52aWV3cG9ydEhlaWdodCA9IHRoaXMuaGVpZ2h0ICsgdGhpcy5vdmVyU2NhbiAqIDI7XG5cdHRoaXMudmlld3BvcnRSaWdodCA9IHRoaXMudmlld3BvcnRMZWZ0ICsgdGhpcy52aWV3cG9ydFdpZHRoO1xuXHR0aGlzLnZpZXdwb3J0Qm90dG9tID0gdGhpcy52aWV3cG9ydFRvcCArIHRoaXMudmlld3BvcnRIZWlnaHQ7XG5cdFxuXHR0aGlzLm1vdmluZ1VwID0gdGhpcy5sYXN0VmVydGljYWxEaXNwbGFjZW1lbnQgPiAwO1xuXHR0aGlzLm1vdmluZ0xlZnQgPSB0aGlzLmxhc3RIb3Jpem9udGFsRGlzcGxhY2VtZW50ID4gMDtcbn07XG5cbkNvbGxhZ2UucHJvdG90eXBlLmZpbGxDZW50ZXIgPSBmdW5jdGlvbigpe1xuXHR2YXIgYm94ZXMgPSB0aGlzLnF1YWR0cmVlLmdldE9iamVjdHMoXG5cdFx0dGhpcy52aWV3cG9ydExlZnQgLSB0aGlzLmNoZWNrV2lkdGgsXG5cdFx0dGhpcy52aWV3cG9ydFRvcCAtIHRoaXMuY2hlY2tIZWlnaHQsXG5cdFx0dGhpcy52aWV3cG9ydFdpZHRoICsgdGhpcy5jaGVja1dpZHRoICogMixcblx0XHR0aGlzLnZpZXdwb3J0SGVpZ2h0ICsgdGhpcy5jaGVja0hlaWdodCAqIDJcblx0KTtcblxuXHR2YXJcdGJvdW5kaW5nQm94ZXMgPSBbXSxcblx0XHRzY2FuQ2hlY2tMZWZ0LFxuXHRcdHNjYW5DaGVja1RvcCxcblx0XHRzY2FuQ2hlY2tSaWdodCxcblx0XHRzY2FuQ2hlY2tCb3R0b20sXG5cblx0XHR0cnlDb3VudCA9IDAsXG5cdFx0dHJ5TGltaXQgPSB0aGlzLnNjYW5UcnlMaW1pdCAqIDEwLFxuXHRcdG1pc3NDb3VudCA9IDAsXG5cdFx0bWlzc0xpbWl0ID0gdHJ5TGltaXQgLyAyMDtcblxuXHRmb3IoO3RyeUNvdW50IDwgdHJ5TGltaXQ7IHRyeUNvdW50Kyspe1xuXHRcdG1pc3NDb3VudCsrO1xuXG5cdFx0aWYobWlzc0NvdW50ID4gbWlzc0xpbWl0KXtcblx0XHRcdG1pc3NDb3VudCA9IDA7XG5cdFx0XHR0aGlzLnBpY2tOZXh0RWxlbWVudCgpO1xuXHRcdFx0aWYoIXRoaXMubmV4dEVsZW1lbnQpIGJyZWFrO1xuXHRcdH1cblxuXHRcdHNjYW5DaGVja0xlZnQgPSAodGhpcy52aWV3cG9ydExlZnQgLSB0aGlzLmNoZWNrV2lkdGgpICsgXG5cdFx0XHRNYXRoLmZsb29yKCh0aGlzLnZpZXdwb3J0V2lkdGggKyB0aGlzLmNoZWNrV2lkdGgpICogTWF0aC5yYW5kb20oKSk7XG5cdFx0c2NhbkNoZWNrVG9wID0gKHRoaXMudmlld3BvcnRUb3AgLSB0aGlzLmNoZWNrSGVpZ2h0KSArIFxuXHRcdFx0TWF0aC5mbG9vcigodGhpcy52aWV3cG9ydEhlaWdodCArIHRoaXMuY2hlY2tIZWlnaHQpICogTWF0aC5yYW5kb20oKSk7XG5cdFx0c2NhbkNoZWNrUmlnaHQgPSBzY2FuQ2hlY2tMZWZ0ICsgdGhpcy5jaGVja1dpZHRoO1xuXHRcdHNjYW5DaGVja0JvdHRvbSA9IHNjYW5DaGVja1RvcCArIHRoaXMuY2hlY2tIZWlnaHQ7XG5cdFxuXHRcdGlmKCFoYXNDb2xsaXNpb24oYm94ZXMsIHNjYW5DaGVja0xlZnQsIHNjYW5DaGVja1RvcCwgc2NhbkNoZWNrUmlnaHQsIHNjYW5DaGVja0JvdHRvbSkpe1xuXHRcdFx0Ym91bmRpbmdCb3hlcy5wdXNoKHRoaXMuaW5zZXJ0TmV4dEVsZW1lbnQoc2NhbkNoZWNrTGVmdCArIHRoaXMuZWxlbWVudE1hcmdpbiwgc2NhbkNoZWNrVG9wICsgdGhpcy5lbGVtZW50TWFyZ2luKSk7XG5cdFx0XHRpZighdGhpcy5uZXh0RWxlbWVudCkgYnJlYWs7XG5cblx0XHRcdG1pc3NDb3VudCA9IDA7XG5cdFx0XHRib3hlcyA9IHRoaXMucXVhZHRyZWUuZ2V0T2JqZWN0cyhcblx0XHRcdFx0dGhpcy52aWV3cG9ydExlZnQgLSB0aGlzLmNoZWNrV2lkdGgsXG5cdFx0XHRcdHRoaXMudmlld3BvcnRUb3AgLSB0aGlzLmNoZWNrSGVpZ2h0LFxuXHRcdFx0XHR0aGlzLnZpZXdwb3J0V2lkdGggKyB0aGlzLmNoZWNrV2lkdGggKiAyLFxuXHRcdFx0XHR0aGlzLnZpZXdwb3J0SGVpZ2h0ICsgdGhpcy5jaGVja0hlaWdodCAqIDJcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0dGhpcy51cGRhdGVFbGVtZW50VmlzaWJpbGl0eSgpO1xuXHRyZXR1cm4gYm91bmRpbmdCb3hlcztcbn07XG5cbkNvbGxhZ2UucHJvdG90eXBlLnVwZGF0ZUJvdW5kcyA9IGZ1bmN0aW9uKCl7XG5cdHRoaXMuY2hlY2tIZWlnaHQgPSB0aGlzLm5leHRFbGVtZW50LmhlaWdodCArIHRoaXMuZWxlbWVudE1hcmdpbiAqIDI7XG5cdHRoaXMuY2hlY2tXaWR0aCA9IHRoaXMubmV4dEVsZW1lbnQud2lkdGggKyB0aGlzLmVsZW1lbnRNYXJnaW4gKiAyO1xuXG5cdHRoaXMuY2hlY2tMZWZ0ID0gdGhpcy5tb3ZpbmdMZWZ0ID8gKHRoaXMudmlld3BvcnRMZWZ0IC0gdGhpcy5jaGVja1dpZHRoKSA6IHRoaXMudmlld3BvcnRSaWdodDtcblx0dGhpcy5jaGVja1RvcCA9IHRoaXMubW92aW5nVXAgPyB0aGlzLnZpZXdwb3J0VG9wIC0gdGhpcy5jaGVja0hlaWdodCA6IHRoaXMudmlld3BvcnRCb3R0b207XG5cdHRoaXMuY2hlY2tSaWdodCA9IHRoaXMuY2hlY2tMZWZ0ICsgdGhpcy5jaGVja1dpZHRoO1xuXHR0aGlzLmNoZWNrQm90dG9tID0gdGhpcy5jaGVja1RvcCArIHRoaXMuY2hlY2tIZWlnaHQ7XG5cdFx0XG5cdHRoaXMuc2NhbkxlZnQgPSB0aGlzLnZpZXdwb3J0TGVmdCAtIHRoaXMuY2hlY2tXaWR0aDtcblx0dGhpcy5zY2FuVG9wID0gdGhpcy52aWV3cG9ydFRvcCAtIHRoaXMuY2hlY2tIZWlnaHQ7XG5cdHRoaXMuc2NhbldpZHRoID0gdGhpcy52aWV3cG9ydFdpZHRoICsgdGhpcy5jaGVja1dpZHRoO1xuXHR0aGlzLnNjYW5IZWlnaHQgPSB0aGlzLnZpZXdwb3J0SGVpZ2h0ICsgdGhpcy5jaGVja0hlaWdodDtcblxuXHR0aGlzLmhvcml6b250YWxCb3hlcyA9IHRoaXMucXVhZHRyZWUuZ2V0T2JqZWN0cyhcblx0XHQodGhpcy5tb3ZpbmdMZWZ0ID8gIHRoaXMudmlld3BvcnRMZWZ0IC0gdGhpcy5jaGVja1dpZHRoIDogdGhpcy52aWV3cG9ydFJpZ2h0KSxcblx0XHR0aGlzLnNjYW5Ub3AsXG5cdFx0dGhpcy5jaGVja1dpZHRoLFxuXHRcdHRoaXMuc2NhbkhlaWdodCArIHRoaXMuY2hlY2tIZWlnaHRcblx0KTtcblxuXHR0aGlzLnZlcnRpY2FsQm94ZXMgPSB0aGlzLnF1YWR0cmVlLmdldE9iamVjdHMoXG5cdFx0dGhpcy5zY2FuTGVmdCxcblx0XHQodGhpcy5tb3ZpbmdVcCA/ICh0aGlzLnZpZXdwb3J0VG9wIC0gdGhpcy5jaGVja0hlaWdodCkgOiB0aGlzLnZpZXdwb3J0Qm90dG9tKSxcblx0XHR0aGlzLnNjYW5XaWR0aCArIHRoaXMuY2hlY2tXaWR0aCxcblx0XHR0aGlzLmNoZWNrSGVpZ2h0XG5cdCk7XG59O1xuXG5mdW5jdGlvbiBoYXNDb2xsaXNpb24oYm94TGlzdCwgbGVmdCwgdG9wLCByaWdodCwgYm90dG9tKXtcblx0dmFyIGluZGV4ID0gYm94TGlzdC5sZW5ndGgsXG5cdFx0Ym94O1xuXG5cdHdoaWxlKGluZGV4LS0pe1xuXHRcdGJveCA9IGJveExpc3RbaW5kZXhdO1xuXG5cdFx0Ly8gSWYgdGhlcmUgaXMgYSB5LWF4aXMgaW50ZXJzZWN0aW9uXG5cdFx0aWYgKCh0b3AgPD0gYm94LnRvcCA/XG5cdFx0XHRcdFx0XHQoYm90dG9tID49IGJveC50b3ApIDpcblx0XHRcdFx0XHRcdChib3guYm90dG9tID49IHRvcCkpICYmIFxuXHRcdFx0XHRcdFx0XHQvLyBBbmQgaWYgdGhlcmUgaXMgaW50ZXJzZWN0aW9uIGFsb25nIHRoZSB4LWF4aXNcblx0XHRcdFx0XHRcdFx0KGxlZnQgPD0gYm94LmxlZnQgP1xuXHRcdFx0XHRcdFx0XHRcdChyaWdodCA+PSBib3gubGVmdCkgOlxuXHRcdFx0XHRcdFx0XHRcdChib3gucmlnaHQgPj0gbGVmdCkpKXtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn1cblxuQ29sbGFnZS5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uKCl7XG5cdHZhciB0cnlDb3VudCA9IDAsXG5cdFx0dHJ5TGltaXQgPSB0aGlzLnNjYW5UcnlMaW1pdCxcblx0XHRzY2FuQ2hlY2tMZWZ0LFxuXHRcdHNjYW5DaGVja1RvcCxcblx0XHRzY2FuQ2hlY2tSaWdodCxcblx0XHRzY2FuQ2hlY2tCb3R0b207XG5cblx0dGhpcy5taXNzQ291bnQrKztcblx0aWYodGhpcy5taXNzQ291bnQgPiB0aGlzLm1pc3NMaW1pdCl7XG5cdFx0dGhpcy5waWNrTmV4dEVsZW1lbnQoKTtcblx0XHRpZighdGhpcy5uZXh0RWxlbWVudCkgcmV0dXJuO1xuXHR9XG5cblx0Zm9yKDt0cnlDb3VudCA8IHRyeUxpbWl0OyB0cnlDb3VudCsrKXtcblx0XHQvLyBWRVJUSUNBTFxuXHRcdHNjYW5DaGVja0xlZnQgPSB0aGlzLnNjYW5MZWZ0ICsgTWF0aC5mbG9vcih0aGlzLnNjYW5XaWR0aCAqIE1hdGgucmFuZG9tKCkpO1xuXHRcdHNjYW5DaGVja1JpZ2h0ID0gc2NhbkNoZWNrTGVmdCArIHRoaXMuY2hlY2tXaWR0aDtcblx0XHRcblx0XHRpZighaGFzQ29sbGlzaW9uKHRoaXMudmVydGljYWxCb3hlcywgc2NhbkNoZWNrTGVmdCwgdGhpcy5jaGVja1RvcCwgc2NhbkNoZWNrUmlnaHQsIHRoaXMuY2hlY2tCb3R0b20pKXtcblx0XHRcdHRoaXMuaW5zZXJ0TmV4dEVsZW1lbnQoc2NhbkNoZWNrTGVmdCArIHRoaXMuZWxlbWVudE1hcmdpbiwgdGhpcy5jaGVja1RvcCArIHRoaXMuZWxlbWVudE1hcmdpbik7XG5cdFx0XHRpZighdGhpcy5uZXh0RWxlbWVudCkgYnJlYWs7XG5cdFx0fVxuXG5cdFx0Ly8gSE9SSVpPTlRBTFxuXHRcdHNjYW5DaGVja1RvcCA9IHRoaXMuc2NhblRvcCArIE1hdGguZmxvb3IodGhpcy5zY2FuSGVpZ2h0ICogTWF0aC5yYW5kb20oKSk7XG5cdFx0c2NhbkNoZWNrQm90dG9tID0gc2NhbkNoZWNrVG9wICsgdGhpcy5jaGVja0hlaWdodDtcblxuXHRcdGlmKCFoYXNDb2xsaXNpb24odGhpcy5ob3Jpem9udGFsQm94ZXMsIHRoaXMuY2hlY2tMZWZ0LCBzY2FuQ2hlY2tUb3AsIHRoaXMuY2hlY2tSaWdodCwgc2NhbkNoZWNrQm90dG9tKSl7XG5cdFx0XHR2YXIgYm94ID0gdGhpcy5pbnNlcnROZXh0RWxlbWVudCh0aGlzLmNoZWNrTGVmdCArIHRoaXMuZWxlbWVudE1hcmdpbiwgc2NhbkNoZWNrVG9wICsgdGhpcy5lbGVtZW50TWFyZ2luKTtcblx0XHRcdHRoaXMuaG9yaXpvbnRhbEJveGVzLnB1c2goYm94KTtcblxuXHRcdFx0aWYoIXRoaXMubmV4dEVsZW1lbnQpIGJyZWFrO1xuXHRcdH1cblx0fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlRWxlbWVudDtcblxuZnVuY3Rpb24gQmFzZUVsZW1lbnQoZG9tRWxlbWVudCwgd2lkdGgsIGhlaWdodCl7XG5cdHRoaXMuZWxlbWVudCA9IGRvbUVsZW1lbnQ7XG5cdHRoaXMud2lkdGggPSB3aWR0aCB8fCBkb21FbGVtZW50LndpZHRoIHx8IHBhcnNlSW50KGRvbUVsZW1lbnQuY2xpZW50V2lkdGgpO1xuXHR0aGlzLmhlaWdodCA9IGhlaWdodCB8fCBkb21FbGVtZW50LmhlaWdodCB8fCBwYXJzZUludChkb21FbGVtZW50LmNsaWVudEhlaWdodCk7XG5cdHRoaXMubG9jYXRpb25zID0gW107XG5cdHRoaXMuaXNWaXNpYmxlID0gdW5kZWZpbmVkO1xuXHRcblx0dGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbn1cblxuQmFzZUVsZW1lbnQuY3JlYXRlID0gZnVuY3Rpb24oZG9tRWxlbWVudCwgd2lkdGgsIGhlaWdodCl7XG5cdHZhciBlbGVtZW50ID0gbmV3IEJhc2VFbGVtZW50KGRvbUVsZW1lbnQsIHdpZHRoLCBoZWlnaHQpO1xuXHRyZXR1cm4gQmFzZUVsZW1lbnQuZ2V0QXBpKGVsZW1lbnQpO1xufTtcblxuQmFzZUVsZW1lbnQuZ2V0QXBpID0gZnVuY3Rpb24oZWxlbWVudCl7XG5cdHZhciBhcGkgPSB7fTtcblx0YXBpLmVsZW1lbnQgPSBlbGVtZW50LmVsZW1lbnQ7XG5cdGFwaS5pc0luID0gZWxlbWVudC5pc0luLmJpbmQoZWxlbWVudCk7XG5cdGFwaS5yZXBvc2l0aW9uID0gZWxlbWVudC5yZXBvc2l0aW9uLmJpbmQoZWxlbWVudCk7XG5cdGFwaS5zaG93ID0gZWxlbWVudC5zaG93LmJpbmQoZWxlbWVudCk7XG5cdGFwaS5oaWRlID0gZWxlbWVudC5oaWRlLmJpbmQoZWxlbWVudCk7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGFwaSwgJ3dpZHRoJywge1xuXHRcdGdldDogZnVuY3Rpb24oKXtyZXR1cm4gZWxlbWVudC53aWR0aDt9XG5cdH0pO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcGksICd2aXNpYmxlJywge1xuXHRcdGdldDogZnVuY3Rpb24oKXtyZXR1cm4gZWxlbWVudC5pc1Zpc2libGU7fVxuXHR9KTtcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoYXBpLCAnaGVpZ2h0Jywge1xuXHRcdGdldDogZnVuY3Rpb24oKXtyZXR1cm4gZWxlbWVudC5oZWlnaHQ7fVxuXHR9KTtcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoYXBpLCAnY2hhbmNlTXVsdGlwbGllcicsIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCl7cmV0dXJuIGVsZW1lbnQuY2hhbmNlTXVsdGlwbGllcjt9LFxuXHRcdHNldDogZnVuY3Rpb24odmFsdWUpeyBlbGVtZW50LmNoYW5jZU11bHRpcGxpZXIgPSB2YWx1ZTt9XG5cdH0pO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcGksICdsb2NhdGlvbnMnLCB7XG5cdFx0Z2V0OiBmdW5jdGlvbigpe3JldHVybiBlbGVtZW50LmxvY2F0aW9uczsgfVxuXHR9KTtcblxuXHRyZXR1cm4gYXBpO1xufTtcblxuQmFzZUVsZW1lbnQucHJvdG90eXBlLmNoYW5jZU11bHRpcGxpZXIgPSAxO1xuXG5CYXNlRWxlbWVudC5wcm90b3R5cGUuaXNJbiA9IGZ1bmN0aW9uKGxlZnQsIHRvcCwgcmlnaHQsIGJvdHRvbSl7XG5cdHZhciBsb2NhdGlvbkluZGV4ID0gdGhpcy5sb2NhdGlvbnMubGVuZ3RoLFxuXHRcdGJvdW5kaW5nQm94ID0gdGhpcy5sb2NhdGlvbnNbLS1sb2NhdGlvbkluZGV4XTtcblxuXHR3aGlsZShib3VuZGluZ0JveCl7XG5cdFx0aWYoKCgobGVmdCA8IGJvdW5kaW5nQm94LmxlZnQgJiYgYm91bmRpbmdCb3gubGVmdCA8IHJpZ2h0KSB8fFxuXHRcdFx0XHQoYm91bmRpbmdCb3gucmlnaHQgPCByaWdodCAmJiBsZWZ0IDwgYm91bmRpbmdCb3gucmlnaHQpKSAmJlxuXHRcdFx0KCh0b3AgPCBib3VuZGluZ0JveC50b3AgJiYgYm91bmRpbmdCb3gudG9wIDwgYm90dG9tKSB8fCBcblx0XHRcdFx0KGJvdW5kaW5nQm94LmJvdHRvbSA8IGJvdHRvbSAmJiB0b3AgPCBib3VuZGluZ0JveC5ib3R0b20pKSkpe1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdGJvdW5kaW5nQm94ID0gdGhpcy5sb2NhdGlvbnNbLS1sb2NhdGlvbkluZGV4XTtcblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn07XG5cbkJhc2VFbGVtZW50LnByb3RvdHlwZS5yZXBvc2l0aW9uID0gZnVuY3Rpb24obGVmdCwgdG9wKXtcblx0dGhpcy5lbGVtZW50LnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4Jztcblx0dGhpcy5lbGVtZW50LnN0eWxlLnRvcCA9IHRvcCArICdweCc7XG59O1xuXG5CYXNlRWxlbWVudC5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCl7XG5cdHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG59O1xuXG5CYXNlRWxlbWVudC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKGxlZnQsIHRvcCl7XG5cdHRoaXMucmVwb3NpdGlvbihsZWZ0LCB0b3ApO1xuXHR0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIEJhc2VFbGVtZW50ID0gcmVxdWlyZSgnLi9FbGVtZW50LmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gSWZyYW1lRWxlbWVudDtcblxuLy8gaU9TIGhhcyBhIHJlbmRlcmluZyBidWcgcmVsYXRlZCB0byBpZnJhbWVzLFxudmFyIGlzaU9TID0gKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhpUGFkfGlQaG9uZXxpUG9kKS9nKSA/IHRydWUgOiBmYWxzZSApO1xuXG5mdW5jdGlvbiBJZnJhbWVFbGVtZW50IChlbGVtZW50KXtcblx0QmFzZUVsZW1lbnQuY2FsbCh0aGlzLCBlbGVtZW50LCBwYXJzZUludChlbGVtZW50LndpZHRoKSwgcGFyc2VJbnQoZWxlbWVudC5oZWlnaHQpKTtcblxuXHR0aGlzLmlmcmFtZSA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKSB8fCB0aGlzLmVsZW1lbnQ7XG5cdHRoaXMuaXNMb2NhbCA9IHRoaXMuaWZyYW1lLmNvbnRlbnREb2N1bWVudCAmJiB0aGlzLmlmcmFtZS5jb250ZW50RG9jdW1lbnQuYm9keSAmJiBcblx0XHR0aGlzLmlmcmFtZS5jb250ZW50RG9jdW1lbnQuYm9keS5pbm5lckhUTUwgIT09ICcnO1xuXHRcblx0Ly8gSGFjayB0byBmaXggZm9yIGlPUydzIGZhaWx1cmUgdG8gcmVuZGVyIHRoZSBpbnNpZGUgb2YgYSBpZnJhbWUgXG5cdC8vIHdoZW4gdXNpbmcgY3NzIHRyYW5zZm9ybXMuIElmIHdlIGhhdmUgcGVybWlzc2lvbiB0byBlZGl0IHRoZSBpZnJhbWUsXG5cdC8vIHRoaXMgbWV0aG9kIGlzIG11Y2ggbW9yZSBwZXJmb3JtYW50IHRoYXQgdGhlIGhhY2sgaW4gLnNob3dcblx0aWYoaXNpT1MgJiYgdGhpcy5pc0xvY2FsKXtcblx0XHR0aGlzLmlmcmFtZS5jb250ZW50RG9jdW1lbnQuYm9keS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoMCwgMCwgMCknO1xuXHR9XG5cdFxuXHR0aGlzLmhpZGUoKTtcbn1cbklmcmFtZUVsZW1lbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXNlRWxlbWVudC5wcm90b3R5cGUpO1xuXG5JZnJhbWVFbGVtZW50LmNyZWF0ZSA9IGZ1bmN0aW9uKGVsZW1lbnQpe1xuXHRlbGVtZW50ID0gbmV3IElmcmFtZUVsZW1lbnQoZWxlbWVudCk7XG5cdHJldHVybiBJZnJhbWVFbGVtZW50LmdldEFwaShlbGVtZW50KTtcbn07XG5cbklmcmFtZUVsZW1lbnQuZ2V0QXBpID0gZnVuY3Rpb24oZWxlbWVudCl7XG5cdHJldHVybiBCYXNlRWxlbWVudC5nZXRBcGkoZWxlbWVudCk7XG59O1xuXG5JZnJhbWVFbGVtZW50LnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKXtcblx0QmFzZUVsZW1lbnQucHJvdG90eXBlLmhpZGUuY2FsbCh0aGlzKTtcblx0dGhpcy5lbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuXHRcblx0aWYodGhpcy5maWRnZXQpe1xuXHRcdGNsZWFySW50ZXJ2YWwodGhpcy5maWRnZXQpO1xuXHRcdHRoaXMuZmlkZ2V0ID0gdm9pZCAwO1xuXHR9XG59O1xuXG5JZnJhbWVFbGVtZW50LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24obGVmdCwgdG9wKXtcblx0QmFzZUVsZW1lbnQucHJvdG90eXBlLnNob3cuY2FsbCh0aGlzLCBsZWZ0LCB0b3ApO1xuXHR0aGlzLmVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG5cblx0Ly8gSGFjayB0byBmaXggZm9yIGlPUydzIGZhaWx1cmUgdG8gcmVuZGVyIHRoZSBcblx0Ly8gaW5zaWRlIG9mIGEgaWZyYW1lIHdoZW4gdXNpbmcgY3NzIHRyYW5zZm9ybXMuXG5cdGlmKGlzaU9TICYmICF0aGlzLmlzTG9jYWwgJiYgIXRoaXMuZmlkZ2V0KXtcblx0XHR2YXIgaWZyYW1lID0gdGhpcy5pZnJhbWUsXG5cdFx0XHRmbGlwcGVyID0gMC4wMDE7XG5cblx0XHR0aGlzLmZpZGdldCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG5cdFx0XHRpZnJhbWUuc3R5bGUub3BhY2l0eSA9IDEgKyBmbGlwcGVyO1xuXHRcdFx0ZmxpcHBlciAqPSAtMTtcblx0XHR9LCAyMDApO1xuXHR9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQmFzZUVsZW1lbnQgPSByZXF1aXJlKCcuL0VsZW1lbnQuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaW1wbGVFbGVtZW50O1xuXG5mdW5jdGlvbiBTaW1wbGVFbGVtZW50IChlbGVtZW50KXtcblx0QmFzZUVsZW1lbnQuY2FsbCh0aGlzLCBlbGVtZW50LCBwYXJzZUludChlbGVtZW50LndpZHRoKSwgcGFyc2VJbnQoZWxlbWVudC5oZWlnaHQpKTtcblx0dGhpcy5hcHBlbmRlZCA9IHVuZGVmaW5lZDtcbn1cblNpbXBsZUVsZW1lbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXNlRWxlbWVudC5wcm90b3R5cGUpO1xuXG5TaW1wbGVFbGVtZW50LmNyZWF0ZSA9IGZ1bmN0aW9uKGVsZW1lbnQpe1xuXHRlbGVtZW50ID0gbmV3IFNpbXBsZUVsZW1lbnQoZWxlbWVudCk7XG5cdHJldHVybiBTaW1wbGVFbGVtZW50LmdldEFwaShlbGVtZW50KTtcbn07XG5cblNpbXBsZUVsZW1lbnQuZ2V0QXBpID0gZnVuY3Rpb24oZWxlbWVudCl7XG5cdHJldHVybiBCYXNlRWxlbWVudC5nZXRBcGkoZWxlbWVudCk7XG59O1xuXG4vL3ZhciBoaWRpbmdBcmVhID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuU2ltcGxlRWxlbWVudC5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCl7XHRcblx0QmFzZUVsZW1lbnQucHJvdG90eXBlLmhpZGUuY2FsbCh0aGlzKTtcblx0dGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdC8vaGlkaW5nQXJlYS5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xufTtcblxuU2ltcGxlRWxlbWVudC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKGxlZnQsIHRvcCwgY29udGFpbmVyKXtcblx0QmFzZUVsZW1lbnQucHJvdG90eXBlLnNob3cuY2FsbCh0aGlzLCBsZWZ0LCB0b3ApO1xuXHR0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdGlmKCF0aGlzLmFwcGVuZGVkKXtcblx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcblx0XHR0aGlzLmFwcGVuZGVkID0gdHJ1ZTtcblx0fVxufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCcuLi8uLi9ib3dlcl9jb21wb25lbnRzL2V2ZW50RW1pdHRlci9FdmVudEVtaXR0ZXIuanMnKTtcbnZhciBCYXNlRWxlbWVudCA9IHJlcXVpcmUoJy4vRWxlbWVudC5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZpZGVvRWxlbWVudDtcblxuLy8gTWFuYWdlcyBnbG9iYWwgdGFza3MsIHN1Y2ggYXMgcGVyaW9kaWMgcG9sbGluZyBvZiBwbGF5ZXJzXG4vLyB0byBnYXRoZXIgdGltZSBpbmZvcm1hdGlvblxudmFyIHRpbWVNYW5hZ2VyID0gKGZ1bmN0aW9uKCl7XG5cdHZhciBBQ1RJVkVfRUxFTUVOVFMgPSBbXSxcblx0XHRQRVJJT0RJQ19MSVNURU5FUixcblx0XHRhcGkgPSB7fTtcblxuXHRhcGkuYWRkID0gZnVuY3Rpb24oZWxlbWVudCl7XG5cdFx0QUNUSVZFX0VMRU1FTlRTLnB1c2goZWxlbWVudCk7XG5cdFx0aWYoQUNUSVZFX0VMRU1FTlRTLmxlbmd0aCA9PT0gMSl7XG5cdFx0XHRQRVJJT0RJQ19MSVNURU5FUiA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdEFDVElWRV9FTEVNRU5UUy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpe1xuXHRcdFx0XHRcdHZhciB0aW1lID0gTWF0aC5yb3VuZChlbGVtZW50LnBsYXllci5nZXRDdXJyZW50VGltZSgpKSxcblx0XHRcdFx0XHRcdGVsYXBzZWQgPSB0aW1lIC0gZWxlbWVudC5sYXN0UmVwb3J0ZWRUaW1lO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmKGVsYXBzZWQgPT09IDApIHJldHVybjtcblx0XHRcdFx0XHRpZihlbGFwc2VkID09PSAxKXtcblx0XHRcdFx0XHRcdGVsZW1lbnQubGFzdFJlcG9ydGVkVGltZSA9IHRpbWU7XG5cdFx0XHRcdFx0XHRlbGVtZW50LmVtaXR0ZXIuZW1pdCgndGltZScsIHRpbWUpO1xuXHRcdFx0XHRcdFx0ZWxlbWVudC5lbWl0dGVyLmVtaXQoJ3RpbWU6JyArIHRpbWUpO1xuXHRcdFx0XHRcdH0gZWxzZSB7IC8vIEluIGNhc2Ugd2UgbWlzc2VkIHNvbWUgdGlja3MsIG1ha2UgdXAgZm9yIHRoZW1cblx0XHRcdFx0XHRcdHZhciBzdGFydCA9IGVsZW1lbnQubGFzdFJlcG9ydGVkVGltZSArIDE7XG5cdFx0XHRcdFx0XHRmb3IoOyBzdGFydCA8IHRpbWU7IHN0YXJ0Kyspe1xuXHRcdFx0XHRcdFx0XHRlbGVtZW50Lmxhc3RSZXBvcnRlZFRpbWUgPSBzdGFydDtcblx0XHRcdFx0XHRcdFx0ZWxlbWVudC5lbWl0dGVyLmVtaXQoJ3RpbWUnLCBzdGFydCk7XG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQuZW1pdHRlci5lbWl0KCd0aW1lOicgKyBzdGFydCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0sIDUwMCk7IFx0Ly8gNTAwIG1zIGVuc3VyZXMgdGhhdCB3ZSBhY2NvdW50IGZvciBmbHVjdHVhdGlvbnMgaW4gXG5cdFx0XHRcdFx0Ly8gdGltaW5nIHNvIHdlIHJlcG9ydCB0aGUgdGltZSBhY2N1cmF0ZSB0byB0aGUgc2Vjb25kXG5cdFx0fVxuXHR9O1xuXG5cdGFwaS5yZW1vdmUgPSBmdW5jdGlvbihlbGVtZW50KXtcblx0XHR2YXIgaW5kZXggPSBBQ1RJVkVfRUxFTUVOVFMuaW5kZXhPZihlbGVtZW50KTtcblx0XHRpZih+aW5kZXgpe1xuXHRcdFx0QUNUSVZFX0VMRU1FTlRTLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRpZihBQ1RJVkVfRUxFTUVOVFMubGVuZ3RoID09PSAwKXtcblx0XHRcdFx0Y2xlYXJJbnRlcnZhbChQRVJJT0RJQ19MSVNURU5FUik7ICBcblx0XHRcdH1cdFxuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4gYXBpO1xufSgpKTtcblxuZnVuY3Rpb24gVmlkZW9FbGVtZW50IChlbGVtZW50LCBwbGF5ZXIpe1xuXHRCYXNlRWxlbWVudC5jYWxsKHRoaXMsIGVsZW1lbnQpO1xuXHR0aGlzLnBsYXllciA9IHBsYXllcjtcblx0dGhpcy5lbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXHR0aGlzLmxhc3RSZXBvcnRlZFRpbWUgPSAwO1xuXHRwbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignb25TdGF0ZUNoYW5nZScsIHRoaXMuc3RhdHVzQ2hhbmdlSGFuZGxlci5iaW5kKHRoaXMpKTtcblx0cGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ29uRXJyb3InLCB0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcblx0dGhpcy5oaWRlKCk7XG59XG5WaWRlb0VsZW1lbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCYXNlRWxlbWVudC5wcm90b3R5cGUpO1xuXG5WaWRlb0VsZW1lbnQuY3JlYXRlID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyLCBvcHRpb25zKXtcblx0dmFyIHZpZGVvRWxlbWVudCA9IG5ldyBWaWRlb0VsZW1lbnQoZWxlbWVudCwgcGxheWVyKTtcblxuXHRpZihvcHRpb25zLmNvbnRpbnVvdXNQbGF5KSB2aWRlb0VsZW1lbnQuY29udGludW91c1BsYXkgPSB0cnVlO1xuXHRpZihvcHRpb25zLmF1dG9wbGF5KSB2aWRlb0VsZW1lbnQuYXV0b3BsYXkgPSB0cnVlO1xuXHRpZihvcHRpb25zLmxvb3ApIHZpZGVvRWxlbWVudC5sb29wID0gdHJ1ZTtcblx0XG5cdHJldHVybiBWaWRlb0VsZW1lbnQuZ2V0QXBpKHZpZGVvRWxlbWVudCk7XG59O1xuXG5WaWRlb0VsZW1lbnQuZ2V0QXBpID0gZnVuY3Rpb24oZWxlbWVudCl7XG5cdHZhciBhcGkgPSBCYXNlRWxlbWVudC5nZXRBcGkoZWxlbWVudCk7XG5cdGFwaS5wbGF5ZXIgPSBlbGVtZW50LnBsYXllcjtcblx0YXBpLmVsZW1lbnQgPSBlbGVtZW50LmVsZW1lbnQ7XG5cdGFwaS5vbiA9IGVsZW1lbnQuZW1pdHRlci5vbi5iaW5kKGVsZW1lbnQuZW1pdHRlcik7XG5cdGFwaS5yZW1vdmVMaXN0ZW5lciA9IGVsZW1lbnQuZW1pdHRlci5yZW1vdmVMaXN0ZW5lci5iaW5kKGVsZW1lbnQuZW1pdHRlcik7XG5cdGFwaS5kZXN0cm95ID0gZWxlbWVudC5kZXN0cm95LmJpbmQoZWxlbWVudCk7XG5cdHJldHVybiBhcGk7XG59O1xuXG5WaWRlb0VsZW1lbnQucHJvdG90eXBlLmNvbnRpbnVvdXNQbGF5ID0gZmFsc2U7XG5WaWRlb0VsZW1lbnQucHJvdG90eXBlLmF1dG9wbGF5ID0gKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhpUGFkfGlQaG9uZXxpUG9kKS9nKSA/IGZhbHNlIDogdHJ1ZSApO1xuVmlkZW9FbGVtZW50LnByb3RvdHlwZS5sb29wID0gZmFsc2U7XG5WaWRlb0VsZW1lbnQucHJvdG90eXBlLnBsYXlpbmcgPSBmYWxzZTtcblxuVmlkZW9FbGVtZW50LnByb3RvdHlwZS5lcnJvckhhbmRsZXIgPSBmdW5jdGlvbihlKXtcblx0aWYoZS5kYXRhID09PSAxNTApe1xuXHRcdGNvbnNvbGUubG9nKHRoaXMpO1xuXHRcdHRoaXMuZGVzdHJveSgpO1xuXHR9XG59O1xuXG5WaWRlb0VsZW1lbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuXHR0aGlzLmhlaWdodCA9IDA7XG5cdHRoaXMud2lkdGggPSAwO1xuXHR0aGlzLmJvdHRvbSA9IHRoaXMudG9wO1xuXHR0aGlzLmxlZnQgPSB0aGlzLnJpZ2h0O1xuXHR0aGlzLmVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnQpO1xufTtcblxuVmlkZW9FbGVtZW50LnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKXtcblx0QmFzZUVsZW1lbnQucHJvdG90eXBlLmhpZGUuY2FsbCh0aGlzKTtcblx0dGhpcy5lbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuXHRcblx0aWYoIXRoaXMuY29udGludW91c1BsYXkpe1xuXHRcdHRoaXMucGxheWVyLnBhdXNlVmlkZW8oKTtcblx0fVxufTtcblxuVmlkZW9FbGVtZW50LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24obGVmdCwgdG9wKXtcblx0dGhpcy5lbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuXHRCYXNlRWxlbWVudC5wcm90b3R5cGUuc2hvdy5jYWxsKHRoaXMsIGxlZnQsIHRvcCk7XG5cdFxuXHRpZih0aGlzLnBsYXlpbmcgJiYgIXRoaXMuY29udGludW91c1BsYXkpe1xuXHRcdHRoaXMucGxheWVyLnBsYXlWaWRlbygpO1xuXHR9IGVsc2UgaWYoIXRoaXMucGxheWluZyAmJiB0aGlzLmF1dG9wbGF5KSB7XG5cdFx0dGhpcy5wbGF5aW5nID0gdHJ1ZTtcblx0XHR0aGlzLnBsYXllci5wbGF5VmlkZW8oKTtcblx0fVxufTtcblxuVmlkZW9FbGVtZW50LnByb3RvdHlwZS5zdGF0dXNDaGFuZ2VIYW5kbGVyID0gZnVuY3Rpb24oc3RhdHVzKXtcblx0c3dpdGNoKHN0YXR1cy5kYXRhKXtcblx0XHRjYXNlIC0xOlxuXHRcdFx0dGhpcy5lbWl0dGVyLmVtaXQoJ3Vuc3RhcnRlZCcpO1xuXHRcdGJyZWFrO1xuXHRcdGNhc2UgMDpcblx0XHRcdHRoaXMuZW1pdHRlci5lbWl0KCdlbmRlZCcpO1xuXHRcdFx0dGltZU1hbmFnZXIucmVtb3ZlKHRoaXMpO1xuXHRcdFx0aWYodGhpcy5sb29wKXtcblx0XHRcdFx0dGhpcy5wbGF5ZXIuc2Vla1RvKDApO1xuXHRcdFx0XHR0aGlzLnBsYXllci5wbGF5VmlkZW8oKTtcblx0XHRcdH1cblx0XHRicmVhaztcblx0XHRjYXNlIDE6XG5cdFx0XHR0aGlzLmVtaXR0ZXIuZW1pdCgncGxheWluZycpO1xuXHRcdFx0dGltZU1hbmFnZXIuYWRkKHRoaXMpO1xuXHRcdGJyZWFrO1xuXHRcdGNhc2UgMjpcblx0XHRcdHRoaXMuZW1pdHRlci5lbWl0KCdwYXVzZWQnKTtcblx0XHRcdHRpbWVNYW5hZ2VyLnJlbW92ZSh0aGlzKTtcblx0XHRicmVhaztcblx0XHRjYXNlIDM6XG5cdFx0XHR0aGlzLmVtaXR0ZXIuZW1pdCgnYnVmZmVyaW5nJyk7XG5cdFx0YnJlYWs7XG5cdFx0Y2FzZSA1OlxuXHRcdFx0dGhpcy5lbWl0dGVyLmVtaXQoJ3ZpZGVvIGN1ZWQnKTtcblx0XHRicmVhaztcblx0fVxufTsiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuSWZyYW1lID0gcmVxdWlyZSgnLi9JZnJhbWUuanMnKTtcbmV4cG9ydHMuU2ltcGxlID0gcmVxdWlyZSgnLi9TaW1wbGUuanMnKTtcbmV4cG9ydHMuVmlkZW8gPSByZXF1aXJlKCcuL1ZpZGVvLmpzJyk7IiwiJ3VzZSBzdHJpY3QnO1xuLyogZ2xvYmFscyBGQiAqL1xuXG52YXIgUSA9IHJlcXVpcmUoJy4uLy4uL2Jvd2VyX2NvbXBvbmVudHMvcS9xLmpzJyksXG5cdGdldEZyb21BcGkgPSByZXF1aXJlKCcuL2dldEZyb21Db21tb25BcGkuanMnKSxcblx0SWZyYW1lRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQvSWZyYW1lLmpzJyksXG5cdHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMuanMnKTtcblxudmFyIGVuZHBvaW50ID0gJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL3NlYXJjaCc7XG4vL3ZhciBlbmRwb2ludCA9ICcvc2VhcmNoJztcblxud2luZG93LmNyZWRpdHMgPSB3aW5kb3cuY3JlZGl0cyB8fCB7fTtcbnZhciBjcmVkaXRzID0gd2luZG93LmNyZWRpdHMuZmFjZWJvb2sgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjb2xsYWdlLCBvcHRpb25zKXtcblx0aWYoIW9wdGlvbnMudHlwZSkgb3B0aW9ucy50eXBlID0gJ3BhZ2VzJztcblx0XG5cdHN3aXRjaChvcHRpb25zLnR5cGUpe1xuXHRcdGNhc2UgJ3BhZ2VzJzpcblx0XHRcdHJldHVybiBjcmVhdGVQYWdlcyhjb2xsYWdlLCBvcHRpb25zKTtcblx0fVxufTtcbi8qXG52YXIgQUNUSVZJVFlfQk9YX1RFTVBMQVRFID0gJzxkaXYgY2xhc3M9XCJmYi1hY3Rpdml0eVwiIGRhdGEtc2l0ZT1cInd3dy5ocmMub3JnXCIgJyArIFxuXHQnZGF0YS13aWR0aD1cInt7d2lkdGh9fVwiIGRhdGEtaGVpZ2h0PVwie3toZWlnaHR9fVwiIGRhdGEtaGVhZGVyPVwiZmFsc2VcIiAnICsgXG5cdCdkYXRhLXJlY29tbWVuZGF0aW9ucz1cImZhbHNlXCI+PC9kaXY+JztcbnZhciBMSUtFX0JPWF9URU1QTEFURSA9ICc8ZGl2IGNsYXNzPVwiZmItbGlrZS1ib3hcIiAnICsgXG5cdCdkYXRhLWhyZWY9XCJodHRwOi8vd3d3LmZhY2Vib29rLmNvbS97e2lkfX1cIiBkYXRhLXdpZHRoPVwie3t3aWR0aH19XCIgJyArIFxuXHQnZGF0YS1oZWlnaHQ9XCJ7e2hlaWdodH19XCIgZGF0YS1zaG93LWZhY2VzPVwidHJ1ZVwiIGRhdGEtc3RyZWFtPVwiZmFsc2VcIiAnICsgXG5cdCdkYXRhLWhlYWRlcj1cImZhbHNlXCI+PC9kaXY+JztcbiovXG52YXIgZGVmYXVsdHMgPSB7XG5cdGxpbWl0OiAzLFxuXHR3aWR0aDogNDAwLFxuXHRoZWlnaHQ6IDYwMCxcblx0bWluTGlrZXM6IDAsXG5cdHNob3dGYWNlczogdHJ1ZSxcblx0c2hvd1N0cmVhbTogdHJ1ZSxcblx0c2hvd0hlYWRlcjogZmFsc2UsXG5cdGlkczogW11cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVBhZ2VzKGNvbGxhZ2UsIG9wdGlvbnMpe1xuXHR1dGlscy5leHRlbmQob3B0aW9ucywgZGVmYXVsdHMpO1xuXHR2YXIgaWRzID0gb3B0aW9ucy5pZHM7XG5cdFxuXHRpZihvcHRpb25zLnF1ZXJ5KXtcblx0XHRyZXR1cm4gZ2V0RnJvbUFwaShlbmRwb2ludCwgW1xuXHRcdFx0J3R5cGU9cGFnZScsXG5cdFx0XHQnZmllbGRzPW5hbWUsbGluayxsaWtlcyxjYXRlZ29yeScsXG5cdFx0XHQnbGltaXQ9JyArIG9wdGlvbnMubGltaXQsXG5cdFx0XHQncT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMucXVlcnkpXG5cdFx0XSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG5cdFx0XHRyZXNwb25zZS5kYXRhLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdGlmKGl0ZW0ubGlrZXMgPCBvcHRpb25zLm1pbkxpa2VzKSByZXR1cm47XG5cdFx0XHRcblx0XHRcdFx0Y3JlZGl0c1tpdGVtLm5hbWVdID0gaXRlbS5saW5rO1xuXHRcdFx0XHRpZHMucHVzaChpdGVtLmlkKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gbG9hZExpa2VCb3hlcyhjb2xsYWdlLCBpZHMsIG9wdGlvbnMpO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBRLndoZW4obG9hZExpa2VCb3hlcyhjb2xsYWdlLCBpZHMsIG9wdGlvbnMpKTtcblx0fVxufVxuXG5mdW5jdGlvbiBsb2FkTGlrZUJveGVzKGNvbGxhZ2UsIGlkcywgb3B0aW9ucyl7XG5cdHZhciBlbGVtZW50cyA9IFtdO1xuXG5cdGlkcy5mb3JFYWNoKGZ1bmN0aW9uKGlkKXtcblx0XHR2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGVsZW1lbnQuY2xhc3NOYW1lPSdmYi1saWtlLWJveCc7XG5cdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaHJlZicsICdodHRwOi8vd3d3LmZhY2Vib29rLmNvbS8nICsgaWQpO1xuXHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXdpZHRoJywgb3B0aW9ucy53aWR0aCk7XG5cdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaGVpZ2h0Jywgb3B0aW9ucy5oZWlnaHQpO1xuXHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXNob3ctZmFjZXMnLCBvcHRpb25zLnNob3dGYWNlcyk7XG5cdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3RyZWFtJywgb3B0aW9ucy5zaG93U3RyZWFtKTtcblx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1oZWFkZXInLCBvcHRpb25zLnNob3dIZWFkZXIpO1xuXG5cdFx0dmFyIGlmcmFtZUVsZW1lbnQgPSB1dGlscy5hdHRhY2hJZnJhbWVUb0NvbGxhZ2UoY29sbGFnZSwgZWxlbWVudCwgb3B0aW9ucy53aWR0aCwgb3B0aW9ucy5oZWlnaHQpO1xuXHRcdFxuXHRcdEZCLlhGQk1MLnBhcnNlKGlmcmFtZUVsZW1lbnQpO1xuXG5cdFx0ZWxlbWVudHMucHVzaChuZXcgSWZyYW1lRWxlbWVudChpZnJhbWVFbGVtZW50KSk7XG5cdH0pO1xuXHRcblx0cmV0dXJuIGVsZW1lbnRzO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuLyoganNsaW50IGNhbWVsY2FzZTpmYWxzZSAqL1xudmFyIFEgPSByZXF1aXJlKCcuLi8uLi9ib3dlcl9jb21wb25lbnRzL3EvcS5qcycpLFxuXHRTaW1wbGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudC9TaW1wbGUuanMnKSxcblx0dXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy5qcycpLFxuXHRnZXRGcm9tQXBpID0gcmVxdWlyZSgnLi9nZXRGcm9tQ29tbW9uQXBpLmpzJyk7XG5cbndpbmRvdy5jcmVkaXRzID0gd2luZG93LmNyZWRpdHMgfHwge307XG52YXIgY3JlZGl0cyA9IHdpbmRvdy5jcmVkaXRzLmZsaWNrciA9IHt9O1xuXG52YXIgZW5kcG9pbnQgPSAnaHR0cDovL2FwaS5mbGlja3IuY29tL3NlcnZpY2VzL3Jlc3QvJztcbi8vdmFyIGVuZHBvaW50ID0gJy9zZXJ2aWNlcy9yZXN0Lyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UGhvdG9zO1xuXG52YXIgZGVmYXVsdHMgPSB7XG5cdHNvcnQ6ICdyZWxldmFuY2UnLFxuXHRjb3VudDogJzIwJyxcblx0bGljZW5zZTogJzEsMiwzLDQsNSw2LDcsOCcsIC8vIGh0dHA6Ly93d3cuZmxpY2tyLmNvbS9zZXJ2aWNlcy9hcGkvZmxpY2tyLnBob3Rvcy5saWNlbnNlcy5nZXRJbmZvLmh0bWxcblx0YXBpS2V5OiAnMDY5NjBkM2MzYzhhZmZkMDFlNjVlYzAzMjUxMzU1N2InLFxuXHRtZWRpYTogJ3Bob3RvcycsXG5cdHRhZ01vZGU6ICdhbGwnLFxuXHRpc0NvbW1vbnM6IGZhbHNlLFxuXHRjb250ZW50VHlwZTogJzEnIC8vIFBob3RvcyBvbmx5IChub3Qgc2NyZWVuc2hvdHMgb3IgZHJhd2luZ3MpXG59O1xuXG5mdW5jdGlvbiBnZXRQaG90b3MoY29sbGFnZSwgb3B0aW9ucyl7XG5cdHZhciBkZWZlcnJlZCA9IFEuZGVmZXIoKSxcblx0XHRwYXJhbXM7XG5cdFxuXHRpZih0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIG9wdGlvbnMgPSB7dGFnczogb3B0aW9uc307XG5cdHV0aWxzLmV4dGVuZChvcHRpb25zLCBkZWZhdWx0cyk7XG5cblx0cGFyYW1zID0gW1xuXHRcdCdmb3JtYXQ9anNvbicsXG5cdFx0J21ldGhvZD1mbGlja3IucGhvdG9zLnNlYXJjaCcsXG5cdFx0J2V4dHJhcz11cmxfeix1cmxfbSxwYXRoX2FsaWFzJyxcblx0XHQnYXBpX2tleT0nICsgb3B0aW9ucy5hcGlLZXksXG5cdFx0J2xpY2Vuc2U9JyArIG9wdGlvbnMubGljZW5zZSwgXG5cdFx0J3NvcnQ9JyArIG9wdGlvbnMuc29ydCxcblx0XHQndGFnX21vZGU9JyArIG9wdGlvbnMudGFnTW9kZSxcblx0XHQncGVyX3BhZ2U9JyArIG9wdGlvbnMuY291bnQsXG5cdFx0J2NvbnRlbnRfdHlwZT0nICsgb3B0aW9ucy5jb250ZW50VHlwZSxcblx0XHQnbWVkaWE9JyArIG9wdGlvbnMubWVkaWEsXG5cdFx0J3RhZ3M9JyArIG9wdGlvbnMudGFnc1xuXHRdO1xuXG5cdGlmKG9wdGlvbnMuaXNDb21tb25zKXtcblx0XHRwYXJhbXMucHVzaCgnaXNfY29tbW9ucz0nICsgb3B0aW9ucy5pc0NvbW1vbnMpO1xuXHR9XG5cblx0Z2V0RnJvbUFwaShlbmRwb2ludCwgJ2pzb25jYWxsYmFjaycsIHBhcmFtcykudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG5cdFx0dmFyIGVsZW1lbnRzID0gW10sXG5cdFx0XHRwaG90b3MgPSByZXNwb25zZS5waG90b3MgJiYgcmVzcG9uc2UucGhvdG9zLnBob3RvIHx8IFtdLFxuXHRcdFx0d2FpdGluZyA9IHBob3Rvcy5sZW5ndGg7XG5cblx0XHRwaG90b3MuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcblx0XHRcdHZhciB1cmwgPSBpdGVtLnVybF96IHx8IGl0ZW0udXJsX207XG5cblx0XHRcdGlmKCF1cmwpe1xuXHRcdFx0XHR3YWl0aW5nLS07XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0bG9hZEltYWdlKGl0ZW0udXJsX3ogfHwgaXRlbS51cmxfbSkudGhlbihmdW5jdGlvbihlbGVtZW50KXtcblx0XHRcdFx0dmFyIGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0XHRcdFx0YW5jaG9yLmhyZWYgPSAnaHR0cDovL3d3dy5mbGlja3IuY29tL3Bob3Rvcy8nICsgaXRlbS5wYXRoYWxpYXMgKyAnLycgKyBpdGVtLmlkICsgJy8nO1xuXHRcdFx0XHRhbmNob3Iud2lkdGggPSBlbGVtZW50LndpZHRoO1xuXHRcdFx0XHRhbmNob3IuaGVpZ2h0ID0gZWxlbWVudC5oZWlnaHQ7XG5cdFx0XHRcdGFuY2hvci50YXJnZXQgPSAnX2JsYW5rJztcblx0XHRcdFx0YW5jaG9yLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdFx0XHRhbmNob3IuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRjcmVkaXRzW2l0ZW0ucGF0aGFsaWFzXSA9IGFuY2hvci5ocmVmO1xuXHRcdFx0XHRcblx0XHRcdFx0ZWxlbWVudHMucHVzaChTaW1wbGVFbGVtZW50LmNyZWF0ZShhbmNob3IpKTtcblx0XHRcdFx0aWYoLS13YWl0aW5nID09PSAwKSBkZWZlcnJlZC5yZXNvbHZlKGVsZW1lbnRzKTtcblx0XHRcdH0sIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGlmKC0td2FpdGluZyA9PT0gMCkgZGVmZXJyZWQucmVzb2x2ZShlbGVtZW50cyk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG5cblx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59XG5cbnZhciBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuZnVuY3Rpb24gbG9hZEltYWdlKHNyYyl7XG5cdHZhclx0ZGVmZXJyZWQgPSBRLmRlZmVyKCksXG5cdFx0aW1nID0gbmV3IEltYWdlKCk7XG5cdFxuXHRpbWcuc3JjID0gc3JjO1xuXG5cdGltZy5vbmxvYWQgPSBmdW5jdGlvbigpe1xuXHRcdC8vIFRoaXMgZm9yY2VzIEZGIHRvIHNldCB0aGUgd2lkdGgvaGVpZ2h0XG5cdFx0ZG9jdW1lbnRGcmFnbWVudC5hcHBlbmRDaGlsZChpbWcpO1xuXHRcdGRlZmVycmVkLnJlc29sdmUoaW1nKTtcblx0fTtcblxuXHRpbWcub25lcnJvciA9IGRlZmVycmVkLnJlamVjdC5iaW5kKGRlZmVycmVkKTtcblxuXHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbnZhciBRID0gcmVxdWlyZSgnLi4vLi4vYm93ZXJfY29tcG9uZW50cy9xL3EuanMnKTtcblxud2luZG93LkFQSV9DQUxMQkFDS1MgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKXtcblx0dmFyIGNhbGxiYWNrQ291bnRlciA9IDAsXG5cdFx0Y2FsbGJhY2tzID0gd2luZG93LkFQSV9DQUxMQkFDS1MsXG5cdFx0ZGVmYXVsdFRpbWVvdXQgPSAxMCAqIDEwMDA7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKGVuZHBvaW50LCBjYWxsYmFja1BhcmFtLCBwYXJhbXMsIHRpbWVvdXQpe1xuXHRcdHZhciBjYWxsYmFja0lkID0gJ2MnICsgY2FsbGJhY2tDb3VudGVyKyssXG5cdFx0XHRkZWZlcnJlZCA9IFEuZGVmZXIoKSxcblx0XHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpLFxuXHRcdFx0dGltZW91dElkO1xuXHRcdFxuXHRcdGlmKHR5cGVvZiBjYWxsYmFja1BhcmFtICE9PSAnc3RyaW5nJyl7XG5cdFx0XHR0aW1lb3V0ID0gcGFyYW1zO1xuXHRcdFx0cGFyYW1zID0gY2FsbGJhY2tQYXJhbTtcblx0XHRcdGNhbGxiYWNrUGFyYW0gPSAnY2FsbGJhY2snO1xuXHRcdH1cblxuXHRcdHRpbWVvdXQgPSB0aW1lb3V0IHx8IGRlZmF1bHRUaW1lb3V0O1xuXHRcdHBhcmFtcyA9IHBhcmFtcyB8fCBbXTtcblx0XHRwYXJhbXMucHVzaChjYWxsYmFja1BhcmFtICsgJz1BUElfQ0FMTEJBQ0tTLicgKyBjYWxsYmFja0lkKTtcblxuXHRcdHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdGRlZmVycmVkLnJlamVjdCgndGltZW91dCcpO1xuXHRcdH0sIHRpbWVvdXQpO1xuXHRcdFxuXHRcdGNhbGxiYWNrc1tjYWxsYmFja0lkXSA9IGZ1bmN0aW9uKHJlc3BvbnNlKXtcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuXHRcdFx0ZGVsZXRlIGNhbGxiYWNrc1tjYWxsYmFja0lkXTtcblx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuXHRcdH07XG5cblx0XHRzY3JpcHQuYXN5bmMgPSB0cnVlO1xuXHRcdHNjcmlwdC5zcmMgPSBlbmRwb2ludCArICc/JyArIHBhcmFtcy5qb2luKCcmJyk7IFxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblxuXHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXHR9O1xufSgpKTsiLCIndXNlIHN0cmljdCc7XG5cbi8vIFRoaXMgb25lIGlzIGEgYml0IHF1ZXN0aW9uYWJsZSBzaW5jZSBpdCdzIGRlcHJlY2F0ZWQsIGFuZCB0aGUgVE9TIGZvciB1c2UgaW5cbi8vIGNvbGxhZ2VzIGlzIHVuY2xlYXIuXG5cbnZhciBtdXN0YWNoZSA9IHJlcXVpcmUoJy4uLy4uL2Jvd2VyX2NvbXBvbmVudHMvbXVzdGFjaGUvbXVzdGFjaGUuanMnKTtcbnZhciBnZXRGcm9tQXBpID0gcmVxdWlyZSgnLi9nZXRGcm9tQ29tbW9uQXBpLmpzJyk7XG52YXIgU2ltcGxlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQvU2ltcGxlLmpzJyk7XG5cdFxud2luZG93LmNyZWRpdHMgPSB3aW5kb3cuY3JlZGl0cyB8fCB7fTtcbnZhciBjcmVkaXRzID0gd2luZG93LmNyZWRpdHMuZ29vZ2xlTmV3cyA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNvbGxhZ2UsIHF1ZXJ5KXtcblx0cmV0dXJuIHNlYXJjaChxdWVyeSk7XG59O1xuXG52YXIgQVJUSUNMRV9URU1QTEFURSA9ICcnICtcbic8ZGl2IGNsYXNzPVwiYXJ0aWNsZS13cmFwcGVyXCI+JyArXG5cdCd7eyNpbWFnZX19JyArXG5cdFx0JzxhIGhyZWY9XCJ7e2ltYWdlLmNvbnRleHRVcmx9fVwiPicgK1xuXHRcdFx0JzxpbWcgdGl0bGU9XCJJbWFnZSBieSB7e2ltYWdlLnB1Ymxpc2hlcn19XCIgY2xhc3M9XCJhcnRpY2xlLWltYWdlXCIgJyArIFxuXHRcdFx0J3NyYz1cInt7aW1hZ2Uuc3JjfX1cIiB3aWR0aD1cInt7aW1hZ2Uud2lkdGh9fVwiIGhlaWdodD1cInt7aW1hZ2UuaGVpZ2h0fX1cIi8+JyArIFxuXHRcdCc8L2E+JyArXG5cdCd7ey9pbWFnZX19JyArXG5cdCc8YSBjbGFzcz1cImFydGljbGUtdGl0bGVcIiBocmVmPVwie3tzb3VyY2VVcmx9fVwiPnt7e3RpdGxlfX19PC9hPicgKyBcblx0JzxwIGNsYXNzPVwiYXJ0aWNsZS1hdHRyaWJ1dGlvblwiPicgK1xuXHRcdCc8c3BhbiBjbGFzcz1cImFydGljbGUtcHVibGlzaGVyXCI+e3t7cHVibGlzaGVyfX19PC9zcGFuPicgK1xuXHRcdCcgJm5kYXNoOyA8c3BhbiBjbGFzcz1cImFydGljbGUtZGF0ZVwiPnt7ZGF0ZX19PC9zcGFuPicgK1xuXHRcdCcgdmlhIHt7I2duZXdzVXJsfX08YSBjbGFzcz1cImFydGljbGUtdmlhXCIgaHJlZj1cInt7Z25ld3NVcmx9fVwiPnt7L2duZXdzVXJsfX0nICsgXG5cdFx0J0dvb2dsZSBOZXdze3sjZ25ld3NVcmx9fTwvYT57ey9nbmV3c1VybH19JyArXG5cdCc8L3A+JyArXG5cdCc8cCBjbGFzcz1cImFydGljbGUtYm9keVwiPnt7e2JvZHl9fX08L3A+JyArXG4nPC9kaXY+JztcblxudmFyIGRvY3VtZW50RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbnZhciBzZWFyY2ggPSAoZnVuY3Rpb24oKXtcblx0dmFyIGVuZHBvaW50ID0gJ2h0dHBzOi8vYWpheC5nb29nbGVhcGlzLmNvbS9hamF4L3NlcnZpY2VzL3NlYXJjaC9uZXdzJztcblx0Ly92YXIgZW5kcG9pbnQgPSAnL2FqYXgvc2VydmljZXMvc2VhcmNoL25ld3MnO1xuXG5cdHJldHVybiBmdW5jdGlvbihxdWVyeSl7XG5cdFx0dmFyIHBhcmFtcyA9IFtcblx0XHRcdFx0J3Y9MS4wJyxcblx0XHRcdFx0J3Jzej04Jyxcblx0XHRcdFx0J3E9JyArIGVuY29kZVVSSUNvbXBvbmVudChxdWVyeSlcblx0XHRcdF07XG5cdFx0XG5cdFx0cmV0dXJuIGdldEZyb21BcGkoZW5kcG9pbnQsIHBhcmFtcykudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG5cdFx0XHR2YXIgZWxlbWVudHMgPSBbXTtcblx0XHRcdHJlc3BvbnNlLnJlc3BvbnNlRGF0YS5yZXN1bHRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdGNyZWRpdHNbaXRlbS5wdWJsaXNoZXJdID0gaXRlbS51bmVzY2FwZWRVcmw7XG5cblx0XHRcdFx0dmFyIHRlbXBsYXRlUGFyYW1zID0ge1xuXHRcdFx0XHRcdHRpdGxlOiBpdGVtLnRpdGxlTm9Gb3JtYXR0aW5nLFxuXHRcdFx0XHRcdHNvdXJjZVVybDogaXRlbS51bmVzY2FwZWRVcmwsXG5cdFx0XHRcdFx0cHVibGlzaGVyOiBpdGVtLnB1Ymxpc2hlcixcblx0XHRcdFx0XHRkYXRlOiAobmV3IERhdGUoaXRlbS5wdWJsaXNoZWREYXRlKSkudG9Mb2NhbGVEYXRlU3RyaW5nKCksXG5cdFx0XHRcdFx0Z25ld3NVcmw6IGl0ZW0uY2x1c3RlclVybCxcblx0XHRcdFx0XHRib2R5OiBpdGVtLmNvbnRlbnRcblx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0aWYoaXRlbS5pbWFnZSl7XG5cdFx0XHRcdFx0dGVtcGxhdGVQYXJhbXMuaW1hZ2UgPSB7XG5cdFx0XHRcdFx0XHRzcmM6IGl0ZW0uaW1hZ2UudGJVcmwsXG5cdFx0XHRcdFx0XHR3aWR0aDogaXRlbS5pbWFnZS50YldpZHRoLFxuXHRcdFx0XHRcdFx0aGVpZ2h0OiBpdGVtLmltYWdlLnRiSGVpZ2h0LFxuXHRcdFx0XHRcdFx0cHVibGlzaGVyOiBpdGVtLmltYWdlLnB1Ymxpc2hlcixcblx0XHRcdFx0XHRcdGNvbnRleHRVcmw6IGl0ZW0uaW1hZ2Uub3JpZ2luYWxDb250ZXh0VXJsXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NOYW1lID0gJ2duZXdzLWFydGljbGUnO1xuXHRcdFx0XHRlbGVtZW50LmlubmVySFRNTCA9IG11c3RhY2hlLnJlbmRlcihBUlRJQ0xFX1RFTVBMQVRFLCB0ZW1wbGF0ZVBhcmFtcyk7XG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRlbGVtZW50LndpZHRoID0gZWxlbWVudC5jbGllbnRXaWR0aDtcblx0XHRcdFx0ZWxlbWVudC5oZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDtcblxuXHRcdFx0XHRlbGVtZW50cy5wdXNoKG5ldyBTaW1wbGVFbGVtZW50KGVsZW1lbnQpKTtcblx0XHRcdFx0ZG9jdW1lbnRGcmFnbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gZWxlbWVudHM7XG5cdFx0fSk7XG5cdH07XG59KCkpO1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtdXN0YWNoZSA9IHJlcXVpcmUoJy4uLy4uL2Jvd2VyX2NvbXBvbmVudHMvbXVzdGFjaGUvbXVzdGFjaGUuanMnKTtcbnZhciBnZXRGcm9tQXBpID0gcmVxdWlyZSgnLi9nZXRGcm9tQ29tbW9uQXBpLmpzJyk7XG52YXIgU2ltcGxlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQvU2ltcGxlLmpzJyk7XG5cdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjb2xsYWdlLCBxdWVyeSl7XG5cdHJldHVybiBxdWVyeUFjdGl2aXRpZXMocXVlcnkpO1xufTtcblxudmFyIEFSVElDTEVfVEVNUExBVEUgPSAnJyArXG4nPGRpdiBjbGFzcz1cImFydGljbGUtd3JhcHBlclwiPicgK1xuXHQnPGRpdiBjbGFzcz1cInBvc3QtYXR0cmlidXRpb25cIj4nICtcblx0XHQnPGEgaHJlZj1cInt7YXV0aG9yVXJsfX1cIj4nICtcblx0XHRcdCd7eyNhdXRob3JJbWFnZX19PGltZyBjbGFzcz1cImF1dGhvci1pbWFnZVwiIHNyYz1cInt7YXV0aG9ySW1hZ2Uuc3JjfX1cIiAnICsgXG5cdFx0XHRcdCd3aWR0aD1cInt7YXV0aG9ySW1hZ2Uud2lkdGh9fVwiIGhlaWdodD1cInt7YXV0aG9ySW1hZ2UuaGVpZ2h0fX1cIi8+e3svYXV0aG9ySW1hZ2V9fScgK1xuXHRcdFx0JzxzcGFuIGNsYXNzPVwiYXV0aG9yLW5hbWVcIj57e2F1dGhvck5hbWV9fTwvc3Bhbj4nICtcblx0XHQnPC9hPicgKyBcblx0XHQnPHNwYW4gY2xhc3M9XCJwb3N0LWRhdGVcIj5vbiBHb29nbGUgUGx1cyAmbmRhc2g7IHt7ZGF0ZX19PC9zcGFuPicgK1xuXHQnPC9kaXY+JyArXG5cdCc8cCBjbGFzcz1cImF1dGhvci1jb21tZW50c1wiPnt7e2F1dGhvckNvbW1lbnRzfX19PC9wPicgKyBcblx0JzxkaXYgY2xhc3M9XCJhcnRpY2xlXCI+JyArIFxuXHRcdCc8YSBocmVmPVwie3thcnRpY2xlVXJsfX1cIj4nICtcblx0XHRcdCd7eyNpbWFnZX19PGltZyBjbGFzcz1cImFydGljbGUtaW1hZ2VcIiBzcmM9XCJ7e2ltYWdlLnNyY319XCIgd2lkdGg9XCJ7e2ltYWdlLndpZHRofX1cIiAnICsgXG5cdFx0XHRcdCdoZWlnaHQ9XCJ7e2ltYWdlLmhlaWdodH19XCIvPnt7L2ltYWdlfX0nICsgXG5cdFx0XHQnPGRpdiBjbGFzcz1cImFydGljbGUtYXR0cmlidXRpb25cIj4nICtcblx0XHRcdFx0JzxzcGFuPnt7dGl0bGV9fTwvc3Bhbj4nICsgXG5cdFx0XHQnPC9kaXY+JyArIFxuXHRcdCc8L2E+JyArXG5cdFx0JzxwIGNsYXNzPVwiYXJ0aWNsZS1ib2R5XCI+e3tib2R5fX08L3A+JyArXG5cdCc8L2Rpdj4nICtcbic8L2Rpdj4nO1xuXG52YXIgZG9jdW1lbnRGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxudmFyIHF1ZXJ5QWN0aXZpdGllcyA9IChmdW5jdGlvbigpe1xuXHR2YXIgZW5kcG9pbnQgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vcGx1cy92MS9hY3Rpdml0aWVzJztcblxuXHRyZXR1cm4gZnVuY3Rpb24ocXVlcnkpe1xuXHRcdHZhciBwYXJhbXMgPSBbXG5cdFx0XHRcdCdrZXk9QUl6YVN5QVp3MGt2aVdlQ09pZHRoY1pBWXM1b0NaMGs4RHNPdVVrJyxcblx0XHRcdFx0J3F1ZXJ5PScgKyBlbmNvZGVVUklDb21wb25lbnQocXVlcnkpXG5cdFx0XHRdO1xuXHRcdFxuXHRcdHJldHVybiBnZXRGcm9tQXBpKGVuZHBvaW50LCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuXHRcdFx0dmFyIGVsZW1lbnRzID0gW107XG5cblx0XHRcdHJlc3BvbnNlLml0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdGlmKCEoaXRlbSAmJiBpdGVtLm9iamVjdCAmJiBpdGVtLm9iamVjdC5hdHRhY2htZW50cyAmJiBpdGVtLm9iamVjdC5hdHRhY2htZW50cy5sZW5ndGggPiAwKSkgcmV0dXJuO1xuXHRcdFx0XHR2YXIgYXJ0aWNsZSA9IGl0ZW0ub2JqZWN0LmF0dGFjaG1lbnRzWzBdO1xuXHRcdFx0XHRpZihhcnRpY2xlLm9iamVjdFR5cGUgIT09ICdhcnRpY2xlJykgcmV0dXJuO1xuXG5cdFx0XHRcdHZhciBhY3RvciA9IGl0ZW0ub2JqZWN0LmFjdG9yIHx8IGl0ZW0uYWN0b3IsXG5cdFx0XHRcdFx0YXV0aG9yQ29tbWVudHMgPSBpdGVtLm9iamVjdC5jb250ZW50O1xuXHRcdFx0XHRpZihhdXRob3JDb21tZW50cyAmJiBhdXRob3JDb21tZW50cy5sZW5ndGggPiAxNTApe1xuXHRcdFx0XHRcdGF1dGhvckNvbW1lbnRzID0gYXV0aG9yQ29tbWVudHMuc3Vic3RyKDAsIDE1MCkgKyAnJmhlbGxpcDsnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHRlbXBsYXRlUGFyYW1zID0ge1xuXHRcdFx0XHRcdGF1dGhvck5hbWU6IGFjdG9yLmRpc3BsYXlOYW1lLFxuXHRcdFx0XHRcdGF1dGhvclVybDogYWN0b3IudXJsLFxuXHRcdFx0XHRcdGF1dGhvcklkOiBhY3Rvci5pZCxcblx0XHRcdFx0XHRkYXRlOiBuZXcgRGF0ZShpdGVtLnB1Ymxpc2hlZCkudG9Mb2NhbGVEYXRlU3RyaW5nKCksXG5cdFx0XHRcdFx0YXV0aG9yQ29tbWVudHM6IGF1dGhvckNvbW1lbnRzLFxuXHRcdFx0XHRcdGFydGljbGVVcmw6IGFydGljbGUudXJsLFxuXHRcdFx0XHRcdHRpdGxlOiBhcnRpY2xlLmRpc3BsYXlOYW1lLFxuXHRcdFx0XHRcdGJvZHk6IGFydGljbGUuY29udGVudFxuXHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRpZihhY3Rvci5pbWFnZSl7XG5cdFx0XHRcdFx0dGVtcGxhdGVQYXJhbXMuYXV0aG9ySW1hZ2UgPSB7XG5cdFx0XHRcdFx0XHRzcmM6IGFjdG9yLmltYWdlLnVybCxcblx0XHRcdFx0XHRcdHdpZHRoOiA1MCxcblx0XHRcdFx0XHRcdGhlaWdodDogNTBcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoYXJ0aWNsZS5pbWFnZSl7XG5cdFx0XHRcdFx0dGVtcGxhdGVQYXJhbXMuaW1hZ2UgPSB7XG5cdFx0XHRcdFx0XHRzcmM6IGFydGljbGUuaW1hZ2UudXJsLFxuXHRcdFx0XHRcdFx0d2lkdGg6IGFydGljbGUuaW1hZ2Uud2lkdGgsXG5cdFx0XHRcdFx0XHRoZWlnaHQ6IGFydGljbGUuaW1hZ2UuaGVpZ2h0XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0dmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdFx0ZWxlbWVudC5jbGFzc05hbWUgPSAnZ3BsdXMtYXJ0aWNsZSc7XG5cdFx0XHRcdGVsZW1lbnQuaW5uZXJIVE1MID0gbXVzdGFjaGUucmVuZGVyKEFSVElDTEVfVEVNUExBVEUsIHRlbXBsYXRlUGFyYW1zKTtcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcblx0XHRcdFx0XG5cdFx0XHRcdGVsZW1lbnQud2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuXHRcdFx0XHRlbGVtZW50LmhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXG5cdFx0XHRcdGVsZW1lbnRzLnB1c2gobmV3IFNpbXBsZUVsZW1lbnQoZWxlbWVudCkpO1xuXHRcdFx0XHRkb2N1bWVudEZyYWdtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIGVsZW1lbnRzO1xuXHRcdH0pO1xuXHR9O1xufSgpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFEgPSByZXF1aXJlKCcuLi8uLi9ib3dlcl9jb21wb25lbnRzL3EvcS5qcycpLFxuXHRJZnJhbWVFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudC9JZnJhbWUuanMnKSxcblx0dXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNvbGxhZ2UsIG9wdGlvbnMpe1xuXHR2YXIgd2lkdGggPSBvcHRpb25zLndpZHRoIHx8IDUwMCxcblx0XHRoZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCA1MDA7XG5cblx0dmFyIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuXHRpZnJhbWUuc3JjID0gb3B0aW9ucy51cmw7XG5cblx0dmFyIGVsZW1lbnQgPSB1dGlscy5hdHRhY2hJZnJhbWVUb0NvbGxhZ2UoY29sbGFnZSwgaWZyYW1lLCB3aWR0aCwgaGVpZ2h0KTtcblxuXHRyZXR1cm4gUS53aGVuKG5ldyBJZnJhbWVFbGVtZW50KGVsZW1lbnQpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBRID0gcmVxdWlyZSgnLi4vLi4vYm93ZXJfY29tcG9uZW50cy9xL3EuanMnKTtcbnZhciBTaW1wbGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudC9TaW1wbGUuanMnKTtcblxudmFyIGRvY3VtZW50RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29sbGFnZSwgc3JjKXtcblx0dmFyXHRkZWZlcnJlZCA9IFEuZGVmZXIoKSxcblx0XHRpbWcgPSBuZXcgSW1hZ2UoKTtcblx0XG5cdGltZy5zcmMgPSBzcmM7XG5cblx0aW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCl7XG5cdFx0Ly8gVGhpcyBmb3JjZXMgRkYgdG8gc2V0IHRoZSB3aWR0aC9oZWlnaHRcblx0XHRkb2N1bWVudEZyYWdtZW50LmFwcGVuZENoaWxkKGltZyk7XG5cdFx0ZGVmZXJyZWQucmVzb2x2ZShuZXcgU2ltcGxlRWxlbWVudChpbWcpKTtcblx0fTtcblxuXHRpbWcub25lcnJvciA9IGRlZmVycmVkLnJlamVjdC5iaW5kKGRlZmVycmVkKTtcblxuXHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmZsaWNrciA9IHJlcXVpcmUoJy4vZmxpY2tyLmpzJyk7XG5leHBvcnRzLmltYWdlID0gcmVxdWlyZSgnLi9pbWFnZS5qcycpO1xuZXhwb3J0cy55b3V0dWJlID0gcmVxdWlyZSgnLi95b3V0dWJlLmpzJyk7XG5leHBvcnRzLmdvb2dsZVBsdXMgPSByZXF1aXJlKCcuL2dvb2dsZVBsdXMuanMnKTtcbmV4cG9ydHMuZ29vZ2xlTmV3cyA9IHJlcXVpcmUoJy4vZ29vZ2xlTmV3cy5qcycpO1xuZXhwb3J0cy5ueVRpbWVzID0gcmVxdWlyZSgnLi9ueVRpbWVzLmpzJyk7XG5leHBvcnRzLnR3aXR0ZXIgPSByZXF1aXJlKCcuL3R3aXR0ZXIuanMnKTtcbmV4cG9ydHMuZmFjZWJvb2sgPSByZXF1aXJlKCcuL2ZhY2Vib29rLmpzJyk7XG5leHBvcnRzLmlmcmFtZSA9IHJlcXVpcmUoJy4vaWZyYW1lLmpzJyk7XG5leHBvcnRzLnJlZGRpdCA9IHJlcXVpcmUoJy4vcmVkZGl0LmpzJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBqc2hpbnQgY2FtZWxjYXNlOmZhbHNlICovXG5cbnZhciBRID0gcmVxdWlyZSgnLi4vLi4vYm93ZXJfY29tcG9uZW50cy9xL3EuanMnKSxcblx0U2ltcGxlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQvU2ltcGxlLmpzJyksXG5cdG11c3RhY2hlID0gcmVxdWlyZSgnLi4vLi4vYm93ZXJfY29tcG9uZW50cy9tdXN0YWNoZS9tdXN0YWNoZS5qcycpO1xuXG53aW5kb3cuY3JlZGl0cyA9IHdpbmRvdy5jcmVkaXRzIHx8IHt9O1xudmFyIGNyZWRpdHMgPSB3aW5kb3cuY3JlZGl0cy5ueVRpbWVzID0ge307XG5cbnZhciBBUlRJQ0xFX1RFTVBMQVRFID0gJycgK1xuXHRcdCc8aDI+PGEgaHJlZj1cInt7dXJsfX1cIj57e3t0aXRsZX19fTwvYT48L2gyPicgK1xuXHRcdCd7eyNpbWFnZX19PGltZyBjbGFzcz1cImFydGljbGUtaW1hZ2VcIiBzcmM9XCJ7e2ltYWdlLnNyY319XCIgJyArIFxuXHRcdFx0J3dpZHRoPVwie3tpbWFnZS53aWR0aH19XCIgaGVpZ2h0PVwie3tpbWFnZS5oZWlnaHR9fVwiLz57ey9pbWFnZX19JyArIFxuXHRcdCc8ZGl2IGNsYXNzPVwiYXJ0aWNsZS1hdHRyaWJ1dGlvblwiPicgK1xuXHRcdFx0JzxpbWcgY2xhc3M9XCJueXQtYnJhbmRcIiAnICsgXG5cdFx0XHRcdCdzcmM9XCJodHRwOi8vZ3JhcGhpY3M4Lm55dGltZXMuY29tL3BhY2thZ2VzL2ltYWdlcy9kZXZlbG9wZXIvJyArIFxuXHRcdFx0XHQnbG9nb3MvcG93ZXJlZGJ5X255dGltZXNfMzBhLnBuZ1wiLz4nICtcblx0XHRcdCc8c3BhbiBjbGFzcz1cImJ5bGluZVwiPnt7e2J5bGluZX19fTwvc3Bhbj4nICsgXG5cdFx0XHQnPHNwYW4gY2xhc3M9XCJkYXRlXCI+e3tkYXRlfX08L3NwYW4+JyArIFxuXHRcdCc8L2Rpdj4nICtcblx0XHQnPHA+e3t7Ym9keX19fTwvcD4nO1xuXG52YXIgZG9jdW1lbnRGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxudmFyIGVuZHBvaW50ID0gJy9zdmMvc2VhcmNoL3YxL2FydGljbGUnO1xuLy92YXIgZW5kcG9pbnQgPSBcImh0dHA6Ly9hcGkubnl0aW1lcy5jb20vc3ZjL3NlYXJjaC92MS9hcnRpY2xlXCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29sbGFnZSwgb3B0aW9ucyl7XG5cdHJldHVybiBxdWVyeShvcHRpb25zKTtcbn07XG5cbmZ1bmN0aW9uIHF1ZXJ5KG9wdGlvbnMpe1xuXHRmdW5jdGlvbiBwYXJzZVJlc3BvbnNlKGRhdGEpe1xuXHRcdHJldHVybiBkYXRhLnJlc3VsdHMubWFwKGZ1bmN0aW9uKGRhdGEpe1xuXHRcdFx0dmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdGVsZW1lbnQuY2xhc3NOYW1lID0gJ255dGltZXMtYXJ0aWNsZSc7XG5cblx0XHRcdGlmKGRhdGEuYnlsaW5lKXtcblx0XHRcdFx0Y3JlZGl0c1tkYXRhLmJ5bGluZS5yZXBsYWNlKCdCeSAnLCAnJyldID0gZGF0YS51cmw7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHZhciB0ZW1wbGF0ZURhdGEgPSB7XG5cdFx0XHRcdHRpdGxlOiBkYXRhLnRpdGxlLFxuXHRcdFx0XHRieWxpbmU6IGRhdGEuYnlsaW5lLFxuXHRcdFx0XHRkYXRlOiAobmV3IERhdGUoZGF0YS5wdWJsaWNhdGlvbl95ZWFyLCBkYXRhLnB1YmxpY2F0aW9uX21vbnRoLCBkYXRhLnB1YmxpY2F0aW9uX2RheSkpLnRvTG9jYWxlRGF0ZVN0cmluZygpLFxuXHRcdFx0XHRib2R5OiBkYXRhLmJvZHksXG5cdFx0XHRcdHVybDogZGF0YS51cmxcblx0XHRcdH07XG5cblx0XHRcdGlmKGRhdGEuc21hbGxfaW1hZ2VfdXJsKXtcblx0XHRcdFx0dGVtcGxhdGVEYXRhLmltYWdlID0ge1xuXHRcdFx0XHRcdHNyYzogZGF0YS5zbWFsbF9pbWFnZV91cmwucmVwbGFjZSgvdGh1bWJTdGFuZGFyZC4qXFwuLywgJ2hwTWVkaXVtLicpLFxuXHRcdFx0XHRcdGhlaWdodDogMjUzLFxuXHRcdFx0XHRcdHdpZHRoOiAzMzdcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSBtdXN0YWNoZS5yZW5kZXIoQVJUSUNMRV9URU1QTEFURSwgdGVtcGxhdGVEYXRhKTtcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cblx0XHRcdGVsZW1lbnQud2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuXHRcdFx0ZWxlbWVudC5oZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDtcblxuXHRcdFx0ZG9jdW1lbnRGcmFnbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcblx0XHRcdHJldHVybiBuZXcgU2ltcGxlRWxlbWVudChlbGVtZW50KTtcblx0XHR9KTtcblx0fVxuXG5cdGlmKG9wdGlvbnMuZGF0YSl7XG5cdFx0cmV0dXJuIFEud2hlbihwYXJzZVJlc3BvbnNlKG9wdGlvbnMuZGF0YSkpO1xuXHR9IGVsc2Uge1xuXG5cdH1cblx0cmV0dXJuIGxvYWQob3B0aW9ucykudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG5cdFx0cmV0dXJuIHBhcnNlUmVzcG9uc2UocmVzcG9uc2UpO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gbG9hZChvcHRpb25zKXtcblx0dmFyIGRlZmVycmVkID0gUS5kZWZlcigpO1xuXG5cdHZhciBwYXJhbXMgPSBbXG5cdFx0J2Zvcm1hdD1qc29uJyxcblx0XHQnZmllbGRzPXB1YmxpY2F0aW9uX3llYXIscHVibGljYXRpb25fbW9udGgscHVibGljYXRpb25fZGF5LGJvZHksZGF0ZSwnICsgXG5cdFx0XHQndGl0bGUsdXJsLGJ5bGluZSxzbWFsbF9pbWFnZV91cmwsc21hbGxfaW1hZ2VfaGVpZ2h0LHNtYWxsX2ltYWdlX3dpZHRoJyxcblx0XHQnYXBpLWtleT1hZjA0YzEyM2M4OTg4YTEyMjQ1NjY4ZjViNWZhNGY0Yzo4OjY3MzI1NzM5Jyxcblx0XHQncXVlcnk9JyArIG9wdGlvbnMucXVlcnlcblx0XTtcblx0XG5cdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cblx0cmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpe1xuXHRcdGRlZmVycmVkLnJlc29sdmUoSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCkpO1xuXHR9O1xuXG5cdHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCl7XG5cdFx0ZGVmZXJyZWQucmVqZWN0KCk7XG5cdH07XG5cblx0cmVxdWVzdC5vcGVuKCdnZXQnLCBlbmRwb2ludCArICc/JyArIHBhcmFtcy5qb2luKCcmJyksIHRydWUpO1xuXHRyZXF1ZXN0LnNlbmQoKTtcblxuXHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoganNoaW50IGNhbWVsY2FzZTpmYWxzZSAqL1xuXG52YXIgUSA9IHJlcXVpcmUoJy4uLy4uL2Jvd2VyX2NvbXBvbmVudHMvcS9xLmpzJyksXG5cdFNpbXBsZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50L1NpbXBsZS5qcycpLFxuXHRJZnJhbWVFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudC9JZnJhbWUuanMnKSxcblx0dXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy5qcycpLFxuXHRnZXRGcm9tQXBpID0gcmVxdWlyZSgnLi9nZXRGcm9tQ29tbW9uQXBpLmpzJyk7XG5cbndpbmRvdy5jcmVkaXRzID0gd2luZG93LmNyZWRpdHMgfHwge307XG52YXIgY3JlZGl0cyA9IHdpbmRvdy5jcmVkaXRzLnJlZGRpdCA9IHt9O1xuXG52YXIgZW5kcG9pbnQgPSAnaHR0cDovL3d3dy5yZWRkaXQuY29tL3IvYWxsL3NlYXJjaC5qc29uJztcbi8vdmFyIGVuZHBvaW50ID0gJy9yL2FsbC9zZWFyY2guanNvbic7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29sbGFnZSwgb3B0aW9ucyl7XG5cdGlmKG9wdGlvbnMudHlwZSA9PT0gJ2VtYmVkJyl7XG5cdFx0cmV0dXJuIGdldEVtYmVkKGNvbGxhZ2UsIG9wdGlvbnMpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBnZXRQaG90b3MoY29sbGFnZSwgb3B0aW9ucyk7XG5cdH1cbn07XG5cbmZ1bmN0aW9uIGdldEVtYmVkKGNvbGxhZ2UsIG9wdGlvbnMpe1xuXHR1dGlscy5leHRlbmQob3B0aW9ucywgZGVmYXVsdHMpO1xuXHR2YXIgcGFyYW1zID0gW1xuXHRcdCdsaW1pdD0nICsgb3B0aW9ucy5saW1pdCxcblx0XHQncmVzdHJpY3Rfc3I9JyArIG9wdGlvbnMucmVzdHJpY3Rfc3IsIFxuXHRcdCdzb3J0PScgKyBvcHRpb25zLnNvcnQsXG5cdFx0J3Q9JyArIG9wdGlvbnMudGltZSxcblx0XHQncT0nICsgb3B0aW9ucy5xdWVyeVxuXHRdO1xuXG5cdHZhciBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJRlJBTUUnKSxcblx0XHRpZnJhbWVEb2MsXG5cdFx0aWZyYW1lQ29udGVudDtcblxuXHR2YXIgZWxlbWVudCA9IHV0aWxzLmF0dGFjaElmcmFtZVRvQ29sbGFnZShjb2xsYWdlLCBpZnJhbWUsIG9wdGlvbnMud2lkdGgsIG9wdGlvbnMuaGVpZ2h0KTtcblxuXHRpZnJhbWVEb2MgPSAoaWZyYW1lLmNvbnRlbnREb2N1bWVudCkgPyBpZnJhbWUuY29udGVudERvY3VtZW50IDogaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG5cdGlmcmFtZUNvbnRlbnQgPSAnPGh0bWw+PGhlYWQ+PHRpdGxlPjwvdGl0bGU+PC9oZWFkPjxib2R5Pic7XG5cdGlmcmFtZUNvbnRlbnQgKz0gJzxzY3JpcHQgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiIHNyYz1cImh0dHA6Ly93d3cucmVkZGl0LmNvbS9yLycgKyBcblx0XHRvcHRpb25zLnN1YnJlZGRpdCArICcvc2VhcmNoLmVtYmVkPycgKyBwYXJhbXMuam9pbignJicpLnJlcGxhY2UoJyAnLCAnJTIwJykgKyAnXCI+PC9zY3JpcHQ+Jztcblx0aWZyYW1lQ29udGVudCArPSAnPC9ib2R5PjwvaHRtbD4nO1xuXHRcblx0aWZyYW1lRG9jLm9wZW4oKTtcblx0aWZyYW1lRG9jLndyaXRlKGlmcmFtZUNvbnRlbnQpO1xuXHRpZnJhbWVEb2MuY2xvc2UoKTtcblx0XG5cdHJldHVybiBRLndoZW4obmV3IElmcmFtZUVsZW1lbnQoZWxlbWVudCkpO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG5cdGxpbWl0OiAnMjAnLFxuXHRzdWJyZWRkaXQ6ICdhbGwnLFxuXHRyZXN0cmljdF9zcjogJ2ZhbHNlJyxcblx0c29ydDogJ3RvcCcsXG5cdHRpbWU6ICdhbGwnLFxuXHRuc2Z3OiAnZmFsc2UnLFxuXHRtaW5Db21tZW50czogMCxcblx0d2lkdGg6IDUwMCxcblx0aGVpZ2h0OjYwMCxcblx0bWluU2NvcmU6IDBcbn07XG5cbmZ1bmN0aW9uIGdldFBob3Rvcyhjb2xsYWdlLCBvcHRpb25zKXtcblx0dmFyIGRlZmVycmVkID0gUS5kZWZlcigpLFxuXHRcdHBhcmFtcztcblx0XG5cdGlmKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykgb3B0aW9ucyA9IHt0YWdzOiBvcHRpb25zfTtcblx0dXRpbHMuZXh0ZW5kKG9wdGlvbnMsIGRlZmF1bHRzKTtcblxuXHRwYXJhbXMgPSBbXG5cdFx0J2xpbWl0PScgKyBvcHRpb25zLmxpbWl0LFxuXHRcdCdyZXN0cmljdF9zcj0nICsgb3B0aW9ucy5yZXN0cmljdF9zciwgXG5cdFx0J3NvcnQ9JyArIG9wdGlvbnMuc29ydCxcblx0XHQndD0nICsgb3B0aW9ucy50aW1lLFxuXHRcdCdxPScgKyBvcHRpb25zLnF1ZXJ5XG5cdF07XG5cdFxuXHRnZXRGcm9tQXBpKGVuZHBvaW50LCAnanNvbnAnLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuXHRcdHZhciBlbGVtZW50cyA9IFtdLFxuXHRcdFx0cGhvdG9zID0gcmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLmNoaWxkcmVuIHx8IFtdLFxuXHRcdFx0d2FpdGluZztcblxuXHRcdHBob3RvcyA9IHBob3Rvcy5maWx0ZXIoZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRpdGVtID0gaXRlbS5kYXRhO1xuXG5cdFx0XHRpZihcdGl0ZW0uc2NvcmUgPCBvcHRpb25zLm1pblNjb3JlIHx8IFxuXHRcdFx0XHRpdGVtLm51bV9jb21tZW50cyA8IG9wdGlvbnMubWluQ29tbWVudHMgfHxcblx0XHRcdFx0KCF+aXRlbS51cmwuaW5kZXhPZignLmpwZycpKSl7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcdFxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9KTtcblxuXHRcdHdhaXRpbmcgPSBwaG90b3MubGVuZ3RoO1xuXHRcdHBob3Rvcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xuXHRcdFx0aXRlbSA9IGl0ZW0uZGF0YTtcblx0XHRcdFxuXHRcdFx0Y3JlZGl0c1tpdGVtLmF1dGhvcl0gPSAnaHR0cDovL3d3dy5yZWRkaXQuY29tJyArIGl0ZW0ucGVybWFsaW5rO1xuXHRcdFx0XG5cdFx0XHRsb2FkSW1hZ2UoaXRlbS51cmwpLnRoZW4oZnVuY3Rpb24oZWxlbWVudCl7XG5cdFx0XHRcdHZhciBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdFx0XHRcdGFuY2hvci5ocmVmID0gJ2h0dHA6Ly93d3cucmVkZGl0LmNvbScgKyBpdGVtLnBlcm1hbGluaztcblx0XHRcdFx0YW5jaG9yLndpZHRoID0gZWxlbWVudC53aWR0aDtcblx0XHRcdFx0YW5jaG9yLmhlaWdodCA9IGVsZW1lbnQuaGVpZ2h0O1xuXHRcdFx0XHRhbmNob3IudGFyZ2V0ID0gJ19ibGFuayc7XG5cdFx0XHRcdGFuY2hvci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRcdFx0YW5jaG9yLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXHRcdFx0XHRcblx0XHRcdFx0ZWxlbWVudHMucHVzaChTaW1wbGVFbGVtZW50LmNyZWF0ZShhbmNob3IpKTtcblxuXHRcdFx0XHRpZigtLXdhaXRpbmcgPT09IDApIGRlZmVycmVkLnJlc29sdmUoZWxlbWVudHMpO1xuXHRcdFx0fSwgZnVuY3Rpb24oKXtcblx0XHRcdFx0aWYoLS13YWl0aW5nID09PSAwKSBkZWZlcnJlZC5yZXNvbHZlKGVsZW1lbnRzKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcblxuXHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn1cblxudmFyIGRvY3VtZW50RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5mdW5jdGlvbiBsb2FkSW1hZ2Uoc3JjKXtcblx0dmFyXHRkZWZlcnJlZCA9IFEuZGVmZXIoKSxcblx0XHRpbWcgPSBuZXcgSW1hZ2UoKTtcblx0XG5cdGltZy5zcmMgPSBzcmM7XG5cblx0aW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCl7XG5cdFx0Ly8gVGhpcyBmb3JjZXMgRkYgdG8gc2V0IHRoZSB3aWR0aC9oZWlnaHRcblx0XHRkb2N1bWVudEZyYWdtZW50LmFwcGVuZENoaWxkKGltZyk7XG5cdFx0ZGVmZXJyZWQucmVzb2x2ZShpbWcpO1xuXHR9O1xuXG5cdGltZy5vbmVycm9yID0gZGVmZXJyZWQucmVqZWN0LmJpbmQoZGVmZXJyZWQpO1xuXG5cdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xufSIsIid1c2Ugc3RyaWN0Jztcbi8qIGdsb2JhbHMgdHd0dHIgKi9cbi8qIGpzaGludCBjYW1lbGNhc2U6ZmFsc2UgKi9cblxuLy8gVGhpcyB1c2VzIGFuIHVuZG9jdW1lbnRlZCB0d2l0dGVyIGFwaSAodHd0dHIud2lkZ2V0LmNyZWF0ZVR3ZWV0KSBzbyBpdCBtaWdodCBicmVha1xuXG52YXIgUSA9IHJlcXVpcmUoJy4uLy4uL2Jvd2VyX2NvbXBvbmVudHMvcS9xLmpzJyksXG5cdGdldEZyb21BcGkgPSByZXF1aXJlKCcuL2dldEZyb21Db21tb25BcGkuanMnKSxcdFxuXHRJZnJhbWVFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudC9JZnJhbWUuanMnKTtcblxudmFyIFRJTUVPVVQgPSAxMDAwICogMTA7XG5cbndpbmRvdy5jcmVkaXRzID0gd2luZG93LmNyZWRpdHMgfHwge307XG52YXIgY3JlZGl0cyA9IHdpbmRvdy5jcmVkaXRzLnR3aXR0ZXIgPSB7fTtcblxuLy8gb3B0aW9ucyBzaG91bGQgaGF2ZSBjb250YWluZXIgYW5kIHF1ZXJ5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNvbGxhZ2UsIG9wdGlvbnMpe1xuXHR2YXIgY29udGFpbmVyID0gY29sbGFnZS5lbGVtZW50O1xuXG5cdGlmKG9wdGlvbnMucXVlcnkpe1xuXHRcdHJldHVybiBxdWVyeVR3ZWV0cyhvcHRpb25zLnF1ZXJ5KS50aGVuKGZ1bmN0aW9uKHR3ZWV0SWRzKXtcblx0XHRcdHJldHVybiBsb2FkVHdlZXRzKHR3ZWV0SWRzLCBjb250YWluZXIsIGNvbGxhZ2UpO1xuXHRcdH0pO1x0XG5cdH0gZWxzZSBpZihvcHRpb25zLmlkcykge1xuXHRcdHJldHVybiBsb2FkVHdlZXRzKG9wdGlvbnMuaWRzLCBjb250YWluZXIsIGNvbGxhZ2UpO1xuXHR9IGVsc2UgaWYob3B0aW9ucy5pZCl7XG5cdFx0cmV0dXJuIGxvYWRUd2VldHMoW29wdGlvbnMuaWRdLCBjb250YWluZXIsIGNvbGxhZ2UpLnRoZW4oZnVuY3Rpb24oZWxlbWVudHMpe1xuXHRcdFx0aWYoZWxlbWVudHMgJiYgZWxlbWVudHMubGVuZ3RoKSByZXR1cm4gZWxlbWVudHNbMF07XG5cdFx0fSk7XG5cdH1cbn07XG5cbnZhciBsb2FkVHdlZXRzID0gKGZ1bmN0aW9uKCl7XG5cdHJldHVybiBmdW5jdGlvbihpZHMsIGNvbnRhaW5lcil7XG5cdFx0aWYoIUFycmF5LmlzQXJyYXkoaWRzKSB8fCAhY29udGFpbmVyKSByZXR1cm47XG5cblx0XHR2YXIgaW5kZXggPSBpZHMubGVuZ3RoLFxuXHRcdFx0ZGVmZXJyZWQgPSBRLmRlZmVyKCksXG5cdFx0XHRlbGVtZW50cyA9IFtdLFxuXHRcdFx0dGltZWRPdXQgPSBmYWxzZSxcblx0XHRcdHdhaXRpbmdGb3JSZXNpemUgPSBbXSxcblx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHRpbWVkT3V0ID0gdHJ1ZTtcblx0XHRcdFx0Y2xlYXJJbnRlcnZhbChoZWlnaHRDaGVja2VyKTtcblx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShlbGVtZW50cyk7XG5cdFx0XHR9LCBUSU1FT1VUKTtcblxuXHRcdGZ1bmN0aW9uIGhlaWdodENoZWNrKCl7XG5cdFx0XHR2YXIgaW5kZXggPSB3YWl0aW5nRm9yUmVzaXplLmxlbmd0aCxcblx0XHRcdFx0ZWxlbWVudDtcblxuXHRcdFx0d2hpbGUoaW5kZXgtLSl7XG5cdFx0XHRcdGVsZW1lbnQgPSB3YWl0aW5nRm9yUmVzaXplW2luZGV4XTtcblx0XHRcdFx0aWYoZWxlbWVudC5oZWlnaHQgIT09ICcwJyAgJiYgZWxlbWVudC53aWR0aCAhPT0gJzAnKXtcblx0XHRcdFx0XHRlbGVtZW50cy5wdXNoKElmcmFtZUVsZW1lbnQuY3JlYXRlKGVsZW1lbnQpKTtcblxuXHRcdFx0XHRcdGlmKGVsZW1lbnRzLmxlbmd0aCA9PT0gaWRzLmxlbmd0aCl7XG5cdFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdFx0XHRjbGVhckludGVydmFsKGhlaWdodENoZWNrZXIpO1xuXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShlbGVtZW50cyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0d2FpdGluZ0ZvclJlc2l6ZS5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIGhlaWdodENoZWNrZXIgPSBzZXRJbnRlcnZhbChoZWlnaHRDaGVjaywgMjUwKTtcblxuXHRcdGZ1bmN0aW9uIGhhbmRsZUVsZW1lbnQoZWxlbWVudCl7XG5cdFx0XHRpZih0aW1lZE91dCkgcmV0dXJuO1xuXG5cdFx0XHR2YXIgaWZyYW1lV2luZG93ID0gICdjb250ZW50V2luZG93JyBpbiBlbGVtZW50PyBlbGVtZW50LmNvbnRlbnRXaW5kb3cgOiBlbGVtZW50LmNvbnRlbnREb2N1bWVudC5kZWZhdWx0Vmlldztcblx0XHRcdFxuXHRcdFx0dmFyIG9uTW91c2VNb3ZlQ2FsbGJhY2sgPSBpZnJhbWVXaW5kb3cub25tb3VzZW1vdmU7XG5cdFx0XHRcblx0XHRcdC8vIElmcmFtZXMgY2FwdHVyZSBhbGwgZXZlbnRzLCB0aGlzIGFsbG93cyB1cyB0byBidWJibGUgdGhlIGV2ZW50XG5cdFx0XHQvLyB1cCB0byB0aGlzIHdpbmRvdydzIHNjb3BlXG5cdFx0XHRpZnJhbWVXaW5kb3cub25tb3VzZW1vdmUgPSBmdW5jdGlvbihlKXtcblx0XHRcdFx0aWYob25Nb3VzZU1vdmVDYWxsYmFjaykgb25Nb3VzZU1vdmVDYWxsYmFjayhlKTtcblx0XHRcdFx0dmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50cycpLFxuXHRcdFx0XHRcdGJvdW5kaW5nQ2xpZW50UmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHRcdFx0ZXZ0LmluaXRNb3VzZUV2ZW50KFx0J21vdXNlbW92ZScsIFxuXHRcdFx0XHRcdFx0XHRcdFx0dHJ1ZSwgXG5cdFx0XHRcdFx0XHRcdFx0XHRmYWxzZSwgXG5cdFx0XHRcdFx0XHRcdFx0XHR3aW5kb3csXG5cdFx0XHRcdFx0XHRcdFx0XHRlLmRldGFpbCxcblx0XHRcdFx0XHRcdFx0XHRcdGUuc2NyZWVuWCxcblx0XHRcdFx0XHRcdFx0XHRcdGUuc2NyZWVuWSwgXG5cdFx0XHRcdFx0XHRcdFx0XHRlLmNsaWVudFggKyBib3VuZGluZ0NsaWVudFJlY3QubGVmdCwgXG5cdFx0XHRcdFx0XHRcdFx0XHRlLmNsaWVudFkgKyBib3VuZGluZ0NsaWVudFJlY3QudG9wLCBcblx0XHRcdFx0XHRcdFx0XHRcdGUuY3RybEtleSwgXG5cdFx0XHRcdFx0XHRcdFx0XHRlLmFsdEtleSxcblx0XHRcdFx0XHRcdFx0XHRcdGUuc2hpZnRLZXksIFxuXHRcdFx0XHRcdFx0XHRcdFx0ZS5tZXRhS2V5LFxuXHRcdFx0XHRcdFx0XHRcdFx0ZS5idXR0b24sIFxuXHRcdFx0XHRcdFx0XHRcdFx0bnVsbCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZ0KTtcblx0XHRcdH07XG5cblx0XHRcdHdhaXRpbmdGb3JSZXNpemUucHVzaChlbGVtZW50KTtcblx0XHRcdGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG5cdFx0fVxuXG5cdFx0d2hpbGUoaW5kZXgtLSl7XG5cdFx0XHR0d3R0ci53aWRnZXRzLmNyZWF0ZVR3ZWV0KGlkc1tpbmRleF0sIGNvbnRhaW5lciwgaGFuZGxlRWxlbWVudCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cdH07XG59KCkpO1xuXG52YXIgcXVlcnlUd2VldHMgPSAoZnVuY3Rpb24oKXtcblx0dmFyIGVuZHBvaW50ID0gJ2h0dHA6Ly9zZWFyY2gudHdpdHRlci5jb20vc2VhcmNoLmpzb24nO1xuXHQvL3ZhciBlbmRwb2ludCA9ICcvc2VhcmNoLmpzb24nO1xuXG5cdHJldHVybiBmdW5jdGlvbihxdWVyeSl7XG5cdFx0cmV0dXJuIGdldEZyb21BcGkoZW5kcG9pbnQsIFtcblx0XHRcdCdmb3JtYXQ9anNvbicsXG5cdFx0XHQncT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KVxuXHRcdF0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuXHRcdFx0dmFyIHR3ZWV0SWRzID0gW10sXG5cdFx0XHRcdGR1cGVDaGVjayA9IFtdO1xuXG5cdFx0XHRyZXNwb25zZS5yZXN1bHRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdC8vIFNraXAgcmV0d2VldHNcblx0XHRcdFx0aWYofmR1cGVDaGVjay5pbmRleE9mKGl0ZW0udGV4dCkpe1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkdXBlQ2hlY2sucHVzaChpdGVtLnRleHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU2tpcCBtYXRjaGVzIG9uIHVzZXJuYW1lXG5cdFx0XHRcdGlmKH5pdGVtLmZyb21fdXNlci50b0xvd2VyQ2FzZSgpLmluZGV4T2YocXVlcnkudG9Mb3dlckNhc2UoKSkpe1xuXHRcdFx0XHRcdHJldHVybjtcdFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y3JlZGl0c1tpdGVtLmZyb21fdXNlcl0gPSAnaHR0cDovL3R3aXR0ZXIuY29tLycgKyBpdGVtLmZyb21fdXNlcjtcblxuXHRcdFx0XHR0d2VldElkcy5wdXNoKGl0ZW0uaWRfc3RyKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gdHdlZXRJZHM7XG5cdFx0fSk7XG5cdH07XG59KCkpOyIsIid1c2Ugc3RyaWN0Jztcbi8qIGdsb2JhbHMgWVQgKi9cblxudmFyIFEgPSByZXF1aXJlKCcuLi8uLi9ib3dlcl9jb21wb25lbnRzL3EvcS5qcycpO1xudmFyIFZpZGVvRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQvVmlkZW8uanMnKTtcbnZhciBnZXRGcm9tQXBpID0gcmVxdWlyZSgnLi9nZXRGcm9tQ29tbW9uQXBpLmpzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy5qcycpO1xudmFyIFRJTUVPVVQgPSAxMCAqIDEwMDA7XG5cbndpbmRvdy5jcmVkaXRzID0gd2luZG93LmNyZWRpdHMgfHwge307XG52YXIgY3JlZGl0cyA9IHdpbmRvdy5jcmVkaXRzLnlvdXR1YmUgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjb2xsYWdlLCBvcHRpb25zKXtcblx0aWYob3B0aW9ucy5xdWVyeSl7XG5cdFx0cmV0dXJuIHF1ZXJ5VmlkZW9zKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24odmlkZW9JZHMpe1xuXHRcdFx0b3B0aW9ucy52aWRlb0lkcyA9IHZpZGVvSWRzO1xuXHRcdFx0cmV0dXJuIGxvYWRWaWRlb3MoY29sbGFnZSwgb3B0aW9ucyk7XG5cdFx0fSk7XG5cdH1cblxuXHRpZihvcHRpb25zLnZpZGVvSWQpe1xuXHRcdG9wdGlvbnMudmlkZW9JZHMgPSBbb3B0aW9ucy52aWRlb0lkXTtcblxuXHRcdHJldHVybiBsb2FkVmlkZW9zKGNvbGxhZ2UsIG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24oZWxlbWVudHMpe1xuXHRcdFx0cmV0dXJuIGVsZW1lbnRzWzBdO1xuXHRcdH0pO1xuXHR9IGVsc2UgaWYob3B0aW9ucy52aWRlb0lkcyl7XG5cdFx0cmV0dXJuIGxvYWRWaWRlb3MoY29sbGFnZSwgb3B0aW9ucyk7XHRcblx0fVxufTtcblxudmFyIGRlZmF1bHRzID0ge1xuXHRkdXJhdGlvbjogJ3Nob3J0Jyxcblx0a2V5OiAnQUl6YVN5QVp3MGt2aVdlQ09pZHRoY1pBWXM1b0NaMGs4RHNPdVVrJ1xufTtcblxudmFyIHF1ZXJ5VmlkZW9zID0gKGZ1bmN0aW9uKCl7XG5cdHZhciBlbmRwb2ludCA9ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3NlYXJjaCc7XG5cdC8vdmFyIGVuZHBvaW50ID0gJ2h0dHBzOi8vZDNnZ29xYmhwZXhrZTIuY2xvdWRmcm9udC5uZXQveW91dHViZS92My9zZWFyY2gnO1xuXG5cdHJldHVybiBmdW5jdGlvbihvcHRpb25zKXtcblx0XHR1dGlscy5leHRlbmQob3B0aW9ucywgZGVmYXVsdHMpO1xuXG5cdFx0dmFyIHBhcmFtcyA9IFtcblx0XHRcdFx0J3BhcnQ9aWQsc25pcHBldCcsXG5cdFx0XHRcdCd2aWRlb0R1cmF0aW9uPScgKyBvcHRpb25zLmR1cmF0aW9uLFxuXHRcdFx0XHQndHlwZT12aWRlbycsXG5cdFx0XHRcdCd2aWRlb0VtYmVkZGFibGU9dHJ1ZScsXG5cdFx0XHRcdCd2aWRlb1N5bmRpY2F0ZWQ9dHJ1ZScsXG5cdFx0XHRcdCdrZXk9JyArIG9wdGlvbnMua2V5LFxuXHRcdFx0XHQncT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMucXVlcnkpXG5cdFx0XHRdO1xuXHRcdFxuXHRcdHJldHVybiBnZXRGcm9tQXBpKGVuZHBvaW50LCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuXHRcdFx0dmFyIHZpZGVvSWRzID0gW107XG5cblx0XHRcdHJlc3BvbnNlLml0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdGNyZWRpdHNbaXRlbS5zbmlwcGV0LmNoYW5uZWxUaXRsZV0gPSAnaHR0cDovL3lvdXR1YmUuY29tLycgKyBpdGVtLnNuaXBwZXQuY2hhbm5lbFRpdGxlO1xuXHRcdFx0XHR2aWRlb0lkcy5wdXNoKGl0ZW0uaWQudmlkZW9JZCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIHZpZGVvSWRzO1xuXHRcdH0pO1xuXHR9O1xufSgpKTtcblxudmFyIGxvYWRWaWRlb3MgPSAoZnVuY3Rpb24oKXtcblx0cmV0dXJuIGZ1bmN0aW9uKGNvbGxhZ2UsIG9wdGlvbnMpe1xuXHRcdGlmKCFBcnJheS5pc0FycmF5KG9wdGlvbnMudmlkZW9JZHMpKSByZXR1cm47XG5cdFx0XG5cdFx0dmFyIGluZGV4ID0gb3B0aW9ucy52aWRlb0lkcy5sZW5ndGgsXG5cdFx0XHRkZWZlcnJlZCA9IFEuZGVmZXIoKSxcblx0XHRcdGVsZW1lbnRzID0gW10sXG5cdFx0XHR2aWRlb09wdGlvbnMsXG5cdFx0XHR0aW1lZE91dCA9IGZhbHNlLFxuXHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0dGltZWRPdXQgPSB0cnVlO1xuXHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKGVsZW1lbnRzKTtcblx0XHRcdH0sIFRJTUVPVVQpO1xuXG5cdFx0b3B0aW9ucy5jYWxsYmFjayA9IGZ1bmN0aW9uKGVsZW1lbnQpe1xuXHRcdFx0aWYodGltZWRPdXQgfHwgIWVsZW1lbnQpIHJldHVybjtcblx0XHRcdGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG5cblx0XHRcdGlmKGVsZW1lbnRzLmxlbmd0aCA9PT0gb3B0aW9ucy52aWRlb0lkcy5sZW5ndGgpe1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdGRlZmVycmVkLnJlc29sdmUoZWxlbWVudHMpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR3aGlsZShpbmRleC0tKXtcblx0XHRcdHZpZGVvT3B0aW9ucyA9IE9iamVjdC5jcmVhdGUob3B0aW9ucyk7XG5cdFx0XHR2aWRlb09wdGlvbnMudmlkZW9JZCA9IG9wdGlvbnMudmlkZW9JZHNbaW5kZXhdO1xuXHRcdFx0bG9hZFZpZGVvKGNvbGxhZ2UsIHZpZGVvT3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cdH07XG59KCkpO1xuXG52YXIgaXNpT1MgPSAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKGlQYWR8aVBob25lfGlQb2QpL2cpID8gdHJ1ZSA6IGZhbHNlICk7XG5cbnZhciBsb2FkVmlkZW8gPSAoZnVuY3Rpb24oKXtcblx0dmFyIHBsYXllcklkQ291bnRlciA9IDA7XG5cdHJldHVybiBmdW5jdGlvbihjb2xsYWdlLCBvcHRpb25zKXtcblx0XHR2YXIgdmlkZW9JZCA9IG9wdGlvbnMudmlkZW9JZCxcblx0XHRcdHdpZHRoID0gb3B0aW9ucy53aWR0aCB8fCAxMDYwLFxuXHRcdFx0aGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgNjUwO1xuXG5cdFx0dmFyIHBsYXllcklkID0gJ3BsYXllcicgKyAocGxheWVySWRDb3VudGVyKyspO1xuXG5cdFx0dmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRlbGVtZW50LndpZHRoID0gd2lkdGg7XG5cdFx0ZWxlbWVudC5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0ZWxlbWVudC5jbGFzc05hbWUgPSAneW91dHViZS12aWRlbyc7XG5cdFx0XG5cdFx0aWYoaXNpT1MpIGVsZW1lbnQuY2xhc3NOYW1lICs9ICcgaGlkZS12aWRlby1tYXNrJztcblxuXHRcdGVsZW1lbnQuaW5uZXJIVE1MID0gJzxkaXYgaWQ9XCInICsgcGxheWVySWQgKyAnXCI+PC9kaXY+PGRpdiBjbGFzcz1cInZpZGVvLW1hc2tcIj48L2Rpdj4nO1xuXHRcdGNvbGxhZ2UuZWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcblx0XHRcblx0XHR2YXIgdmlkZW9FbGVtZW50O1xuXG5cdFx0bmV3IFlULlBsYXllcihwbGF5ZXJJZCwge1xuXHRcdFx0aGVpZ2h0OiBoZWlnaHQsXG5cdFx0XHR3aWR0aDogd2lkdGgsXG5cdFx0XHRwbGF5ZXJWYXJzOiB7IFxuXHRcdFx0XHRjb250cm9sczogMCwgXG5cdFx0XHRcdGh0bWw1OiAxLFxuXHRcdFx0XHRzdGFydDogKG9wdGlvbnMuc3RhcnRUaW1lIHx8IDApXG5cdFx0XHR9LFxuXHRcdFx0dmlkZW9JZDogdmlkZW9JZCxcblx0XHRcdGV2ZW50czoge1xuXHRcdFx0XHRvblJlYWR5OiBmdW5jdGlvbihlKXtcblx0XHRcdFx0XHR2YXIgcGxheWVyT2JqID0gZS50YXJnZXQ7XG5cdFx0XHRcdFx0dmlkZW9FbGVtZW50ID0gVmlkZW9FbGVtZW50LmNyZWF0ZShlbGVtZW50LCBwbGF5ZXJPYmosIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVvdXNQbGF5OiBvcHRpb25zLmNvbnRpbnVvdXNQbGF5LFxuXHRcdFx0XHRcdFx0YXV0b3BsYXk6IG9wdGlvbnMuYXV0b3BsYXksXG5cdFx0XHRcdFx0XHRsb29wOiBvcHRpb25zLmxvb3Bcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRpZihpc2lPUyl7XG5cdFx0XHRcdFx0XHR2aWRlb0VsZW1lbnQub24oJ3BsYXlpbmcnLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UoJyBoaWRlLXZpZGVvLW1hc2snLCAnJyk7XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0dmlkZW9FbGVtZW50Lm9uKCdwYXVzZWQnLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0XHRlbGVtZW50LmNsYXNzTmFtZSArPSAnIGhpZGUtdmlkZW8tbWFzayc7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRwbGF5ZXJPYmoucGF1c2VWaWRlbygpO1xuXHRcdFx0XHRcdGlmKG9wdGlvbnMuY29udGludW91c1BsYXkpe1xuXHRcdFx0XHRcdFx0cGxheWVyT2JqLnVuTXV0ZSgpO1xuXHRcdFx0XHRcdFx0cGxheWVyT2JqLnNldFZvbHVtZSgxMDApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKG9wdGlvbnMubXV0ZSl7XG5cdFx0XHRcdFx0XHRwbGF5ZXJPYmoubXV0ZSgpO1xuXHRcdFx0XHRcdFx0cGxheWVyT2JqLnNldFZvbHVtZSgwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYob3B0aW9ucy5jYWxsYmFjaykgb3B0aW9ucy5jYWxsYmFjayh2aWRlb0VsZW1lbnQpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRvbkVycm9yOiBmdW5jdGlvbigpe1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH07XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmV4dGVuZCA9IGZ1bmN0aW9uKGRlc3RpbmF0aW9uKXtcblx0dmFyIHNvdXJjZXMgPSBhcmd1bWVudHMubGVuZ3RoLFxuXHRcdGluZGV4ID0gMSxcblx0XHRzb3VyY2UsXG5cdFx0a2V5O1xuXG5cdGZvcig7IGluZGV4IDwgc291cmNlczsgaW5kZXgrKyl7XG5cdFx0c291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcblx0XHRmb3Ioa2V5IGluIHNvdXJjZSl7XG5cdFx0XHRpZihzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhKGtleSBpbiBkZXN0aW5hdGlvbikpe1xuXHRcdFx0XHRkZXN0aW5hdGlvbltrZXldID0gc291cmNlW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnRzLmF0dGFjaElmcmFtZVRvQ29sbGFnZSA9IGZ1bmN0aW9uKGNvbGxhZ2UsIGlmcmFtZSwgd2lkdGgsIGhlaWdodCl7XG5cdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29udGFpbmVyLmNsYXNzTmFtZT0naWZyYW1lLWNvbnRhaW5lcic7XG5cdFxuXHR2YXIgb3ZlcmZsb3dXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdG92ZXJmbG93V3JhcHBlci5jbGFzc05hbWUgPSAnaWZyYW1lLW92ZXJmbG93LXdyYXBwZXInO1xuXHRvdmVyZmxvd1dyYXBwZXIuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG5cdG92ZXJmbG93V3JhcHBlci5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQob3ZlcmZsb3dXcmFwcGVyKTtcblxuXHRpZnJhbWUuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG5cdGlmcmFtZS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXHRvdmVyZmxvd1dyYXBwZXIuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcblxuXHR2YXIgbWFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRtYXNrLmNsYXNzTmFtZSA9ICdpZnJhbWUtbWFzayc7XG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChtYXNrKTtcblxuXHR2YXIgaGFzRm9jdXMgPSBmYWxzZTtcblx0bWFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0aGFzRm9jdXMgPSB0cnVlO1xuXHRcdGNvbnRhaW5lci5jbGFzc05hbWUgKz0gJyBpbi1mb2N1cyc7XG5cdFx0Y29sbGFnZS5wYXVzZSgwLjQpO1xuXHR9KTtcblxuXHRtYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCl7XG5cdFx0aWYoIWhhc0ZvY3VzKSByZXR1cm47XG5cdFx0aGFzRm9jdXMgPSBmYWxzZTtcblx0XHRjb250YWluZXIuY2xhc3NOYW1lID0gY29udGFpbmVyLmNsYXNzTmFtZS5yZXBsYWNlKCcgaW4tZm9jdXMnLCAnJyk7XG5cdFx0Y29sbGFnZS5yZXN1bWUoMC40KTtcblx0fSk7XG5cblx0Y29sbGFnZS5lbGVtZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5cdFxuXHRyZXR1cm4gY29udGFpbmVyO1xufTtcblxuXG5leHBvcnRzLnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgXG5cdFx0XHRcdFx0XHRcdFx0d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHR3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHR3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdGZ1bmN0aW9uKGNiKXtyZXR1cm4gc2V0VGltZW91dChjYiwgMTUpO307XG5cbmV4cG9ydHMuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBcdHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCBcblx0XHRcdFx0XHRcdFx0XHR3aW5kb3cubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx0d2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHR3aW5kb3cubXNDYW5jZWxBbmltYXRpb25GcmFtZSB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx0ZnVuY3Rpb24odGltZW91dCl7cmV0dXJuIGNsZWFyVGltZW91dCh0aW1lb3V0KTt9O1xuXG5leHBvcnRzLnJlcXVlc3RGdWxsc2NyZWVuID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuIHx8XG5cdFx0XHRcdFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbiB8fFxuXHRcdFx0XHRcdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4gfHxcblx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKXt9O1xuXG52YXIgYm9keVN0eWxlID0gZG9jdW1lbnQuYm9keS5zdHlsZTtcdFxuZXhwb3J0cy50cmFuc2l0aW9uQXR0cmlidXRlID1cdChib2R5U3R5bGUubXNUcmFuc2l0aW9uICE9PSB2b2lkIDApICYmICdtc1RyYW5zaXRpb24nIHx8XG5cdFx0XHRcdFx0XHRcdFx0KGJvZHlTdHlsZS53ZWJraXRUcmFuc2l0aW9uICE9PSB2b2lkIDApICYmICd3ZWJraXRUcmFuc2l0aW9uJyB8fFxuXHRcdFx0XHRcdFx0XHRcdChib2R5U3R5bGUuTW96VHJhbnNpdGlvbiAhPT0gdm9pZCAwKSAmJiAnTW96VHJhbnNpdGlvbicgfHwgXG5cdFx0XHRcdFx0XHRcdFx0KGJvZHlTdHlsZS50cmFuc2l0aW9uICE9PSB2b2lkIDApICYmICd0cmFuc2l0aW9uJztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==