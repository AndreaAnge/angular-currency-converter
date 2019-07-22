import { TestBed } from '@angular/core/testing';

import { ExchangeRatesApiService } from './exchange-rates-api.service';

describe('ExchangeRatesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExchangeRatesApiService = TestBed.get(ExchangeRatesApiService);
    expect(service).toBeTruthy();
  });
});
