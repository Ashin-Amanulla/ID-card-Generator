import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { StatusComponent } from './components/status/status.component';
import { PdfFileComponent } from './components/pdf-file/pdf-file.component';

const routes: Routes = [
  {
    path: '', component: SidebarComponent, children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path: 'application', component: FormComponent
      },
      {
        path: 'status', component: StatusComponent
      },
    ],
    
  },
  {
    path: 'downloadFile', component: PdfFileComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdCardBuilderRoutingModule { }
