import { TestBed } from '@angular/core/testing';

import { ClientHideShowDeleteWidgetsServiceService } from './client-hide-show-delete-widgets-service.service';

describe('ClientHideShowDeleteWidgetsServiceService', () => {
  let service: ClientHideShowDeleteWidgetsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientHideShowDeleteWidgetsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
