import { TestBed } from '@angular/core/testing';

import { ListClaimsService } from './listclaims.service';

describe('ListclaimsService', () => {
  let service: ListClaimsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListClaimsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
