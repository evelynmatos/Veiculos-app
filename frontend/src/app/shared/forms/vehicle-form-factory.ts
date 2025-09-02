import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Vehicle } from '../../vehicles/pages/vehicles.interface';

export class VehicleFormFactory {
    static createForm(
        fb: FormBuilder,
        vehicleData?: Vehicle,
        options: { disableBaseFields?: boolean, maxYear?: number } = {}
    ): FormGroup {
        const disable = options.disableBaseFields ?? false;
        const maxYear = options.maxYear ?? new Date().getFullYear() + 1;

        return fb.group({
            id: [vehicleData?.id ?? null],
            placa: [
                { value: vehicleData?.placa ?? '', disabled: disable },
                [Validators.required, Validators.pattern(/^[A-Za-z]{3}[0-9]{1}[A-Za-z]{1}[0-9]{2}$/)]
            ],
            chassi: [
                { value: vehicleData?.chassi ?? '', disabled: disable },
                [Validators.required, Validators.pattern(/^[A-HJ-NPR-Z0-9]{17}$/)]
            ],
            renavam: [
                { value: vehicleData?.renavam ?? '', disabled: disable },
                [Validators.required, Validators.pattern(/^\d{11}$/)]
            ],
            modelo: [
                vehicleData?.modelo ?? '',
                [Validators.required, Validators.pattern(/^[A-Za-z0-9\s]+$/)]
            ],
            marca: [
                vehicleData?.marca ?? '',
                [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)]
            ],
            ano: [
                vehicleData?.ano ?? '',
                [
                    Validators.required,
                    Validators.pattern(/^\d{4}$/),
                    Validators.min(1980),
                    Validators.max(maxYear)
                ]
            ]
        });
    }
}
