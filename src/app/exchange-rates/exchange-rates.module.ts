import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeRatesComponent } from './components/exchange-rates/exchange-rates.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ExchangeRatesRoutingModule } from './exchange-rates-routing.module';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatCardModule,
  MatAutocompleteModule,
  MatIconModule,
  MatTableModule,
  MatSortModule
} from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ExchangeRatesComponent],
  imports: [
    CommonModule,
    ExchangeRatesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    NgxMatSelectSearchModule,

    FlexLayoutModule
  ]
})
export class ExchangeRatesModule {}
