import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Vehicle } from '../../../vehicles/pages/vehicles.interface';
import { SharedModule } from '../../shared.module';
import { DateUtils } from '../../utils/date/date.utils';
import { VehicleFormFactory } from '../../forms/vehicle-form-factory';
import { formatVehicleData } from '../../utils/vehicle/vehicle.utils';
import { removeSpaces } from '../../utils/string/string.utils';

@Component({
  selector: 'app-edit-vehicle-dialog',
  imports: [SharedModule],
  templateUrl: './edit-vehicle-dialog.component.html',
  styleUrl: './edit-vehicle-dialog.component.scss'
})
export class EditVehicleDialogComponent {
  vehicleForm: FormGroup;
  currentYear = DateUtils.getCurrentYear();
  maxYear = DateUtils.getMaxYear();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditVehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public vehicleData: Vehicle
  ) {
    this.vehicleForm = VehicleFormFactory.createForm(this.fb, this.vehicleData, {
      disableBaseFields: true,
      maxYear: this.maxYear
    });
  }

  onSubmit(): void {
    if (this.vehicleForm.invalid) return;

    const formattedData = formatVehicleData(this.vehicleForm.value);

    const { modelo, marca, ano } = formattedData;

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

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onInputChange(controlName: string) {
    const control = this.vehicleForm.get(controlName);
    if (control) {
      control.setValue(removeSpaces(control.value));
    }
  }
}
