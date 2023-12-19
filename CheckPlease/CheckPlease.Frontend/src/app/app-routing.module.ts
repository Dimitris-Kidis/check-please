import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegisterComponent } from './components/register/register.component';
import { RepairComponent } from './components/repair/repair.component';
import { RepairsComponent } from './components/repairs/repairs.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
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
  {
    path: '**',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
