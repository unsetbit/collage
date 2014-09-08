// Wait for external scripts to be ready
window.onload = function(){
  var popcornCollage = collage.create(document.body);
  popcornCollage.load('popcorn media', {
    flickr: [{ tags: 'popcorn'}],
    googleNews: ['popcorn'],
    reddit: [{ query: 'popcorn' }]
  }).then(function(){
    popcornCollage.start('popcorn media');
    popcornCollage.speed(8);
  });
}
