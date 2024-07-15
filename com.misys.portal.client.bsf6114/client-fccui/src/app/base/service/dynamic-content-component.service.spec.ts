import { TestBed } from '@angular/core/testing';

import { DynamicContentComponentService } from './dynamic-content-component.service';

describe('DynamicContentComponentService', () => {
  let service: DynamicContentComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicContentComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
