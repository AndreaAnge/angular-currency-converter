import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'currency-converter',
    loadChildren: () => import('./currency-exchange/currency-exchange.module').then(mod => mod.CurrencyExchangeModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(mod => mod.AboutModule)
  },
  {
    path: '',
    redirectTo: 'currency',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
