/**
 * Alpha JPEG - A library for creating and rendering JPEG images with alpha channel
 * 
 * This library provides functionality to:
 * 1. Create JPEG images with alpha channel information from PNG images
 * 2. Render these special JPEG images while preserving transparency
 * 3. Download the processed images
 */

import { loadAlphaJpeg, AlphaJpegRenderOptions } from './alpha-jpeg-render';
import { 
  createAlphaJpeg, 
  renderAlphaJpeg, 
  downloadAlphaJpeg,
  AlphaJpegOptions,
  AlphaJpegResult
} from './alpha-jpeg-create';

/**
 * Main AlphaJpeg API
 */
export const AlphaJpeg = {
  /**
   * Create a JPEG with alpha channel from a source image
   * 
   * @param sourceImg Source image element with transparency
   * @param options Processing options
   * @returns Promise resolving to the processing result
   */
  create: createAlphaJpeg,
  
  /**
   * Render an alpha JPEG into a container element
   * 
   * @param container Container element to render into
   * @param imageSrc Source URL of the alpha JPEG image
   * @returns Promise that resolves when rendering is complete
   */
  render: renderAlphaJpeg,
  
  /**
   * Load and render an alpha JPEG with more detailed options
   * Use this when you need more control over rendering
   * 
   * @param target Target element or selector to replace
   * @param src Source URL of the alpha JPEG image
   * @param options Rendering options
   * @returns Promise resolving to the rendered image element
   */
  load: loadAlphaJpeg,
  
  /**
   * Download an alpha JPEG image
   * 
   * @param img Image element to download
   * @param filename Filename for the downloaded file
   */
  download: downloadAlphaJpeg
};

// Export types for TypeScript users
export type { 
  AlphaJpegOptions, 
  AlphaJpegResult,
  AlphaJpegRenderOptions
};

// Default export for easier importing
export default AlphaJpeg; 