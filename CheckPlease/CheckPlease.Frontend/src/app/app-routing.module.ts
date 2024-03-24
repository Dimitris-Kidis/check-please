import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { RepairComponent } from './components/repair/repair.component';
import { RepairsComponent } from './components/repairs/repairs.component';
import { SearchComponent } from './components/search/search.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'main',
        loadComponent: () => import('./components/main-page/main-page.component').then((c) => c.MainPageComponent),
        data: {
          pageTitle: 'COMMON.MENU.MAIN',
        },
      },
      {
        path: 'new-repair',
        // loadComponent: () => import('./pages/not-found/not-found.component').then((c) => c.NotFoundComponent),
        component: MenuComponent,
        data: {
          pageTitle: 'COMMON.MENU.NEW_REPAIR',
        },
      },
      {
        path: 'history',
        loadComponent: () => import('./components/search/search.component').then((c) => c.SearchComponent),
        // component: MenuComponent,
        data: {
          pageTitle: 'COMMON.MENU.HISTORY',
        },
      },
      {
        path: 'clients',
        // loadComponent: () => import('./pages/not-found/not-found.component').then((c) => c.NotFoundComponent),
        component: MenuComponent,
        data: {
          pageTitle: 'COMMON.MENU.CLIENTS',
        },
      },
      {
        path: 'cars',
        // loadComponent: () => import('./pages/not-found/not-found.component').then((c) => c.NotFoundComponent),
        component: MenuComponent,
        data: {
          pageTitle: 'COMMON.MENU.CARS',
        },
      },
      {
        path: 'repair',
        // loadComponent: () => import('./pages/not-found/not-found.component').then((c) => c.NotFoundComponent),
        component: RepairComponent,
        data: {
          pageTitle: 'COMMON.MENU.REPAIRS',
        },
      },
      {
        path: 'finance',
        // loadComponent: () => import('./pages/not-found/not-found.component').then((c) => c.NotFoundComponent),
        component: MenuComponent,
        data: {
          pageTitle: 'COMMON.MENU.FINANCE',
        },
      },
      {
        path: 'audit',
        // loadComponent: () => import('./pages/not-found/not-found.component').then((c) => c.NotFoundComponent),
        component: MenuComponent,
        data: {
          pageTitle: 'COMMON.MENU.AUDIT',
        },
      },
      {
        path: 'settings',
        // loadComponent: () => import('./pages/not-found/not-found.component').then((c) => c.NotFoundComponent),
        component: MenuComponent,
        data: {
          pageTitle: 'COMMON.MENU.SETTINGS',
        },
      },
    ],
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  // },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'repair',
    component: RepairComponent,
  },
  {
    path: 'repairs',
    component: RepairsComponent,
  },
  // {
  //   path: 'not-found',
  //   loadComponent: () => import('./pages/not-found/not-found.component').then((c) => c.NotFoundComponent),
  // },
  {
    path: '**',
    component: LoginComponent,
  },
  // { path: '**', component: RedirectComponent, data: {} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
