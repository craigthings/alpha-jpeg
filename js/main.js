// Dependencies
const JIC = require('j-i-c');  // JPEG Image Compression
const AlphaJPEG = require('alpha-jpeg');

// DOM Elements
const sourceTitle = document.getElementById('sourceTitle');
const source = document.getElementById('source');
const preview = document.getElementById('preview');
const btnGenerate = document.getElementById('btnGenerate');
const previewTitle = document.getElementById('previewTitle');

// Main image processing function
function processImage(dataUrl, filename) {
    // Clear existing source image
    while (source.firstChild) {
        source.removeChild(source.firstChild);
    }

    // Create and add new image
    const img = document.createElement('img');
    img.src = dataUrl;
    source.appendChild(img);

    // Setup generate button handler
    btnGenerate.onclick = function (e) {
        e.stopPropagation();
        e.preventDefault();

        // Clear preview
        while (preview.firstChild) {
            preview.removeChild(preview.firstChild);
        }

        // Process image with current quality setting
        processWithQuality(img, function (processedImg) {
            preview.style.width = img.width + 'px';
            preview.style.height = img.height + 'px';
            preview.style.margin = '0 auto';
            processedImg.style.display = 'none';

            // Load processed image with alpha channel
            AlphaJPEG.load(preview, processedImg.src, {
                onComplete: function () {
                    console.log('AlphaJPEG.load onComplete?');
                    const downloadBtn = document.getElementById('btnDownload');
                    setTimeout(() => btnGenerate.scrollIntoView(), 10);
                    downloadBtn.onclick = () => downloadImage(processedImg, filename);
                }.bind(processedImg)
            });

            // Update filename and show preview size
            filename = filename.replace('.png', '.alpha.jpg');
            const base64Header = 'data:image/jpeg;base64,';
            const sizeInBytes = Math.round(3 * (processedImg.src.length - base64Header.length) / 4);
            previewTitle.innerHTML = `Preview (${Math.round((sizeInBytes / 1024) * 100) / 100}k)`;
        });
    };
}

// Process image with specified quality
function processWithQuality(sourceImg, callback) {
    const quality = document.getElementById('qualitySetting').value;
    processWithAlpha(sourceImg, function(processedImg) {
        const compressedImg = document.createElement('img');
        compressedImg.src = JIC.compress(processedImg, quality, 'image/jpeg', function() {}).src;
        compressedImg.onload = function() {
            setTimeout(function() {
                callback(compressedImg);
            }, 10);
        };
    });
}

// Download the processed image
function downloadImage(img, filename) {
    // Convert base64 to blob
    const binary = atob(img.src.split(',')[1]);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i) & 0xFF;
    }
    
    // Create blob
    let blob;
    try {
        blob = new Blob([array], {type: 'application/octet-stream'});
    } catch (e) {
        // Specifically handle older browsers
        const BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder;
        const bb = new BlobBuilder();
        bb.append(array);
        blob = bb.getBlob('application/octet-stream');
    }

    // Handle different browser download methods
    if (typeof window.navigator.msSaveOrOpenBlob === 'function') {
        window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        const link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.href = img.src;
        link.download = filename;
        link.click();
        document.body.removeChild(link);
    }
}

// Add drag and drop functionality
function setupDragAndDrop() {
    const dropZone = document.getElementById('source');

    dropZone.addEventListener('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });

    dropZone.addEventListener('drop', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        for (let i = 0, file; file = e.dataTransfer.files[i]; i++) {
            if (file.type.match(/image.*/)) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    processImage(e.target.result, file.name);
                    sourceTitle.innerHTML = 
                        'Source (' + Math.round((file.size / 1024) * 100) / 100 + 'k)';
                };
                reader.readAsDataURL(file);
                break;
            }
        }
    });
}

function processWithAlpha(sourceImg, callback) {
    const canvas = document.createElement('canvas');
    const width = sourceImg.width;
    const height = sourceImg.height;

    canvas.width = width;
    canvas.height = 2 * height;
    canvas.style.width = (2 * width) + 'px';
    canvas.style.height = height + 'px';

    const ctx = canvas.getContext('2d');
    ctx.drawImage(sourceImg, 0, 0);
    ctx.fillRect(width, 0, width, height);

    // Process image data - note the changes in alpha handling
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const alphaData = ctx.getImageData(width, 0, width, height);
    const alphaPixels = alphaData.data;

    // Extract alpha channel - matches build file exactly
    for (let i = 0, len = pixels.length; i < len; i += 4) {
        const alpha = Number(pixels[i + 3]);
        alphaPixels[i + 0] = 0;  // Set RGB to 0 first
        alphaPixels[i + 1] = 0;
        alphaPixels[i + 2] = 0;
        alphaPixels[i + 0] = alpha;  // Then set RGB to alpha value
        alphaPixels[i + 1] = alpha;
        alphaPixels[i + 2] = alpha;
        alphaPixels[i + 3] = 255;
        pixels[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
    ctx.putImageData(alphaData, 0, height);

    return createImageFromCanvas(canvas, callback);
}

// Add this helper function
function createImageFromCanvas(canvas, callback) {
    const dataUrl = canvas.toDataURL();
    const img = document.createElement('img');
    img.src = dataUrl;
    console.log("imagesrc1", img.width, img.height);
    img.onload = function () {
        console.log("imagesrc2", img.width, img.height);
        callback(img);
    };
    return img;
}

// Start the application
setupDragAndDrop();