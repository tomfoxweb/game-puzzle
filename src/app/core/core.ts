import { NullViewableError } from './game-error';
import { Modellable } from './modellable';
import {
  Cell,
  CellValues,
  Column,
  ColumnValues,
  Direction,
  Row,
  RowValues,
} from './map';
import { Viewable } from './viewable';
import { Randomable } from './randomable';

export class Core implements Modellable {
  private view: Viewable | undefined = undefined;
  private randomizer: Randomable;
  private grid: Cell[][] = [];
  private freeCell: Cell;

  constructor(randomizer: Randomable) {
    this.randomizer = randomizer;
    this.initGrid();
    this.freeCell = { row: 3, column: 3, value: 0 };
  }

  setView(view: Viewable): void {
    this.view = view;
  }

  newGame(shuffleCount: number): void {
    if (this.view === undefined) {
      throw new NullViewableError();
    }
    this.orderGrid();
    this.shuffleGrid(shuffleCount);
    this.showGrid();
  }

  clickCell(row: Row, column: Column): void {
    if (this.view === undefined) {
      throw new NullViewableError();
    }
    if (this.freeCell.row === row && this.freeCell.column === column) {
      return;
    }

    const prevFreeCell = { ...this.freeCell };
    const shiftValue = this.grid[row][column].value;
    this.grid[prevFreeCell.row][prevFreeCell.column].value = shiftValue;
    this.grid[row][column].value = prevFreeCell.value;
    const shiftedCell = { ...this.grid[prevFreeCell.row][prevFreeCell.column] };
    const newFreeCell = { ...this.grid[row][column] };
    this.freeCell = newFreeCell;
    this.view.setCell(shiftedCell);
    this.view.setCell(newFreeCell);
    if (this.isGameFinished()) {
      this.view.finishGame();
    }
  }

  private isGameFinished(): boolean {
    const valueIterator = CellValues[Symbol.iterator]();
    for (const row of RowValues) {
      for (const column of ColumnValues) {
        const value = valueIterator.next().value;
        if (this.grid[row][column].value !== value) {
          return false;
        }
      }
    }
    return true;
  }

  private initGrid(): void {
    const valueIterator = CellValues[Symbol.iterator]();
    for (const row of RowValues) {
      this.grid.push([]);
      for (const column of ColumnValues) {
        const value = valueIterator.next().value;
        const cell: Cell = { row, column, value };
        this.grid[row].push(cell);
      }
    }
  }

  private orderGrid(): void {
    const valueIterator = CellValues[Symbol.iterator]();
    for (const row of RowValues) {
      for (const column of ColumnValues) {
        const value = valueIterator.next().value;
        const cell: Cell = { row, column, value };
        this.grid[row][column] = cell;
      }
    }
    this.freeCell = { row: 3, column: 3, value: 0 };
  }

  private shuffleGrid(shuffleCount: number): void {
    let freeCell: Cell = { row: 3, column: 3, value: 0 };
    for (let i = 0; i < shuffleCount; i++) {
      const directions = this.findDirections();
      const direction = this.randomizer.randomDirection(directions);
      freeCell = this.moveCell(freeCell, direction);
      this.freeCell = { ...freeCell };
    }
  }

  private findDirections(): Direction[] {
    const directions: Direction[] = [];
    if (this.freeCell.row !== 0) {
      directions.push(Direction.UP);
    }
    if (this.freeCell.column !== 3) {
      directions.push(Direction.RIGHT);
    }
    if (this.freeCell.row !== 3) {
      directions.push(Direction.DOWN);
    }
    if (this.freeCell.column !== 0) {
      directions.push(Direction.LEFT);
    }
    return directions;
  }

  private moveCell(cell: Cell, direction: Direction): Cell {
    let aCell = { ...cell };
    let bCell = { ...cell };
    switch (direction) {
      case Direction.UP:
        bCell.row--;
        break;
      case Direction.RIGHT:
        bCell.column++;
        break;
      case Direction.DOWN:
        bCell.row++;
        break;
      case Direction.LEFT:
        bCell.column--;
        break;
    }
    bCell.value = this.grid[bCell.row][bCell.column].value;

    this.grid[aCell.row][aCell.column].value = bCell.value;
    this.grid[bCell.row][bCell.column].value = aCell.value;

    bCell.value = aCell.value;

    return bCell;
  }

  private showGrid(): void {
    for (const row of RowValues) {
      for (const column of ColumnValues) {
        const value = this.grid[row][column].value;
        const cell: Cell = { row, column, value };
        this.view?.setCell(cell);
      }
    }
  }
}
