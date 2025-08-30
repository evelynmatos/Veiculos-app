import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Vehicle } from '../../../vehicles/pages/vehicles.interface';
import { SharedModule } from '../../shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-vehicle-dialog',
  imports: [MatDialogModule, SharedModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './edit-vehicle-dialog.component.html',
  styleUrl: './edit-vehicle-dialog.component.scss'
})
export class EditVehicleDialogComponent {
  vehicleForm: FormGroup;

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
          Validators.min(1900),
          Validators.max(new Date().getFullYear())
        ]
      ]
    });
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const updatedVehicle = this.vehicleForm.getRawValue() as Vehicle;
      this.dialogRef.close(updatedVehicle);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
