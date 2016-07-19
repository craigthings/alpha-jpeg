/**
 * Injects a timestamp into CSS, JS, and HTML files and renames the files.
 * @tasks/clean
 */

'use strict';

var args = require('yargs').argv;
var config = require('../config.js');
var merge = require('merge-stream');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var inject = require('gulp-inject-string');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var gutil = require('gulp-util');

/**
 * @param gulp - function
 * @param options - object
 * options.src : Directory to delete.
 * @returns {Function}
 */
module.exports = function( gulp, options ) {

  function cssStuff( date, version ) {

    return gulp.src( options.css )
      .pipe(vinylPaths(del))
      .pipe(inject.prepend('/* Created: ' + date + ' */\n'))
      .pipe(inject.prepend('/* Version: ' + version + ' */\n'))
      .pipe(rename(function( path ) {
        path.basename += '.' + version;
      }))
      .pipe(gulp.dest( options.cssDist ));

  }

  function jsStuff( date, version ) {

    //inject the date and version into a new JS files
    return gulp.src( options.js )
      .pipe(vinylPaths(del))
      .pipe(inject.prepend('/* Created: ' + date + ' */\n'))
      .pipe(inject.prepend('/* Version: ' + version + ' */\n'))
      .pipe(rename(function( path ) {
        path.basename += '.' + version;
      }))
      .pipe( gulp.dest( options.jsDist ));

  }

  function htmlStuff( date, version ) {

    //inject the date and version into the index.html file
    //update references to the new CSS and JS files
    return gulp.src( options.html )
      .pipe(inject.append('<!-- Version: ' + version + ' -->\n'))
      .pipe(inject.append('<!-- Created: ' + date + ' -->'))
      .pipe(replace('index.css', 'index.' + version + '.css'))
      .pipe(replace('<html', '<html data-version="' + version + '"'))
      .pipe(replace('main.build.js', 'main.build.' + version + '.js'))
      .pipe(replace('bower.js', 'bower.' + version + '.js'))
      .pipe(replace('vendor.js', 'vendor.' + version + '.js'))
      .pipe(gulp.dest( options.htmlDist ));

  }

  return function() {

    var date = new Date();
    var version;

    if ( !args.version ) {
      version = date.getTime();
    } else {
      version = args.version.toString().replace( /[^\w.-]+/g, '' );
    }

    return merge(
      cssStuff(date, version),
      jsStuff(date, version),
      htmlStuff(date, version)
    );

  };

};
