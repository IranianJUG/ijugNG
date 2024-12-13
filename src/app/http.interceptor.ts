import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {Router} from "@angular/router";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {

        } else {

          switch (error.status) {
            case 404: // NotFound
              router.navigateByUrl('/errors/404');
              throw new Error('Not Found');
              break;
            case 401: //UnAuthorized
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              router.navigateByUrl('/');
              throw new Error('UnAuthorized');
              break;
          }
        }
      } else {
      }
      return throwError(() => new Error(error.statusText));
    }));
};
