import { TestBed, async, inject } from '@angular/core/testing';

import { SpecificProductResolveGuardGuard } from './specific-product-resolve-guard.guard';

describe('SpecificProductResolveGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecificProductResolveGuardGuard]
    });
  });

  it('should ...', inject([SpecificProductResolveGuardGuard], (guard: SpecificProductResolveGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
