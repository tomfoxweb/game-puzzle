import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as Lodash from 'lodash';
import { environment } from 'src/environments/environment';

import { CELLS_COUNT, CellValue, Column, Row } from '../core/map';
import { ModelTestView } from '../model-test';

import { PuzzleComponent } from './puzzle.component';

describe('PuzzleComponent', () => {
  let component: PuzzleComponent;
  let fixture: ComponentFixture<PuzzleComponent>;

  beforeAll(() => {
    environment.isTest = true;
  });

  afterAll(() => {
    environment.isTest = false;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PuzzleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const EXPECTED_ROW_COUNT = 4;
  const EXPECTED_COLUMN_COUNT = 4;
  const EXPECTED_BUTTON_COUNT = 16;

  it(`should render ${EXPECTED_BUTTON_COUNT} puzzle buttons`, () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const puzzleButtons = compiled.querySelectorAll('button.puzzle-item');
    expect(puzzleButtons?.length).toEqual(EXPECTED_BUTTON_COUNT);
  });

  it(`should call model setView and newGame on ngOnInit`, () => {
    spyOn(component.controller, 'setView');
    spyOn(component.controller, 'newGame');
    component.ngOnInit();
    expect(component.controller.setView).toHaveBeenCalledWith(component);
    expect(component.controller.newGame).toHaveBeenCalled();
  });

  it(`should set all ${EXPECTED_BUTTON_COUNT} after call newGame on ngOnInit`, () => {
    spyOn(component, 'setCell');
    const modelTest = ModelTestView.getInstance();
    const values = Lodash.shuffle(Lodash.range(0, CELLS_COUNT));
    modelTest.values = [...values];
    component.ngOnInit();
    let index = 0;
    for (let row = 0; row < EXPECTED_ROW_COUNT; row++) {
      for (let col = 0; col < EXPECTED_COLUMN_COUNT; col++) {
        expect(component.setCell).toHaveBeenCalledWith(
          jasmine.objectContaining({
            row: row as Row,
            column: col as Column,
            value: values[index] as CellValue,
          })
        );
        index++;
      }
    }
  });
});
