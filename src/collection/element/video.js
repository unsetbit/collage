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
