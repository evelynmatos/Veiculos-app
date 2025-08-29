import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, CommonModule],
})
export class HeaderComponent {
  constructor(private router: Router) { }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToVehicles() {
    this.router.navigate(['/vehicles']);
  }
}
