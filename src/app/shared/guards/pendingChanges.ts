import { CanDeactivateFn } from '@angular/router';
import {ComponentCanDeactivate} from '../interfaces/component-can-desactive';

/**
 * Guard para prevenir la desactivación de una ruta si hay cambios pendientes.
 * Comprueba si el componente tiene un method `canDeactivate`.
 * @param component El componente que se está desactivando.
 * @param currentRoute La ruta actual.
 * @param currentState El estado actual del router.
 * @param nextState El próximo estado del router.
 * @returns Un booleano o una promesa que resuelve a un booleano, indicando si la ruta puede ser desactivada.
 */
export const pendingChangesGuard: CanDeactivateFn<ComponentCanDeactivate> = (
  component: ComponentCanDeactivate,
  currentRoute,
  currentState,
  nextState
) => {

  /**
   * Aplicamos una 'exclusión' para una ruta a la cual permitimos redirigir
   * sin importar si hay cambios pendientes del usuario
   * */
  if(nextState.url === '/app/perfil-completo') {
    return true;
  }

  if (component.canDeactivate) {
    return component.canDeactivate();
  }

  return true;
};
