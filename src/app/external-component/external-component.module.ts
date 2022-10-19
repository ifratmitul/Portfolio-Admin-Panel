import { NgModule } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [],
  imports: [
    DialogModule,
    CalendarModule
  ],
  exports: [DialogModule, CalendarModule]
})
export class ExternalComponentModule { }
