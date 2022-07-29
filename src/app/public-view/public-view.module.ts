import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PublicViewRoutingModule } from './public-view-routing.module';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PublicViewRoutingModule,
    CoreModule
  ],
  exports: [HomeComponent]
})
export class PublicViewModule { }
