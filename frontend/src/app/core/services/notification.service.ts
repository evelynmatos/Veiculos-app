import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private baseConfig: MatSnackBarConfig = {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: []
    };

    constructor(private snackBar: MatSnackBar) { }


    success(message: string): void {
        this.show(message, ['notification', 'success-snackbar']);
    }

    error(message: string, error: string): void {
        this.show(message, ['notification', 'error-snackbar']);
    }

    info(message: string): void {
        this.show(message, ['notification', 'info-snackbar']);
    }

    private show(message: string, panelClass: string[]) {
        this.snackBar.open(message, 'Fechar', {
            ...this.baseConfig,
            panelClass
        });
    }
}