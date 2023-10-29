import { TestBed } from '@angular/core/testing';

import { CenterService } from './center.service';

describe('VaccinationService', () => {
  let service: CenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
