import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyConverterRoutingModule } from './currency-converter-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatCardModule,
  MatAutocompleteModule,
  MatIconModule,
  MatTableModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConversionDetailsComponent } from './components/conversion-details/conversion-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CurrencyConverterComponent, ConversionDetailsComponent],
  imports: [
    CommonModule,
    CurrencyConverterRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTableModule,

    FlexLayoutModule,
    SharedModule
  ]
})
export class CurrencyConverterModule {}
