import { Routes } from '@angular/router';
import { carResolver } from '../resolvers/car.resolver';
import { clientResolver } from '../resolvers/client.resolver';
import { repairResolver } from '../resolvers/repair.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/main',
  },
  {
    path: 'main',
    loadComponent: () => import('./components/main-tab/main-tab.component').then((c) => c.MainTabComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./components/repair-tab/repair-tab.component').then((c) => c.RepairTabComponent),
  },
  {
    path: 'repairs',
    loadComponent: () => import('./components/repairs-tab/repairs-tab.component').then((c) => c.RepairsTabComponent),
  },
  {
    path: 'repair/:id',
    loadComponent: () =>
      import('./components/repairs-tab/repair-edit/repair-edit.component').then((c) => c.RepairEditComponent),
    resolve: { repair: repairResolver },
  },
  {
    path: 'cars',
    loadComponent: () => import('./components/cars-tab/cars-tab.component').then((c) => c.CarsTabComponent),
  },
  {
    path: 'cars/:id',
    loadComponent: () => import('./components/cars-tab/car-edit/car-edit.component').then((c) => c.CarEditComponent),
    resolve: { car: carResolver },
  },
  {
    path: 'clients',
    loadComponent: () => import('./components/clients-tab/clients-tab.component').then((c) => c.ClientsTabComponent),
  },
  {
    path: 'clients/:id',
    loadComponent: () =>
      import('./components/clients-tab/client-edit/client-edit.component').then((c) => c.ClientEditComponent),
    resolve: { client: clientResolver },
  },
  {
    path: '**',
    redirectTo: '/main',
  },
];
