import { TestBed } from '@angular/core/testing';

import { EnvironmentconfigService } from './environmentconfig.service';

describe('EnvironmentconfigService', () => {
  let service: EnvironmentconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironmentconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
