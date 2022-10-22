import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { ImageProviderService, ImageSource } from '../image-provider.service';
import { ImageInfo, ImageSlicerService } from '../image-slicer.service';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss'],
})
export class PuzzleComponent implements OnInit, Viewable {
  @Input() shuffleCount = '500';
  @Output() canBeDeletedEvent = new EventEmitter<boolean>();
  orderedImagesInfo: ImageInfo[] = [];
  currentImagesInfo: ImageInfo[] = [];
  canBeDeleted = false;

  constructor(
    public controller: ControllerService,
    private imageSlicer: ImageSlicerService,
    private imageProvider: ImageProviderService
  ) {}

  ngOnInit(): void {
    this.showCurrentImage();
  }

  newGame(shuffleCount: string): void {
    this.controller.newGame(Number(shuffleCount));
  }

  showCurrentImage(): void {
    this.showLoadingImage();
    this.loadCurrentImage();
  }

  showNextImage(): void {
    this.showLoadingImage();
    this.loadNextImage();
  }

  showPrevImage(): void {
    this.showLoadingImage();
    this.loadPrevImage();
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

  private showLoadingImage(): void {
    const loadingImage = new Image();
    loadingImage.src = '../../assets/images/loading.gif';
    loadingImage.alt = 'Loading...';
    this.currentImagesInfo = [];
    const valueIterator = CellValues[Symbol.iterator]();
    for (const row of RowValues) {
      for (const column of ColumnValues) {
        const value = valueIterator.next().value;
        const info: ImageInfo = {
          row,
          column,
          value,
          src: loadingImage.src,
          alt: loadingImage.alt,
        };
        this.currentImagesInfo.push(info);
      }
    }
    this.currentImagesInfo[this.currentImagesInfo.length - 1].value = 1;
  }

  private loadNextImage(): void {
    const source = this.imageProvider.getNextImageSrc();
    this.loadImage(source);
  }

  private loadPrevImage(): void {
    const source = this.imageProvider.getPrevImageSrc();
    this.loadImage(source);
  }

  private loadCurrentImage(): void {
    const source = this.imageProvider.getCurrentImageSrc();
    this.loadImage(source);
  }

  private loadImage(source: ImageSource): void {
    const image = new Image();
    image.src = source.src;
    image.onload = () => {
      this.orderedImagesInfo = this.imageSlicer.sliceImage(image);
      this.currentImagesInfo = [...this.orderedImagesInfo];
      this.controller.setView(this);
      this.controller.newGame(Number(this.shuffleCount));
    };
    this.canBeDeletedEvent.emit(source.canBeDeleted);
  }
}
