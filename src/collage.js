var Q = require('q/q.js');
var createQuadtree = require('../../giant-quadtree/dist/quadtree-module.js').create,
	Surface = require('../../big-surface/dist/surface-module.js');
	//Surface = require('big-surface/dist/surface-module.js');

var BoundingBox = require('./boundingBox.js'),
	Tag = require('./Tag.js');

var Collage = module.exports = function(container){
	Surface.call(this, container);
	this.quadtree = createQuadtree(15000);

	this.tags = {};
	this.activeTags = [];

	this.updateCanvasDimensions();
	window.c = this;
}
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
	
	api.load = collage.loadElements.bind(collage);
	api.add = collage.addElements.bind(collage);
	api.remove = collage.removeElement.bind(collage);
	api.get = collage.getElements.bind(collage);
	api.showElement = collage.showElement.bind(collage);
	api.loader = collage.loader;

	api.start = collage.start.bind(collage);
	
	return api;
};

Collage.loader = require('./loader/index.js');
Collage.element = require('./element/index.js');

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
	return this.tags[name] = Tag.create(options);
};

Collage.prototype.configureTag = function(name, options){
	var tag = this.tags[name];
	if(!tag){
		this.createTag(options);
		return;
	}

	if("skipProbability" in options) tag.skipProbability = options.skipProbability;
	if("tryLimit" in options) tag.tryLimit = options.tryLimit;
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

	if(typeof arg2 === "string"){
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

			while(loaderConfig = loaderConfigs[--loaderConfigIndex]){
				promise = loader(loaderConfig).then(addElements);
				promises.push(promise);	
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
	while(tagName = tagNames[--tagNameIndex]){
		tag = this.tags[tagName] || this.createTag(tagName);
		elementIndex = elements.length;
		while(elementIndex--) tag.add(elements[elementIndex]);
	}
};

Collage.prototype.removeElement = function(tagNames, element){
	if(!Array.isArray(tagNames)) tagNames = [tagNames];
	
	var tagNameIndex = tagNames.length,
		tagName,
		tag;

	while(tagName = tagNames[tagNameIndex--]){
		tag = this.tags[tagName];
		if(!tag) continue;
		tag.remove(element);
	}
};

Collage.prototype.getElements = function(){
	var tagNames = (arguments.length > 0)? arguments : Object.keys(this.tags),
		tagNameIndex = tagNames.length,
		tagName,
		tag,
		chanceMultiplier,
		elements = [];

	while(tagName = tagNames[--tagNameIndex]){
		if(tag = this.tags[tagName]){
			elements = elements.concat(tag.getElements());
		}
	}

	return elements;
};

Collage.prototype.setActiveTags = function(){
	var index = arguments.length,
		tagName,
		tag,
		chanceMultiplier,
		activeTags = [];

	while(tagName = arguments[--index]){
		if(tag = this.tags[tagName]){
			chanceMultiplier = tag.chanceMultiplier;
			while(chanceMultiplier--) activeTags.push(tag);
		}
	}

	this.activeTags = activeTags;
};

Collage.prototype.getRandomActiveTag = function(){
	var tag,
		failSafe = this.getRandomActiveTagFailSafe;

	while(failSafe--){
		tag = this.activeTags[(Math.random() * this.activeTags.length)|0]
		if(tag.skipProbability < Math.random()) break;
	}
	
	return tag;
};

Collage.prototype.getRandomActiveTagFailSafe = 20;
Collage.prototype.getRandomElementFailSafe = 20;
Collage.prototype.getRandomElementTryLimit = 20;

Collage.prototype.getRandomElement = function(){
	var failSafe = this.getRandomElementFailSafe,
		inCanvasRange = true,
		left = this.viewportLeft - this.viewportWidth,
		top = this.viewportTop - this.viewportHeight,
		right = this.viewportRight + this.viewportWidth,
		bottom = this.viewportBottom + this.viewportHeight,
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
		throw new Error("Unable to start without active tags");
	};
	
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
	this.viewportLeft = -1 * this.horizontalPosition - this.overScan,
	this.viewportTop = -1 * this.verticalPosition - this.overScan,
	this.viewportWidth = this.width + this.overScan * 2,
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

	var	scanCheckLeft,
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

		scanCheckLeft = (this.viewportLeft - this.checkWidth) + Math.floor((this.viewportWidth + this.checkWidth) * Math.random()),
		scanCheckTop = (this.viewportTop - this.checkHeight) + Math.floor((this.viewportHeight + this.checkHeight) * Math.random()),
		scanCheckRight = scanCheckLeft + this.checkWidth,
		scanCheckBottom = scanCheckTop + this.checkHeight;
	
		if(!hasCollision(boxes, scanCheckLeft, scanCheckTop, scanCheckRight, scanCheckBottom)){
			this.insertNextElement(scanCheckLeft + this.elementMargin, scanCheckTop + this.elementMargin);
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
};

Collage.prototype.updateBounds = function(){
	this.checkHeight = this.nextElement.height + this.elementMargin * 2,
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
};

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
			box = this.insertNextElement(this.checkLeft + this.elementMargin, scanCheckTop + this.elementMargin);
			this.horizontalBoxes.push(box);

			if(!this.nextElement) break;
		}
	}
};
