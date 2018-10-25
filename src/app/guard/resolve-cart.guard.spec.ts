import { TestBed, async, inject } from '@angular/core/testing';

import { ResolveCartGuard } from './resolve-cart.guard';

describe('ResolveCartGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveCartGuard]
    });
  });

  it('should ...', inject([ResolveCartGuard], (guard: ResolveCartGuard) => {
    expect(guard).toBeTruthy();
  }));
});
