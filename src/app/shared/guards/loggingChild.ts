import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import {AuthService} from '@auth/services/auth';

/**
 * Guard para verificar si hay un usuario logueado antes de activar una ruta hija.
 * Comprueba la existencia del usuario a través del servicio de autenticación.
 * @param route La ruta hija activada.
 * @param state El estado del router.
 * @returns Un booleano que indica si la ruta hija puede ser activada.
 */
export const loggingChildGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);
  const user = authService.currentUser();

  return !!user;
};
