import {Routes} from '@angular/router';
// import {activateGuard, authGuard, noAuthGuard} from '@shared/guards/auth';
// import {loggingChildGuard} from '@shared/guards/loggingChild';
// import {pendingChangesGuard} from '@shared/guards/pendingChanges';
// import {profileDataResolver} from '@shared/resolvers/profileData';
// import {hasRoleGuard} from '@shared/guards/hasRole';

export const routes: Routes = [
  {
    path: 'app',
    // canMatch: [authGuard],
    // canActivateChild: [loggingChildGuard],
    children: [
      {
        path: 'perfil',
        // resolve: {
        //   user: profileDataResolver
        // },
        // canActivate:[activateGuard],
        // canDeactivate: [pendingChangesGuard],
        loadComponent: () => import('@shared/pages/profile/profile').then(m => m.Profile)
      },
      {
        path: 'perfil-completo',
        loadComponent: () => import('@shared/pages/full-profile/full-profile').then(m => m.FullProfile)
      },
      {
        path: 'administracion',
        // canActivate:[hasRoleGuard(['ADMIN'])],
        loadComponent: () => import('./admin/pages/management/management').then(m => m.Management)
      },
      {
        path: 'tablero',
        // canActivate:[hasRoleGuard(['VENDEDOR'])],
        loadComponent: () => import('./sales/pages/dashboard/dashboard').then(m => m.Dashboard)
      }
    ]
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./store/pages/products/products').then(m => m.Products)
  },
  {
    path: 'acceder',
    // canActivate: [noAuthGuard],
    loadComponent: () => import('./auth/pages/login/login').then(m => m.Login)
  },
  {path: '', redirectTo: 'catalogo', pathMatch: 'full'},
  {path: '**', redirectTo: 'catalogo', pathMatch: 'full'},
];
