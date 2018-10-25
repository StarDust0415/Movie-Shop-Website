import { TestBed, inject } from '@angular/core/testing';

import { GetSalesmanService } from './get-salesman.service';

describe('GetSalesmanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetSalesmanService]
    });
  });

  it('should be created', inject([GetSalesmanService], (service: GetSalesmanService) => {
    expect(service).toBeTruthy();
  }));
});
