import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'section/1',
    redirectTo: 'section/1/1',
  },
  {
    path: 'section/1/1',
    loadComponent: () => import('./pages/section1/lesson1/lesson1').then((m) => m.Section1Lesson1),
  },
  {
    path: 'section/1/2',
    loadComponent: () => import('./pages/section1/lesson2/lesson2').then((m) => m.Section1Lesson2),
  },
  {
    path: 'section/1/3',
    loadComponent: () => import('./pages/section1/lesson3/lesson3').then((m) => m.Section1Lesson3),
  },
  {
    path: 'section/2',
    redirectTo: 'section/2/1',
  },
  {
    path: 'section/2/1',
    loadComponent: () => import('./pages/section2/lesson1/lesson1').then((m) => m.Section2Lesson1),
  },
  {
    path: 'section/2/2',
    loadComponent: () => import('./pages/section2/lesson2/lesson2').then((m) => m.Section2Lesson2),
  },
  {
    path: 'section/2/3',
    loadComponent: () => import('./pages/section2/lesson3/lesson3').then((m) => m.Section2Lesson3),
  },
  {
    path: 'section/3',
    redirectTo: 'section/3/1',
  },
  {
    path: 'section/3/1',
    loadComponent: () => import('./pages/section3/lesson1/lesson1').then((m) => m.Section3Lesson1),
  },
  {
    path: 'section/3/2',
    loadComponent: () => import('./pages/section3/lesson2/lesson2').then((m) => m.Section3Lesson2),
  },
  {
    path: 'section/3/3',
    loadComponent: () => import('./pages/section3/lesson3/lesson3').then((m) => m.Section3Lesson3),
  },
  {
    path: 'section/3/4',
    loadComponent: () => import('./pages/section3/lesson4/lesson4').then((m) => m.Section3Lesson4),
  },
  {
    path: 'section/3/5',
    loadComponent: () => import('./pages/section3/lesson5/lesson5').then((m) => m.Section3Lesson5),
  },
  {
    path: 'section/3/6',
    loadComponent: () => import('./pages/section3/lesson6/lesson6').then((m) => m.Section3Lesson6),
  },
  {
    path: 'section/3/7',
    loadComponent: () => import('./pages/section3/lesson7/lesson7').then((m) => m.Section3Lesson7),
  },
  {
    path: 'section/4',
    redirectTo: 'section/4/1',
  },
  {
    path: 'section/4/1',
    loadComponent: () =>
      import('./pages/section4/lesson1/lesson1').then((m) => m.Section4Lesson1),
  },
  {
    path: 'section/4/2',
    loadComponent: () =>
      import('./pages/section4/lesson2/lesson2').then((m) => m.Section4Lesson2),
  },
  {
    path: 'section/4/3',
    loadComponent: () =>
      import('./pages/section4/lesson3/lesson3').then((m) => m.Section4Lesson3),
  },
  {
    path: 'section/4/4',
    loadComponent: () =>
      import('./pages/section4/lesson4/lesson4').then((m) => m.Section4Lesson4),
  },
  {
    path: 'section/4/5',
    loadComponent: () =>
      import('./pages/section4/lesson5/lesson5').then((m) => m.Section4Lesson5),
  },
  {
    path: 'section/4/6',
    loadComponent: () =>
      import('./pages/section4/lesson6/lesson6').then((m) => m.Section4Lesson6),
  },
  {
    path: 'section/5',
    redirectTo: 'section/5/1',
  },
  {
    path: 'section/5/1',
    loadComponent: () => import('./pages/section5/lesson1/lesson1').then((m) => m.Section5Lesson1),
  },
  {
    path: 'section/5/2',
    loadComponent: () => import('./pages/section5/lesson2/lesson2').then((m) => m.Section5Lesson2),
  },
  {
    path: 'section/5/3',
    loadComponent: () => import('./pages/section5/lesson3/lesson3').then((m) => m.Section5Lesson3),
  },
  {
    path: 'section/5/4',
    loadComponent: () => import('./pages/section5/lesson4/lesson4').then((m) => m.Section5Lesson4),
  },
  {
    path: 'section/5/5',
    loadComponent: () => import('./pages/section5/lesson5/lesson5').then((m) => m.Section5Lesson5),
  },
  {
    path: 'section/5/6',
    loadComponent: () => import('./pages/section5/lesson6/lesson6').then((m) => m.Section5Lesson6),
  },
  { path: '**', redirectTo: '' },
];
