import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import {TranslateModule} from "@ngx-translate/core";
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {provideLoadingBarInterceptor} from "@ngx-loading-bar/http-client";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {providePrimeNG} from "primeng/config";
import {
  provideAnimationsAsync
} from "@angular/platform-browser/animations/async";
import Aura from '@primeng/themes/aura';
import {httpInterceptor} from "./http.interceptor";
import {tokenInterceptor} from "./token.interceptor";


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom([TranslateModule.forRoot()]),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
    provideLoadingBarInterceptor(),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(
      withInterceptors([httpInterceptor,tokenInterceptor]),
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: Aura
    })

  ]
};
