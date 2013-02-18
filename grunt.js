module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    hug: {
      client: {
        src: './src/collage.js',
        dest: 'dist/collage-expanded.js',
        exportedVariable: 'Collage',
        exports: './src/collage.js',
        path: ['./components']
      },
      clientExport: {
        src: './src/collage.js',
        dest: 'dist/collage-module.js',
        exports: './src/collage.js',
        path: ['./components']
      }
    }, 
    min: {
      client: {
        src: ['<config:hug.client.dest>'],
        dest: 'dist/collage.js'
      }
    },
    watch: {
      all: {
        files: './src/**/*',
        tasks: 'hug'
      }
    }
  });

  grunt.loadNpmTasks('grunt-hug');

  grunt.registerTask('dev', 'hug watch');
  grunt.registerTask('default', 'hug min');
};