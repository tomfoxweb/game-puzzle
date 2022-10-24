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
import {
  ImageProviderService,
  ImageInfo,
  ImageChunkInfo,
} from '../image-provider.service';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss'],
})
export class PuzzleComponent implements OnInit, Viewable {
  @Input() shuffleCount = '500';
  @Output() canBeDeletedEvent = new EventEmitter<boolean>();
  orderedChunksInfo: ImageChunkInfo[] = [];
  currentChunksInfo: ImageChunkInfo[] = [];
  canBeDeleted = false;

  constructor(
    public controller: ControllerService,
    private imageProvider: ImageProviderService
  ) {}

  ngOnInit(): void {
    this.showCurrentImage();
  }

  newGame(shuffleCount: string): void {
    this.controller.newGame(Number(shuffleCount));
  }

  async showCurrentImage() {
    await this.showLoadingImage();
    await this.loadCurrentImage();
  }

  async showNextImage() {
    await this.showLoadingImage();
    await this.loadNextImage();
  }

  async showPrevImage() {
    await this.showLoadingImage();
    await this.loadPrevImage();
  }

  setCell(cell: Readonly<Cell>): void {
    const index = positionToIndex(cell.row, cell.column);
    const value = cell.value;
    const info = this.orderedChunksInfo.find((x) => x.value === value)!;
    info.row = cell.row;
    info.column = cell.column;
    this.currentChunksInfo[index] = info;
  }

  clickCell(row: Row, column: Column): void {
    this.controller.clickCell(row, column);
  }

  finishGame(): void {
    window.setTimeout(() => {
      window.alert('Congratulations!');
    }, 200);
  }

  private async showLoadingImage(): Promise<void> {
    const src = await this.imageProvider.getLoadingImage();
    this.currentChunksInfo = [];
    const valueIterator = CellValues[Symbol.iterator]();
    for (const row of RowValues) {
      for (const column of ColumnValues) {
        const value = valueIterator.next().value;
        const info: ImageChunkInfo = {
          row,
          column,
          value,
          src: src,
          alt: 'Loading...',
        };
        this.currentChunksInfo.push(info);
      }
    }
    this.currentChunksInfo[this.currentChunksInfo.length - 1].value = 1;
  }

  private async loadNextImage() {
    const info = await this.imageProvider.getNextImageInfo();
    this.startNewGame(info);
  }

  private async loadPrevImage() {
    const info = await this.imageProvider.getPrevImageInfo();
    this.startNewGame(info);
  }

  private async loadCurrentImage() {
    const info = await this.imageProvider.getCurrentImageInfo();
    this.startNewGame(info);
  }

  private startNewGame(info: ImageInfo) {
    if (info.chunksInfo) {
      this.orderedChunksInfo = info.chunksInfo;
      this.controller.setView(this);
      this.controller.newGame(Number(this.shuffleCount));
      this.canBeDeletedEvent.emit(info.canBeDeleted);
    }
  }
}
