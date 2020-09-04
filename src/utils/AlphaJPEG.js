function AlphaJPEG(){
  var self = this;
  
  self.load = function(target, src, options) {
    
    var onComplete = function(){};
    if(typeof target == 'string') {
        target = document.querySelector(target);
    }
    var pixelRatio = 1;
    if(!options){
      options = {};
    }
    
    if( options.hasOwnProperty('onComplete') ) {
      onComplete = options.onComplete;
    }
    if( options.hasOwnProperty('pixelRatio') ) {
      pixelRatio = options.pixelRatio;
    }
    // console.log('AlphaJPEG init');
    var sourceImage = document.createElement('img');
    sourceImage.crossOrigin = "Anonymous";
    sourceImage.src = src;

    sourceImage.onload = function(){
      
      var canvas = document.createElement("canvas");
  
      var w = sourceImage.width;
      var h = sourceImage.height;
  
      canvas.width = w;
      canvas.height = h;
  
      canvas.style.width = w + "px";
      canvas.style.height = h / 2 + "px";
      canvas.style.position = "absolute";
  
      var ctx = canvas.getContext("2d");
  
      ctx.drawImage(sourceImage, 0, 0);
  
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
  
      ctx.putImageData(imageData, 0, 0);
  
      let imageDataURL = canvas.toDataURL();
  
      let imageElement = document.createElement('img');
      imageElement.src = imageDataURL;
      imageElement.style.width = (w / pixelRatio) + 'px';
      imageElement.style.height = (h / pixelRatio / 2) + 'px';
  
      if (target.id) imageElement.setAttribute("id", target.id);
      if (target.className) imageElement.setAttribute("class", target.className);
      target.parentNode.replaceChild(imageElement, target);
      onComplete(imageElement);
    }
  }
}

module.exports = new AlphaJPEG();