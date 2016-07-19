# Alpha JPEG - Images with transparency using JPEG compression.

Alpha JPEG is currently made up of two parts. The first part is a Photoshop Action that converts a PNG into an "Alpha JPEG". This is a JPEG that contains both the visible pixels and transparent pixels. The second part is the Alpha JPEG loader. This loads the Alpha JPEG and converts it into a transparent image in the DOM.

# Usage

Alpha JPEG requires JPEGs that are exported using the Alpha JPEG Photoshop Action. 

Once you've got an image export it, you'd load it like this:

    AlphaJPEG.load('#birdContainer', 'images/bird.alpha.jpg', {onComplete:});

This repository includes both a standalone javascript library you can load directly located here:

	/build/alpha-jpeg.min.js

It also includes a commonjs compatible version of the code located here:

	/

# Methods

**AlphaJPEG.load** ( target, imageURL, [options] )
 > Loads the given JPEG into the target. When the animation is completely loaded, the callback is called passing a reference to the Alpha JPEG DOM element.

# Options

Alpha JPEG methods accept an optional options object. The options are:

**renderer** (default: "svg") _String_
 > Set this option to "svg" to have the loader render the image into an SVG DOM element. Set it to "canvas" to render the image into a canvas DOM element.

 **pixelRatio** (default: 1) _Number_
 > This option increases the pixel density of the image. If your asset is, for example, targeting an iPhone 5 and your Alpha JPEG is exported at retina resolution, you'll probably want to set this to "2".

**onComplete** _Function_
 > Sets a callback function for when the image is fully loaded and rendered. This passes a reference to the Alpha JPEG DOM element as an argument.

 # Creating Alpha JPEGs

1. Install the Alpha JPEG Photoshop Actions by double-clicking on the photoshop action located here:

	/actions/Alpha JPEG.atn

2. Open the PNG (not PSD) you'd like to convert to an Alpha JPEG.

3. Open the Actions panel (Alt+F9 / Option+F9).

4. Click the arrow next to "Alpha JPEG".

5. Click on "Make Alpha JPEG".

6. Click the "play" button at the bottom of the Actions panel.

7. You'll see the visible pixels on the left, and the alpha channel pixels on the right. Make any adjustments you need and save your asset out as a JPEG.

# Building

To build a stand alone javascript file you can load directly, run:

	gulp

This compiles a minified version of the library (alpha-jpeg.min.js), and a fullsized version of the library with a sourcemap (alpha-jpeg.js, alpha-jpeg.js.map) located in:

	/build/

To test the commonjs usage example, you can run:

	gulp example