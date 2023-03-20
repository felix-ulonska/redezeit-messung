import { TestBed } from '@angular/core/testing';

import { PauseSideService } from './pause-side.service';

describe('PauseSideService', () => {
  let service: PauseSideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PauseSideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
