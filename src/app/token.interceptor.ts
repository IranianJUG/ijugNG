import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {LoginService} from "./services/login.service";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);
  console.log(req.url)
  if (loginService.getUserToken()) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${loginService.getUserToken()}`
      }
    });
    return next(clonedRequest);
  }
  return next(req);
};
