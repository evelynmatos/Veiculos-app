import { Component, Renderer2, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header/header.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

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
  private routerSubscription!: Subscription;

  constructor(private router: Router, private renderer: Renderer2) { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData ? outlet.activatedRouteData['animation'] : '';
  }

  ngOnInit() {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const routesWithoutScrollX = ['/home'];

      if (routesWithoutScrollX.includes(event.urlAfterRedirects)) {
        this.renderer.addClass(document.body, 'no-scroll-x');
      } else {
        this.renderer.removeClass(document.body, 'no-scroll-x');
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
