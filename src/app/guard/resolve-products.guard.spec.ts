import { TestBed, async, inject } from '@angular/core/testing';

import { ResolveProductsGuard } from './resolve-products.guard';

describe('ResolveProductsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveProductsGuard]
    });
  });

  it('should ...', inject([ResolveProductsGuard], (guard: ResolveProductsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
