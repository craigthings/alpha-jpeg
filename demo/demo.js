import './index.html';

function main() {

	console.log('init');

	var imageURL = 'images/example-orig-small.jpg';
	var container = document.getElementById('container');

	console.log('??????')

	AlphaJPEG.load(container, imageURL, { renderer: 'svg', onComplete: function(elem){
	  console.log('AlphaJPEG loaded');
	  elem.onclick = imageClicked;
	}});

	function imageClicked() {
	  console.log('Image clicked.');
	}

  }


main();
