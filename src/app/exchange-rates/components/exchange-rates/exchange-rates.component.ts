import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Currency } from 'src/app/shared/enums/currency';
import { MappedCurrencyRate } from 'src/app/shared/interfaces/currency-rate';
import { CurrencyExchangeService } from 'src/app/shared/services/currency-exchange.service';
import { ExchangeRatesApiService } from 'src/app/shared/services/exchange-rates-api.service';
import { ExchangeRates } from 'src/app/shared/interfaces/exchange-rates';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {
  dataSource: MappedCurrencyRate[];
  displayedColumns = ['currency', 'rate'];

  filteredBaseCurrencies: Observable<string[]>;

  baseCurrencyControl = new FormControl(Currency.EUR);

  constructor(
    private currencyExchangeService: CurrencyExchangeService,
    private exchangeRatesApiService: ExchangeRatesApiService
  ) {}

  ngOnInit() {
    this.getExchangeRates();

    this.filteredBaseCurrencies = this.getBaseCurrencyValueChanges();
  }

  getExchangeRates(baseCurrencyCode = Currency.EUR) {
    this.exchangeRatesApiService
      .getLatestExchangeRates(baseCurrencyCode)
      .subscribe(
        (exchangeRates: ExchangeRates): void => {
          this.currencyExchangeService.exchangeRates = this.mapExchangeRatesResponseData(
            exchangeRates
          );

          this.dataSource = this.currencyExchangeService.exchangeRates;

          this.currencyExchangeService.fromCurrencies = this.mapCurrencies();
          this.currencyExchangeService.toCurrencies = this.mapCurrencies();
        },
        (error): void => {
          console.error(`Error: ${error.message}`);
        }
      );
  }

  private getBaseCurrencyValueChanges(): Observable<string[]> {
    return this.baseCurrencyControl.valueChanges.pipe(
      startWith(''),
      map(value =>
        this.filterCurrencies(
          value,
          this.currencyExchangeService.fromCurrencies
        )
      )
    );
  }

  private mapExchangeRatesResponseData(
    responseData: ExchangeRates
  ): MappedCurrencyRate[] {
    const mappedRates = Object.keys(responseData.rates).map(
      (item: string): MappedCurrencyRate => {
        return {
          currency: item,
          rate: responseData.rates[item]
        };
      }
    );
    mappedRates.push({currency: responseData.base, rate: 1});

    return mappedRates;
  }

  private filterCurrencies(value: string, arrayToFilter: string[]): string[] {
    const filterValueLowercase = value.toLowerCase();

    return arrayToFilter.filter(option =>
      option.toLowerCase().includes(filterValueLowercase)
    );
  }

  private mapCurrencies(): string[] {
    return this.currencyExchangeService.exchangeRates
      .map((currency: MappedCurrencyRate) => {
        return currency.currency;
      })
      .sort();
  }
}
