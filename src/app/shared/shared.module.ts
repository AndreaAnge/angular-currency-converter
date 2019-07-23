import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage.service';
import { ExchangeRatesApiService } from './services/exchange-rates-api.service';
import { CurrencyExchangeService } from './services/currency-exchange.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [StorageService, ExchangeRatesApiService, CurrencyExchangeService]
})
export class SharedModule { }
