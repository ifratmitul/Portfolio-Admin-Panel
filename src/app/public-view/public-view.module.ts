import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PublicViewRoutingModule } from './public-view-routing.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PublicViewRoutingModule
  ],
  exports: [HomeComponent]
})
export class PublicViewModule { }
