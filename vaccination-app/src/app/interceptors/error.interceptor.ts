import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, reduce, throwError } from 'rxjs';
import { StorageService } from '../service/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private storageService : StorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
        if (401 === err.status) {
          if(err.error.message.startsWith("Invalid JWT token") || err.error.message.startsWith("JWT token is expired") || err.error.message.startsWith("Full authentication is required to access this resource")) {
            // auto logout if 401 Unauthorized
            this.storageService.clean();
            // send to login page
            location.replace('/login');
          }
        }
        const error = err.error.message || err.statusText;
        return throwError(() => error);
    }))
  }
}
