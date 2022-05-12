import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './organised-lifestyle/login/login.component';
import { MainPageComponent } from './organised-lifestyle/main-page/main-page.component';
import { Error404Component } from './organised-lifestyle/error404/error404.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'inicio',
    component: MainPageComponent,
  },
  {
    path: 'error',
    component: Error404Component,
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
