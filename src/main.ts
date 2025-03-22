// Dependencies
import { AlphaJpeg, AlphaJpegOptions } from './alpha-jpeg';

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

        // Get the current quality setting
        const qualityInput = document.getElementById('qualitySetting') as HTMLInputElement;
        const quality = parseInt(qualityInput.value);
        
        // Use white background based on toggle state
        const useWhiteBackground = backgroundToggle.checked;
        
        // Process image with current settings
        const options: AlphaJpegOptions = {
            quality: quality,
            useWhiteBackground: useWhiteBackground
        };
        
        const result = await AlphaJpeg.create(sourceImg, options);
        
        // Set preview dimensions
        preview.style.width = sourceImg.width + 'px';
        preview.style.height = sourceImg.height + 'px';
        preview.style.margin = '0 auto';
        result.imageElement.style.display = 'none';

        // Create a container div that won't be replaced
        const container = document.createElement('div');
        preview.appendChild(container);
        
        // Load and setup alpha JPEG
        await AlphaJpeg.render(container, result.imageElement.src);
        
        // Setup download button
        setupDownloadButton(result.imageElement, sourceImg);

        // Update preview size
        previewTitle.innerHTML = `Preview (${(result.sizeInBytes / 1024).toFixed(2)}k)`;
    } catch (error) {
        console.error('Error generating image:', error);
    } finally {
        // Re-enable the generate button
        btnGenerate.disabled = false;
    }
}

function setupDownloadButton(processedImg: HTMLImageElement, sourceImg: HTMLImageElement): void {
    const downloadBtn = document.getElementById('btnDownload');
    if (downloadBtn) {
        setTimeout(() => btnGenerate.scrollIntoView(), 10);
        downloadBtn.onclick = () => {
            const filename = sourceImg.dataset.filename?.replace('.png', '.alpha.jpg') || 'image.alpha.jpg';
            AlphaJpeg.download(processedImg, filename);
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