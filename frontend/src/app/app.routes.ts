import { Routes } from '@angular/router';
import { VehiclesListComponent } from './vehicles/pages/vehicles-list/vehicles-list/vehicles-list.component';
import { HomeComponent } from './home/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, data: { animation: 'Home' } },
    { path: 'vehicles', component: VehiclesListComponent, data: { animation: 'Vehicles' } },
];
