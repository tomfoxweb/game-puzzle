import { Randomable } from './randomable';
import * as Lodash from 'lodash';
import { Direction } from './map';

export class RandomLodash implements Randomable {
  randomDirection(directions: Direction[]): Direction {
    const maxIndex = directions.length - 1;
    const randomIndex = Lodash.random(0, maxIndex);
    return directions[randomIndex];
  }
}
