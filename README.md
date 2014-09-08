# <a href="http://ozan.io/collage/">Collage</a> is a Framework for Live Collages

See a live example of Collage at work: [samelove.us](http://samelove.us).


Collage brings together many public APIs, along with a method of presenting media within a limitless two-dimesional
space to create memorable and meaningful experiences. It's a mixture between [Big Surface](https://github.com/oztu/big-surface), 
[Giant Quadtree](https://github.com/oztu/giant-quadtree), and
a public API library.

## Use
For plain JavaScript applications, use the [dist/collage.js](https://raw.github.com/oztu/collage/master/dist/collage.js), 
which will inject the Collage module object to the global scope (i.e. it creates window.collage). You can also use this file as an AMD or CommonJS module. If you use bower, you can install collage with `bower install collage`.

Depending on which loaders you use, you will need to include these in your HTML doc, before starting the collage:
```html
<!-- Youtube Iframe API -->
<script src="//www.youtube.com/iframe_api"></script>

<!-- Twitter API -->
<script src="//platform.twitter.com/widgets.js"></script>

<!-- Facebook API -->
<div id="fb-root"></div>
<script>
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
</script>
```

## Content Sources
These are referred to as `loader`s in the codebase.

* Facebook (like boxes)
* Reddit (images and embeds)
* Youtube
* Flickr
* Google News
* Google Plus
* Twitter (currently broken due to auth changes)
* NY Times (requires a reverse-proxy due to lack of CORS headers)

Check the [loader configurations](#loaderconfig) for how to query them for content.

## API
Collage extends [Big Surface](https://github.com/oztu/big-surface), all API methods that are available for Big
Surface is also available for Collage. In the API `collage`  refers to the module object and `collageInstance` refers to a 
Collage instance which is created via `collage.create`.

### `collage.create(container)`
Constructor function which returns a new Collage instance. The container is the element which will contain
the collage.

### `collageInstance.load(tagName, loaderName, loaderConfig)`
Loads the media from the given loaderName according to the loaderConfig and assigns the loaded media to the tagName.

```javascript
var collageInstance = collage.create(document.body);
collageInstance.load('some fb content', 'facebook', {
    minLikes: 200,
    query: 'popcorn'
}).then(function(){
	// Wait for the loading to be finished, then
	// start the collage (filling the center) and set the active tags
	collageInstance.start('some fb content');
	collageInstance.speed(8);
});
```

### `collageInstance.load(tagName, loaderMap)`
Loads the media from the given loaderName : loaderConfig mapping and assigns the loaded media to the tagName.

```javascript
var collageInstance = collage.create(document.body);

collageInstance.load('my content', {
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
	collageInstance.start('my content');
	collageInstance.speed(8);
});
```

### `collageInstance.start(opt_var_args)`
Starts the transform loop of the collage (allows for movement) and optionally sets the active tags to the given
arguments.

### `collageInstance.pause(opt_duration)`
Brings the collage movement to a halt within the given time duration (or immediately if none provided).

### `collageInstance.resume(opt_duration)`
Resumes collage movement to the state it was in previous to a `pause` call. If a duration
is provided, the speed will tween to the limit within the given time period.

### `collageInstance.setActiveTags(var_args)`
Sets the given tags as the 'active' tags which media for the collage will be pulled from.

### `collageInstance.add(tagNames, elements)`
Adds the given element(s) to the given tag(s).

### `collageInstance.remove(tagNames, elements)`
Removes the given element(s) from the given tag(s).

### `collageInstance.get(var_args)`
Gets the elements for the given tag names.

### `collageInstance.showElement(element, left, top, show)`
Inserts an element directly in the collage surface at left, top (in pixels). If show is set to true, the
element is placed visibly, otherwise hidden.

### `collageInstance.loader`
A map of available loaders which you can extend during run-time.

### `collageInstance.fill()`
Fills the visible center of the screen with elements.


## <a id="loaderconfig"></a> Loader Configuration Options

Loaders are where you get the content for the collage from. The content from the loaders are associated with
one or more tags, which the collage will use to populate itself with.

### Facebook
Adds like boxes for facebook pages to the collage

* `query`: a search query (not required if providing ids)
* `ids`: an array of page ids to load (not required if providing a query)
* `limit` (default 3): max number of results from query search
* `width` (default 400): width of the like box
* `height` (default 600): height of the like box
* `minLikes` (default 0): minimum number of likes for results of the query search
* `showFaces` (default true): whether to show faces in the like box
* `showStream` (default true): whether to show the page stream in the like box
* `showHeader` (default false): whether to show a 'like our page' header in the like box

```javascript
var collageInstance = collage.create(document.body);
collageInstance.load('some fb content', 'facebook', {
    minLikes: 200,
    query: 'one man one woman'
}).then(function(){ // wait for the first batch to complete loading
	collageInstance.load('more fb content', {
	  facebook: [{    
	      minLikes: 200,
	      query: 'popcorn'
	   },
	   {
	      ids: ["110452248983275"]
	   }]
	}).then(function(){
		// Wait for the loading to be finished, then
		// start the collage (filling the center) and set the active tags
		collageInstance.start('some fb content', 'more fb content');
		collageInstance.speed(8);
	});	
});

```

### Reddit
Adds images or reddit embeds to the collage

* `type` default "photos", can be "embed" or "photos"
* `sort` default "top", can be "confidence", "top", "new", "hot", "controversial", "old", "random"
* `subreddit` default "all"
* `limit` default 20
* `time` default "all", can be "hour", "day", "week", "month", "year", "all"
* `nsfw` default "false"
* `minComments` default 0
* `minScore` default 0
* `width` default 500, width of the embed box
* `height` default 600, height of the embed box

```javascript
collageInstance.load('reddit popcorn', {
reddit: [
  {
		query: "popcorn site:imgur.com subreddit:funny",
		limit: "10"
  },
  {
  	type: "embed",
  	query: "popcorn"
  }]
}).then(function(){
	// Wait for the loading to be finished, then
	// start the collage (filling the center) and set the active tags
	collageInstance.start('reddit popcorn');
	collageInstance.speed(8);        
});
```

### Twitter

Choose one:
* `query` a search query for tweets
* `ids` an array of tweet ids
* `id` a single tweet id
 

```javascript
collageInstance.load('popcorn', {
 twitter: [
  	{ query: "popcorn"}
  ],
}).then(function(){
	// Wait for the loading to be finished, then
	// start the collage (filling the center) and set the active tags
	collageInstance.start('popcorn');
	collageInstance.speed(8);        
});
```

### Youtube
Adds youtube videos to the collage

Choose one:
* `query` a string to search Youtube with
* `videoId` a singe video id to load
* `videoIds` an array of video ids to load

Optional parameters:
* `mute` default false
* `loop` default false
* `autoplay` default false
* `callback` 
* `continuousPlay` default false. This option determines if the video pauses when it goes out of view or not.
* `startTime` default 0
* `duration` default "short"
* `key` Google api api key
* `width` default 1060
* `height` default 650

```javascript
collageInstance.load('popcorn', {
  youtube: [
    {
  		query: "popcorn",
  		mute: true,
  		loop: true
  	},
    {
  		videoId: 'abcdefgh',
  		mute: true,
  		autoplay: true,
  		loop: true,
  		startTime: 108
  	}
  ]
}).then(function(){
	// Wait for the loading to be finished, then
	// start the collage (filling the center) and set the active tags
	collageInstance.start('popcorn');
	collageInstance.speed(8);        
});
```

### Flickr
Adds images from Flickr to the collage

* `tags` the search query for tags to load
* `sort` default "relevance"
* `count` default 20
* `license` default "1,2,3,4,5,6,7,8" [see Flickr API](http://www.flickr.com/services/api/flickr.photos.licenses.getInfo.html)
* `apiKey`
* `tagMode` default "all"
* `isCommons` default false
* `contentType` default 1 (photos)

```javascript
collageInstance.load('popcorn', {
  flickr: [
    {  
			tags: "popcorn",
			sort: "interestingness-desc"
		}
  ],
}).then(function(){
	// Wait for the loading to be finished, then
	// start the collage (filling the center) and set the active tags
	collageInstance.start('popcorn');
	collageInstance.speed(8);        
});
```
### Google News
Adds news articles from Google News to the collage.

The loader only accepts a string query.

```javascript
collageInstance.load('popcorn', {
  googleNews: ["popcorn"]
}).then(function(){
	// Wait for the loading to be finished, then
	// start the collage (filling the center) and set the active tags
	collageInstance.start('popcorn');
	collageInstance.speed(8);        
});
```

### Google Plus
Adds posts from Google Plus to the collage.

The loader only accepts a string query.

```javascript
collageInstance.load('popcorn', {
  googlePlus: ["popcorn"]
}).then(function(){
	// Wait for the loading to be finished, then
	// start the collage (filling the center) and set the active tags
	collageInstance.start('popcorn');
	collageInstance.speed(8);        
});
```

### New York Times
Adds news articles from the NY Times API. The api endpoint must be proxied locally, since it doesn't allow for
JSONP calls to be made.

Choose one:
* `query` A live query to make to the NY Time api
* `data` A pre-recorded JSON object to use instead of doing a query

```javascript
collageInstance.load('popcorn', {
	nyTimes: [{
		query: "popcorn+nytd_des_facet%3A%5BHate+Crimes%5D"
	}]
}).then(function(){
	// Wait for the loading to be finished, then
	// start the collage (filling the center) and set the active tags
	collageInstance.start('popcorn');
	collageInstance.speed(8);        
});
```

### Iframe
Adds an iframe to the collage. Becareful, this is a particularly expensive thing to add, because
it embed an entire site in the collage.

* `url`
* `width`
* `height`

```javascript
collageInstance.load('popcorn', {
  		iframe: [{
				url: "http://en.wikipedia.org/wiki/Popcorn",
				width: 800,
				height: 600
			}]
}).then(function(){
	// Wait for the loading to be finished, then
	// start the collage (filling the center) and set the active tags
	collageInstance.start('popcorn');
	collageInstance.speed(8);        
});
```

### Image
Adds a single image to the collage.

The loader only accepts a string src.

```javascript
collageInstance.load('popcorn', {
  image: ["http://www.popcorn.com/popcorn.jpg"]
}).then(function(){
	// Wait for the loading to be finished, then
	// start the collage (filling the center) and set the active tags
	collageInstance.start('popcorn');
	collageInstance.speed(8);        
});
```

## Developing
This project uses [boilerplate-gulp](https://github.com/oztu/boilerplate-gulp). Run 'gulp dev' to develop and have incremental builds, continuous testing, etc. Run 'gulp' to run regenerate the dist files. 
