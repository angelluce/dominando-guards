import {CanActivateFn, CanMatchFn, GuardResult, MaybeAsync, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@auth/services/auth';

/**
 * Guard para prevenir la carga de la rama de rutas protegidas si el usuario no está autenticado.
 * Esto mejora el rendimiento al evitar la descarga de código innecesario.
 * @param route La ruta que se intenta hacer match.
 * @param segments Los segmentos de la URL.
 * @returns Un GuardResult que es `true` si el usuario está autenticado, o un `UrlTree` para redirigir.
 *  */
export const authGuard: CanMatchFn = (route, segments): MaybeAsync<GuardResult> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isLoggedIn() ? true : router.createUrlTree(['/acceder']);
};

/**
 * Proteger una ruta específica verificando la autenticación después de que el canMatch ya fue exitoso.
 * Si no, redirige a la página de login.
 * @returns Un booleano que indica si la ruta puede ser activada.
 */
export const activateGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isLoggedIn() ? true : router.createUrlTree(['/acceder']);
};

/**
 * Guard para verificar si el usuario ya está autenticado.
 * Si ya está loggeado, NO permite ir al login, redirige al perfil.
 * @param route La instantánea de la ruta activada.
 * @param state El estado futuro del router.
 * @returns `true` si el usuario no está autenticado, o un `UrlTree` para redirigir si ya lo está.
 */
export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    return router.createUrlTree(['/app']);
  }

  return true;
};
