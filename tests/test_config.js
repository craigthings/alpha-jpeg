'use strict';

var config = require('../app/config');
var assert = require('chai').assert;

suite('config', function () {
  setup(function () {
  });

  test('config is an object', function () {
    assert.isObject(config);
  });
});
