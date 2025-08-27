import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro HTTP:', error);

        let errorMsg = 'Erro desconhecido';

        if (error.error instanceof ErrorEvent) {
          errorMsg = `Erro: ${error.error.message}`;
        } else {
          switch (error.status) {
            case 0:
              errorMsg = 'Não foi possível conectar ao servidor.';
              break;
            case 400:
              errorMsg = 'Requisição inválida (400).';
              break;
            case 401:
              errorMsg = 'Não autorizado (401).';
              break;
            case 403:
              errorMsg = 'Acesso proibido (403).';
              break;
            case 404:
              errorMsg = 'Recurso não encontrado (404).';
              break;
            case 500:
              errorMsg = 'Erro interno do servidor (500).';
              break;
            default:
              errorMsg = error.message || 'Erro desconhecido.';
          }
        }

        this.snackBar.open(
          errorMsg,
          'Fechar',
          { duration: 4000, panelClass: ['snackbar-error'] }
        );

        return throwError(() => error);
      })
    );
  }
}
