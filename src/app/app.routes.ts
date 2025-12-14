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
      {
        path: 'cursos',
        loadComponent: () => import('./components/courses/courses.component').then((m) => m.CoursesComponent),
      },
      {
        path: 'certificado',
        loadComponent: () => import('./components/certificate/certificate.component').then((m) => m.CertificateComponent),
      },
      {
        path: 'progreso',
        loadComponent: () => import('./components/progress/progress.component').then((m) => m.ProgressComponent),
      },
      {
        path: 'calendario',
        loadComponent: () => import('./components/calendar/calendar.component').then((m) => m.CalendarComponent),
      },
      // Otras rutas hijas que necesites
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
