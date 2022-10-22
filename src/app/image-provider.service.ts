import { Injectable } from '@angular/core';

export interface ImageSource {
  src: string;
  canBeDeleted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ImageProviderService {
  private imageSrcs: ImageSource[] = [
    { src: '../assets/images/0.png', canBeDeleted: false },
    { src: '../assets/images/1.png', canBeDeleted: false },
    { src: '../assets/images/2.png', canBeDeleted: false },
    { src: '../assets/images/3.png', canBeDeleted: false },
    { src: '../assets/images/4.png', canBeDeleted: false },
  ];
  private currentImageIndex = 2;

  constructor() {}

  getCurrentImageSrc(): ImageSource {
    return this.imageSrcs[this.currentImageIndex];
  }

  getNextImageSrc(): ImageSource {
    this.currentImageIndex++;
    if (this.currentImageIndex >= this.imageSrcs.length) {
      this.currentImageIndex = 0;
    }
    return this.imageSrcs[this.currentImageIndex];
  }

  getPrevImageSrc(): ImageSource {
    this.currentImageIndex--;
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.imageSrcs.length - 1;
    }
    return this.imageSrcs[this.currentImageIndex];
  }

  addNewImage(url: string): void {
    this.imageSrcs.splice(this.currentImageIndex, 0, {
      src: url,
      canBeDeleted: true,
    });
  }

  removeCurrentImage(): void {
    if (this.imageSrcs[this.currentImageIndex].canBeDeleted) {
      window.URL.revokeObjectURL(this.imageSrcs[this.currentImageIndex].src);
      this.imageSrcs.splice(this.currentImageIndex, 1);
    }
  }
}
