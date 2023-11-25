import { TestBed } from '@angular/core/testing';

import { MedicationsService } from './medications.service';

describe('MedicationsService', () => {
  let service: MedicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
