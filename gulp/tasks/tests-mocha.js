/**
 * Runs mocha tests.
 * @tasks/test-mocha
 */

'use strict';

var mocha = require('gulp-mocha');

/**
 * @param gulp - function
 * @param options - object
 * options.src : Tests to run.
 * options.mocha.config : Object - TODO : Explain the config options for Mocha
 * @returns {Function}
 */
module.exports = function( gulp, options ) {

  return function() {

    return gulp.src( options.src )
      .pipe(mocha( options.config ))
      .on('error', function(error) {
        console.log(error.message);
      });

  };

};
