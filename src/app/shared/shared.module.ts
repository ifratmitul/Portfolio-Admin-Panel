import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { TestComponent } from './test/test.component';



@NgModule({
  declarations: [
    ErrorComponent,
    TestComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
