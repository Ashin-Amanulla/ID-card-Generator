import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { PendingComponent } from './components/pending/pending.component';
import { ApprovedListComponent } from './components/approved-list/approved-list.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';


@NgModule({
  declarations: [
    AdminSidebarComponent,
    AdminHomeComponent,
    PendingComponent,
    ApprovedListComponent,
    SettingsComponent,
    SuperAdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
