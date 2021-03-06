'use strict';

module.exports = function( grunt ) {
    // load grunt tasks dynamicallay
    require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

    // Project configuration.
    grunt.initConfig( {
        // Metadata.
        pkg: grunt.file.readJSON( 'wijsutils.jquery.json' ),

        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        // Task configuration.
        bower: {
            install: {
                options: {
                    targetDir: './libs',
                    install: true,
                    verbose: true,
                    cleanTragetDir: true,
                    cleanBowerDir: true
                }
                // just run grunt bower:install and you'll see files from your Bower packages in lib dir
            }
        },

        clean: {
            files: ['dist']
        },

        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['src/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
            banner: '<%= banner %>'
        },

        dist: {
            src: '<%= concat.dist.dest %>',
            dest: 'dist/<%= pkg.name %>.min.js'
            }
        },

        // initial version, so there aren't unit tests yet
        qunit: {
            files: ['test/**/*.html']
        },

        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: 'src/.jshintrc'
                },
                src: ['src/**/*.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/**/*.js']
            },
        },

        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'qunit']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test']
            },
        },
    } );

    // Default task.
    grunt.registerTask( 'default', ['jshint', 'clean', 'qunit', 'concat', 'uglify'] );
};