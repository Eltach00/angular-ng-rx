import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorResponse } from '../models/error.response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarComponent } from '../mat-snack-bar/mat-snack-bar.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar) {}
  intercept(
    req: HttpRequest<ErrorResponse>,
    next: HttpHandler
  ): Observable<HttpEvent<ErrorResponse>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error.message;
        this._snackBar.openFromComponent(MatSnackBarComponent, {
          data: {
            message: errorMessage,
          },
          verticalPosition: 'top',
          duration: 3000,
        });
        return throwError(() => err);
      })
    );
  }
}
