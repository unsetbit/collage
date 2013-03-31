# Collage is a Framework for Live Collages

Collage brings together many public APIs, along with a method of presenting media within a limitless two-dimesional
space to create memorable and meaningful experiences. It's a mixture between [Big Surface](https://github.com/ozanturgut/big-surface), 
[Giant Quadtree](https://github.com/ozanturgut/giant-quadtree), and
a public API library.

## Use
For plain JavaScript applications, use the [dist/collage.js](https://raw.github.com/ozanturgut/collage/master/dist/collage.js), which will inject the Surface object to the global
scope. If you're using NodeJS (or any system that uses the export/require pattern), use [dist/collage-module.js](https://raw.github.com/ozanturgut/collage/master/dist/collage-module.js), 
as it exports the Collage object.

## API
Collage extends [Big Surface](https://github.com/ozanturgut/big-surface), all API methods that are available for Big
Surface is also available for Collage. In the API `Collage` (capitalized) refers to the module object and `collage` (lowercase) refers to a 
Quadtree instance which is created via `Collage.create`.

### `Collage.create(container)`
Constructor function which returns a new Collage instance. The container is the element which will contain
the collage.

### `collage.load(tagName, loaderName, loaderConfig)`
Loads the media from the given loaderName according to the loaderConfig and assigns the loaded media to the tagName.

### `collage.load(tagName, loaderMap)`
Loads the media from the given loaderName : loaderConfig mapping and assigns the loaded media to the tagName.

### `collage.start(opt_var_args)`
Starts the transform loop of the collage (allows for movement) and optionally sets the active tags to the given
arguments.

### `collage.pause(opt_duration)`
Brings the collage movement to a halt within the given time duration (or immediately if none provided).

### `collage.resume(opt_duration)`
Resumes collage movement to the state it was in previous to a `pause` call. If a duration
is provided, the speed will tween to the limit within the given time period.

### `collage.setActiveTags(var_args)`
Sets the given tags as the 'active' tags which media for the collage will be pulled from.

### `collage.add(tagNames, elements)`
Adds the given element(s) to the given tag(s).

### `collage.remove(tagNames, elements)`
Removes the given element(s) from the given tag(s).

### `collage.get(var_args)`
Gets the elements for the given tag names.

### `collage.showElement(element, left, top, show)`
Inserts an element directly in the collage surface at left, top (in pixels). If show is set to true, the
element is placed visibly, otherwise hidden.

### `collage.loader`
A map of available loaders which you can extend during run-time.

### `collage.fill()`
Fills the visible center of the screen with elements.
