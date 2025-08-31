import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Vehicle } from '../../../vehicles/pages/vehicles-list/vehicles-list/vehicles.interface';
import { SharedModule } from '../../shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-vehicle-dialog',
  imports: [MatDialogModule, SharedModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule,
    MatButtonModule, CommonModule],
  templateUrl: './edit-vehicle-dialog.component.html',
  styleUrl: './edit-vehicle-dialog.component.scss'
})
export class EditVehicleDialogComponent {
  vehicleForm: FormGroup;
  currentYear = new Date().getFullYear();
  maxYear = this.currentYear + 1;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditVehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public vehicleData: Vehicle
  ) {
    this.vehicleForm = this.fb.group({
      id: [this.vehicleData.id],
      chassi: [{ value: this.vehicleData.chassi, disabled: true }, Validators.required],
      placa: [{ value: this.vehicleData.placa, disabled: true }, Validators.required],
      renavam: [{ value: this.vehicleData.renavam, disabled: true }, Validators.required],
      modelo: [this.vehicleData.modelo, Validators.required],
      marca: [this.vehicleData.marca, Validators.required],
      ano: [
        this.vehicleData.ano,
        [
          Validators.required,
          Validators.pattern(/^\d{4}$/),
          Validators.min(1980),
          Validators.max(this.maxYear),
        ]
      ]
    });
  }

  onSubmit(): void {
    if (this.vehicleForm.invalid) return;
    else if (this.vehicleForm.valid) {
      const { modelo, marca, ano } = this.vehicleForm.value;

      const updatedVehicle: Vehicle = {
        id: this.vehicleData.id,
        placa: this.vehicleData.placa,
        chassi: this.vehicleData.chassi,
        renavam: this.vehicleData.renavam,
        modelo,
        marca,
        ano
      };
      this.dialogRef.close(updatedVehicle);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
