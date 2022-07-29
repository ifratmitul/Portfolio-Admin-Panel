import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', loadChildren: () => import('./public-view/public-view.module').then(mod => mod.PublicViewModule)},
  {path: 'admin', loadChildren: () => import("./admin/admin.module").then(mod => mod.AdminModule)},
  {path: '**', redirectTo:'', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
