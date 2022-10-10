import { TestBed } from '@angular/core/testing';

import { ImageSlicerService } from './image-slicer.service';

describe('ImageSlicerService', () => {
  let service: ImageSlicerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageSlicerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
