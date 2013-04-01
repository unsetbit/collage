// Wait for external scripts to be ready
window.onload = function(){
	var collage = Collage.create(document.body);

	collage.load('my content', {
	  flickr: [
	  	{
	  		tags: 'popcorn'
	  	}
	  ],
	  googleNews: ['popcorn'],
	  twitter: [
	    { query: 'popcorn' },
	    { query: 'caramel' }
	  ]
	}).then(function(){
		// Wait for the loading to be finished, then
		// start the collage (filling the center) and set the active tags
		collage.start('my content');
		collage.speed(8);
	});
}
