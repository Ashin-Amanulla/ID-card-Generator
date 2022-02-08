import { TestBed } from '@angular/core/testing';

import { HeroadminService } from './heroadmin.service';

describe('HeroadminService', () => {
  let service: HeroadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
