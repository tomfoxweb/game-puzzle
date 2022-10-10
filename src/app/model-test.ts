import { NullViewableError } from './core/game-error';
import { Cell, Column, ColumnValues, Row, RowValues } from './core/map';
import { Modellable } from './core/modellable';
import { Viewable } from './core/viewable';

export class ModelTestView implements Modellable {
  private static instance: ModelTestView | undefined = undefined;
  private view: Viewable | undefined = undefined;
  values: number[] = [];

  private constructor() {}

  clickCell(row: Row, column: Column): void {}

  static getInstance(): ModelTestView {
    if (ModelTestView.instance === undefined) {
      ModelTestView.instance = new ModelTestView();
    }
    return ModelTestView.instance;
  }

  setView(view: Viewable): void {
    this.view = view;
  }

  newGame(): void {
    if (this.view === undefined) {
      throw new NullViewableError();
    }
    const valuesIterable = [...this.values];
    const valueIterator = valuesIterable[Symbol.iterator]();
    for (const row of RowValues) {
      for (const column of ColumnValues) {
        const value = valueIterator.next().value;
        const cell: Cell = { row, column, value };
        this.view.setCell(cell);
      }
    }
  }
}
