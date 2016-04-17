module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.initConfig({
    babel: {
      options: {
        presets: ["babel-preset-es2015"]
      },
      dist: {
        files: {
          'dist/graph.js': 'src/graph.js',
          'dist/handler.js': 'src/handler.js'
        }
      },
      test: {
        files: {
          'test/load.js': 'src/test/load.js',
          'test/render.js': 'src/test/render.js'
        }
      }
    },
    mochacli: {
      test: {
        src: ['test/*.js']
      }
    }
  });
  grunt.registerTask("build", ["babel:dist"]);
  grunt.registerTask("test", ["babel", "mochacli"]);
};