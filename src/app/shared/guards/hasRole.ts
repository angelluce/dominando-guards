import {inject} from '@angular/core';
import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {AuthService} from '@auth/services/auth';
import {UserRole} from '@auth/interfaces/user-role';
import {ToastService} from '../services/toast';

/**
 * Función factoría para crear un guard de roles.
 * Retorna un CanActivateFn que verifica si el usuario tiene alguno de los roles permitidos.
 * Si el usuario no tiene el rol, redirige a la página de acceso.
 * @param allowedRoles Los roles permitidos para acceder a la ruta.
 * @returns CanActivateFn Un guard que verifica los roles.
 */
export const hasRoleGuard = (allowedRoles: UserRole[]): CanActivateFn => {
  return (route, state): boolean | UrlTree => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const toast = inject(ToastService);

    const userRoles = authService.currentUserRole();
    const userHasAllowedRole = allowedRoles.find(role => role === userRoles);

    if (userHasAllowedRole) {
      return true;
    } else {
      toast.warning('El usuario no tiene el rol necesario.')
      return router.createUrlTree(['']);
    }
  };
};
