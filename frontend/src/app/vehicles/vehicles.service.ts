import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from "./pages/vehicles-list/vehicles-list/vehicles.interface";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${environment.apiUrl}/veiculos`);  
  }
  
  getVehicleById(vehicleId: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${environment.apiUrl}/veiculos/${vehicleId}`);  
  }

  deleteVehicle(vehicleId: number): Observable<Vehicle> {
    return this.http.delete<Vehicle>(`${environment.apiUrl}/veiculos/${vehicleId}`);  
  }
}
