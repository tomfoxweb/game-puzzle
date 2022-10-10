import { Direction } from './map';

export interface Randomable {
  randomDirection(directions: Direction[]): Direction;
}
