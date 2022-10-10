import { Column, Row } from './map';
import { Viewable } from './viewable';

export interface Modellable {
  setView(view: Viewable): void;
  newGame(suffleCount: number): void;
  clickCell(row: Row, column: Column): void;
}
