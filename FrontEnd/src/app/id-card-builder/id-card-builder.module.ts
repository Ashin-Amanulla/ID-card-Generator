import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { IdCardBuilderRoutingModule } from './id-card-builder-routing.module';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StatusComponent } from './components/status/status.component';
import { PdfFileComponent } from './components/pdf-file/pdf-file.component';


@NgModule({
  declarations: [
    FormComponent,
    HomeComponent,
    SidebarComponent,
    StatusComponent,
    PdfFileComponent
  ],
  imports: [
    CommonModule,
    IdCardBuilderRoutingModule,
    SharedModule,
    
  ]
})
export class IdCardBuilderModule { }
