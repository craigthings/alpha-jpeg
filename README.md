# Alpha JPEG - Creating images with transparency using JPEG compression.

Alpha JPEG is currently made up of two parts. The first part is a Photoshop Action that converts a PNG into an "Alpha JPEG". This is a JPEG that contains both the visible pixels and transparent pixels. The second part is the Alpha JPEG library. This loads the Alpha JPEG and converts it into a transparent image in the DOM.

# Usage

Alpha JPEG requires JPEGs that are exported using the Alpha JPEG Photoshop Action. 

Once you've got an image export it, you'd load it like this:

    AlphaJPEG.load('#birdContainer', 'images/bird.alpha.jpg', {onComplete:});

# Methods

**AlphaJPEG.load** ( target, imageURL, [options] )
 > Loads the given JPEG into the target. When the animation is completely loaded, the callback is called passing a reference to the Alpha JPEG DOM element.

# Options

Alpha JPEG methods accept an optional options object. The options are:

**mode** (default: "svg") _String_
 > ..........

 **pixelRatio** (default: 1) _Number_
 > ..........

**onComplete** _Function_
 > ..........