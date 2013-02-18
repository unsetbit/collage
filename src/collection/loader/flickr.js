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