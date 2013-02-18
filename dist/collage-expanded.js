;createCollage = (function(){
var __m3 = function(module,exports){module.exports=exports;
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

module.exports = function(container){
	var bigSurface = new BigSurface(container);

	return apiFactory(bigSurface);
};

var apiFactory = module.exports.apiFactory = function(bigSurface){
	var api = {};

	api.start = bigSurface.start.bind(bigSurface);
	api.pause = bigSurface.pause.bind(bigSurface);
	api.refit = bigSurface.refit.bind(bigSurface);
	api.element = bigSurface.element;

	api.blur = bigSurface.setBlur.bind(bigSurface);
	api.grayscale = bigSurface.setGrayscale.bind(bigSurface);
	api.opacity = bigSurface.setOpacity.bind(bigSurface);

	api.speed = bigSurface.setSpeedLimit.bind(bigSurface);
	api.horizontalSpeed = bigSurface.setHorizontalSpeedLimit.bind(bigSurface);
	api.verticalSpeed = bigSurface.setVerticalSpeedLimit.bind(bigSurface);

	api.horizontalWind = bigSurface.setHorizontalWind.bind(bigSurface);
	api.verticalWind = bigSurface.setVerticalWind.bind(bigSurface);
	
	return api;
};

var BigSurface = module.exports.constructor = function(container){
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
}

BigSurface.prototype.horizontalSpeedLimit = 4;
BigSurface.prototype.verticalSpeedLimit = 4;

BigSurface.prototype.horizontalWind = 0;
BigSurface.prototype.verticalWind = 0;

BigSurface.prototype.msPerStep = 16; // Milliseconds per step

// These functions take current position relative to the center and return a number between -1 and 1
BigSurface.prototype.horizontalSpeedGradient = tween.easing.quadraticIn;
BigSurface.prototype.verticalSpeedGradient = tween.easing.quadraticIn;

BigSurface.prototype.pointerTrackingEvents = ['mousemove', 'touchstart', 'touchend', 'touchmove'];

BigSurface.prototype.start = function(){
	if(this.active) return;
	this.active = true;

	this.attachPointerListeners();
	
	this.lastStepTime = Date.now();

	this.animationRequestId = requestAnimationFrame(this.step);
};

BigSurface.prototype.pause = function(){
	if(!this.active) return;
	this.active = false;
	cancelAnimationFrame(this.animationRequestId);
	this.detachPointerListeners();
};

BigSurface.prototype.step = function(){
	this.refit();

	var currentTime = Date.now(),
		lagMultiplier = (currentTime - this.lastStepTime) / this.msPerStep;

	this.lastStepTime = currentTime;
	
	this.offsetX += lagMultiplier * (this.horizontalWind + (this.speedMultiplierX * this.horizontalSpeedLimit));
	this.offsetY += lagMultiplier * (this.verticalWind + (this.speedMultiplierY * this.verticalSpeedLimit));
	
	this.setCssTransform("translate", this.offsetX + "px, " + this.offsetY + "px");

	this.animationRequestId = requestAnimationFrame(this.step);
};

BigSurface.prototype.attachPointerListeners = function(){
	var self = this;
	this.pointerTrackingEvents.forEach(function(event){
		self.container.addEventListener(event, self.pointerEventHandler);
	});
	this.container.addEventListener("mousemove", self.pointerEventHandler);
};

BigSurface.prototype.detachPointerListeners = function(){
	var self = this;
	this.pointerTrackingEvents.forEach(function(event){
		self.container.removeEventListener(event, self.pointerEventHandler);
	});
};

// This updates the x and y speed multipliers based on the pointers relative position to the
// center of the container element
BigSurface.prototype.pointerEventHandler = function(e){
	// If touch event, find first touch
	var pointer = e.changedTouches && e.changedTouches[0] || e;

	var x = pointer.clientX - this.left;
		y = pointer.clientY - this.top;

	this.speedMultiplierX = this.horizontalSpeedGradient(x - this.halfWidth, 0, (x > this.halfWidth? -1 : 1), this.halfWidth);
	this.speedMultiplierY = this.verticalSpeedGradient(y - this.halfHeight, 0, (y > this.halfHeight? -1 : 1), this.halfHeight);
};

BigSurface.prototype.refit = function(width, height){
	var rect = this.container.getBoundingClientRect();

	this.width = rect.width;
	this.halfWidth = this.width / 2;

	this.height = rect.height;
	this.halfHeight = this.height / 2;

	this.top = rect.top;
	this.left = rect.left;
};

BigSurface.prototype.setHorizontalWind = function(target, duration, easingFunc){
	if(!duration) return this.horizontalWind = target;

	easingFunc = easingFunc || (this.horizontalWind < target)? tween.easing.quadraticIn : tween.easing.quadraticOut;

	tween(easingFunc, this, "horizontalWind", target, duration);
};

BigSurface.prototype.setVerticalWind = function(target, duration, easingFunc){
	if(!duration) return this.verticalWind = target;

	easingFunc = easingFunc || (this.verticalWind < target)? tween.easing.quadraticIn : tween.easing.quadraticOut;

	tween(easingFunc, this, "verticalWind", target, duration);
};

BigSurface.prototype.setSpeedLimit = function(target, duration, easingFunc, callback){
	if(!duration){
		this.horizontalSpeedLimit = target;
		this.verticalSpeedLimit = target;
		return;
	}

	this.setHorizontalSpeedLimit(target, duration, easingFunc, callback);
	this.setVerticalSpeedLimit(target, duration, easingFunc, callback);
};

BigSurface.prototype.setHorizontalSpeedLimit = function(target, duration, easingFunc, callback){
	if(!duration) return this.horizontalSpeedLimit = target;

	easingFunc = easingFunc || (this.horizontalSpeedLimit < target)? tween.easing.quadraticIn : tween.easing.quadraticOut;

	tween(easingFunc, this, "horizontalSpeedLimit", target, duration, callback);
};

BigSurface.prototype.setVerticalSpeedLimit = function(target, duration, easingFunc, callback){
	if(!duration) return this.verticalSpeedLimit = target;
	
	easingFunc = easingFunc || (this.verticalSpeedLimit < target)? tween.easing.quadraticIn : tween.easing.quadraticOut;

	tween(easingFunc, this, "verticalSpeedLimit", target, duration, callback);
};

BigSurface.prototype.setBlur = function(target, duration){
	if(duration !== void 0) this.setCssTransition("-webkit-filter", duration + "s");
	this.setCssFilter("blur", target + "px");
};

BigSurface.prototype.setGrayscale = function(target, duration){
	if(duration !== void 0) this.setCssTransition("-webkit-filter", duration + "s");
	this.setCssFilter("grayscale", target);
};

BigSurface.prototype.setOpacity = function(target, duration){
	if(duration !== void 0) this.setCssTransition("opacity", duration + "s");
	this.element.style.opacity = target;
};

BigSurface.prototype.setCssTransform = function(name, value){
	this.cssTransforms[name] = value;
	this.updateMultiAttributeStyle(utils.transformAttribute, this.cssTransforms);
};

BigSurface.prototype.setCssFilter = function(name, value){
	this.cssFilters[name] = value;
	this.updateMultiAttributeStyle(utils.filterAttribute, this.cssFilters);
};

BigSurface.prototype.setCssTransition = function(name, value){
	this.cssTransitions[name] = value;
	this.updateMultiAttributeStyle(utils.transitionAttribute, this.cssTransitions, true);
};

BigSurface.prototype.cssTransitions = {
	"-webkit-filter": "0s",
	opacity: "0s"	
};

BigSurface.prototype.cssFilters = {
	blur: "0px",
	grayscale: "0"
};

BigSurface.prototype.cssTransforms = {
	translate: "0px, 0px"
};

BigSurface.prototype.updateMultiAttributeStyle = function(styleName, attributes, withComma){
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
var __m2 = function(module,exports){module.exports=exports;
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

module.exports = function(width, height){
	var quadtree = new Quadtree(width, height);
	return getApi(quadtree);
};

function getApi(quadtree){
	var api = {};
	api.insert = quadtree.insert.bind(quadtree);
	api.reset = quadtree.reset.bind(quadtree);
	api.getObjects = quadtree.getObjects.bind(quadtree);
	api.hasObject = quadtree.hasObject.bind(quadtree);
	api.prune = quadtree.prune.bind(quadtree);

	return api;
}

function Quadtree(width){
	if(width) this.width = width;
	this.reset();
}

Quadtree.prototype.width = 10000;

Quadtree.prototype.reset = function(x, y){
	x = x || 0;
	y = y || 0;

	var negHalfWidth = -(this.width / 2);
	this.top = new Node(x + negHalfWidth, y + negHalfWidth, this.width, this.width);
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
var createQuadtree = __m2,
	createBigSurface = __m3,
	BigSurface = createBigSurface.constructor;

var BoundingBox = __m1;

module.exports = function(container){
	var bigCollage = new BigCollage(container);
	return apiFactory(bigCollage);
};

var apiFactory = module.exports.apiFactory = function(bigCollage){
	var api = createBigSurface.apiFactory(bigCollage);

	api.hasLocationNearViewport = bigCollage.hasLocationNearViewport.bind(bigCollage);
	api.setElementPicker = bigCollage.setElementPicker.bind(bigCollage);
	return api;
};

var BigCollage = module.exports.constructor = function(container){
	BigSurface.call(this, container);
	container.className += " big-collage";
	this.quadtree = createQuadtree(15000);
}
BigCollage.prototype = Object.create(BigSurface.prototype);

// How many random spot will be checked to place elements per frame
BigCollage.prototype.scanTryLimit = 200;

// Max number of frames an element has to find a place before another is picked
// this prevents large gaps due to large elements
BigCollage.prototype.missLimit = 4;

// Minimum pixel spacing between elements
BigCollage.prototype.elementMargin = 25;

// How much beyond the window to scan for places to put objects when filling
BigCollage.prototype.overScan = 0;

BigCollage.prototype.hidingArea =  document.createDocumentFragment();
BigCollage.prototype.minElementSize = 50;

BigCollage.prototype.elementPicker = function(){};

BigCollage.prototype.step = function(){
	BigSurface.prototype.step.call(this);

	this.fill();
};

BigCollage.prototype.start = function(){
	BigSurface.prototype.start.call(this);
	
	this.updateCanvasDimensions();
	this.pickNextElement();
	this.fillCenter();
};

BigCollage.prototype.setElementPicker = function(func){
	this.elementPicker = func;
};

BigCollage.prototype.pickNextElement = function(){
	var element = this.elementPicker();
	this.missCount = 0;

	this.nextElement = element;
	this.updateScanDimensions();
};

BigCollage.prototype.insertNextElement = function(left, top, show){
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

BigCollage.prototype.hasLocationNearViewport = function(element){
	var index = 0,
		length = element.locations.length;

	for(; index < length; index++){
		if(this.isNearViewport(element.locations[index])){
			return true;
		}
	}

	return false;
};

BigCollage.prototype.isNearViewport = function(boundingBox){
	var areaLeft = this.canvasLeft - this.canvasWidth,
		areaRight = this.canvasRight + this.canvasWidth,
		areaTop = this.canvasTop - this.canvasHeight,
		areaBottom = this.canvasBottom + this.canvasHeight;

	return (((areaLeft < boundingBox.left && boundingBox.left < areaRight) ||
				(boundingBox.right < areaRight && areaLeft < boundingBox.right)) &&
			((areaTop < boundingBox.top && boundingBox.top < areaBottom) || 
				(boundingBox.bottom < areaBottom && areaTop < boundingBox.bottom)));
}

BigCollage.prototype.hideOutOfViewElements = function(visibleElements){
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

BigCollage.prototype.showInViewElements = function(){
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

BigCollage.prototype.updateElementVisibility = function(){
	var visibleElements = this.showInViewElements();
	this.hideOutOfViewElements(visibleElements);
};


BigCollage.prototype.updateScanDimensions = function(){
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

BigCollage.prototype.updateCanvasDimensions = function(){
	this.shiftY = Math.abs(this.offsetY - (this.lastOffsetY || this.offsetY));
	this.shiftX = Math.abs(this.offsetX - (this.lastOffsetX || this.offsetX));
	this.canvasLeft = -1 * this.offsetX - this.overScan,
	this.canvasTop = -1 * this.offsetY - this.overScan,
	this.canvasWidth = this.width + this.overScan * 2,
	this.canvasHeight = this.height + this.overScan * 2;
	this.canvasRight = this.canvasLeft + this.canvasWidth;
	this.canvasBottom = this.canvasTop + this.canvasHeight;
};

BigCollage.prototype.fillCenter = function(){
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

BigCollage.prototype.fill = function(){
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