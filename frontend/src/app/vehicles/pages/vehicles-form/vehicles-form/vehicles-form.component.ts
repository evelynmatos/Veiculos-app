import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Vehicle } from '../../vehicles.interface';
import { CommonModule, getLocaleMonthNames } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { VehiclesService } from '../../../vehicles.service';

@Component({
  selector: 'app-vehicles-form',
  imports: [CommonModule, SharedModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule,],
  templateUrl: './vehicles-form.component.html',
  styleUrl: './vehicles-form.component.scss'
})
export class VehiclesFormComponent {
  vehicleForm: FormGroup;
  vehicles: Vehicle[] = [];
  displayedColumns = ['id', 'placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano'];
  currentYear = new Date().getFullYear();
  maxYear = this.currentYear + 1;

  constructor(private fb: FormBuilder, private vehiclesService: VehiclesService) {
    this.vehicleForm = this.fb.group({
      placa: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{3}[0-9]{1}[A-Za-z]{1}[0-9]{2}$/)]],
      chassi: ['', [Validators.required, Validators.pattern(/^[A-HJ-NPR-Z0-9]{17}$/)]],
      renavam: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      modelo: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9\s]+$/)]],
      marca: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)]],
      ano: ['', [Validators.required, Validators.pattern(/^\d{4}$/), Validators.min(1980),
      Validators.max(this.maxYear)]]
    });
  }

  onSubmit() {
    if (this.vehicleForm.invalid) return;
    
    this.vehiclesService.createVehicle(this.vehicleForm.value).subscribe({
    next: (createdVehicle) => {
      console.log('Veículo criado com sucesso:', createdVehicle);
      this.vehicles.push(createdVehicle); 
      this.vehicleForm.reset();
    },
    error: (err) => {
      console.error('Erro ao criar veículo:', err);
    }
  });
  }

  removeSpaces(controlName: string) {
    const value = this.vehicleForm.get(controlName)?.value || '';
    this.vehicleForm.get(controlName)?.setValue(value.replace(/\s/g, ''));
  }

}
