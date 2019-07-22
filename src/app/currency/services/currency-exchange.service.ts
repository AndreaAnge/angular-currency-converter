import { Injectable } from '@angular/core';
import { MappedCurrencyRate } from '../interfaces/currency-rate';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {
  public exchangeRates: MappedCurrencyRate[];

  public fromCurrencies: string[] = [];
  public toCurrencies: string[] = [];

  constructor() { }
}
