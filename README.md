# Alpha JPEG - Images with transparency using JPEG compression.

Alpha JPEG is currently made up of two parts. 

1. A **Photoshop Action** that converts a PNG into an "Alpha JPEG". This is a JPEG that contains both the visible pixels and transparent pixels. 
2. A **JavaScript library** for loading the Alpha JPEG image. The javascript contains a loader that loads the Alpha JPEG and converts it into a transparent image in the DOM.

# Setup

There are 2 ways to use Alpha JPEG:

**Script Tag**

Load it directly with a script tag. Download the compiled and minified library from:

	/build/alpha-jpeg.min.js

Upload it anywhere you like and include it with a script tag:

	<script src="alpha-jpeg.min.js"></script>

**Common JS Module**

Download the commonjs module located from:

	/src/utils/AlphaJPEG.js

Save it anywhere you like in your development environment, and include it like normal:

	var AlphaJPEG = require('./utils/AlphaJPEG');

# Usage

The Alpha JPEG loader requires JPEGs that are exported using the Alpha JPEG Photoshop Action. Read the [Creating Alpha JPEGs](#creating-alpha-jpegs) section for instructions.

Once you've got an image exported, load it like this:

    AlphaJPEG.load('#birdContainer', 'images/bird.alpha.jpg');

If you preffer to load the javascript libraries directly using script tags or other methods, you can use this stand-alone version of the library:

	/build/alpha-jpeg.min.js

This repository also includes a commonjs module version of the code located here:

	/src/utils/AlphaJPEG.js

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


# Examples

### JavaScript library (must be run on an HTTP server)

This example uses the compiled JavaScript library version of Alpha JPEG. You can find it here:

	/examples/static/

### CommonJS Module

This example uses the CommonJS module version of Alpha JPEG. You can find it here:

	/examples/commonjs/