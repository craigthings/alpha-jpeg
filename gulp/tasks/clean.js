/**
 * Deletes specified directory.
 * @tasks/clean
 */

'use strict';

var del = require('del');

/**
 * @param gulp - function
 * @param options - object
 * options.src : Directory to delete.
 * @returns {Function}
 */
module.exports = function( gulp, options ) {

  return function(done) {

    del.sync(options.src, {force: true});
    done();

  };

};
