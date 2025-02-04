import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const translate = inject(TranslateService);

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
        } else {
          let header
          switch (error.status) {
            case 404: // NotFound
              router.navigateByUrl('/errors/404');
              throw new Error('Not Found');
              break;
            case 400:
              header = error.error.message.split(' ').join('_').split('.').join('');
              const messageKey = Object.keys(error.error.data)[0];
              const message = error.error.data[messageKey][0].split(' ').join('_').split('.').join('');
              alert(translate.instant('errors.' + header) + '\n' + translate.instant('errors.' + message));
              break;
            case 401: //UnAuthorized
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              router.navigateByUrl('/');
              if (error.error.message) {
                header = error.error.message.split(' ').join('_').split('.').join('');
              }else {
                header = 'برای خرید بلیط رویداد ابتدا ثبت نام نمایید.'
              }
              alert(translate.instant('errors.' + header));
              throw new Error('UnAuthorized');
              break;
            case 500:
              header = error.error.message.split(' ').join('_').split('.').join('');
              alert(translate.instant('errors.' + header));

              break
          }
        }
      } else {
      }
      return throwError(() => new Error(error.statusText));
    })
  );
};
