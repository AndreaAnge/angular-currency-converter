import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'currency-converter',
    loadChildren: () => import('./currency-converter/currency-converter.module').then(mod => mod.CurrencyConverterModule)
  },
  {
    path: 'exchange-rates',
    loadChildren: () => import('./exchange-rates/exchange-rates.module').then(mod => mod.ExchangeRatesModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(mod => mod.AboutModule)
  },
  {
    path: '',
    redirectTo: 'exchange-rates',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
