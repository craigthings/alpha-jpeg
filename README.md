# Alpha JPEG

Alpha JPEG is a lightweight, TypeScript-based library for creating and rendering JPEG images with alpha channel (transparency) support.

## Features

- Convert PNG images with transparency to JPEGs while preserving alpha information
- Render these special JPEG images with proper transparency
- Adjust quality settings to balance file size and image quality
- Choose between white or black backgrounds for transparent areas
- Download processed images

## Installation

```bash
npm install alpha-jpeg-tool
```

## Usage

### Basic Example

```typescript
import { AlphaJpeg } from 'alpha-jpeg-tool';

// Create an alpha JPEG from a transparent PNG
const sourceImage = document.querySelector('img#source');
const result = await AlphaJpeg.create(sourceImage, { 
  quality: 80,
  useWhiteBackground: true 
});

// Render the alpha JPEG in a container
const container = document.querySelector('#preview');
await AlphaJpeg.render(container, result.imageElement.src);

// Download the processed image
AlphaJpeg.download(result.imageElement, 'image-with-transparency.jpg');
```

### API Reference

#### Creating Alpha JPEGs

```typescript
// Convert an image with transparency to a special JPEG format
const result = await AlphaJpeg.create(sourceImageElement, options);
```

Options:
- `quality`: JPEG compression quality (0-100, default: 70)
- `useWhiteBackground`: Whether to use white (true) or black (false) background for transparent areas (default: true)

Result object:
- `imageElement`: The processed image element
- `sizeInBytes`: Size of the processed image in bytes
- `blob`: The compressed image blob
- `dataUrl`: Data URL representation of the image

#### Rendering Alpha JPEGs

```typescript
// Simple rendering
await AlphaJpeg.render(containerElement, imageSource);

// Advanced rendering with more options
const renderedImage = await AlphaJpeg.load(targetElement, imageSource, options);
```

Render options:
- `pixelRatio`: Pixel ratio for scaling the rendered image (default: 1)
- `onComplete`: Callback function called when image loading is complete

#### Downloading Alpha JPEGs

```typescript
AlphaJpeg.download(imageElement, filename);
```

## How It Works

Alpha JPEG works by encoding the alpha channel information within the same JPEG file:

1. The top half of the special JPEG contains the RGB image data
2. The bottom half contains the alpha channel information
3. When rendering, the library extracts the alpha data and applies it to the RGB image

This approach allows for significantly smaller file sizes compared to PNG while retaining transparency information.



## License

MIT