import {CanActivateFn, CanMatchFn, GuardResult, MaybeAsync, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@auth/services/auth';

/**
 * * Guard para verificar si el usuario está autenticado.
 *  * Si no lo está, redirige a la página de acceso.
 *  * @param route La ruta que se intenta hacer match.
 *  * @param segments Los segmentos de la URL.
 *  * @returns Un GuardResult que es `true` si el usuario está autenticado, o un `UrlTree` para redirigir.
 *  */
export const authGuard: CanMatchFn = (route, segments): MaybeAsync<GuardResult> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isLoggedIn() ? true : router.createUrlTree(['/acceder']);
};

/**
 * Guard para verificar si el usuario está autenticado.
 * Si el usuario está autenticado, permite el acceso a la ruta.
 * Si no, redirige a la página de login.
 * @param route La ruta activada.
 * @param state El estado del router.
 * @returns Un booleano que indica si la ruta puede ser activada.
 */
export const canActivateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
