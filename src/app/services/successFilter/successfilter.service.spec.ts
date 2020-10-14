import { TestBed } from '@angular/core/testing';

import { SuccessfilterService } from './successfilter.service';

describe('SuccessfilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuccessfilterService = TestBed.get(SuccessfilterService);
    expect(service).toBeTruthy();
  });
});
