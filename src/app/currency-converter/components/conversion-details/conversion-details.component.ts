import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { MappedCurrencyRate } from 'src/app/shared/interfaces/currency-rate';

@Component({
  selector: 'app-conversion-details',
  templateUrl: './conversion-details.component.html',
  styleUrls: ['./conversion-details.component.scss']
})
export class ConversionDetailsComponent implements OnChanges {
  @Input() amount: number;
  @Input() result: number;

  @Input() fromCurrencyRate: MappedCurrencyRate;
  @Input() toCurrencyRate: MappedCurrencyRate;

  fromCurrency: string;
  toCurrency: string;

  toRate: number;
  fromRate: number;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.fromCurrency = this.fromCurrencyRate && this.fromCurrencyRate.currency;
    this.fromRate = this.fromCurrencyRate && this.fromCurrencyRate.rate;

    this.toCurrency = this.toCurrencyRate && this.toCurrencyRate.currency;
    this.toRate = this.toCurrencyRate && this.toCurrencyRate.rate;
  }
}
