import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageProviderService {
  private imageSrcs: string[] = [
    '../assets/images/0.png',
    '../assets/images/1.png',
    '../assets/images/2.png',
  ];
  private currentImageIndex = 0;

  constructor() {}

  getNextImageSrc(): string {
    this.currentImageIndex++;
    if (this.currentImageIndex >= this.imageSrcs.length) {
      this.currentImageIndex = 0;
    }
    return this.imageSrcs[this.currentImageIndex];
  }

  getPrevImageSrc(): string {
    this.currentImageIndex--;
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.imageSrcs.length - 1;
    }
    return this.imageSrcs[this.currentImageIndex];
  }
}
