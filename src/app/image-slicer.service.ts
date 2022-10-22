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
    const srcWidth = sourceImg.width;
    const srcHeight = sourceImg.height;
    const srcMinDim = Math.min(srcWidth, srcHeight);
    const srcCenterX = srcWidth / 2;
    const srcCenterY = srcHeight / 2;
    const srcStartX = srcCenterX - srcMinDim / 2;
    const srcStartY = srcCenterY - srcMinDim / 2;
    const srcCellWidth = srcMinDim / RowValues.length;
    const srcCellHeight = srcMinDim / ColumnValues.length;
    for (const row of RowValues) {
      for (const column of ColumnValues) {
        const value = valueIterator.next().value;
        const x = srcStartX + column * srcCellWidth;
        const y = srcStartY + row * srcCellHeight;
        const srcW = srcCellWidth;
        const srcH = srcCellHeight;
        const w = this.canvasWidth;
        const h = this.canvasHeight;
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx.drawImage(sourceImg, x, y, srcW, srcH, 0, 0, w, h);
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
