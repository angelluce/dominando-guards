import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@auth/services/auth';
import {UserSimpleResponseInterface} from '@auth/interfaces/login';

/**
 * Resolver para obtener los datos del perfil del usuario antes de activar la ruta.
 * @param route La ruta activada.
 * @param state El estado futuro del router.
 * @returns Un objeto con la información del usuario o nulo si no se puede resolver.
 */
export const profileDataResolver: ResolveFn<UserSimpleResponseInterface | null> = (route, state) => {
  const authService = inject(AuthService);

  return authService.currentUser();
};
