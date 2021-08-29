import { TestBed } from '@angular/core/testing';

import { Base64UtilService } from './base64-util.service';

describe('Base64UtilService', () => {
  let service: Base64UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Base64UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
