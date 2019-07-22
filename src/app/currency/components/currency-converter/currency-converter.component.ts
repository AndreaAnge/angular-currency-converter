import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MappedCurrencyRate } from '../../interfaces/currency-rate';
import { ExchangeRates } from '../../interfaces/exchange-rates';
import { Currency } from '../../enums/currency';
import { CurrencyExchangeService } from '../../services/currency-exchange.service';
import { ExchangeRatesApiService } from '../../services/exchange-rates-api.service';
import { map, startWith } from 'rxjs/operators';
import { FormNames } from '../../enums/form-names';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  currencyConverterForm: FormGroup;

  filteredFromCurrencies: Observable<string[]>;
  filteredToCurrencies: Observable<string[]>;

  fromCurrencyRate: MappedCurrencyRate;
  toCurrencyRate: MappedCurrencyRate;

  result: string;
  amount: number;

  isLoading = true;

  constructor(
    private formBuilder: FormBuilder,
    private currencyExchangeService: CurrencyExchangeService,
    private exchangeRatesApiService: ExchangeRatesApiService
  ) {}

  ngOnInit() {
    this.currencyConverterForm = this.initForm();

    this.getExchangeRates();

    this.filteredFromCurrencies = this.getFromValueChanges(FormNames.FromCurrency);
    this.filteredToCurrencies = this.getToValueChanges(FormNames.ToCurrency);
  }

  convert() {
    this.fromCurrencyRate = this.filterSelectedValue(
      this.currencyConverterForm.get(FormNames.FromCurrency).value
    );
    this.toCurrencyRate = this.filterSelectedValue(
      this.currencyConverterForm.get(FormNames.ToCurrency).value
    );

    this.amount = Math.floor(this.currencyConverterForm.get(FormNames.Amount).value);

    this.result = this.calculateExchangeRate();
  }

  swapCurrencies() {
    this.currencyConverterForm = this.formBuilder.group({
      amount: [
        this.currencyConverterForm.get(FormNames.Amount).value,
        Validators.required
      ],
      fromCurrency: [
        this.currencyConverterForm.get(FormNames.ToCurrency).value,
        Validators.required
      ],
      toCurrency: [
        this.currencyConverterForm.get(FormNames.FromCurrency).value,
        Validators.required
      ]
    });

    this.currencyExchangeService.fromCurrencies = this.mapCurrencies();
    this.currencyExchangeService.toCurrencies = this.mapCurrencies();

    this.filteredFromCurrencies = this.getFromValueChanges(FormNames.FromCurrency);
    this.filteredToCurrencies = this.getToValueChanges(FormNames.ToCurrency);

    this.convert();
  }

  getFromValueChanges(stringValue: string): Observable<string[]> {
    return this.currencyConverterForm.get(stringValue).valueChanges.pipe(
      startWith(''),
      map(value =>
        this.filterCurrencies(
          value,
          this.currencyExchangeService.fromCurrencies
        )
      )
    );
  }

  getToValueChanges(stringValue: string): Observable<string[]> {
    return this.currencyConverterForm.get(stringValue).valueChanges.pipe(
      startWith(''),
      map(value =>
        this.filterCurrencies(value, this.currencyExchangeService.toCurrencies)
      )
    );
  }

  onInputChange(e): void {
  }

  private initForm() {
    return this.formBuilder.group({
      amount: [1, Validators.required],
      fromCurrency: [Currency.EUR, Validators.required],
      toCurrency: [Currency.HRK, Validators.required]
    });
  }

  private getExchangeRates() {
    if (
      this.currencyExchangeService.exchangeRates === undefined ||
      this.currencyExchangeService.exchangeRates.length <= 0
    ) {
      this.exchangeRatesApiService
        .getLatestExchangeRates(Currency.EUR)
        .subscribe(
          (exchangeRate: ExchangeRates): void => {
            this.currencyExchangeService.exchangeRates = this.mapExchangeRatesResponseData(
              exchangeRate
            );
            this.currencyExchangeService.exchangeRates.push({
              currency: Currency.EUR,
              rate: 1
            });

            this.currencyExchangeService.fromCurrencies = this.mapCurrencies();
            this.currencyExchangeService.toCurrencies = this.mapCurrencies();
          },
          (error): void => {
            console.error(`Error: ${error.message}`);
          },
          () => {
            this.isLoading = false;
          }
        );
    }
  }

  private mapExchangeRatesResponseData(
    responseData: ExchangeRates
  ): MappedCurrencyRate[] {
    return Object.keys(responseData.rates).map(
      (item: string): MappedCurrencyRate => {
        return {
          currency: item,
          rate: responseData.rates[item]
        };
      }
    );
  }

  private mapCurrencies(): string[] {
    return this.currencyExchangeService.exchangeRates
      .map((currency: MappedCurrencyRate) => {
        return currency.currency;
      })
      .sort();
  }

  private filterCurrencies(value: string, arrayToFilter: string[]): string[] {
    const filterValueLowercase = value.toLowerCase();

    return arrayToFilter.filter(option =>
      option.toLowerCase().includes(filterValueLowercase)
    );
  }

  private filterSelectedValue(value: string): MappedCurrencyRate {
    return this.currencyExchangeService.exchangeRates.find(
      (item: MappedCurrencyRate) => {
        return item.currency === value;
      }
    );
  }

  private calculateExchangeRate(): string {
    const fromRate = this.fromCurrencyRate.rate;
    const toRate = this.toCurrencyRate.rate;

    return ((this.amount * toRate) / fromRate).toFixed(5);
  }
}
