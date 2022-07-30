import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {path: '', loadChildren: () => import('./public-view/public-view.module').then(mod => mod.PublicViewModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)},
  {path: 'admin', loadChildren: () => import("./admin/admin.module").then(mod => mod.AdminModule), canActivate: [AuthGuard]},
  {path: '**', redirectTo:'', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
