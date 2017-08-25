module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    dir: {
      src: 'src',
      src_thirdparty: 'src/openui5/validator/thirdparty/',
      dist: 'dist',
      demo: 'test/openui5/validator/demo',
      test: 'test',
      coverage: 'coverage'
    },

    connect: {
      options: {
        port: 8080,
        hostname: '*'
      },
      src: {},
      dist: {}
    },

    openui5_connect: {
      options: {
        cors: {
          origin: 'http://localhost:<%= karma.options.port %>'
        }
      },
      src: {
        options: {
          appresources: '<%= dir.src %>'
        }
      },
      dist: {
        options: {
          appresources: '<%= dir.dist %>'
        }
      }
    },


    openui5_preload: {
      library: {
        options: {
          resources: [
            {
              cwd: '<%= dir.src %>',
              src: [
                '**/*.js',
                '**/*.properties',
                '**/*.json',
                '!**/thirdparty/**'
              ]
            }
          ],
          dest: '<%= dir.dist %>'
        },
        libraries: true
      }
    },

    clean: {
      dist: '<%= dir.dist %>',
      coverage: '<%= dir.coverage %>',
      thirdparty: '<%= dir.src_thirdparty %>'
    },

    copy: {
      dist: {
        expand: true,
        cwd: '<%= dir.src %>/',
        src: '**',
        dest: '<%= dir.dist %>'
      },
      thirdparty: {
        expand: true,
        cwd: 'node_modules/ajv/dist/',
        src: 'ajv.min.js',
        dest: '<%= dir.src_thirdparty %>'
      }
    },

    eslint: {
      test: ['<%= dir.test %>'],
      src: ['<%= dir.src %>']
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-openui5');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-karma');

  // Server task
  grunt.registerTask('serve', function(target) {
    grunt.task.run('openui5_connect:' + (target || 'src') + ':keepalive');
  });

  // Linting task
  grunt.registerTask('lint', ['eslint']);

  // Test tasks
  grunt.registerTask('test', ['clean:coverage', 'openui5_connect:src', 'karma:ci']);
  grunt.registerTask('watch', ['openui5_connect:src', 'karma:watch']);
  grunt.registerTask('coverage', ['clean:coverage', 'openui5_connect:src', 'karma:coverage']);

  // Copy third party library to SRC folder
  grunt.registerTask('copy-3rdparty-to-src', ['clean:thirdparty', 'copy:thirdparty']);

  // Build task
  grunt.registerTask('build', ['clean:dist', 'openui5_preload', 'copy:dist']);

  // Default task
  grunt.registerTask('default', ['serve']);
};
