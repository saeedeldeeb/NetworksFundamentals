import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'section/1',
    loadComponent: () => import('./pages/section1/section1').then((m) => m.Section1),
  },
  {
    path: 'section/2',
    loadComponent: () => import('./pages/section2/section2').then((m) => m.Section2),
  },
  {
    path: 'section/3',
    loadComponent: () => import('./pages/section3/section3').then((m) => m.Section3),
  },
  {
    path: 'section/4',
    loadComponent: () => import('./pages/section4/section4').then((m) => m.Section4),
  },
  { path: '**', redirectTo: '' },
];
