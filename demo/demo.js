import './index.html';

let text = "Brawny gods! Jim's  bird \nflocked up to\n quiz and\nget him.";
let font = "https://fonts.gstatic.com/s/shadowsintolight/v9/UqyNK9UOIntux_czAvDQx_ZcHqZXBNQzdcD_.woff";
let roundToDecimal = 1;
let styles = {
	color: 'orange',
	fontSize: '50px',
	textAlign: 'center', // options: left, right, center
	verticalAlign: 'middle', // options: top, bottom, middle
	letterSpacing: '0px',
	lineHeight: '50px',
	top: '50px',
	left: '20px',
	offsetX: '5px',
	offsetY: '5px',
	width: '800px', // cannot use percentage
	height: '800px' // cannot use percentage
};

function main() {
	nodeForEachPolyfill();

	glyphy.makeSVG(
		document.querySelector('#demo-text'),
		text,
		font,
		styles,
		roundToDecimal
	).then((container) => {
		console.log('conta', container);
		gsap.set('.letter', {rotation:0.001});
		gsap.from('.word', { stagger: 0.15, duration: 1.5, x: -15, fill: 'blue', autoAlpha: 0, transformOrigin: '50% 50%', ease: 'power3.out' });
		gsap.to('.w6', { yoyo: true, repeat: 1, delay: 1.5, duration: 0.5, scale: 1.7, transformOrigin: '50% 50%', ease: 'power3.inOut' });
		document.querySelectorAll('.w6 .letter').forEach(elem => {
			gsap.to(elem, { yoyo: true, repeat: 1, stagger: 0.3, delay: 1.6, duration: 0.5, fill: 'red', rotation: (Math.random() * 120) - 60, transformOrigin: '50% 50%', ease: 'power3.inOut' });
		});
		gsap.to('.r5', { duration: 1, delay: 2, yoyo: true, repeat: 1, scale: 1.5, transformOrigin: '50% 50%', ease: 'power3.inOut' });
		gsap.to('.letter', { stagger: 0.01, delay: 2.5, duration: 0.75, x: 10, y: 10, rotation: 20, scale: 0.7, fill: 'teal', transformOrigin: '50% 50%', ease: 'power3.inOut' });
	});

	glyphy.svgData(
		text,
		font,
		styles,
		roundToDecimal
	).then((svgData) => {
		// console.log(svgData);
	});
}

function nodeForEachPolyfill() {
	// ie11 polyfill
	if ('NodeList' in window && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = function (callback, thisArg) {
			thisArg = thisArg || window;
			for (var i = 0; i < this.length; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		};
	}
}


main();






