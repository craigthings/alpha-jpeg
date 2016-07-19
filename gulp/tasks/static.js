/**
 * Copies a specified directory to another location.
 * @tasks/static
 */

'use strict';

/**
 * @param gulp - function
 * @param bs - Browser sync instance
 * @param options - object
 * options.src : Directory to copy.
 * options.dist : Destination to copy options.src to.
 * @returns {Function}
 */
module.exports = function( gulp, bs, options ) {

  return function() {

    return gulp.src(options.src)
      .pipe(gulp.dest(options.dist))
      .pipe(bs.stream());

  };

};
