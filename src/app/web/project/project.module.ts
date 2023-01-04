import { MaterialModule } from '../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { MovieComponent } from './movie/movie.component';
import { Page404Component } from './page404/page404.component';


@NgModule({
  declarations: [
    ProjectComponent,
    MovieComponent,
    Page404Component
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MaterialModule
  ]
})
export class ProjectModule { }
