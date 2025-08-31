import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Vehicle } from '../../vehicles.interface';
import { SharedModule } from '../../../../shared/shared.module';
import { VehiclesService } from '../../../vehicles.service';
import { DateUtils } from '../../../../shared/utils/date.utils';
import { VehicleFormFactory } from '../../../../shared/forms/vehicle-form-factory';
import { formatVehicleData } from '../../../../shared/utils/vehicle.utils';
import { SpinnerService } from '../../../../shared/spinner/spinner.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { removeSpaces } from '../../../../shared/utils/string.utils';

@Component({
  selector: 'app-vehicles-form',
  imports: [SharedModule],
  templateUrl: './vehicles-form.component.html',
  styleUrl: './vehicles-form.component.scss'
})
export class VehiclesFormComponent {
  vehicleForm: FormGroup;
  vehicles: Vehicle[] = [];
  displayedColumns = ['placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano'];
  currentYear = DateUtils.getCurrentYear();
  maxYear = DateUtils.getMaxYear();

  constructor(private fb: FormBuilder, private vehiclesService: VehiclesService,
    private spinnerService: SpinnerService, private notificationService: NotificationService,) {
    this.vehicleForm = VehicleFormFactory.createForm(this.fb);
  }

  onSubmit() {
    if (this.vehicleForm.invalid) return;

    this.spinnerService.startSpinner();

    const formattedData = formatVehicleData(this.vehicleForm.value);

    this.vehiclesService.createVehicle(formattedData).subscribe({
      next: (createdVehicle) => {
        this.spinnerService.stopSpinner();
        this.vehicles.push(createdVehicle);
        this.vehicleForm.reset();
        this.notificationService.success('Veículo cadatrado com sucesso!')
      },
      error: (err) => {
        this.spinnerService.stopSpinner();
        this.notificationService.error('Não foi possível cadastrar o veículo.', err)
      }
    });
  }

  onInputChange(controlName: string) {
    const control = this.vehicleForm.get(controlName);
    if (control) {
      control.setValue(removeSpaces(control.value));
    }
  }

}
