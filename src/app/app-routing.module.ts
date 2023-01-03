import { ProjectComponent } from './web/project/project.component';
import { AdminComponent } from './web/admin/admin.component';
import { HomeComponent } from './web/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyComponent } from './shared/privacy/privacy.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'privacy-policy', component: PrivacyComponent },
  { path: 'login', component: HomeComponent },
  { path: 'admin', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  { path: 'admin/dashboard', component: AdminComponent },
  // { path: 'project'}
  {
    path: "project",
    component: ProjectComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./web/project/project.module").then(
            (m) => m.ProjectModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
