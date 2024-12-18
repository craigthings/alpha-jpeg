// Dependencies
import imageCompression from 'browser-image-compression';  // Replace JIC import
import AlphaJPEG from 'alpha-jpeg';

// DOM Elements
const sourceTitle = document.getElementById('sourceTitle') as HTMLElement;
const source = document.getElementById('source') as HTMLElement;
const preview = document.getElementById('preview') as HTMLElement;
const btnGenerate = document.getElementById('btnGenerate') as HTMLButtonElement;
const previewTitle = document.getElementById('previewTitle') as HTMLElement;
const backgroundToggle = document.getElementById('backgroundToggle') as HTMLInputElement;

// Define the generate handler as a named async function
async function handleGenerate(e: MouseEvent): Promise<void> {
    e.stopPropagation();
    e.preventDefault();

    // Get the source image and validate
    const sourceImg = source.querySelector('img');
    if (!sourceImg) {
        console.warn('No source image found');
        return;
    }

    // Disable the generate button while processing
    btnGenerate.disabled = true;
    try {
        // Clear preview
        while (preview.firstChild) {
            preview.removeChild(preview.firstChild);
        }

        // Process image with current quality setting
        const processedImg = await processWithQuality(sourceImg);
        
        // Get the actual blob size
        const response = await fetch(processedImg.src);
        const blob = await response.blob();
        const sizeInBytes = blob.size;
        
        // Set preview dimensions
        preview.style.width = sourceImg.width + 'px';
        preview.style.height = sourceImg.height + 'px';
        preview.style.margin = '0 auto';
        processedImg.style.display = 'none';

        // Load and setup alpha JPEG
        await setupAlphaJPEG(processedImg, sourceImg);

        // Update preview size
        previewTitle.innerHTML = `Preview (${(sizeInBytes / 1024).toFixed(2)}k)`;
    } catch (error) {
        console.error('Error generating image:', error);
    } finally {
        // Re-enable the generate button
        btnGenerate.disabled = false;
    }
}

async function setupAlphaJPEG(processedImg: HTMLImageElement, sourceImg: HTMLImageElement): Promise<void> {
    // Create a container div that won't be replaced
    const container = document.createElement('div');
    preview.appendChild(container);
    
    await new Promise<void>(resolve => {
        AlphaJPEG.load(container, processedImg.src, {
            onComplete: function () {
                setupDownloadButton(processedImg, sourceImg);
                resolve();
            }.bind(processedImg)
        });
    });
}

function setupDownloadButton(processedImg: HTMLImageElement, sourceImg: HTMLImageElement): void {
    const downloadBtn = document.getElementById('btnDownload');
    if (downloadBtn) {
        setTimeout(() => btnGenerate.scrollIntoView(), 10);
        downloadBtn.onclick = () => {
            const filename = sourceImg.dataset.filename?.replace('.png', '.alpha.jpg') || 'image.alpha.jpg';
            downloadImage(processedImg, filename);
        };
    }
}

// Update processImage to store filename
async function processImage(dataUrl: string, filename: string): Promise<void> {
    // Clear existing source image
    while (source.firstChild) {
        source.removeChild(source.firstChild);
    }

    // Create and add new image
    const img = document.createElement('img');
    img.dataset.filename = filename; // Store filename in data attribute
    await new Promise(resolve => {
        img.onload = resolve;
        img.src = dataUrl;
    });
    source.appendChild(img);
}

// Convert to async function
async function processWithQuality(sourceImg: HTMLImageElement): Promise<HTMLImageElement> {
    const qualityInput = document.getElementById('qualitySetting') as HTMLInputElement;
    const quality = parseInt(qualityInput.value) / 100; // Convert to 0-1 range
    
    const processedImg = await processWithAlpha(sourceImg);
    
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
    const options = {
        maxSizeMB: Number.POSITIVE_INFINITY,
        initialQuality: quality,
        useWebWorker: true,
        maxWidthOrHeight: undefined,
        alwaysKeepResolution: true
    };
    
    const compressedBlob = await imageCompression(new File([blob], 'temp.jpg', { type: 'image/jpeg' }), options);
    const compressedImg = document.createElement('img');
    compressedImg.src = URL.createObjectURL(compressedBlob);
    
    await new Promise(resolve => {
        compressedImg.onload = resolve;
    });
    
    return compressedImg;
}

// Convert to async function
async function processWithAlpha(sourceImg: HTMLImageElement): Promise<HTMLImageElement> {
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

    // Get background color based on toggle
    const useWhiteBackground = backgroundToggle.checked;
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

// Convert to async function
async function createImageFromCanvas(canvas: HTMLCanvasElement): Promise<HTMLImageElement> {
    const dataUrl = canvas.toDataURL();
    const img = document.createElement('img');
    await new Promise(resolve => {
        img.onload = resolve;
        img.src = dataUrl;
    });
    console.log("imagesrc2", img.width, img.height);
    return img;
}

// Download the processed image
function downloadImage(img: HTMLImageElement, filename: string): void {
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

// Update drag and drop to use async/await
function init(): void {
    btnGenerate.onclick = handleGenerate;

    const dropZone = document.getElementById('source') as HTMLElement;

    dropZone.addEventListener('dragover', (e: DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'copy';
        }
    });

    dropZone.addEventListener('drop', async (e: DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
        
        if (e.dataTransfer?.files) {
            for (const file of e.dataTransfer.files) {
                if (file.type.match(/image.*/)) {
                    const dataUrl = await new Promise<string>(resolve => {
                        const reader = new FileReader();
                        reader.onload = e => resolve(e.target?.result as string);
                        reader.readAsDataURL(file);
                    });
                    
                    await processImage(dataUrl, file.name);
                    sourceTitle.innerHTML = 
                        `Source (${Math.round((file.size / 1024) * 100) / 100}k)`;
                    break;
                }
            }
        }
    });
}

// Start the application
init();