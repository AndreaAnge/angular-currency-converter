import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyExchangeModule } from './currency-exchange/currency-exchange.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule, MatIconModule, MatToolbarModule, MatListModule} from '@angular/material';
import { FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CurrencyExchangeModule,
    FlexLayoutModule,

    MatSidenavModule, MatIconModule, MatToolbarModule,
    MatListModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
