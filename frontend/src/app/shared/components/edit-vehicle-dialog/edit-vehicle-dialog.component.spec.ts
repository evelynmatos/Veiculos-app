import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleDialogComponent } from './edit-vehicle-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Vehicle } from '../../../vehicles/pages/vehicles.interface';

describe('EditVehicleDialogComponent', () => {
  let component: EditVehicleDialogComponent;
  let fixture: ComponentFixture<EditVehicleDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<EditVehicleDialogComponent>>;

  const mockVehicle: Vehicle = {
    id: 1,
    placa: 'ABC1234',
    chassi: '12345678901234567',
    renavam: '12345678901',
    modelo: 'Model x',
    marca: 'Marcay',
    ano: 2022
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [EditVehicleDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockVehicle },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditVehicleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with vehicle data', () => {
    expect(component.vehicleForm.value.modelo).toBe(mockVehicle.modelo);
    expect(component.vehicleForm.value.marca).toBe(mockVehicle.marca);
    expect(component.vehicleForm.value.ano).toBe(mockVehicle.ano);
  });

  it('onSubmit should close dialog with updated vehicle when form is valid', () => {
    component.onSubmit();

    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      id: mockVehicle.id,
      placa: mockVehicle.placa,
      chassi: mockVehicle.chassi,
      renavam: mockVehicle.renavam,
      modelo: mockVehicle.modelo,
      marca: mockVehicle.marca,
      ano: mockVehicle.ano
    });
  });

  it('onSubmit should NOT close dialog when form is invalid', () => {
    component.vehicleForm.controls['modelo'].setValue('');
    component.vehicleForm.markAllAsTouched();
    component.onSubmit();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('onCancel should close dialog with null', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(null);
  });

  it('onInputChange should remove spaces from control value', () => {
    component.vehicleForm.controls['modelo'].setValue('M o d e l o  X');
    component.onInputChange('modelo');
    expect(component.vehicleForm.controls['modelo'].value).toBe('ModeloX');
  });

  it('onInputChange should not throw error for invalid controlName', () => {
    expect(() => component.onInputChange('invalidControl')).not.toThrow();
  });
});
