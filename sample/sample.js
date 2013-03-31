var collage = Collage.create(document.body);
collage.load('some fb content', 'facebook', {
    minLikes: 200,
    query: 'popcorn'
}).then(function(){
	// Wait for the loading to be finished, then
	// start the collage (filling the center) and set the active tags
	collage.start('some fb content');
	collage.speed(8,2);
});

