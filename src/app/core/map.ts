export const CellValues = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0,
] as const;
export const CELLS_COUNT = CellValues.length;

export type CellValue = typeof CellValues[number];

export const RowValues = [0, 1, 2, 3] as const;
export const ROW_COUNT = RowValues.length;
export type Row = typeof RowValues[number];

export const ColumnValues = [0, 1, 2, 3] as const;
export const COLUMN_COUNT = ColumnValues.length;
export type Column = typeof ColumnValues[number];

export interface Cell {
  row: Row;
  column: Column;
  value: CellValue;
}

export function positionToIndex(row: Row, column: Column): number {
  return row * COLUMN_COUNT + column;
}

export const enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}
