import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
    pathMatch: 'full',
  },
  {
    path: ':city',
    loadComponent: () => import('./city/city.component').then((m) => m.CityComponent),
  },
  {
    path: ':city/:category',
    loadComponent: () => import('./category/category.component').then((m) => m.CategoryComponent),
  },
  {
    path: ':city/:category/:id',
    loadComponent: () =>
      import('./category-detail/category-detail.component').then((m) => m.CategoryDetailComponent),
  },
  {
    path: 'testpage',
    loadComponent: () =>
      import('@packages/ui-component-custom').then((m) => m.UiComponentCustomComponent),
  },
];
