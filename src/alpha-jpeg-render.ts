/**
 * Options for loading and rendering an Alpha JPEG image
 */
export interface AlphaJpegRenderOptions {
  /**
   * Callback function called when image loading is complete
   */
  onComplete?: (imageElement: HTMLImageElement) => void;
  
  /**
   * Pixel ratio for scaling the rendered image
   * @default 1
   */
  pixelRatio?: number;
}

/**
 * Loads and renders an Alpha JPEG image
 * 
 * @param target - Element or CSS selector to replace with the rendered image
 * @param src - Source URL of the Alpha JPEG image
 * @param options - Rendering options
 * @returns Promise that resolves when the image is loaded and rendered
 */
export function loadAlphaJpeg(
  target: HTMLElement | string, 
  src: string, 
  options: AlphaJpegRenderOptions = {}
): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    // Default options
    const pixelRatio = options.pixelRatio ?? 1;
    const onComplete = options.onComplete ?? (() => {});
    
    // Handle string selector
    let targetElement: HTMLElement;
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (!element) {
        throw new Error(`Target element not found: ${target}`);
      }
      targetElement = element as HTMLElement;
    } else {
      targetElement = target;
    }
    
    // Create source image
    const sourceImage = document.createElement('img');
    sourceImage.crossOrigin = "Anonymous";
    sourceImage.src = src;

    // Process image when loaded
    sourceImage.onload = () => {
      // Create canvas for processing
      const canvas = document.createElement("canvas");
      
      const w = sourceImage.width;
      const h = sourceImage.height;
      
      // Set canvas dimensions
      canvas.width = w;
      canvas.height = h;
      
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h / 2}px`;
      canvas.style.position = "absolute";
      
      // Get context and draw image
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to get 2D context from canvas");
      }
      
      ctx.drawImage(sourceImage, 0, 0);
      
      // Get image and mask data
      const imageData = ctx.getImageData(0, 0, w, h / 2);
      const imagePixels = imageData.data;
      const maskData = ctx.getImageData(0, h / 2, w, h);
      const maskPixels = maskData.data;
      
      // Apply alpha channel from mask
      for (let i = 0, n = imagePixels.length; i < n; i += 4) {
        const alpha = maskPixels[i];
        imagePixels[i + 3] = alpha;
      }
      
      // Clear and resize canvas
      ctx.clearRect(0, 0, w, h);
      canvas.width = w;
      canvas.height = h / 2;
      
      // Put processed image data back
      ctx.putImageData(imageData, 0, 0);
      
      // Create final image element
      const imageDataURL = canvas.toDataURL();
      const imageElement = document.createElement('img');
      imageElement.src = imageDataURL;
      imageElement.style.width = `${w / pixelRatio}px`;
      imageElement.style.height = `${h / pixelRatio / 2}px`;
      
      // Copy attributes from target
      if (targetElement.id) imageElement.id = targetElement.id;
      if (targetElement.className) imageElement.className = targetElement.className;
      
      // Replace target with new image
      targetElement.parentNode?.replaceChild(imageElement, targetElement);
      
      // Call completion handlers
      onComplete(imageElement);
      resolve(imageElement);
    };
  });
}

// For backward compatibility with the old class-based approach
export default {
  load: loadAlphaJpeg
};