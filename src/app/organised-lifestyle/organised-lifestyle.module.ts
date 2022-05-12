import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';

import { SharedModule } from '../shared/shared.module';

import { BackendService } from '../services/backend.service';
import { Error404Component } from './error404/error404.component';

@NgModule({
  declarations: [LoginComponent, MainPageComponent, Error404Component],
  imports: [CommonModule, FormsModule, SharedModule],
  exports: [LoginComponent, MainPageComponent, Error404Component],
})
export class OrganisedLifestyleModule {}
