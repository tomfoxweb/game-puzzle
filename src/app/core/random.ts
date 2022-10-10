import { Randomable } from './randomable';
import { Direction } from './map';

export function random(min: number, max: number) {
  return Math.trunc(Math.random() * (max - min + 1)) + min;
}

export class Random implements Randomable {
  randomDirection(directions: Direction[]): Direction {
    const maxIndex = directions.length;
    const randomIndex = random(0, maxIndex);
    return directions[randomIndex];
  }
}
