import { MaterialModule } from '../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { MovieComponent } from './movie/movie.component';
import { Page404Component } from './page404/page404.component';

import { MatNativeDateModule } from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    ProjectComponent,
    MovieComponent,
    Page404Component
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MaterialModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class ProjectModule { }
