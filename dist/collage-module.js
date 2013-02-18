;module.exports = (function(){
var __m15 = function(module,exports){module.exports=exports;
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
;return module.exports;}({},{});
var __m9 = function(module,exports){module.exports=exports;
var EventEmitter = __m15.EventEmitter;

var Collection = module.exports = function(collage, disable){
	this.emitter = new EventEmitter();
	this.collage = collage;
	this.waiting = 0;
	this.count = 0;
	this.loaded = [];
	this.resources = {};

	if(disable){
		this.disable();
	} else {
		this.enable();
	}
}

Collection.getApi = function(collection){
	var api = {};

	api.element = collection.getRandom.bind(collection);
	api.progress = collection.getProgress.bind(collection);
	api.on = collection.emitter.on.bind(collection.emitter);
	api.removeListener = collection.emitter.removeListener.bind(collection.emitter);
	api.enable = collection.enable.bind(collection);
	api.disable = collection.disable.bind(collection);
	
	Object.defineProperty(api, "skipProbability", {
		get: function(){ return collection.skipProbability; },
		set: function(value){
			collection.skipProbability = value;
		}
	});

	Object.defineProperty(api, "priority", {
		get: function(){ return collection.priority; },
		set: function(value){
			collection.priority = value;

			if(collection.enabled){
				collection.collage.removeCollection(collection);
				collection.collage.addCollection(collection);
			}
		}
	});

	return api;
};

Collection.prototype.enabled = true;
Collection.prototype.tryLimit = 1;

Collection.prototype.priority = -1 * Infinity;
Collection.prototype.skipProbability = 0;

Collection.prototype.enable = function(){
	if(this.enabled) return;

	this.enabled = true;
	this.collage.addCollection(this);
	this.emitter.emit("enabled");
};

Collection.prototype.disable = function(){
	if(!this.enabled) return;
	
	this.enabled = false;
	this.collage.removeCollection(this);
	this.emitter.emit("disabled");
};

Collection.prototype.markResource = function(id){
	if(id in this.resources) return;

	this.resources[id] = true;
	this.count++;
	
	this.setLoading();
};

Collection.prototype.addResource = function(id, resource){
	if(!this.hasResource(id)) this.markResource(id);

	this.loaded.push(resource);
	
	this.clearLoading();

	this.emitter.emit("progress", this.getProgress());
};

Collection.prototype.hasResource = function(id){
	return (id in this.resources);
};

Collection.prototype.setLoading = function(){
	this.waiting++;
	if(this.waiting === 1){
		this.emitter.emit("loading");
	}
};

Collection.prototype.clearLoading = function(){
	this.waiting--;
	if(!this.waiting){
		this.emitter.emit("ready");
	}
};

Collection.prototype.getProgress = function(){
	return this.loaded.length / this.count;	
};

Collection.prototype.getRandom = function(){
	if(Math.random() < this.skipProbability) return;

	var tryCount = 0,
		element;

	for(; tryCount < tryLimit; tryCount++){
		element = this.loaded[(Math.random() * this.loaded.length)|0];
		if(!this.collage.hasLocationNearViewport(element)){
			return element;
		}
	}
};

;return module.exports;}({},{});
var __m14 = function(module,exports){module.exports=exports;
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function (root, factory) {
  if (typeof exports === "object" && exports) {
    module.exports = factory; // CommonJS
  } else if (typeof define === "function" && define.amd) {
    define(factory); // AMD
  } else {
    root.Mustache = factory; // <script>
  }
}(this, (function () {

  var exports = {};

  exports.name = "mustache.js";
  exports.version = "0.7.2";
  exports.tags = ["{{", "}}"];

  exports.Scanner = Scanner;
  exports.Context = Context;
  exports.Writer = Writer;

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var nonSpaceRe = /\S/;
  var eqRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  function testRe(re, string) {
    return RegExp.prototype.test.call(re, string);
  }

  function isWhitespace(string) {
    return !testRe(nonSpaceRe, string);
  }

  var isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };

  function escapeRe(string) {
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

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  exports.escape = escapeHtml;

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
      this.tail = this.tail.substring(match[0].length);
      this.pos += match[0].length;
      return match[0];
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var match, pos = this.tail.search(re);

    switch (pos) {
    case -1:
      match = this.tail;
      this.pos += this.tail.length;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, pos);
      this.tail = this.tail.substring(pos);
      this.pos += pos;
    }

    return match;
  };

  function Context(view, parent) {
    this.view = view;
    this.parent = parent;
    this.clearCache();
  }

  Context.make = function (view) {
    return (view instanceof Context) ? view : new Context(view);
  };

  Context.prototype.clearCache = function () {
    this._cache = {};
  };

  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  Context.prototype.lookup = function (name) {
    var value = this._cache[name];

    if (!value) {
      if (name === ".") {
        value = this.view;
      } else {
        var context = this;

        while (context) {
          if (name.indexOf(".") > 0) {
            var names = name.split("."), i = 0;

            value = context.view;

            while (value && i < names.length) {
              value = value[names[i++]];
            }
          } else {
            value = context.view[name];
          }

          if (value != null) {
            break;
          }

          context = context.parent;
        }
      }

      this._cache[name] = value;
    }

    if (typeof value === "function") {
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
      var tokens = exports.parse(template, tags);
      fn = this._cache[template] = this.compileTokens(tokens, template);
    }

    return fn;
  };

  Writer.prototype.compilePartial = function (name, template, tags) {
    var fn = this.compile(template, tags);
    this._partialCache[name] = fn;
    return fn;
  };

  Writer.prototype.compileTokens = function (tokens, template) {
    var fn = compileTokens(tokens);
    var self = this;

    return function (view, partials) {
      if (partials) {
        if (typeof partials === "function") {
          self._loadPartial = partials;
        } else {
          for (var name in partials) {
            self.compilePartial(name, partials[name]);
          }
        }
      }

      return fn(self, Context.make(view), template);
    };
  };

  Writer.prototype.render = function (template, view, partials) {
    return this.compile(template)(view, partials);
  };

  Writer.prototype._section = function (name, context, text, callback) {
    var value = context.lookup(name);

    switch (typeof value) {
    case "object":
      if (isArray(value)) {
        var buffer = "";

        for (var i = 0, len = value.length; i < len; ++i) {
          buffer += callback(this, context.push(value[i]));
        }

        return buffer;
      }

      return value ? callback(this, context.push(value)) : "";
    case "function":
      var self = this;
      var scopedRender = function (template) {
        return self.render(template, context);
      };

      var result = value.call(context.view, text, scopedRender);
      return result != null ? result : "";
    default:
      if (value) {
        return callback(this, context);
      }
    }

    return "";
  };

  Writer.prototype._inverted = function (name, context, callback) {
    var value = context.lookup(name);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0)) {
      return callback(this, context);
    }

    return "";
  };

  Writer.prototype._partial = function (name, context) {
    if (!(name in this._partialCache) && this._loadPartial) {
      this.compilePartial(name, this._loadPartial(name));
    }

    var fn = this._partialCache[name];

    return fn ? fn(context) : "";
  };

  Writer.prototype._name = function (name, context) {
    var value = context.lookup(name);

    if (typeof value === "function") {
      value = value.call(context.view);
    }

    return (value == null) ? "" : String(value);
  };

  Writer.prototype._escaped = function (name, context) {
    return exports.escape(this._name(name, context));
  };

  /**
   * Low-level function that compiles the given `tokens` into a function
   * that accepts three arguments: a Writer, a Context, and the template.
   */
  function compileTokens(tokens) {
    var subRenders = {};

    function subRender(i, tokens, template) {
      if (!subRenders[i]) {
        var fn = compileTokens(tokens);
        subRenders[i] = function (writer, context) {
          return fn(writer, context, template);
        };
      }

      return subRenders[i];
    }

    return function (writer, context, template) {
      var buffer = "";
      var token, sectionText;

      for (var i = 0, len = tokens.length; i < len; ++i) {
        token = tokens[i];

        switch (token[0]) {
        case "#":
          sectionText = template.slice(token[3], token[5]);
          buffer += writer._section(token[1], context, sectionText, subRender(i, token[4], template));
          break;
        case "^":
          buffer += writer._inverted(token[1], context, subRender(i, token[4], template));
          break;
        case ">":
          buffer += writer._partial(token[1], context);
          break;
        case "&":
          buffer += writer._name(token[1], context);
          break;
        case "name":
          buffer += writer._escaped(token[1], context);
          break;
        case "text":
          buffer += token[1];
          break;
        }
      }

      return buffer;
    };
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
      if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
        lastToken[1] += token[1];
        lastToken[3] = token[3];
      } else {
        lastToken = token;
        squashedTokens.push(token);
      }
    }

    return squashedTokens;
  }

  function escapeTags(tags) {
    return [
      new RegExp(escapeRe(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRe(tags[1]))
    ];
  }

  /**
   * Breaks up the given `template` string into a tree of token objects. If
   * `tags` is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. ["<%", "%>"]). Of
   * course, the default is to use mustaches (i.e. Mustache.tags).
   */
  exports.parse = function (template, tags) {
    template = template || '';
    tags = tags || exports.tags;

    if (typeof tags === 'string') tags = tags.split(spaceRe);
    if (tags.length !== 2) {
      throw new Error('Invalid tags: ' + tags.join(', '));
    }

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
          tokens.splice(spaces.pop(), 1);
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr;
    while (!scanner.eos()) {
      start = scanner.pos;
      value = scanner.scanUntil(tagRes[0]);

      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(["text", chr, start, start + 1]);
          start += 1;

          if (chr === "\n") {
            stripSpace(); // Check for whitespace on the current line.
          }
        }
      }

      start = scanner.pos;

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) {
        break;
      }

      hasTag = true;
      type = scanner.scan(tagRe) || "name";

      // Skip any whitespace between tag and value.
      scanner.scan(whiteRe);

      // Extract the tag value.
      if (type === "=") {
        value = scanner.scanUntil(eqRe);
        scanner.scan(eqRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === "{") {
        var closeRe = new RegExp("\\s*" + escapeRe("}" + tags[1]));
        value = scanner.scanUntil(closeRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = "&";
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) {
        throw new Error('Unclosed tag at ' + scanner.pos);
      }

      // Check section nesting.
      if (type === '/') {
        if (sections.length === 0) {
          throw new Error('Unopened section "' + value + '" at ' + start);
        }

        var section = sections.pop();

        if (section[1] !== value) {
          throw new Error('Unclosed section "' + section[1] + '" at ' + start);
        }
      }

      var token = [type, value, start, scanner.pos];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === "name" || type === "{" || type === "&") {
        nonSpace = true;
      } else if (type === "=") {
        // Set the tags for the next time around.
        tags = value.split(spaceRe);

        if (tags.length !== 2) {
          throw new Error('Invalid tags at ' + start + ': ' + tags.join(', '));
        }

        tagRes = escapeTags(tags);
      }
    }

    // Make sure there are no open sections when we're done.
    var section = sections.pop();
    if (section) {
      throw new Error('Unclosed section "' + section[1] + '" at ' + scanner.pos);
    }

    return nestTokens(squashTokens(tokens));
  };

  // The high-level clearCache, compile, compilePartial, and render functions
  // use this default writer.
  var _writer = new Writer();

  /**
   * Clears all cached templates and partials in the default writer.
   */
  exports.clearCache = function () {
    return _writer.clearCache();
  };

  /**
   * Compiles the given `template` to a reusable function using the default
   * writer.
   */
  exports.compile = function (template, tags) {
    return _writer.compile(template, tags);
  };

  /**
   * Compiles the partial with the given `name` and `template` to a reusable
   * function using the default writer.
   */
  exports.compilePartial = function (name, template, tags) {
    return _writer.compilePartial(name, template, tags);
  };

  /**
   * Compiles the given array of tokens (the output of a parse) to a reusable
   * function using the default writer.
   */
  exports.compileTokens = function (tokens, template) {
    return _writer.compileTokens(tokens, template);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  exports.render = function (template, view, partials) {
    return _writer.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  exports.to_html = function (template, view, partials, send) {
    var result = exports.render(template, view, partials);

    if (typeof send === "function") {
      send(result);
    } else {
      return result;
    }
  };

  return exports;

}())));

