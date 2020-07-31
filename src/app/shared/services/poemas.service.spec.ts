import { TestBed } from '@angular/core/testing';

import { PoemasService } from './poemas.service';

describe('PoemasService', () => {
  let service: PoemasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoemasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
