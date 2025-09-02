import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { VehiclesService } from './vehicles.service';
import { Vehicle } from './pages/vehicles.interface';
import { environment } from '../../environments/environment';

describe('VehiclesService', () => {
    let service: VehiclesService;
    let httpMock: HttpTestingController;

    const mockVehicles: Vehicle[] = [
        { id: 1, placa: 'ABC1234', chassi: 'CHASSI123', renavam: 'RENAVAM1', modelo: 'Model A', marca: 'Marca A', ano: 2020 },
        { id: 2, placa: 'DEF5678', chassi: 'CHASSI456', renavam: 'RENAVAM2', modelo: 'Model B', marca: 'Marca B', ano: 2021 },
    ];

    const mockVehicle: Vehicle = { id: 1, placa: 'ABC1234', chassi: 'CHASSI123', renavam: 'RENAVAM1', modelo: 'Model A', marca: 'Marca A', ano: 2020 };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [VehiclesService]
        });

        service = TestBed.inject(VehiclesService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getVehicles should return an Observable<Vehicle[]>', () => {
        service.getVehicles().subscribe(vehicles => {
            expect(vehicles.length).toBe(2);
            expect(vehicles).toEqual(mockVehicles);
        });
        const req = httpMock.expectOne(`${environment.apiUrl}/veiculos`);
        expect(req.request.method).toBe('GET');
        req.flush(mockVehicles);
    });

    it('getVehicleById should return an Observable<Vehicle>', () => {
        service.getVehicleById(1).subscribe(vehicle => {
            expect(vehicle).toEqual(mockVehicle);
        });
        const req = httpMock.expectOne(`${environment.apiUrl}/veiculos/1`);
        expect(req.request.method).toBe('GET');
        req.flush(mockVehicle);
    });

    it('deleteVehicle should send a DELETE request and return the deleted Vehicle', () => {
        service.deleteVehicle(1).subscribe(vehicle => {
            expect(vehicle).toEqual(mockVehicle);
        });
        const req = httpMock.expectOne(`${environment.apiUrl}/veiculos/1`);
        expect(req.request.method).toBe('DELETE');
        req.flush(mockVehicle);
    });

    it('updateVehicle should send a PUT request and return the updated Vehicle', () => {
        const updatedVehicle: Vehicle = { ...mockVehicle, modelo: 'Model Updated' };
        service.updateVehicle(updatedVehicle).subscribe(vehicle => {
            expect(vehicle).toEqual(updatedVehicle);
        });
        const req = httpMock.expectOne(`${environment.apiUrl}/veiculos/${updatedVehicle.id}`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updatedVehicle);
        req.flush(updatedVehicle);
    });

    it('createVehicle should send a POST request and return the created Vehicle', () => {
        const newVehicle: Vehicle = { id: 3, placa: 'GHI9012', chassi: 'CHASSI789', renavam: 'RENAVAM3', modelo: 'Model C', marca: 'Marca C', ano: 2022 };
        service.createVehicle(newVehicle).subscribe(vehicle => {
            expect(vehicle).toEqual(newVehicle);
        });
        const req = httpMock.expectOne(`${environment.apiUrl}/veiculos`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newVehicle);
        req.flush(newVehicle);
    });
});
