function AlphaJPEG(){
  var self = this;
  
  self.load = function(target, src, options) {
    
    var onComplete = function(){};
    if(typeof target == 'string') {
        target = document.querySelector(target);
    }
    var pixelRatio = 1;
    var renderer = "svg";
    if(!options){
      options = {};
    }
    
    if( options.hasOwnProperty('onComplete') ) {
      onComplete = options.onComplete;
    }
    if( options.hasOwnProperty('pixelRatio') ) {
      pixelRatio = options.pixelRatio;
    }
    if( options.hasOwnProperty('renderer') ) {
      renderer = options.renderer;
    }
    // console.log('AlphaJPEG init');
    var canvas = document.createElement('canvas');
    var htmlImage = document.createElement('img');
    var imgContainer = document.createElement('div');
    var container = document.createElement('div');
    htmlImage.crossOrigin = "Anonymous";
    htmlImage.src = src;

    if(renderer == "svg") {
      
      htmlImage.onload = function(){
        
        var w = htmlImage.width;
        var h = htmlImage.height;

        container.style.width = w/pixelRatio + 'px';
        container.style.height = h/2/pixelRatio + 'px';

        imgContainer.style.position = 'relative';
        imgContainer.style.transform = 'scale('+ (1/pixelRatio) +')';
        imgContainer.style.transformOrigin = 'top left';
        imgContainer.style.webkitTransform = 'scale('+ (1/pixelRatio) +')';
        imgContainer.style.webkitTransformOrigin = 'top left';
        imgContainer.style.width = w + 'px';
        imgContainer.style.height = (h/2) + 'px';
        imgContainer.style.overflow = 'hidden';
        imgContainer.style.opacity = '0.999999'; // this really shouldn't be necessary, but it is.

        var svgW = w;
        var svgH = h/2;
        var imgW = w;
        var imgH = h;
        var imgSrc = src;

        var date = new Date();
        var msTime = date.getTime();

        var safeAssetName = imgSrc.split('/')[imgSrc.split('/').length-1].replace(/[|&\-;$%@_."<>=()+,]/g, "") + Math.round(Math.random()*10000);

        var maskName = 'imageMask'+safeAssetName;
        var imageName = 'imageSource'+safeAssetName;

        var svgElement = '<svg id="'+safeAssetName+'" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ' + svgW + ' ' + svgH + '" class="svg-elem"><defs><mask id="'+maskName+'"><image id="'+imageName+'" width="' + imgW + '" height="' + imgH + '" xlink:href="' + imgSrc + '" x="-' + svgW + '"></image></mask></defs><image mask="url(#'+maskName+')" id="sourceImage" width="' + imgW + '" height="' + imgH + '" xlink:href="' + imgSrc + '"></image></svg>';

        var svgContainer = document.createElement('div');
        svgContainer.style.width = w + 'px';
        svgContainer.style.height = (h/2) + 'px';
        svgContainer.innerHTML = svgElement;

        var svgDom = svgContainer.children[0];
        
        imgContainer.appendChild(svgContainer);

        container.appendChild(imgContainer);
        target.appendChild(container);

        window.requestAnimationFrame(function(){ onComplete(svgDom) });
      }
    }
    
    if(renderer == "canvas") {
      
      htmlImage.onload = function(){
        
        var w = htmlImage.width;
        var h = htmlImage.height;

        canvas.width = w;
        canvas.height = h;

        canvas.style.width = w + "px";
        canvas.style.height = h / 2 + "px";
        canvas.style.position = "absolute";

        var ctx = canvas.getContext("2d");
        
        ctx.drawImage(htmlImage, 0, 0);

        var imageData = ctx.getImageData(0, 0, w, h / 2);
        var imagePixels = imageData.data;
        var maskData = ctx.getImageData(0, h / 2, w, h);
        var maskPixels = maskData.data;

        for (var i = 0, n = imagePixels.length; i < n; i += 4) {
          var alpha = maskPixels[i];
          imagePixels[i + 3] = alpha;
        }

        ctx.clearRect(0, 0, w, h);

        canvas.width = w;
        canvas.height = h / 2;

        ctx.clearRect(w/2, 0, w, h);
        ctx.putImageData(imageData, 0, 0);
        imgContainer.appendChild(canvas);
        target.appendChild(imgContainer);
        onComplete(imgContainer);
      }
    }
  }
}

module.exports = new AlphaJPEG();