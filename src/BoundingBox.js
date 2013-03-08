var BoundingBox = module.exports = function(element, left, top){
	this.element = element;
	this.top = top || 0;
	this.left = left || 0;
	this.width = this.element.width;
	this.height = this.element.height;
	this.bottom = this.top + this.height;
	this.right = this.left + this.width;

	element.locations.push(this);
}

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