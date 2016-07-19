/**
 * Runs jscs tests.
 * @tasks/test-jscs
 */

'use strict';

var jscs = require('gulp-jscs');

/**
 * @param gulp - function
 * @param options - object
 * options.src : Files to validate.
 * @returns {Function}
 */
module.exports = function( gulp, options ) {

  return function() {

    return gulp.src( options.src )
      .pipe(jscs())
      .on('error', function(error) {
        console.log(error.message);
      });

  };

};
