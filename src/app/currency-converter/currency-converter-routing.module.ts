import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';

const routes: Routes = [
  {
    path: 'currency-converter/:from/:to',
    component: CurrencyConverterComponent
  },
  {
    path: '',
    component: CurrencyConverterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyConverterRoutingModule { }
