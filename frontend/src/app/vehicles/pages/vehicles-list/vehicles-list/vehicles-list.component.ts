import { ChangeDetectorRef, Component, NgZone, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicle } from '../../vehicles.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedModule } from '../../../../shared/shared.module';
import { VehiclesService } from '../../../vehicles.service';
import { SpinnerService } from '../../../../shared/spinner/spinner.service';
import { take, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditVehicleDialogComponent } from '../../../../shared/components/edit-vehicle-dialog/edit-vehicle-dialog.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../core/services/notification.service';
import { HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-vehicles-list',
  imports: [SharedModule],
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.scss',
})
export class VehiclesListComponent {
  displayedColumns = ['id', 'placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano', 'acoes'];
  dataSource = new MatTableDataSource<Vehicle>([]);
  carregando = true;
  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private vehiclesService: VehiclesService, private cdr: ChangeDetectorRef,
    private spinnerService: SpinnerService, private notificationService: NotificationService,
    private ngZone: NgZone, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.loadVehicles();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  private loadVehicles() {
    this.spinnerService.startSpinner();
    this.vehiclesService.getVehicles()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (listVehicles) => {
        this.dataSource.data = listVehicles;
        this.carregando = false;
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
          this.updateTable();
          this.spinnerService.stopSpinner();
          this.notificationService.success('Veículos carregados com sucesso!')
        });
      },
      error: (err) => {
        this.carregando = false;
        this.spinnerService.stopSpinner();
        this.notificationService.error('Não foi possível carregar os veículos.', err)
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

    this.spinnerService.startSpinner();

    dialogRef.afterClosed().subscribe(updatedVehicle => {
      if (updatedVehicle && JSON.stringify(updatedVehicle) !== JSON.stringify(vehicle)) {
        this.vehiclesService.updateVehicle(updatedVehicle).subscribe({
          next: () => {
            const index = this.dataSource.data.findIndex(v => v.id === updatedVehicle.id);
            if (index > -1) {
              this.dataSource.data[index] = updatedVehicle;
              this.dataSource._updateChangeSubscription();
            }
            this.notificationService.success('Veículo atualizado com sucesso!')
            this.spinnerService.stopSpinner();
          },
          error: (err) => {
            this.notificationService.error('Não foi possível atualizar o veículo.', err)
            this.spinnerService.stopSpinner();
          }
        });
      }
    });
  }

  public deleteVehicle(vehicleId: Vehicle) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: '<strong>Tem certeza que deseja excluir este veículo?</strong><br>Esta ação é permanente e não poderá ser desfeita.'
      }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.spinnerService.startSpinner();
        this.vehiclesService.deleteVehicle(vehicleId.id).subscribe({
          next: () => {
            this.dataSource.data = this.dataSource.data.filter(v => v.id !== vehicleId.id);
            this.spinnerService.stopSpinner();
            this.notificationService.success('Veículo removido com sucesso!')
          }, error: (err) => {
            this.carregando = false;
            this.spinnerService.stopSpinner();
            this.notificationService.error('Não foi possível remover o veículo.', err)
          }
        });
      }
    });
  }
}
