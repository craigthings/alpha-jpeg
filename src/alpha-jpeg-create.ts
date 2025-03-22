import imageCompression from 'browser-image-compression';
import alphaJpegRenderer from './alpha-jpeg-render';

/**
 * Configuration options for the alpha JPEG processing
 */
export interface AlphaJpegOptions {
  /**
   * Quality setting for JPEG compression (0-100)
   */
  quality?: number;
  /**
   * Whether to use white background (true) or black background (false) for transparent pixels
   */
  useWhiteBackground?: boolean;
}

/**
 * Result of processing an image with alpha channel
 */
export interface AlphaJpegResult {
  /**
   * The processed image element
   */
  imageElement: HTMLImageElement;
  /**
   * Size of the processed image in bytes
   */
  sizeInBytes: number;
  /**
   * The compressed image blob
   */
  blob: Blob;
  /**
   * Data URL representation of the image
   */
  dataUrl: string;
}

/**
 * Process an image with alpha channel and return it as a JPEG with alpha information
 * 
 * @param sourceImg The source image element to process
 * @param options Processing options
 * @returns Promise resolving to the processed image result
 */
export async function createAlphaJpeg(
  sourceImg: HTMLImageElement, 
  options: AlphaJpegOptions = {}
): Promise<AlphaJpegResult> {
  // Set default options
  const quality = options.quality !== undefined ? options.quality / 100 : 0.7;
  const useWhiteBackground = options.useWhiteBackground !== undefined ? options.useWhiteBackground : true;
  
  // Process the image with alpha
  const processedImg = await processWithAlpha(sourceImg, useWhiteBackground);
  
  // Convert canvas to blob
  const canvas = document.createElement('canvas');
  canvas.width = processedImg.width;
  canvas.height = processedImg.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D context');
  ctx.drawImage(processedImg, 0, 0);
  
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((b) => resolve(b!), 'image/jpeg', quality);
  });
  
  // Compress using browser-image-compression
  const compressionOptions = {
    maxSizeMB: Number.POSITIVE_INFINITY,
    initialQuality: quality,
    useWebWorker: true,
    maxWidthOrHeight: undefined,
    alwaysKeepResolution: true
  };
  
  const compressedBlob = await imageCompression(
    new File([blob], 'temp.jpg', { type: 'image/jpeg' }), 
    compressionOptions
  );
  
  const compressedImg = document.createElement('img');
  compressedImg.src = URL.createObjectURL(compressedBlob);
  
  await new Promise(resolve => {
    compressedImg.onload = resolve;
  });
  
  return {
    imageElement: compressedImg,
    sizeInBytes: compressedBlob.size,
    blob: compressedBlob,
    dataUrl: compressedImg.src,
  };
}

/**
 * Renders an alpha JPEG into a container element
 * 
 * @param container The container element to render into
 * @param imageSrc The source URL of the alpha JPEG image
 * @returns Promise that resolves when the image is fully loaded
 */
export async function renderAlphaJpeg(
  container: HTMLElement, 
  imageSrc: string
): Promise<void> {
  await alphaJpegRenderer.load(container, imageSrc);
}

/**
 * Downloads an image with the given filename
 * 
 * @param img The image element to download
 * @param filename The filename to use for the downloaded file
 */
export function downloadAlphaJpeg(img: HTMLImageElement, filename: string): void {
  // Create a temporary link element
  const link = document.createElement('a');
  link.style.display = 'none';
  document.body.appendChild(link);
  
  // Set the blob URL as the href and trigger download
  link.href = img.src;
  link.download = filename;
  link.click();
  
  // Clean up
  document.body.removeChild(link);
}

/**
 * Process an image to extract its alpha channel
 * 
 * @param sourceImg The source image to process
 * @param useWhiteBackground Whether to use white background (true) or black background (false)
 * @returns Promise resolving to the processed image element
 */
async function processWithAlpha(
  sourceImg: HTMLImageElement, 
  useWhiteBackground: boolean = true
): Promise<HTMLImageElement> {
  const canvas = document.createElement('canvas');
  const width = sourceImg.width;
  const height = sourceImg.height;

  canvas.width = width;
  canvas.height = 2 * height;
  canvas.style.width = (2 * width) + 'px';
  canvas.style.height = height + 'px';

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    throw new Error('Failed to get 2D context from canvas');
  }

  ctx.drawImage(sourceImg, 0, 0);
  ctx.fillRect(width, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data;
  const alphaData = ctx.getImageData(width, 0, width, height);
  const alphaPixels = alphaData.data;

  // Get background color based on setting
  const bgColor = useWhiteBackground ? 255 : 0;

  // Extract alpha channel and set fully transparent pixels to selected background
  for (let i = 0, len = pixels.length; i < len; i += 4) {
    const alpha = Number(pixels[i + 3]);
    
    // If pixel is fully transparent, set RGB to selected background color
    if (alpha === 0) {
      pixels[i + 0] = bgColor;  // R
      pixels[i + 1] = bgColor;  // G
      pixels[i + 2] = bgColor;  // B
    }
    
    // Set up alpha channel in second half
    alphaPixels[i + 0] = alpha;
    alphaPixels[i + 1] = alpha;
    alphaPixels[i + 2] = alpha;
    alphaPixels[i + 3] = 255;
    
    // Force full opacity in the color image
    pixels[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
  ctx.putImageData(alphaData, 0, height);

  return await createImageFromCanvas(canvas);
}

/**
 * Creates an image element from a canvas
 * 
 * @param canvas The canvas to create an image from
 * @returns Promise resolving to the created image element
 */
async function createImageFromCanvas(canvas: HTMLCanvasElement): Promise<HTMLImageElement> {
  const dataUrl = canvas.toDataURL();
  const img = document.createElement('img');
  await new Promise(resolve => {
    img.onload = resolve;
    img.src = dataUrl;
  });
  return img;
} 