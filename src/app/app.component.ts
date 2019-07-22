import { Component } from '@angular/core';
import { NavigationItem } from './shared/interfaces/navigation-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Currency Converter';
  navigation: NavigationItem[] = [
    {
      displayName: 'Exchange Rates',
      routerLink: '/currency'
    }
  ]
}
