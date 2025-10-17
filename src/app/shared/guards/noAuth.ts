import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@auth/services/auth';

/**
 * Guard para verificar si el usuario ya está autenticado.
 * Si ya está loggeado, NO permite ir al login, redirige al perfil.
 * @param route La instantánea de la ruta activada.
 * @param state El estado futuro del router.
 * @returns `true` si el usuario no está autenticado, o un `UrlTree` para redirigir si ya lo está.
 */
export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return router.createUrlTree(['/app/perfil']);
  }

  return true;
};
