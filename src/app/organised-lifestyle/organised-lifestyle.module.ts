import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';

import { SharedModule } from '../shared/shared.module';

import { BackendService } from '../services/backend.service';
import { Error404Component } from './error404/error404.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    MainPageComponent,
    Error404Component,
    RegisterComponent,
    ForgotPasswordComponent,
    ProfileComponent,
  ],
  imports: [CommonModule, FormsModule, SharedModule, RouterModule],
  exports: [
    LoginComponent,
    MainPageComponent,
    Error404Component,
    RegisterComponent,
    ForgotPasswordComponent,
    ProfileComponent,
  ],
})
export class OrganisedLifestyleModule {}
