import { TestBed } from '@angular/core/testing';

import { HeroIDService } from './hero-id.service';

describe('HeroIDService', () => {
  let service: HeroIDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroIDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
