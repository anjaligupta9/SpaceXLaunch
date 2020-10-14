import { TestBed } from '@angular/core/testing';

import { GetAllLaunchesService } from './get-all-launches.service';

describe('GetAllLaunchesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetAllLaunchesService = TestBed.get(GetAllLaunchesService);
    expect(service).toBeTruthy();
  });
});
