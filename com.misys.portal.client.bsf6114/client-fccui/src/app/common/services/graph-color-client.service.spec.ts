import { TestBed } from '@angular/core/testing';

import { GraphColorClientService } from './graph-color-client.service';

describe('GraphColorClientService', () => {
  let service: GraphColorClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphColorClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
