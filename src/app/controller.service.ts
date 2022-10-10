import { Injectable } from '@angular/core';
import { Core } from './core/core';
import { Viewable } from './core/viewable';
import { NullViewableError } from './core/game-error';
import { Modellable } from './core/modellable';
import { RandomLodash } from './core/random-lodash';
import { environment } from 'src/environments/environment';
import { ModelTestView } from './model-test';
import { Column, Row } from './core/map';

@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  private view: Viewable | undefined = undefined;
  private model: Modellable;

  constructor() {
    if (environment.isTest) {
      this.model = ModelTestView.getInstance();
    } else {
      this.model = new Core(new RandomLodash());
    }
  }

  setView(view: Viewable): void {
    this.view = view;
    this.model.setView(this.view);
  }

  newGame(shuffleCount: number): void {
    if (this.view === undefined) {
      throw new NullViewableError();
    }
    this.model.newGame(shuffleCount);
  }

  clickCell(row: Row, column: Column): void {
    this.model.clickCell(row, column);
  }
}
