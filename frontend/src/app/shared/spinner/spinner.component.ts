import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerService } from './spinner.service';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-spinner',
  imports: [
    SharedModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

  constructor(public spinnerService: SpinnerService) { }

}
