import { ChangeDetectorRef, Component, NgZone, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicle } from '../../vehicles.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { VehiclesService } from '../../../vehicles.service';
import { SpinnerService } from '../../../../shared/spinner/spinner.service';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditVehicleDialogComponent } from '../../../../shared/components/edit-vehicle-dialog/edit-vehicle-dialog.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

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

  constructor(private vehiclesService: VehiclesService, private cdr: ChangeDetectorRef,
    private spinnerService: SpinnerService,
    private ngZone: NgZone, private dialog: MatDialog, private router: Router) { }

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

  goToRegisterVehicles() {
    this.router.navigate(['/register-vehicles']);
  }

  public editVehicle(vehicle: Vehicle) {
    const dialogRef = this.dialog.open(EditVehicleDialogComponent, {
      width: '800px',
      data: { ...vehicle }
    });

    dialogRef.afterClosed().subscribe(updatedVehicle => {
      if (updatedVehicle) {
        this.vehiclesService.updateVehicle(updatedVehicle).subscribe(() => {
          const index = this.dataSource.data.findIndex(v => v.id === updatedVehicle.id);
          if (index > -1) {
            this.dataSource.data[index] = updatedVehicle;
            this.dataSource._updateChangeSubscription();
          }
        });
      }
    });
  }

  public deleteVehicle(vehicleId: Vehicle) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Tem certeza que deseja excluir este veículo?'
      }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.vehiclesService.deleteVehicle(vehicleId.id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(v => v.id !== vehicleId.id);
        });
      }
    });
  }
}
