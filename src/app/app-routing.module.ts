import { AwardComponent } from './web/award/award.component';
import { AdminComponent } from './web/admin/admin.component';
import { CubeComponent } from './web/cube/cube.component';
import { HomeComponent } from './web/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cube', component: CubeComponent },
  { path: 'login', component: HomeComponent },
  { path: 'awards', component: AwardComponent },
  { path: 'admin', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  { path: 'admin/dashboard', component: AdminComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
