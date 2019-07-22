import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CurrencyModule } from './currency/currency.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    FlexLayoutModule,

    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    CurrencyModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
