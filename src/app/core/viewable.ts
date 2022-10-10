import { Cell, Column, Row } from './map';

export interface Viewable {
  setCell(cell: Readonly<Cell>): void;
  clickCell(row: Row, column: Column): void;
  finishGame(): void;
}
