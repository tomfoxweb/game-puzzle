import { Direction } from './map';
import { Randomable } from './randomable';

export class RandomTest implements Randomable {
  dir: Direction[] = [];
  dirIndex: number = 0;
  actualDir: Direction[][] = [];
  expectedDir: Direction[][] = [];

  randomDirection(directions: Direction[]): Direction {
    this.actualDir.push([...directions]);
    return this.dir[this.dirIndex++];
  }
}
