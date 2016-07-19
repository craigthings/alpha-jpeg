/**
 * Runs jshint tests.
 * @tasks/test-jshint
 */

'use strict';

var cache = require('gulp-cached');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');

/**
 * @param gulp - function
 * @param options - object
 * options.src : JS files to test.
 * @returns {Function}
 */
module.exports = function( gulp, options ) {

  return function() {

    return gulp.src( options.src )
      .pipe(cache( 'lint' ))
      .pipe(jshint( '.jshintrc' ))
      .pipe(jshint.reporter( jshintStylish ));

  };

};
