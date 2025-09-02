import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared.module';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [SharedModule],
})
export class HeaderComponent {
  constructor(private router: Router) { }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToVehicles() {
    this.router.navigate(['/vehicles']);
  }

  goToRegisterVehicles() {
    this.router.navigate(['/register-vehicles']);
  }
}
