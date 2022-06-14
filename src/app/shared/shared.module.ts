import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UpMenuComponent } from './up-menu/up-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarComponent, UpMenuComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarComponent, UpMenuComponent],
})
export class SharedModule {}
