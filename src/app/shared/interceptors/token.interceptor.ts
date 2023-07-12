import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');
    if (token) {
      const headers = req.headers.set('Authorization', `Token ${token}`);
      const tokenReq = req.clone({ headers });
      return next.handle(tokenReq);
    } else {
      return next.handle(req);
    }
  }
}
