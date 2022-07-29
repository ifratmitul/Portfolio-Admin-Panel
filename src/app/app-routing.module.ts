import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorInterceptor } from './core/Interceptors/error.interceptor';
import { LoadingInterceptor } from './core/Interceptors/loading.interceptor';

const routes: Routes = [
  {path: '', loadChildren: () => import('./public-view/public-view.module').then(mod => mod.PublicViewModule)},
  {path: 'admin', loadChildren: () => import("./admin/admin.module").then(mod => mod.AdminModule)},
  {path: '**', redirectTo:'', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi: true},
  ]
})
export class AppRoutingModule { }
