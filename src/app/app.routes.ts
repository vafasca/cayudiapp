import { Routes } from '@angular/router';

export const routes: Routes = [
 {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    loadComponent: () => import('./components/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      // Otras rutas hijas
      // {
      //   path: 'cursos',
      //   loadComponent: () => import('./components/cursos/cursos.component').then((m) => m.CursosComponent),
      // },
      // {
      //   path: 'calendario',
      //   loadComponent: () => import('./components/calendario/calendario.component').then((m) => m.CalendarioComponent),
      // },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
