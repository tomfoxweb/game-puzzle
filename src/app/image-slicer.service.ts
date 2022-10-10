import { Injectable } from '@angular/core';
import {
  CellValue,
  CellValues,
  Column,
  ColumnValues,
  Row,
  RowValues,
} from './core/map';

export interface ImageInfo {
  row: Row;
  column: Column;
  value: CellValue;
  src: string;
  alt: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImageSlicerService {
  private readonly canvasWidth = 150;
  private readonly canvasHeight = 150;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    const sliceCtx = this.canvas.getContext('2d');
    if (sliceCtx === null) {
      throw new Error("Couldn't create canvas rendering context");
    }
    this.ctx = sliceCtx;
  }

  sliceImage(sourceImg: HTMLImageElement): ImageInfo[] {
    const slicedImagesInfo: ImageInfo[] = [];
    const valueIterator = CellValues[Symbol.iterator]();
    for (const row of RowValues) {
      for (const column of ColumnValues) {
        const value = valueIterator.next().value;
        const x = column * this.canvasWidth;
        const y = row * this.canvasHeight;
        const w = this.canvasWidth;
        const h = this.canvasHeight;
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx.drawImage(sourceImg, x, y, w, h, 0, 0, w, h);
        const image = new Image();
        const src = (image.src = this.canvas.toDataURL());
        const alt = (image.alt = value);
        const info: ImageInfo = {
          row,
          column,
          value,
          src,
          alt,
        };
        slicedImagesInfo.push(info);
      }
    }
    return slicedImagesInfo;
  }
}
