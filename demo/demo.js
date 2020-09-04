import './index.html';

function main() {

	console.log('init');

	var imageURL = 'images/example-orig-small.jpg';
	var container = document.getElementById('container');

	AlphaJPEG.load(container, imageURL, { pixelRatio: 1, onComplete: function(elem){
	  console.log('AlphaJPEG loaded');
	  elem.onclick = imageClicked;
	}});

	function imageClicked() {
	  console.log('Image clicked.');
	}

  }


main();
