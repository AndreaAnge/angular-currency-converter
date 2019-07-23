import { TestBed } from '@angular/core/testing';

import { CurrencyExchangeService } from './currency-exchange.service';

describe('CurrencyExchangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyExchangeService = TestBed.get(CurrencyExchangeService);
    expect(service).toBeTruthy();
  });
});
