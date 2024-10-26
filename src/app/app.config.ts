import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {TranslateModule} from "@ngx-translate/core";
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {provideLoadingBarInterceptor} from "@ngx-loading-bar/http-client";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom([TranslateModule.forRoot()]),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideLoadingBarInterceptor(),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(
      withInterceptors([]),
    ),
  ]
};
