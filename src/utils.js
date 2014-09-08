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
