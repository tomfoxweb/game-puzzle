import { ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

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
});
