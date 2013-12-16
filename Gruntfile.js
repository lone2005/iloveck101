'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
    publicDir: 'public',
    elementsDir: 'elements',
    releaseDir: 'release',
    srcDir: 'app',

    style: 'style.css',

    watch: {
      options: {
        livereload: true
      },

      stylus: {
        files: ['<%= srcDir %>/**/*.styl', '!bower_components/**/*'],
        tasks: ['stylus:dev', 'stylus:devPublic']
      },

      jade: {
        files: ['<%= srcDir %>/**/*.jade', '!bower_components/**/*'],
        tasks: ['jade:dev', 'jade:devPublic']
      },

      js: {
        files: ['<%= srcDir %>/**/*.js', '!bower_components/**/*'],
        tasks: ['copy:js']
      },

      image: {
        files: ['<%= srcDir %>/images/**/*'],
        tasks: ['copy:images']
      },

      bower: {
        files: ['<%= srcDir %>/bower_components/**/*', '!bower_components/**/*'],
        tasks: ['copy:bower']
      }
    },

    stylus: {
      dev: {
        options: {
          compress: false
        },
        files: [
          {
            expand: true,
            cwd: '<%= srcDir %>/<%= elementsDir %>',
            src: ['**/*.styl'],
            dest: '<%= publicDir %>/components/iloveck101/',
            ext: '.css',
            filter: 'isFile'
          }
        ]
      },
      devPublic: {
        options: {
          compress: false
        },
        files: [
          {
            expand: true,
            cwd: '<%= srcDir %>/<%= publicDir %>',
            src: ['**/*.styl'],
            dest: '<%= publicDir %>',
            ext: '.css',
            filter: 'isFile'
          }
        ]
      },
      release: {
        options: {
          compress: false
        },
        files: [
          {
            expand: true,
            cwd: '<%= srcDir %>/<%= elementsDir %>',
            src: ['**/*.styl'],
            dest: '<%= releaseDir %>',
            ext: '.css',
            filter: 'isFile'
          }
        ]
      }
    },

    jade: {
      dev: {
        options: {
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= srcDir %>/<%= elementsDir %>',
            src: ['**/*.jade'],
            dest: '<%= publicDir %>/components/iloveck101/',
            ext: '.html',
            filter: 'isFile'
          }
        ]
      },
      devPublic: {
        options: {
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= srcDir %>/<%= publicDir %>',
            src: ['**/*.jade'],
            dest: '<%= publicDir %>',
            ext: '.html',
            filter: 'isFile'
          }
        ]
      },
      release: {
        options: {
          pretty: false
        },
        files: [
          {
            expand: true,
            cwd: '<%= srcDir %>/<%= elementsDir %>',
            src: ['**/*.jade'],
            dest: '<%= releaseDir %>',
            ext: '.html',
            filter: 'isFile'
          }
        ]
      }
    },

    copy: {
      bower: {
        files: [
          {
            expand: true,
            cwd: '<%= srcDir %>/bower_components',
            src: ['**/*'],
            dest: '<%= publicDir %>/components'
          }
        ]
      },

      js: {
        files: [
          {
            expand: true,
            cwd: '<%= srcDir %>/<%= elementsDir %>',
            src: ['**/*.js'],
            dest: '<%= publicDir %>/components/iloveck101/',
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: '<%= srcDir %>/<%= publicDir %>',
            src: ['**/*.js'],
            dest: '<%= publicDir %>',
            filter: 'isFile'
          }
        ]
      },

      jsRelease: {
        files: [
          {
            expand: true,
            cwd: '<%= srcDir %>/<%= elementsDir %>',
            src: ['**/*.js'],
            dest: '<%= releaseDir %>'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['copy:bower', 'copy:js', 'stylus:dev', 'stylus:devPublic', 'jade:dev', 'jade:devPublic']);
  grunt.registerTask('dev', ['copy:bower', 'copy:js', 'stylus:dev', 'stylus:devPublic', 'jade:dev', 'jade:devPublic', 'watch']);
  grunt.registerTask('build', ['copy:jsRelease', 'stylus:release', 'jade:release']);
};
