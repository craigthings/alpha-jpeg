declare module 'alpha-jpeg' {
    interface AlphaJPEGOptions {
      onComplete?: (imageElement: HTMLImageElement) => void;
      pixelRatio?: number;
    }
  
    interface AlphaJPEG {
      load(
        target: string | HTMLElement,
        src: string,
        options?: AlphaJPEGOptions
      ): void;
    }
  
    const alphaJPEG: AlphaJPEG;
    export = alphaJPEG;
  }