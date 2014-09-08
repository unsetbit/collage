// Wait for external scripts to be ready
window.onload = function(){
	
	var myCollage = collage.create(document.body);

	myCollage.load('my content', {
	  facebook: [
	    {    
	      minLikes: 200,
	      query: 'popcorn'
	    },
	    {
	      ids: ["110452248983275"]
	    }
	  ],


/*
	  youtube works but is very slow
	  youtube: [
	  	{ query: 'popcorn' }
	  ],
*/

	  googleNews: [
	  	{ query: 'popcorn'}
	  ],

	  googlePlus: [
			{ query: 'popcorn'}
	  ],

	  flickr: [
	  	{ tags: 'popcorn'}
	  ],

	  reddit: [
	  	{ query: 'popcorn' }
	  ],

/*
	  nyTimes: [
	  	{ query: 'popcorn' }
	  ],
*/

/*
		twitter api is getting harder and harder to deal with
	  twitter: [
	    { query: 'popcorn' },
	    { query: 'caramel' }
	  ]
*/
	}).then(function(){
		// Wait for the loading to be finished, then
		// start the collage (filling the center) and set the active tags
		myCollage.start('my content');
		myCollage.speed(8);
	});
}
