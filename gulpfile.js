var gulp = require('gulp'), 
  boilerplate = require('boilerplate-gulp');

boilerplate(gulp, {
  jsMain: './src/collage.js',
  karmaConfig: {
    files: [
      'bower_components/big-surface/dist/BigSurface.js',
      'bower_components/giant-quadtree/dist/GiantQuadtree.js',
      'bower_components/easy-tween/dist/easyTween.js',
      'bower_components/hammerjs/hammer.js',
      'bower_components/eventEmitter/EventEmitter.js',
      'bower_components/mustache/mustache.js',
      'bower_components/q/q.js'
    ],
    
    preprocessors: {
      'bower_components/easy-tween/dist/easyTween.js' : ['commonjs'],
      'bower_components/big-surface/dist/BigSurface.js' : ['commonjs'],
      'bower_components/giant-quadtree/dist/GiantQuadtree.js' : ['commonjs'],
      'bower_components/hammerjs/hammer.js' : ['commonjs'],
      'bower_components/eventEmitter/EventEmitter.js' : ['commonjs'],
      'bower_components/q/q.js' : ['commonjs'],
      'bower_components/mustache/mustache.js' : ['commonjs']
    },
  }
});