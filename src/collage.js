var createQuadtree = require('giant-quadtree/dist/quadtree-module.js'),
	createBigSurface = require('big-surface/dist/surface-module.js'),
	BigSurface = createBigSurface.constructor;

var BoundingBox = require('./boundingBox.js');

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
