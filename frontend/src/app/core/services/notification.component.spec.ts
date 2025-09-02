import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
    let service: NotificationService;
    let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('MatSnackBar', ['open']);
        TestBed.configureTestingModule({
            providers: [
                NotificationService,
                { provide: MatSnackBar, useValue: spy }
            ]
        });
        service = TestBed.inject(NotificationService);
        snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call snackBar.open with success config', () => {
        const message = 'Success message';
        service.success(message);
        expect(snackBarSpy.open).toHaveBeenCalledWith(
            message,
            'Fechar',
            jasmine.objectContaining({
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: ['notification', 'success-snackbar']
            })
        );
    });

    it('should call snackBar.open with error config', () => {
        const message = 'Error message';
        const error = 'Some error';
        service.error(message, error);
        expect(snackBarSpy.open).toHaveBeenCalledWith(
            message,
            'Fechar',
            jasmine.objectContaining({
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: ['notification', 'error-snackbar']
            })
        );
    });

    it('should call snackBar.open with info config', () => {
        const message = 'Info message';
        service.info(message);
        expect(snackBarSpy.open).toHaveBeenCalledWith(
            message,
            'Fechar',
            jasmine.objectContaining({
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: ['notification', 'info-snackbar']
            })
        );
    });
});
