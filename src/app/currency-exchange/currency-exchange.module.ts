import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyExchangeRoutingModule } from './currency-exchage-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [CurrencyConverterComponent],
  imports: [
    CommonModule,
    CurrencyExchangeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class CurrencyExchangeModule {}
