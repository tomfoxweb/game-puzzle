import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { PuzzleComponent } from './puzzle/puzzle.component';

describe('AppComponent', () => {
  beforeAll(() => {
    environment.isTest = true;
  });

  afterAll(() => {
    environment.isTest = false;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, PuzzleComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have document title '${environment.documentTitle}'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(document.title).toEqual(environment.documentTitle);
  });

  it(`should render h1 header with content '${environment.title}'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1.title')?.textContent).toContain(
      environment.title
    );
  });

  it(`should render button New Game with caption ${environment.buttonNewGameCaption}`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button.new-game')?.textContent).toContain(
      environment.buttonNewGameCaption
    );
  });

  it(`should render puzzle element`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-puzzle')).toBeTruthy();
  });
});
