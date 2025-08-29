import { ChangeDetectorRef, Component, NgZone, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicle } from './vehicles.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { VehiclesService } from '../../../vehicles.service';
import { SpinnerService } from '../../../../shared/spinner/spinner.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-vehicles-list',
  imports: [CommonModule, SharedModule, MatPaginatorModule, MatSortModule],
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.scss',
})
export class VehiclesListComponent {
  displayedColumns = ['id', 'placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano', 'acoes'];
  dataSource = new MatTableDataSource<Vehicle>([]);
  carregando = true;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private vehiclesService: VehiclesService, private cdr: ChangeDetectorRef, private spinnerService: SpinnerService,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.loadVehicles();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  private loadVehicles() {
    this.spinnerService.startSpinner();
    this.vehiclesService.getVehicles().subscribe({
      next: (listVehicles) => {
        this.dataSource.data = listVehicles;
        this.carregando = false;
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
          this.updateTable();
          this.spinnerService.stopSpinner();
        });
      },
      error: () => {
        this.carregando = false;
        this.spinnerService.stopSpinner();
      }
    });
  }

  updateTable() {
    this.sort.active = 'id';
    this.sort.direction = 'asc';
    this.sort.sortChange.emit({
      active: this.sort.active,
      direction: this.sort.direction,
    });
  }

  registerVehicle() {
    console.log("registerVehicle");
  }

  editVehicle(vehicle: Vehicle) {
    console.log(vehicle);
  }

  deleteVehicle(vehicle: Vehicle) {
    console.log(vehicle);
  }
}
