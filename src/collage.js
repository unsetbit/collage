var Q = require('q/q.js');
var createQuadtree = require('giant-quadtree/dist/quadtree-module.js').create,
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
Collage.prototype.getRandomElementFailSafe = 1;
Collage.prototype.getRandomElementTryLimit = 1;

Collage.prototype.getRandomElement = function(){
	var failSafe = this.getRandomElementFailSafe,
		inCanvasRange = true,
		left = this.canvasLeft - this.canvasWidth,
		top = this.canvasTop - this.canvasHeight,
		right = this.canvasRight + this.canvasWidth,
		bottom = this.canvasBottom + this.canvasHeight,
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

	this.pickNextElement();
	if(this.nextElement){
		this.fill();
	};
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

	if(this.nextElement) this.updateScanDimensions();
};

Collage.prototype.insertNextElement = function(left, top, show){
	this.showElement(this.nextElement, left, top, show);
	this.pickNextElement();
};

Collage.prototype.showElement = function(element, left, top, show){
	var boundingBox = new BoundingBox(element, left, top);
	this.quadtree.insert(boundingBox);
	
	if(show){
		boundingBox.show(this.element);
	} else {
		boundingBox.hide(this.hidingArea);
	}
};

Collage.prototype.hideOutOfViewElements = function(visibleElements){
	var step = this.minElementSize,
		verticalDisplacement = Math.abs(this.lastVerticalDisplacement),
		horizontalDisplacement = Math.abs(this.lastHorizontalDisplacement),
		scanLeft = this.canvasLeft - horizontalDisplacement - 1,
		scanRight = this.canvasRight + horizontalDisplacement + step,
		scanX,
		scanTop = this.canvasTop - verticalDisplacement - 1,
		scanBottom = this.canvasBottom + verticalDisplacement + step,
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
		verticalDisplacement = Math.abs(this.lastVerticalDisplacement),
		horizontalDisplacement = Math.abs(this.lastHorizontalDisplacement),
		scanLeft = this.canvasLeft + horizontalDisplacement,
		scanRightInner = this.canvasRight - horizontalDisplacement,
		scanRight = this.canvasRight + step,
		scanX,
		scanTop = this.canvasTop + verticalDisplacement,
		scanBottomInner = this.canvasBottom - verticalDisplacement,
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
			if(boundingBox && !~boundingBoxes.indexOf(boundingBox)){ 
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
			if(boundingBox && !~boundingBoxes.indexOf(boundingBox)){ 
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
			if(boundingBox && !~boundingBoxes.indexOf(boundingBox)){ 
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
			if(boundingBox && !~boundingBoxes.indexOf(boundingBox)){ 
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
	this.shiftY = Math.abs(this.verticalPosition - (this.lastOffsetY || this.verticalPosition));
	this.shiftX = Math.abs(this.horizontalPosition - (this.lastOffsetX || this.horizontalPosition));
	this.canvasLeft = -1 * this.horizontalPosition - this.overScan,
	this.canvasTop = -1 * this.verticalPosition - this.overScan,
	this.canvasWidth = this.width + this.overScan * 2,
	this.canvasHeight = this.height + this.overScan * 2;
	this.canvasRight = this.canvasLeft + this.canvasWidth;
	this.canvasBottom = this.canvasTop + this.canvasHeight;

	this.lastOffsetX = this.horizontalPosition;
	this.lastOffsetY = this.verticalPosition;
};

Collage.prototype.fillCenter = function(){
	this.updateScanDimensions();

	var	checkX,
		checkY,

		tryCount = 0,
		tryLimit = this.scanTryLimit * 300,
		missCount = 0,
		missLimit = tryLimit / 200;

	for(;tryCount < tryLimit; tryCount++){
		checkX = (this.scanLeft + this.scanWidth * Math.random())|0;
		checkY = (this.scanTop + this.scanHeight * Math.random())|0;

		missCount++;

		if(missCount > missLimit){
			missCount = 0;
			this.pickNextElement();
			if(!this.nextElement) break;
		}

		if(!this.quadtree.hasObject(checkX - this.elementMargin, checkY - this.elementMargin, this.checkWidth, this.checkHeight)){
			missCount = 0;
			this.insertNextElement(checkX, checkY, true);
			if(!this.nextElement) break;
		}
	}

	this.updateElementVisibility();
};

Collage.prototype.fill = function(){
	this.updateScanDimensions();

	var tryCount = 0,
		tryLimit = this.scanTryLimit,
		existingObject,
		checkX,
		checkY;
	
	this.missCount++;
	if(this.missCount > this.missLimit){
		this.pickNextElement();
		if(!this.nextElement) return;
	}

	for(;tryCount < tryLimit; tryCount++){
		// FILL VERTICAL DIRECTIONS	
		if(this.verticalPosition < this.lastOffsetY){
			// Fill bottom
			checkX = (this.scanLeft + this.scanWidth * Math.random())|0;
			checkY = (this.canvasBottom + this.scanRangeY * Math.random())|0;
		} else {
			// Fill top
			checkX = (this.scanLeft + this.scanWidth * Math.random() - this.checkWidth)|0;
			checkY = (this.canvasTop - this.scanRangeY * Math.random() - this.checkHeight)|0;
		}

		existingObject = this.quadtree.hasObject(checkX - this.elementMargin, checkY - this.elementMargin, this.checkWidth, this.checkHeight);
		if(!existingObject){
			this.insertNextElement(checkX, checkY);
			if(!this.nextElement) break;
		}
		
		// FILL HORIZONTAL DIRECTIONS
		if(this.horizontalPosition < this.lastOffsetX){
			// Fill right
			checkX = (this.canvasRight + this.scanRangeX * Math.random())|0;
			checkY = (this.scanTop + this.scanHeight * Math.random())|0;
		} else {
			// Fill left
			checkX = (this.canvasLeft - this.scanRangeX * Math.random() - this.checkWidth)|0;
			checkY = (this.scanTop + this.scanHeight * Math.random() - this.checkHeight)|0;
		}

		existingObject = this.quadtree.hasObject(checkX - this.elementMargin, checkY - this.elementMargin, this.checkWidth, this.checkHeight);
		if(!existingObject){
			this.insertNextElement(checkX, checkY);
			if(!this.nextElement) break;
		}
	}
};
