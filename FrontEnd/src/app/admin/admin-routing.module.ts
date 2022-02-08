import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminGuard } from '../core/guards/super-admin.guard';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { ApprovedListComponent } from './components/approved-list/approved-list.component';
import { PendingComponent } from './components/pending/pending.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';

const routes: Routes = [
  {
    path: '', component: AdminSidebarComponent, children: [

      {
        path: 'home', component: AdminHomeComponent
      },
      {
        path: 'pending', component: PendingComponent
      },
      {
        path: 'approved_list', component: ApprovedListComponent
      },
      {
        path: 'settings', component: SettingsComponent
      },
      {
        path: 'super_admin', component: SuperAdminComponent, canActivate: [SuperAdminGuard]
      },
      
    ]
  },

];;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
