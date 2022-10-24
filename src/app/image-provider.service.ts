import { Injectable } from '@angular/core';
import { CellValue, Column, Row } from './core/map';
import { ImageSlicerService } from './image-slicer.service';

export interface ImageChunkInfo {
  row: Row;
  column: Column;
  value: CellValue;
  src: string;
  alt: string;
}

export interface ImageInfo {
  src: string;
  canBeDeleted: boolean;
  chunksInfo?: ImageChunkInfo[];
}

@Injectable({
  providedIn: 'root',
})
export class ImageProviderService {
  private imagesInfo: ImageInfo[] = [
    { src: '../assets/images/0.png', canBeDeleted: false },
    { src: '../assets/images/1.png', canBeDeleted: false },
    { src: '../assets/images/2.png', canBeDeleted: false },
    { src: '../assets/images/3.png', canBeDeleted: false },
    { src: '../assets/images/4.png', canBeDeleted: false },
  ];
  private currentImageIndex = 2;
  private loadingImage: HTMLImageElement | undefined;

  constructor(private imageSlicer: ImageSlicerService) {}

  async getLoadingImage(): Promise<string> {
    if (!this.loadingImage) {
      const image = new Image();
      image.src = '../../assets/images/loading.gif';
      image.alt = 'Loading...';
      await this.loadImage(image);
      this.loadingImage = image;
    }
    return this.loadingImage.src;
  }

  async getCurrentImageInfo(): Promise<ImageInfo> {
    return this.getImageInfo();
  }

  async getNextImageInfo(): Promise<ImageInfo> {
    this.currentImageIndex++;
    return this.getImageInfo();
  }

  async getPrevImageInfo(): Promise<ImageInfo> {
    this.currentImageIndex--;
    return this.getImageInfo();
  }

  private async getImageInfo(): Promise<ImageInfo> {
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.imagesInfo.length - 1;
    } else if (this.currentImageIndex >= this.imagesInfo.length) {
      this.currentImageIndex = 0;
    }
    if (!this.imagesInfo[this.currentImageIndex].chunksInfo) {
      const chunks = await this.createChunks();
      this.imagesInfo[this.currentImageIndex].chunksInfo = chunks;
    }
    return this.imagesInfo[this.currentImageIndex];
  }

  addNewImage(url: string): void {
    this.currentImageIndex++;
    this.imagesInfo.splice(this.currentImageIndex, 0, {
      src: url,
      canBeDeleted: true,
    });
  }

  removeCurrentImage(): void {
    const info = this.imagesInfo[this.currentImageIndex];
    if (info.canBeDeleted) {
      window.URL.revokeObjectURL(info.src);
      if (info.chunksInfo) {
        for (const chunkInfo of info.chunksInfo) {
          window.URL.revokeObjectURL(chunkInfo.src);
        }
      }
      this.imagesInfo.splice(this.currentImageIndex, 1);
      if (this.currentImageIndex < 0) {
        this.currentImageIndex = 0;
      } else if (this.currentImageIndex >= this.imagesInfo.length) {
        this.currentImageIndex = this.imagesInfo.length - 1;
      }
    }
  }

  private async createChunks(): Promise<ImageChunkInfo[]> {
    const image = new Image();
    image.src = this.imagesInfo[this.currentImageIndex].src;
    await this.loadImage(image);
    return this.imageSlicer.sliceImage(image);
  }

  private async loadImage(image: HTMLImageElement): Promise<void> {
    return new Promise<void>((resolve) => {
      image.onload = () => {
        resolve();
      };
    });
  }
}
