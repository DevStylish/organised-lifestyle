import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './organised-lifestyle/login/login.component';
import { MainPageComponent } from './organised-lifestyle/main-page/main-page.component';
import { Error404Component } from './organised-lifestyle/error404/error404.component';
import { RegisterComponent } from './organised-lifestyle/register/register.component';
import { ForgotPasswordComponent } from './organised-lifestyle/forgot-password/forgot-password.component';
import { ProfileComponent } from './organised-lifestyle/profile/profile.component';

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
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent,
  },
  {
    path: 'inicio',
    component: MainPageComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
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
