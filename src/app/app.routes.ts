import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'app',
    children: [
      {
        path: 'perfil',
        loadComponent: () => import('./auth/pages/profile/profile').then(m => m.Profile)
      },
      {
        path: 'administracion',
        loadComponent: () => import('./admin/pages/management/management').then(m => m.Management)
      },
      {
        path: 'tablero',
        loadComponent: () => import('./sales/pages/dashboard/dashboard').then(m => m.Dashboard)
      },
      {path: '', redirectTo: 'perfil', pathMatch: 'full'}
    ]
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./store/pages/products/products').then(m => m.Products)
  },
  {
    path: 'acceder',
    loadComponent: () => import('./auth/pages/login/login').then(m => m.Login)
  },
  {path: '', redirectTo: 'catalogo', pathMatch: 'full'},
  {path: '**', redirectTo: 'catalogo', pathMatch: 'full'},
];
