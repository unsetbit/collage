// Wait for external scripts to be ready
window.onload = function(){
	var collage = Collage.create(document.body);

	collage.load('my content', {
	  facebook: [
	    {    
	      minLikes: 200,
	      query: 'popcorn'
	    },
	    {
	      ids: ["110452248983275"]
	    }
	  ],
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
