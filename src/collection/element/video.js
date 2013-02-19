// Video elements can't be moved around the dom because they'll reset

module.exports = VideoElement;

function VideoElement (video){
	this.element = video.element;
	this.video = video;
	

	this.width = parseInt(this.element.getAttribute('width'));
	this.height = parseInt(this.element.getAttribute('height'));
	
	this.locations = [];
	this.hide();
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
