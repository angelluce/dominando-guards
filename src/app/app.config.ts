import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideIcons} from '@ng-icons/core';
import {
  heroBars3Solid,
  heroCheckCircleSolid,
  heroExclamationTriangleSolid,
  heroShoppingCartSolid,
  heroXMarkSolid,
} from '@ng-icons/heroicons/solid';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {loadingInterceptor} from '@shared/interceptors/loading';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        loadingInterceptor
      ])
    ),
    provideIcons({
      heroShoppingCartSolid,
      heroBars3Solid,
      heroCheckCircleSolid,
      heroExclamationTriangleSolid,
      heroXMarkSolid,
    })
  ]
};
