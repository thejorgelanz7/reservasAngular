import { TestBed } from '@angular/core/testing';

import { BarberService } from './barber.service';

describe('SupabaseService', () => {
  let service: BarberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
