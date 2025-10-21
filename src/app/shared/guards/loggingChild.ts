import {CanActivateChildFn, Router} from '@angular/router';
import { inject } from '@angular/core';
import {AuthService} from '@auth/services/auth';
import {ToastService} from '@shared/services/toast';

/**
 * Guard para aplicar una regla de acceso uniforme a todas las rutas hijas,
 * siempre que el canMatch haya sido exitoso.
 * @param route La ruta hija activada.
 * @param state El estado del router.
 * @returns Un booleano que indica si la ruta hija puede ser activada.
 */
export const loggingChildGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const toastService = inject(ToastService);
  const user = authService.currentUser();

  /**
   * Podemos enviar data desde la RUTA PADRE, en este caso: { maintenanceMode: true }
   * por ello accedemos al parent del route activo (ActivatedRouteSnapshot)
   * y obtenemos el dato maintenanceMode para una validación demostrativa
   * */
  if (route.parent?.data['maintenanceMode']) {
    toastService.warning(`Este módulo está en mantenimiento`)
    return router.createUrlTree(['/catalogo']);
  }

  /**
   * Además podemos enviar data desde el ROUTER, en este caso: { isBetaFeature: true }
   * aquí obtenemos directamente el dato isBetaFeature del route activo (ActivatedRouteSnapshot)
   * y realizamos una validación demostrativa
   * */
  if (route.data['isBetaFeature'] === true && !user?.username.includes('admin')) {
    toastService.warning(`Este usuario no puede acceder a esta beta.`)
    return false;
  }

  /**
   * Realizamos una validación demostrativa para comprender el funcionamiento del CanActivateChildFn,
   * en este caso si está loggueado permitimos el acceso, si no redirigimos al login
   * */
  return authService.isLoggedIn() ? true : router.createUrlTree(['/acceder']);
};
