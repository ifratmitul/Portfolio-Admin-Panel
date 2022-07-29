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
        console.log(error.status);

        switch (error?.status) {
          case 400:
            this.toastrService.error("Bad Request", error.status);
            break;
          case 404:
            this.toastrService.error("Item not found", error.status);
            break;
          case 401:
            this.toastrService.error("Unauthorize", error.status);
            break;
          case 500:
            this.toastrService.error("Some thing wrong in the server", error.status);
            break;
          default:
            this.toastrService.error("An unknown error occurred", error.status);
            break;
        }
        return throwError(error);
      })
    )
  }
}
