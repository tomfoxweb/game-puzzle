export class GameError extends Error {
  constructor() {
    super('Game Error');
  }
}

export class NullModellableError extends GameError {}
export class NullViewableError extends GameError {}
