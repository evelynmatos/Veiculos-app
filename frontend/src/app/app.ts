import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header/header.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [
    trigger('fadeAnimation', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
      ]),
    ])
  ]
})
export class App {
  protected readonly title = signal('veiculos-app');

prepareRoute(outlet: RouterOutlet) {
  return outlet && outlet.activatedRouteData ? outlet.activatedRouteData['animation'] : '';
}
}
