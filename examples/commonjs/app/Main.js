'use strict';

var AlphaJPEG = require('../../../src/utils/AlphaJPEG');

function Main() {
  console.log('Main: instance');

  var imageURL = 'images/example-orig-small.jpg';
  var container = document.getElementById('container');

  AlphaJPEG.load(container, imageURL, { renderer: 'svg', onComplete: function(elem){
    console.log('AlphaJPEG loaded');
    elem.onclick = imageClicked;
  }});

  function imageClicked() {
    console.log('Image clicked.');
  }
}

var main = new Main();
