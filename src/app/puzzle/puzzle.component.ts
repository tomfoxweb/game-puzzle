import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../controller.service';
import {
  Cell,
  CellValues,
  Column,
  ColumnValues,
  positionToIndex,
  Row,
  RowValues,
} from '../core/map';
import { Viewable } from '../core/viewable';
import { ImageInfo, ImageSlicerService } from '../image-slicer.service';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss'],
})
export class PuzzleComponent implements OnInit, Viewable {
  orderedImagesInfo: ImageInfo[] = [];
  currentImagesInfo: ImageInfo[] = [];

  constructor(
    public controller: ControllerService,
    private imageSlicer: ImageSlicerService
  ) {}

  ngOnInit(): void {
    const loadingImage = new Image();
    loadingImage.src = '../../assets/images/loading.gif';

    const valueIterator = CellValues[Symbol.iterator]();
    for (const row of RowValues) {
      for (const column of ColumnValues) {
        const value = valueIterator.next().value;
        const info: ImageInfo = {
          row,
          column,
          value,
          src: loadingImage.src,
          alt: 'Loading...',
        };
        this.currentImagesInfo.push(info);
      }
    }

    const image = new Image();
    image.src = '../../assets/images/0.png';
    image.onload = () => {
      this.orderedImagesInfo = this.imageSlicer.sliceImage(image);
      this.currentImagesInfo = [...this.orderedImagesInfo];
      this.controller.setView(this);
      this.controller.newGame(500);
    };
  }

  newGame(shuffleCount: string): void {
    this.controller.newGame(Number(shuffleCount));
  }

  setCell(cell: Readonly<Cell>): void {
    const index = positionToIndex(cell.row, cell.column);
    const value = cell.value;
    const info = this.orderedImagesInfo.find((x) => x.value === value)!;
    info.row = cell.row;
    info.column = cell.column;
    this.currentImagesInfo[index] = { ...info };
  }

  clickCell(row: Row, column: Column): void {
    this.controller.clickCell(row, column);
  }

  finishGame(): void {
    window.setTimeout(() => {
      window.alert('Congratulations!');
    }, 200);
  }
}
