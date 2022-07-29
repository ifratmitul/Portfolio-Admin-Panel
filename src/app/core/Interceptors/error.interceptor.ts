import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        console.log(error);

        switch (error?.status) {
          // case 400:
          //   this.toastrService.error(error.error.message, error.error.statusCode);
          //   break;
          case 404:
            this.toastrService.error(error.error.message, error.error.statusCode);
            break;
          case 401:
            this.toastrService.error(error.error.message, error.error.statusCode);
            break;
          case 500:
            this.toastrService.error(error.error.message, error.error.statusCode);
            break;
          default:
            this.toastrService.error("An unknown error occurred");
            break;
        }
        return throwError(error);
      })
    )
  }
}
