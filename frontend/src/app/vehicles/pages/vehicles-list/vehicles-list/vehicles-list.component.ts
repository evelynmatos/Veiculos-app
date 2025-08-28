import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicle } from './vehicles.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { VehiclesService } from '../../../vehicles.service';

@Component({
  selector: 'app-vehicles-list',
  imports: [CommonModule, SharedModule, MatPaginatorModule, MatSortModule],
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.scss',
})
export class VehiclesListComponent {
  displayedColumns = ['id', 'placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano', 'acoes'];
  dataSource = new MatTableDataSource<Vehicle>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private vehiclesService: VehiclesService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();

    this.sort.active = 'id';
    this.sort.direction = 'asc';
    this.sort.sortChange.emit({
      active: this.sort.active,
      direction: this.sort.direction,
    });
  }

  private loadVehicles() {
    this.vehiclesService.getVehicles().subscribe({
      next: (listVehicles) => {
        this.dataSource.data = listVehicles;
        this.cdr.detectChanges();
      },
    });
  }

  registerVehicle(){
    console.log("registerVehicle");
  }

  editVehicle(vehicle: Vehicle) {
    console.log(vehicle);
  }

  deleteVehicle(vehicle: Vehicle) {
    console.log(vehicle);
  }
}
