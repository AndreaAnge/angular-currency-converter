import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MappedCurrencyRate } from 'src/app/shared/interfaces/currency-rate';
import { CurrencyExchangeService } from 'src/app/shared/services/currency-exchange.service';
import { ExchangeRatesApiService } from 'src/app/shared/services/exchange-rates-api.service';
import { Currency } from 'src/app/shared/enums/currency';
import { ExchangeRates } from 'src/app/shared/interfaces/exchange-rates';
import { FormNames } from 'src/app/shared/enums/form-names';

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
  formNames = FormNames;

  constructor(
    private formBuilder: FormBuilder,
    private currencyExchangeService: CurrencyExchangeService,
    private exchangeRatesApiService: ExchangeRatesApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const baseCurrency =
      this.route.snapshot.paramMap.get('from') || Currency.EUR;
    const quoteCurrency =
      this.route.snapshot.paramMap.get('to') || Currency.HRK;

    this.currencyConverterForm = this.initForm(baseCurrency, quoteCurrency);

    this.getExchangeRates(baseCurrency);

    this.filteredFromCurrencies = this.getFromValueChanges(
      FormNames.FromCurrency
    );
    this.filteredToCurrencies = this.getToValueChanges(FormNames.ToCurrency);
  }

  convert() {
    this.fromCurrencyRate = this.filterSelectedValue(
      this.currencyConverterForm.get(FormNames.FromCurrency).value
    );
    this.toCurrencyRate = this.filterSelectedValue(
      this.currencyConverterForm.get(FormNames.ToCurrency).value
    );

    this.amount = Math.floor(
      this.currencyConverterForm.get(FormNames.Amount).value
    );

    this.result = this.calculateExchangeRate(
      this.fromCurrencyRate && this.fromCurrencyRate.rate,
      this.toCurrencyRate && this.toCurrencyRate.rate
    );
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

    const baseCurrencyCode = this.currencyConverterForm.get(
      FormNames.FromCurrency
    ).value;

    this.getExchangeRates(baseCurrencyCode);

    this.filteredFromCurrencies = this.getFromValueChanges(
      FormNames.FromCurrency
    );
    this.filteredToCurrencies = this.getToValueChanges(FormNames.ToCurrency);

    this.convert();
  }

  getFromValueChanges(formControlName: string): Observable<string[]> {
    return this.currencyConverterForm.get(formControlName).valueChanges.pipe(
      startWith(''),
      map(value =>
        this.filterCurrencies(
          value,
          this.currencyExchangeService.fromCurrencies
        )
      )
    );
  }
  getToValueChanges(formControlName: string): Observable<string[]> {
    return this.currencyConverterForm.get(formControlName).valueChanges.pipe(
      startWith(''),
      map(value =>
        this.filterCurrencies(value, this.currencyExchangeService.toCurrencies)
      )
    );
  }

  getExchangeRates(baseCurrencyCode: string) {
    this.exchangeRatesApiService
      .getLatestExchangeRates(baseCurrencyCode)
      .subscribe(
        (exchangeRate: ExchangeRates): void => {
          this.currencyExchangeService.exchangeRates = this.mapExchangeRatesResponseData(
            exchangeRate
          );

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

  selectCurrencyFromInput(event: any, formName: string): void {
    const inputCurrency = event.target.value.toUpperCase();

    if (inputCurrency.length >= 2 && inputCurrency.length <= 3) {
      const mappedCurrencies = this.mapCurrencies();

      const matchedCurrency = mappedCurrencies
        .find(currency => currency.includes(inputCurrency))
        .toString();

      this.currencyConverterForm.get(formName).setValue(matchedCurrency);
    }
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

    const baseRate = mappedRates.find(
      cRate => cRate.currency === responseData.base
    );
    if (!baseRate) {
      mappedRates.push({ currency: responseData.base, rate: 1 });
    }
    return mappedRates;
  }

  private initForm(fromCurrency: string, toCurrency: string) {
    return this.formBuilder.group({
      amount: [1, Validators.required],
      fromCurrency: [fromCurrency, Validators.required],
      toCurrency: [toCurrency, Validators.required]
    });
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

  private filterSelectedValue(currencyCode: string): MappedCurrencyRate {
    return this.currencyExchangeService.exchangeRates.find(
      (item: MappedCurrencyRate) => {
        return item.currency === currencyCode;
      }
    );
  }

  private calculateExchangeRate(fromRate: number, toRate: number): string {
    return ((this.amount * toRate) / fromRate).toFixed(5);
  }
}
