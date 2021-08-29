import { TestBed } from '@angular/core/testing';

import { NodeModuleUtilService } from './node-module-util.service';

describe('NodeModuleUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NodeModuleUtilService = TestBed.get(NodeModuleUtilService);
    expect(service).toBeTruthy();
  });
});