;return module.exports;}({},{});
var __m13 = function(module,exports){module.exports=exports;
// Video elements can't be moved around the dom because they'll reset

module.exports = VideoElement;

function VideoElement (video){
	this.element = video.element;
	this.video = video;
	

	this.width = this.element.clientWidth;
	this.height = this.element.clientHeight;
	
	this.locations = [];
};

VideoElement.prototype.hide = function(){
	if(!this.video.continuousPlay){
		this.video.pauseVideo();
	}
};

VideoElement.prototype.show = function(left, top){
	this.element.style.left = left + "px";
	this.element.style.top = top + "px";

	if(!this.video.continuousPlay){
		this.video.playVideo();
	}
};

;return module.exports;}({},{});
var __m8 = function(module,exports){module.exports=exports;
var Collection = __m9,
	VideoElement = __m13;

module.exports = function(container){
	var collection = new YoutubeCollection(container);
	return getApi(collection);
};

function getApi(collection){
	var api = Collection.getApi(collection);

	api.add = collection.add.bind(collection);
	
	return api;
}

function YoutubeCollection(container){
	Collection.apply(this, arguments);
	this.container = this.collage.element;
	this.documentFragment = document.createDocumentFragment();
}
YoutubeCollection.prototype = Object.create(Collection.prototype);

YoutubeCollection.prototype.add = function(id, options){
	if(this.hasResource(id)) return;
	
	var self = this;

	options = options || {};
	
	this.markResource(id);

	createYTPlayer({
		videoId: id,
		container: this.container,
		width: options.width,
		height: options.height,
		callback: function(player){
			if(options.loop) player.loop = true;

			if(options.continuousPlay){
				player.continuousPlay = true;
				player.playVideo();
			}

			if(options.mute) player.mute();

			self.addResource(id, new VideoElement(player));
		}
	});
};

// YOUTUBE player
function createPlayer(options){
  options = options || {};
  var width = options.width || 1060,
      height = options.height || 650;

  var containerId = _.uniqueId('container');
  var playerId = _.uniqueId('player'),
    player;
    
  var element = $('<div class="video-container"><div id="' + playerId + '"></div><div class="video-mask"></div></div>')[0];
  options.container.appendChild(element);
  
  new YT.Player(playerId, {
    height: height,
    width: width,
    playerVars: { 'controls': 0 },
    videoId: options.videoId,
    events: {
      onReady: function(e){
        var playerObj = e.target;

        if(player){ 
          if(options.videoId) playerObj.cueVideoById(options.videoId);
          return;
        }
        
        player = new Player(playerObj, element);
        if(options.videoId) playerObj.cueVideoById(options.videoId);

        if(options.callback) {
          options.callback(getApi(player));
        }
      },
      onStateChange: function(e){
      }
    }
  });
};

function getApi(player){
  var api = player.player;
  api.element = player.element;
  api.on = player.emitter.on.bind(player.emitter);
  api.removeListener = player.emitter.removeListener.bind(player.emitter);
  api.kill = player.kill.bind(player);
  return api;
}

function Player(player, element){
  this.id = player.id;
  this.player = player;
  this.element = element;
  this.lastReportedTime = 0;
  this.emitter = new EventEmitter();
  
  player.addEventListener("onStateChange", _.bind(this.onStatusChange, this));
}

Player.prototype.kill = function(){
  this.container.parentNode.removeChild(this.container);
  this.emitter.emit('dead');
};

Player.prototype.onStatusChange = function(status){
  switch(status.data){
    case -1:
      this.emitter.emit('unstarted');
    break;
    case 0:
      this.emitter.emit('ended');
      if(this.player.loop){
        this.player.seekTo(0);
        this.player.playVideo();
      }
    break;
    case 1:
      this.emitter.emit('playing');
    break;
    case 2:
      this.emitter.emit('paused');
    break;
    case 3:
      this.emitter.emit('buffering');
    break;
    case 5:
      this.emitter.emit('video cued');
    break;
  }
};

;return module.exports;}({},{});
var __m12 = function(module,exports){module.exports=exports;
var endpoint = "http://api.flickr.com/services/feeds/photos_public.gne?format=json";
var callbackCounter = 0;
var callbacks = {};
window.FLICKR_CALLBACKS = callbacks;

module.exports = function(tags){
	var self = this,
		script = document.createElement("script"),
		callbackId = "cb" + callbackCounter++,
		src = endpoint + "&jsoncallback=FLICKR_CALLBACKS." + callbackId + "&tags=" + tags; 
	
	script.async = true;
	script.src = src;

	this.setLoading();
	callbacks[callbackId] = function(data){
		delete callbacks[callbackId];
		data.items.forEach(function(item){
			self.add(item.media.m.replace("_m.jpg", "_z.jpg"));
		});
		self.clearLoading();
	}
	
	document.body.appendChild(script);	
};
;return module.exports;}({},{});
var __m11 = function(module,exports){module.exports=exports;
module.exports = StaticElement;

function StaticElement (element){
	this.element = element;

	this.locations = [];
	
	this.width = parseInt(element.width);
	this.height = parseInt(element.height);
};

var hidingArea = document.createDocumentFragment();

StaticElement.prototype.hide = function(){
	hidingArea.appendChild(this.element);
};

StaticElement.prototype.show = function(left, top, container){
	this.element.style.left = left + "px";
	this.element.style.top = top + "px";
	container.appendChild(this.element);
};
;return module.exports;}({},{});
var __m7 = function(module,exports){module.exports=exports;
var Collection = __m9,
	StaticElement = __m11,
	mustache = __m14;

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
;return module.exports;}({},{});
var __m5 = function(module,exports){module.exports=exports;
var Collection = __m9,
	StaticElement = __m11;

module.exports = function(){
	var collection = new ImageCollection();
	return getApi(collection);
};

function getApi(collection){
	var api = Collection.getApi(collection);

	api.add = collection.add.bind(collection);
	api.loadFromFlickr = __m12.bind(collection);

	return api;
};

function ImageCollection(){
	Collection.apply(this, arguments);
}
ImageCollection.prototype = Object.create(Collection.prototype);

var documentFragment = document.createDocumentFragment();

ImageCollection.prototype.add = function(src){
	if(this.hasResource(src)) return;
	
	var self = this,
		img = new Image();
	img.src = src;
	
	this.markResource(src);
	
	img.onload = function(){
		// This forces FF to set the width/height
		documentFragment.appendChild(img);
		self.addResource(src, new StaticElement(img));
	}
};
;return module.exports;}({},{});
var __m10 = function(module,exports){module.exports=exports;
// Video elements can't be moved around the dom because they'll reset

module.exports = IframeElement;

function IframeElement (element){
	this.element = element;
	
	this.width = this.element.clientWidth;
	this.height = this.element.clientHeight;
	this.locations = [];
	
	this.hide();
};

IframeElement.prototype.hide = function(){
	this.element.style.opacity = 0;
};

IframeElement.prototype.show = function(left, top){
	this.element.style.opacity = 1;
	this.element.style.left = left + "px";
	this.element.style.top = top + "px";
};

;return module.exports;}({},{});
var __m6 = function(module,exports){module.exports=exports;
var Collection = __m9,
	IframeElement = __m10;

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
;return module.exports;}({},{});
var __m2 = function(module,exports){module.exports=exports;
exports.image = __m5;
exports.tweet = __m6;
exports.nyTimesArticle = __m7;
exports.youtube = __m8;
;return module.exports;}({},{});
var __m4 = function(module,exports){module.exports=exports;
;module.exports = (function(){
var __m2 = function(module,exports){module.exports=exports;
;module.exports = (function(){
var __m1 = function(module,exports){module.exports=exports;
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

	return changeInValue / 2 * (-Math.pow(2, -10 * --t) + 2) + startValue;
};

;return module.exports;}({},{});
var __m0 = function(module,exports){module.exports=exports;
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
			callback && callback();
		}
	}

	resume();

	return {
		resume: resume,
		pause: pause
	};
};

// Bind easing helpers
var easing = __m1,
	easingFuncName;

for(easingFuncName in easing){
	if(easing.hasOwnProperty(easingFuncName)){
		tween[easingFuncName] = tween.bind(void 0, easing[easingFuncName]);
	}
}

tween.easing = easing;
;return module.exports;}({},{});return __m0;}());
;return module.exports;}({},{});
var __m1 = function(module,exports){module.exports=exports;
var noop = exports.noop = function(){};

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
							noop;

var bodyStyle = document.body.style;
exports.transformAttribute = 	(bodyStyle.msTransform !== void 0) && "msTransform" ||
								(bodyStyle.webkitTransform !== void 0) && "webkitTransform" ||
								(bodyStyle.MozTransform !== void 0) && "MozTransform" ||
								(bodyStyle.transform !== void 0) && "transform";
								
exports.transitionAttribute =	(bodyStyle.msTransition !== void 0) && "msTransition" ||
								(bodyStyle.webkitTransition !== void 0) && "webkitTransition" ||
								(bodyStyle.MozTransition !== void 0) && "MozTransition" || 
								(bodyStyle.transition !== void 0) && "transition";

exports.filterAttribute = 		(bodyStyle.msFilter !== void 0) && "msFilter" ||
								(bodyStyle.webkitFilter !== void 0) && "webkitFilter" ||
								(bodyStyle.MozFilter !== void 0) && "MozFilter" ||
								(bodyStyle.filter !== void 0) && "filter";
;return module.exports;}({},{});
var __m0 = function(module,exports){module.exports=exports;
var utils = __m1,
	requestAnimationFrame = utils.requestAnimationFrame,
	cancelAnimationFrame = utils.cancelAnimationFrame,
	tween = __m2;

var Surface = module.exports = function(container){
	this.container = container;
	this.element = document.createElement("div");
	this.element.style.position = "absolute";
	container.appendChild(this.element);

	this.refit();

	this.offsetX = 0;
	this.offsetY = 0;
	
	this.speedMultiplierX = 0;
	this.speedMultiplierY = 0;
	
	this.multiStyle = {};
	this.multiStyle[utils.transformAttribute] = {};
	this.multiStyle[utils.transitionAttribute] = {};
	this.multiStyle[utils.filterAttribute] = {};

	this.pointerEventHandler = this.pointerEventHandler.bind(this);
	this.step = this.step.bind(this);
};

Surface.create = function(container){
	var surface = new Surface(container);

	return Surface.getApi(surface);
};

Surface.getApi = function(surface){
	var api = {};

	api.start = surface.start.bind(surface);
	api.pause = surface.pause.bind(surface);
	api.refit = surface.refit.bind(surface);
	api.element = surface.element;

	api.blur = surface.setBlur.bind(surface);
	api.grayscale = surface.setGrayscale.bind(surface);
	api.opacity = surface.setOpacity.bind(surface);

	api.speed = surface.setSpeedLimit.bind(surface);
	api.horizontalSpeed = surface.setHorizontalSpeedLimit.bind(surface);
	api.verticalSpeed = surface.setVerticalSpeedLimit.bind(surface);

	api.horizontalWind = surface.setHorizontalWind.bind(surface);
	api.verticalWind = surface.setVerticalWind.bind(surface);
	
	return api;
};

Surface.prototype.horizontalSpeedLimit = 4;
Surface.prototype.verticalSpeedLimit = 4;

Surface.prototype.horizontalWind = 0;
Surface.prototype.verticalWind = 0;

Surface.prototype.msPerStep = 16; // Milliseconds per step

// These functions take current position relative to the center and return a number between -1 and 1
Surface.prototype.horizontalSpeedGradient = tween.easing.quadraticIn;
Surface.prototype.verticalSpeedGradient = tween.easing.quadraticIn;

Surface.prototype.pointerTrackingEvents = ['mousemove', 'touchstart', 'touchend', 'touchmove'];

Surface.prototype.start = function(){
	if(this.active) return;
	this.active = true;

	this.attachPointerListeners();
	
	this.lastStepTime = Date.now();

	this.animationRequestId = requestAnimationFrame(this.step);
};

Surface.prototype.pause = function(){
	if(!this.active) return;
	this.active = false;
	cancelAnimationFrame(this.animationRequestId);
	this.detachPointerListeners();
};

Surface.prototype.step = function(){
	this.refit();

	var currentTime = Date.now(),
		lagMultiplier = (currentTime - this.lastStepTime) / this.msPerStep;

	this.lastStepTime = currentTime;
	
	this.offsetX += lagMultiplier * (this.horizontalWind + (this.speedMultiplierX * this.horizontalSpeedLimit));
	this.offsetY += lagMultiplier * (this.verticalWind + (this.speedMultiplierY * this.verticalSpeedLimit));
	
	this.setCssTransform("translate", this.offsetX + "px, " + this.offsetY + "px");

	this.animationRequestId = requestAnimationFrame(this.step);
};

Surface.prototype.attachPointerListeners = function(){
	var self = this;
	this.pointerTrackingEvents.forEach(function(event){
		self.container.addEventListener(event, self.pointerEventHandler);
	});
	this.container.addEventListener("mousemove", self.pointerEventHandler);
};

Surface.prototype.detachPointerListeners = function(){
	var self = this;
	this.pointerTrackingEvents.forEach(function(event){
		self.container.removeEventListener(event, self.pointerEventHandler);
	});
};

// This updates the x and y speed multipliers based on the pointers relative position to the
// center of the container element
Surface.prototype.pointerEventHandler = function(e){
	// If touch event, find first touch
	var pointer = e.changedTouches && e.changedTouches[0] || e;

	var x = pointer.clientX - this.left;
		y = pointer.clientY - this.top;

	this.speedMultiplierX = this.horizontalSpeedGradient(x - this.halfWidth, 0, (x > this.halfWidth? -1 : 1), this.halfWidth);
	this.speedMultiplierY = this.verticalSpeedGradient(y - this.halfHeight, 0, (y > this.halfHeight? -1 : 1), this.halfHeight);
};

Surface.prototype.refit = function(width, height){
	var rect = this.container.getBoundingClientRect();

	this.width = rect.width;
	this.halfWidth = this.width / 2;

	this.height = rect.height;
	this.halfHeight = this.height / 2;

	this.top = rect.top;
	this.left = rect.left;
};

Surface.prototype.setHorizontalWind = function(target, duration, easingFunc){
	if(!duration) return this.horizontalWind = target;

	easingFunc = easingFunc || (this.horizontalWind < target)? tween.easing.quadraticIn : tween.easing.quadraticOut;

	tween(easingFunc, this, "horizontalWind", target, duration);
};

Surface.prototype.setVerticalWind = function(target, duration, easingFunc){
	if(!duration) return this.verticalWind = target;

	easingFunc = easingFunc || (this.verticalWind < target)? tween.easing.quadraticIn : tween.easing.quadraticOut;

	tween(easingFunc, this, "verticalWind", target, duration);
};

Surface.prototype.setSpeedLimit = function(target, duration, easingFunc, callback){
	if(!duration){
		this.horizontalSpeedLimit = target;
		this.verticalSpeedLimit = target;
		return;
	}

	this.setHorizontalSpeedLimit(target, duration, easingFunc, callback);
	this.setVerticalSpeedLimit(target, duration, easingFunc, callback);
};

Surface.prototype.setHorizontalSpeedLimit = function(target, duration, easingFunc, callback){
	if(!duration) return this.horizontalSpeedLimit = target;

	easingFunc = easingFunc || (this.horizontalSpeedLimit < target)? tween.easing.quadraticIn : tween.easing.quadraticOut;

	tween(easingFunc, this, "horizontalSpeedLimit", target, duration, callback);
};

Surface.prototype.setVerticalSpeedLimit = function(target, duration, easingFunc, callback){
	if(!duration) return this.verticalSpeedLimit = target;
	
	easingFunc = easingFunc || (this.verticalSpeedLimit < target)? tween.easing.quadraticIn : tween.easing.quadraticOut;

	tween(easingFunc, this, "verticalSpeedLimit", target, duration, callback);
};

Surface.prototype.setBlur = function(target, duration){
	if(duration !== void 0) this.setCssTransition("-webkit-filter", duration + "s");
	this.setCssFilter("blur", target + "px");
};

Surface.prototype.setGrayscale = function(target, duration){
	if(duration !== void 0) this.setCssTransition("-webkit-filter", duration + "s");
	this.setCssFilter("grayscale", target);
};

Surface.prototype.setOpacity = function(target, duration){
	if(duration !== void 0) this.setCssTransition("opacity", duration + "s");
	this.element.style.opacity = target;
};

Surface.prototype.setCssTransform = function(name, value){
	this.cssTransforms[name] = value;
	this.updateMultiAttributeStyle(utils.transformAttribute, this.cssTransforms);
};

Surface.prototype.setCssFilter = function(name, value){
	this.cssFilters[name] = value;
	this.updateMultiAttributeStyle(utils.filterAttribute, this.cssFilters);
};

Surface.prototype.setCssTransition = function(name, value){
	this.cssTransitions[name] = value;
	this.updateMultiAttributeStyle(utils.transitionAttribute, this.cssTransitions, true);
};

Surface.prototype.cssTransitions = {
	"-webkit-filter": "0s",
	opacity: "0s"	
};

Surface.prototype.cssFilters = {
	blur: "0px",
	grayscale: "0"
};

Surface.prototype.cssTransforms = {
	translate: "0px, 0px"
};

Surface.prototype.updateMultiAttributeStyle = function(styleName, attributes, withComma){
	var name,
		list = [];

	for(name in attributes){
		if(attributes.hasOwnProperty(name)){
			list.push(name + (withComma?" ":"(") + attributes[name] + (withComma?"":")"));
		}
	}

	this.element.style[styleName] = list.join((withComma?", ":" "));
}

;return module.exports;}({},{});return __m0;}());
;return module.exports;}({},{});
var __m3 = function(module,exports){module.exports=exports;
;module.exports = (function(){
var __m1 = function(module,exports){module.exports=exports;
module.exports = Node;

function Node(left, top, width, height, parent){
	this.objects = [];

	this.left = left;
	this.top = top;
	this.width = width;
	this.height = height;
	this.parent = parent;
}

Node.prototype.tl = void 0;
Node.prototype.tr = void 0;
Node.prototype.br = void 0;
Node.prototype.bl = void 0;

Node.prototype.OBJECT_LIMIT = 200;

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
		if(length > node.OBJECT_LIMIT){
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


;return module.exports;}({},{});
var __m0 = function(module,exports){module.exports=exports;
var Node = __m1;

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
   it's position in space.

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
	api.hasObject = quadtree.hasObject.bind(quadtree);
	api.prune = quadtree.prune.bind(quadtree);

	return api;
};

Quadtree.prototype.width = 10000;
Quadtree.prototype.height = 10000;

Quadtree.prototype.reset = function(x, y){
	x = x || 0;
	y = y || 0;

	var negHalfWidth = -(this.width / 2);
	var negHalfHeight = -(this.height / 2);
	this.top = new Node(x + negHalfWidth, y + negHalfHeight, this.width, this.height);
};

Quadtree.prototype.insert = function(obj){
	this.top = this.top.insert(obj);
};

Quadtree.prototype.getObjects = function(left, top, width, height){
	if(left){
		return this.top.getInteractableObjects(left, top, width, height);
	}

	return this.top.getObjects();
};

Quadtree.prototype.prune = function(left, top, width, height){
	var right = left + width,
		bottom = top + height,
		candidate,
		rejectedObjects = [];
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


// Checks for collisions against a quadree
Quadtree.prototype.hasObject = function(left, top, width, height){
	var rectangles = this.top.getInteractableObjects(left, top, width, height),
		length = rectangles.length,
		index = 0,
		rectangle;

	for(; index < length; index++){
		rectangle = rectangles[index];
		
		// If there is intersection along the y-axis
		if((top < rectangle.top ?
			((top + height) > rectangle.top) :
			((rectangle.top + rectangle.height) > top)) && 
				// And if there is intersection along the x-axis
				(left < rectangle.left ?
					((left + width) > rectangle.left) :
					((rectangle.left + rectangle.width) > left))){
			
			// Then we have a collision
			return rectangle;
		}
	}
	
	return false;
};

;return module.exports;}({},{});return __m0;}());
;return module.exports;}({},{});
var __m1 = function(module,exports){module.exports=exports;
var BoundingBox = module.exports = function(element, left, top){
	this.element = element;
	this.top = top || 0;
	this.left = left || 0;
	this.width = this.element.width;
	this.height = this.element.height;
	this.bottom = this.top + this.height;
	this.right = this.left + this.width;
}

BoundingBox.prototype.show = function(container){
	this.visible = true;
	this.element.show(this.left, this.top, container);
};

BoundingBox.prototype.hide = function(container){
	this.visible = false;
	this.element.hide(container);
};
;return module.exports;}({},{});
var __m0 = function(module,exports){module.exports=exports;
var createQuadtree = __m3.create,
	Surface = __m4;

var BoundingBox = __m1;

var Collage = module.exports = function(container){
	Surface.call(this, container);
	container.className += " collage";
	this.quadtree = createQuadtree(15000);
	this.collections = [];
}
Collage.prototype = Object.create(Surface.prototype);

Collage.create = function(container){
	var collage = new Collage(container);
	return getApi(collage);
};

Collage.getApi = function(collage){
	var api = createSurface.apiFactory(collage);

	api.hasLocationNearViewport = collage.hasLocationNearViewport.bind(collage);

	return api;
};

Collage.collection = __m2;

// How many random spot will be checked to place elements per frame
Collage.prototype.scanTryLimit = 200;

// Max number of frames an element has to find a place before another is picked
// this prevents large gaps due to large elements
Collage.prototype.missLimit = 4;

// Minimum pixel spacing between elements
Collage.prototype.elementMargin = 25;

// How much beyond the window to scan for places to put objects when filling
Collage.prototype.overScan = 0;

Collage.prototype.hidingArea =  document.createDocumentFragment();
Collage.prototype.minElementSize = 50;

Collage.prototype.step = function(){
	Surface.prototype.step.call(this);

	this.fill();
};

Collage.prototype.start = function(){
	Surface.prototype.start.call(this);
	
	this.updateCanvasDimensions();
	this.pickNextElement();
	this.fillCenter();
};

Collage.prototype.addCollection = function(collection){
	// don't allow dupes
	if(~this.collections.indexOf(collection)) return false;
	
	// Binary search to find insertion index based on priority
  	var low = 0, 
  		high = this.collections.length,
  		mid;
	while (low < high) {
		mid = (low + high) >>> 1;
		this.collections[mid].priority > collection.priority ? 
			low = mid + 1 : 
			high = mid;
	}

	this.collections.splice(low, 0, collection);
	return true;
};

Collage.prototype.removeCollection = function(collection){
	var index = this.collections.indexOf(collection);
	if(!~index) return false;
	
	this.collections.splice(index, 1);	
	return true; 
};

Collage.prototype.pickNextElement = function(){
	var index = 0,
		length = this.collections.length,
		element;
	
	for(; index < length; index++){
		element = this.collections[index].element();
		if(element) break;
	}

	this.nextElement = element;
	this.missCount = 0;
	this.updateScanDimensions();
};

Collage.prototype.insertNextElement = function(left, top, show){
	var boundingBox = new BoundingBox(this.nextElement, left, top);
	this.nextElement.locations.push(boundingBox);
	
	this.quadtree.insert(boundingBox);
	
	if(show){
		boundingBox.show(this.element);
	} else {
		boundingBox.hide(this.hidingArea);
	}

	this.pickNextElement();
};

Collage.prototype.hasLocationNearViewport = function(element){
	var index = 0,
		length = element.locations.length;

	for(; index < length; index++){
		if(this.isNearViewport(element.locations[index])){
			return true;
		}
	}

	return false;
};

Collage.prototype.isNearViewport = function(boundingBox){
	var areaLeft = this.canvasLeft - this.canvasWidth,
		areaRight = this.canvasRight + this.canvasWidth,
		areaTop = this.canvasTop - this.canvasHeight,
		areaBottom = this.canvasBottom + this.canvasHeight;

	return (((areaLeft < boundingBox.left && boundingBox.left < areaRight) ||
				(boundingBox.right < areaRight && areaLeft < boundingBox.right)) &&
			((areaTop < boundingBox.top && boundingBox.top < areaBottom) || 
				(boundingBox.bottom < areaBottom && areaTop < boundingBox.bottom)));
}

Collage.prototype.hideOutOfViewElements = function(visibleElements){
	var step = this.minElementSize,
		scanLeft = this.canvasLeft - this.horizontalSpeedLimit - 1,
		scanRight = this.canvasRight + this.horizontalSpeedLimit + step,
		scanX,
		scanTop = this.canvasTop - this.verticalSpeedLimit - 1,
		scanBottom = this.canvasBottom + this.verticalSpeedLimit + step,
		scanY,
		boundingBox;

	// Hide top elements
	scanY = scanTop;
	for(; scanY <= this.canvasTop; scanY += step){
		scanX = scanLeft;
		for(; scanX <= scanRight; scanX += step){
			boundingBox = this.quadtree.hasObject(scanX, scanY, 1, 1);
			if(boundingBox){
				scanX = boundingBox.right;

				if(boundingBox.visible && !~visibleElements.indexOf(boundingBox)){
					boundingBox.hide(this.hidingArea);
				}
			} 
		}
	}

	// Hide bottom boundingBoxs
	scanY = this.canvasBottom;
	for(; scanY <= scanBottom; scanY += step){
		scanX = scanLeft;
		for(; scanX <= scanRight; scanX += step){
			boundingBox = this.quadtree.hasObject(scanX, scanY, 1, 1);
			if(boundingBox){
				scanX = boundingBox.right;

				if(boundingBox.visible && !~visibleElements.indexOf(boundingBox)){
					boundingBox.hide(this.hidingArea);
				}
			} 
		}
	}

	// Hide left boundingBoxs
	scanX = scanLeft;
	for(; scanX <= this.canvasLeft; scanX += step){
		scanY = this.canvasTop;
		for(; scanY <= this.canvasBottom; scanY += step){
			boundingBox = this.quadtree.hasObject(scanX, scanY, 1, 1);
			if(boundingBox){
				scanY = boundingBox.bottom;

				if(boundingBox.visible && !~visibleElements.indexOf(boundingBox)){
					boundingBox.hide(this.hidingArea);
				}
			} 
		}
	}

	// Hide right boundingBoxs
	scanX = this.canvasRight;
	for(; scanX <= scanRight; scanX += step){
		scanY = this.canvasTop;
		for(; scanY <= this.canvasBottom; scanY += step){
			boundingBox = this.quadtree.hasObject(scanX, scanY, 1, 1);
			if(boundingBox){
				scanY = boundingBox.bottom;

				if(boundingBox.visible && !~visibleElements.indexOf(boundingBox)){
					boundingBox.hide(this.hidingArea);
				}
			} 
		}
	}
};

Collage.prototype.showInViewElements = function(){
	var step = this.minElementSize,
		scanLeft = this.canvasLeft + this.horizontalSpeedLimit,
		scanRightInner = this.canvasRight - this.horizontalSpeedLimit,
		scanRight = this.canvasRight + step,
		scanX,
		scanTop = this.canvasTop + this.verticalSpeedLimit,
		scanBottomInner = this.canvasBottom - this.verticalSpeedLimit,
		scanBottom = this.canvasBottom + step,
		scanY,
		boundingBox,
		boundingBoxes = [];

	// Show top boundingBoxes
	scanY = this.canvasTop;
	for(; scanY < scanTop; scanY += step){
		scanX = this.canvasLeft;
		for(; scanX < scanRight; scanX += step){
			boundingBox = this.quadtree.hasObject(scanX, scanY, 1, 1);
			if(boundingBox){ 
				boundingBoxes.push(boundingBox);
				scanX = boundingBox.right;

				if(!boundingBox.visible) boundingBox.show(this.element);
			}
		}
	}

	// Show bottom boundingBoxes
	scanY = scanBottomInner;
	for(; scanY < scanBottom; scanY += step){
		scanX = this.canvasLeft;
		for(; scanX < scanRight; scanX += step){
			boundingBox = this.quadtree.hasObject(scanX, scanY, 1, 1);
			if(boundingBox){ 
				boundingBoxes.push(boundingBox);
				scanX = boundingBox.right;

				if(!boundingBox.visible) boundingBox.show(this.element);
			}
		}
	}

	// Show left boundingBoxes
	scanX = this.canvasLeft;
	for(; scanX < scanLeft; scanX += step){
		scanY = scanTop;
		for(; scanY < scanBottomInner; scanY += step){
			boundingBox = this.quadtree.hasObject(scanX, scanY, 1, 1);
			if(boundingBox){ 
				boundingBoxes.push(boundingBox);
				scanY = boundingBox.bottom;

				if(!boundingBox.visible) boundingBox.show(this.element);
			}
		}
	}

	// Show right boundingBoxes
	scanX = scanRightInner;
	for(; scanX < scanRight; scanX += step){
		scanY = scanTop;
		for(; scanY < scanBottomInner; scanY += step){
			boundingBox = this.quadtree.hasObject(scanX, scanY, 1, 1);
			if(boundingBox){ 
				boundingBoxes.push(boundingBox);
				scanY = boundingBox.bottom;

				if(!boundingBox.visible) boundingBox.show(this.element);
			}
		}
	}

	return boundingBoxes;
};

Collage.prototype.updateElementVisibility = function(){
	var visibleElements = this.showInViewElements();
	this.hideOutOfViewElements(visibleElements);
};


Collage.prototype.updateScanDimensions = function(){
	this.checkWidth = this.nextElement.width + this.elementMargin * 2;
	this.scanLeft = this.canvasLeft - this.checkWidth;
	this.scanWidth = this.canvasWidth + this.checkWidth * 2;
	this.scanRangeX = this.shiftX;
	this.scanRight = this.scanLeft + this.scanWidth;

	this.checkHeight = this.nextElement.height + this.elementMargin * 2;
	this.scanTop = this.canvasTop - this.checkWidth;
	this.scanHeight = this.canvasHeight + this.checkWidth * 2;
	this.scanRangeY = this.shiftY;
	this.scanBottom = this.scanTop + this.scanHeight;
};

Collage.prototype.updateCanvasDimensions = function(){
	this.shiftY = Math.abs(this.offsetY - (this.lastOffsetY || this.offsetY));
	this.shiftX = Math.abs(this.offsetX - (this.lastOffsetX || this.offsetX));
	this.canvasLeft = -1 * this.offsetX - this.overScan,
	this.canvasTop = -1 * this.offsetY - this.overScan,
	this.canvasWidth = this.width + this.overScan * 2,
	this.canvasHeight = this.height + this.overScan * 2;
	this.canvasRight = this.canvasLeft + this.canvasWidth;
	this.canvasBottom = this.canvasTop + this.canvasHeight;
};

Collage.prototype.fillCenter = function(){
	this.updateCanvasDimensions();
	this.updateScanDimensions();

	var	checkX,
		checkY,

		tryCount = 0,
		tryLimit = this.scanTryLimit * 100,
		missCount = 0,
		missLimit = tryLimit / 100;

	for(;tryCount < tryLimit; tryCount++){
		checkX = (this.scanLeft + this.scanWidth * Math.random())|0;
		checkY = (this.scanTop + this.scanHeight * Math.random())|0;

		missCount++;

		if(missCount > missLimit){
			missCount = 0;
			this.pickNextElement();
		}

		if(!this.quadtree.hasObject(checkX - this.elementMargin, checkY - this.elementMargin, this.checkWidth, this.checkHeight)){
			missCount = 0;
			this.insertNextElement(checkX, checkY, true);
		}
	}

	this.updateElementVisibility();
};

Collage.prototype.fill = function(){
	this.updateCanvasDimensions();
	this.updateScanDimensions();
	
	this.updateElementVisibility();

	var tryCount = 0,
		tryLimit = this.scanTryLimit,
		existingObject,
		checkX,
		checkY;
	
	this.missCount++;
	if(this.missCount > this.missLimit){
		this.pickNextElement();
	}

	for(;tryCount < tryLimit; tryCount++){
		// FILL VERTICAL DIRECTIONS	
		if(this.offsetY < this.lastOffsetY){
			// Fill bottom
			checkX = (this.scanLeft + this.scanWidth * Math.random())|0;
			checkY = (this.canvasTop + this.canvasHeight + this.scanRangeY * Math.random())|0;
		} else {
			// Fill top
			checkX = (this.scanLeft + this.scanWidth * Math.random() - this.checkWidth)|0;
			checkY = (this.canvasTop - this.scanRangeY * Math.random() - this.checkHeight)|0;
		}

		existingObject = this.quadtree.hasObject(checkX - this.elementMargin, checkY - this.elementMargin, this.checkWidth, this.checkHeight);
		if(!existingObject){
			this.insertNextElement(checkX, checkY);
		}
		
		// FILL HORIZONTAL DIRECTIONS
		if(this.offsetX < this.lastOffsetX){
			// Fill right
			checkX = (this.canvasLeft + this.canvasWidth + this.scanRangeX * Math.random())|0;
			checkY = (this.scanTop + this.scanHeight * Math.random())|0;
		} else {
			// Fill left
			checkX = (this.canvasLeft - this.scanRangeX * Math.random() - this.checkWidth)|0;
			checkY = (this.scanTop + this.scanHeight * Math.random() - this.checkHeight)|0;
		}

		existingObject = this.quadtree.hasObject(checkX - this.elementMargin, checkY - this.elementMargin, this.checkWidth, this.checkHeight);
		if(!existingObject){
			this.insertNextElement(checkX, checkY);
		}
	}

	this.lastOffsetX = this.offsetX;
	this.lastOffsetY = this.offsetY;
};

;return module.exports;}({},{});return __m0;}());